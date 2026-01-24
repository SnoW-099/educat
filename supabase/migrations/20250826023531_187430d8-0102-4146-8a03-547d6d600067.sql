-- Security Fix 1: Create proper user roles system
CREATE TYPE public.app_role AS ENUM ('professor', 'student');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Security Fix 2: Lock down student_progress table RLS
DROP POLICY IF EXISTS "System can update progress" ON public.student_progress;
DROP POLICY IF EXISTS "Students can view their own progress" ON public.student_progress;
DROP POLICY IF EXISTS "Professors can view progress in their classes" ON public.student_progress;

-- New restrictive policies for student_progress
CREATE POLICY "Students can view their own progress" 
ON public.student_progress 
FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Professors can view progress in their classes" 
ON public.student_progress 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.classes 
  WHERE classes.id = student_progress.class_id 
  AND classes.professor_id = auth.uid()
));

-- Security Fix 3: Lock down student_xp_rankings table RLS
DROP POLICY IF EXISTS "System can manage rankings" ON public.student_xp_rankings;
DROP POLICY IF EXISTS "Class members can view rankings" ON public.student_xp_rankings;

-- New restrictive policies for student_xp_rankings
CREATE POLICY "Class members can view rankings" 
ON public.student_xp_rankings 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.classes c
  WHERE c.id = student_xp_rankings.class_id 
  AND (c.professor_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.enrollments e
    WHERE e.class_id = c.id 
    AND e.student_id = auth.uid() 
    AND e.is_active = true
  ))
));

-- Security Fix 4: Restrict profile role updates - make role read-only
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Policy that allows updating profile but prevents role changes
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add constraint to prevent role updates at database level
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_immutable 
CHECK (role = role); -- This will be enforced by triggers

-- Security Fix 5: Add missing triggers with fixed search_path
-- Fix search_path in existing functions
CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  class_id_var UUID;
  exercise_type_var TEXT;
BEGIN
  -- Get the exercise type and class ID
  SELECT e.type, e.class_id INTO exercise_type_var, class_id_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;

  -- Only proceed if we found a class
  IF class_id_var IS NOT NULL THEN
    -- Insert or update progress record
    INSERT INTO public.student_progress (
      student_id, 
      class_id,
      grammar_score,
      vocabulary_score, 
      listening_score,
      speaking_score,
      reading_score,
      writing_score
    ) VALUES (
      NEW.student_id,
      class_id_var,
      CASE WHEN exercise_type_var = 'grammar' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type_var = 'vocabulary' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type_var = 'listening' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type_var = 'speaking' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type_var = 'reading' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type_var = 'writing' THEN NEW.score ELSE 0 END
    ) 
    ON CONFLICT (student_id, class_id) 
    DO UPDATE SET
      grammar_score = CASE 
        WHEN exercise_type_var = 'grammar' 
        THEN GREATEST(public.student_progress.grammar_score, NEW.score)
        ELSE public.student_progress.grammar_score
      END,
      vocabulary_score = CASE 
        WHEN exercise_type_var = 'vocabulary' 
        THEN GREATEST(public.student_progress.vocabulary_score, NEW.score)
        ELSE public.student_progress.vocabulary_score
      END,
      listening_score = CASE 
        WHEN exercise_type_var = 'listening' 
        THEN GREATEST(public.student_progress.listening_score, NEW.score)
        ELSE public.student_progress.listening_score
      END,
      speaking_score = CASE 
        WHEN exercise_type_var = 'speaking' 
        THEN GREATEST(public.student_progress.speaking_score, NEW.score)
        ELSE public.student_progress.speaking_score
      END,
      reading_score = CASE 
        WHEN exercise_type_var = 'reading' 
        THEN GREATEST(public.student_progress.reading_score, NEW.score)
        ELSE public.student_progress.reading_score
      END,
      writing_score = CASE 
        WHEN exercise_type_var = 'writing' 
        THEN GREATEST(public.student_progress.writing_score, NEW.score)
        ELSE public.student_progress.writing_score
      END,
      overall_score = (
        COALESCE(EXCLUDED.grammar_score, public.student_progress.grammar_score) +
        COALESCE(EXCLUDED.vocabulary_score, public.student_progress.vocabulary_score) +
        COALESCE(EXCLUDED.listening_score, public.student_progress.listening_score) +
        COALESCE(EXCLUDED.speaking_score, public.student_progress.speaking_score) +
        COALESCE(EXCLUDED.reading_score, public.student_progress.reading_score) +
        COALESCE(EXCLUDED.writing_score, public.student_progress.writing_score)
      ) / 6;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for student progress updates
DROP TRIGGER IF EXISTS trigger_update_student_progress ON public.exercise_attempts;
CREATE TRIGGER trigger_update_student_progress
  AFTER INSERT ON public.exercise_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_student_progress();

-- Fix search_path in XP rankings function
CREATE OR REPLACE FUNCTION public.update_xp_rankings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_month TEXT;
  class_id_var UUID;
BEGIN
  -- Get current month in YYYY-MM format
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Get class_id from the exercise
  SELECT e.class_id INTO class_id_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;
  
  -- Only proceed if exercise has a class
  IF class_id_var IS NOT NULL THEN
    -- Insert or update XP for this student in this month
    INSERT INTO public.student_xp_rankings (
      student_id, 
      class_id,
      xp_points,
      month_year
    ) VALUES (
      NEW.student_id,
      class_id_var,
      GREATEST(NEW.score, 0) * 10, -- Convert score to XP (score * 10)
      current_month
    )
    ON CONFLICT (student_id, class_id, month_year) 
    DO UPDATE SET
      xp_points = student_xp_rankings.xp_points + (GREATEST(NEW.score, 0) * 10),
      updated_at = NOW();
    
    -- Update rankings for the class and month
    WITH ranked_students AS (
      SELECT 
        student_id,
        class_id,
        month_year,
        ROW_NUMBER() OVER (ORDER BY xp_points DESC) as new_position
      FROM public.student_xp_rankings
      WHERE class_id = class_id_var AND month_year = current_month
    )
    UPDATE public.student_xp_rankings
    SET ranking_position = ranked_students.new_position
    FROM ranked_students
    WHERE public.student_xp_rankings.student_id = ranked_students.student_id
      AND public.student_xp_rankings.class_id = ranked_students.class_id
      AND public.student_xp_rankings.month_year = ranked_students.month_year;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for XP rankings updates
DROP TRIGGER IF EXISTS trigger_update_xp_rankings ON public.exercise_attempts;
CREATE TRIGGER trigger_update_xp_rankings
  AFTER INSERT ON public.exercise_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_xp_rankings();

-- Security Fix 6: Fix enrollment check function search_path
CREATE OR REPLACE FUNCTION public.check_enrollment_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    current_count INTEGER;
    max_allowed INTEGER;
BEGIN
    -- Get current active enrollment count and max allowed
    SELECT COUNT(*), c.max_students 
    INTO current_count, max_allowed
    FROM public.enrollments e
    JOIN public.classes c ON c.id = e.class_id
    WHERE e.class_id = NEW.class_id AND e.is_active = true AND c.id = NEW.class_id
    GROUP BY c.max_students;
    
    -- If no enrollments yet, get max_students from class
    IF current_count IS NULL THEN
        SELECT max_students INTO max_allowed 
        FROM public.classes 
        WHERE id = NEW.class_id;
        current_count := 0;
    END IF;
    
    -- Enforce 50 student absolute maximum
    IF max_allowed > 50 THEN
        max_allowed := 50;
    END IF;
    
    -- Check if adding this student would exceed the limit
    IF current_count >= max_allowed THEN
        RAISE EXCEPTION 'La classe ha assolit el límit màxim de % estudiants', max_allowed
            USING ERRCODE = 'P0001';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger for enrollment limit check
DROP TRIGGER IF EXISTS trigger_check_enrollment_limit ON public.enrollments;
CREATE TRIGGER trigger_check_enrollment_limit
  BEFORE INSERT ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.check_enrollment_limit();

-- Security Fix 7: Fix professor class limit function search_path
CREATE OR REPLACE FUNCTION public.check_professor_class_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    class_count INTEGER;
    user_role TEXT;
BEGIN
    -- Get user role
    SELECT role INTO user_role 
    FROM public.profiles 
    WHERE user_id = NEW.professor_id;
    
    -- Only check limit for professors
    IF user_role = 'professor' THEN
        -- Count existing classes for this professor
        SELECT COUNT(*) INTO class_count
        FROM public.classes
        WHERE professor_id = NEW.professor_id AND is_active = true;
        
        -- Check if adding this class would exceed the limit
        IF class_count >= 10 THEN
            RAISE EXCEPTION 'Els professors només poden tenir un màxim de 10 classes actives'
                USING ERRCODE = 'P0001';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger for professor class limit check
DROP TRIGGER IF EXISTS trigger_check_professor_class_limit ON public.classes;
CREATE TRIGGER trigger_check_professor_class_limit
  BEFORE INSERT ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.check_professor_class_limit();

-- Security Fix 8: Migrate existing user roles to new system
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, role::app_role 
FROM public.profiles 
ON CONFLICT (user_id, role) DO NOTHING;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create function to prevent role changes in profiles
CREATE OR REPLACE FUNCTION public.prevent_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Prevent role changes after initial creation
    IF OLD.role != NEW.role THEN
        RAISE EXCEPTION 'Role changes are not allowed. Roles must be managed through the user_roles table.'
            USING ERRCODE = 'P0001';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger to prevent role changes
DROP TRIGGER IF EXISTS trigger_prevent_role_changes ON public.profiles;
CREATE TRIGGER trigger_prevent_role_changes
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_changes();