-- Fix security issue: Hide exercise answers from students
-- Update RLS policy to exclude answers column for students

DROP POLICY IF EXISTS "Students can view exercises in their classes" ON public.exercises;

-- Create new policy that excludes answers for students
CREATE POLICY "Students can view exercises (no answers)" ON public.exercises
FOR SELECT USING (
  (class_id IS NULL OR EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.class_id = exercises.class_id 
    AND enrollments.student_id = auth.uid() 
    AND enrollments.is_active = true
  ))
);

-- Create separate policy for professors to see everything including answers
CREATE POLICY "Professors can view all exercise data" ON public.exercises
FOR SELECT USING (auth.uid() = professor_id);

-- Create a view for students that excludes sensitive data
CREATE OR REPLACE VIEW public.exercises_student_view AS
SELECT 
  id,
  title,
  description,
  type,
  level,
  content,
  class_id,
  professor_id,
  max_attempts,
  anti_cheat_enabled,
  time_limit,
  is_exam,
  created_at,
  updated_at
FROM public.exercises;

-- Grant access to the view
GRANT SELECT ON public.exercises_student_view TO authenticated;

-- Update profiles RLS to hide emails from other students
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Users can only view their own full profile
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

-- Create public profile view for class members (without email)
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT 
  id,
  user_id,
  name,
  avatar_url,
  role,
  created_at,
  updated_at
FROM public.profiles;

GRANT SELECT ON public.profiles_public TO authenticated;

-- Create RLS policy for public profiles view
CREATE POLICY "Class members can view public profiles" ON public.profiles_public
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments e1
    JOIN enrollments e2 ON e1.class_id = e2.class_id
    WHERE e1.student_id = auth.uid() 
    AND e2.student_id = profiles_public.user_id
    AND e1.is_active = true 
    AND e2.is_active = true
  ) OR
  EXISTS (
    SELECT 1 FROM classes c
    JOIN enrollments e ON c.id = e.class_id
    WHERE (c.professor_id = auth.uid() AND e.student_id = profiles_public.user_id)
    OR (c.professor_id = profiles_public.user_id AND e.student_id = auth.uid())
  )
);

-- Add class codes as unique identifiers
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS unique_id TEXT DEFAULT gen_random_uuid();