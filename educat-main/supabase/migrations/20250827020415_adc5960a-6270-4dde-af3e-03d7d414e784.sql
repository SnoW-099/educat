-- Improve exercises system with more comprehensive data and better level matching

-- Add more columns to exercises table for better functionality
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS difficulty_score INTEGER DEFAULT 1 CHECK (difficulty_score >= 1 AND difficulty_score <= 10);
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS estimated_duration INTEGER; -- in minutes

-- Add index for better performance when filtering by level and type
CREATE INDEX IF NOT EXISTS idx_exercises_level_type ON public.exercises (level, type);
CREATE INDEX IF NOT EXISTS idx_exercises_class_level ON public.exercises (class_id, level);

-- Update the XP ranking trigger to only count exercises that match class level
CREATE OR REPLACE FUNCTION public.update_xp_rankings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_month TEXT;
  class_id_var UUID;
  exercise_level_var TEXT;
  class_level_var TEXT;
  xp_to_add INTEGER;
BEGIN
  -- Get current month in YYYY-MM format
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Get exercise details
  SELECT e.class_id, e.level INTO class_id_var, exercise_level_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;
  
  -- Only proceed if exercise has a class
  IF class_id_var IS NOT NULL THEN
    -- Get class level
    SELECT c.level INTO class_level_var
    FROM public.classes c
    WHERE c.id = class_id_var;
    
    -- Only give XP if exercise level matches class level or is lower/equal
    IF exercise_level_var IS NOT NULL AND class_level_var IS NOT NULL THEN
      -- Define level hierarchy for comparison
      -- A1=1, A2=2, B1=3, B2=4, C1=5, C2=6
      DECLARE
        exercise_level_num INTEGER;
        class_level_num INTEGER;
      BEGIN
        exercise_level_num := CASE exercise_level_var
          WHEN 'A1' THEN 1
          WHEN 'A2' THEN 2
          WHEN 'B1' THEN 3
          WHEN 'B2' THEN 4
          WHEN 'C1' THEN 5
          WHEN 'C2' THEN 6
          ELSE 0
        END;
        
        class_level_num := CASE class_level_var
          WHEN 'A1' THEN 1
          WHEN 'A2' THEN 2
          WHEN 'B1' THEN 3
          WHEN 'B2' THEN 4
          WHEN 'C1' THEN 5
          WHEN 'C2' THEN 6
          ELSE 0
        END;
        
        -- Only give XP if exercise level is appropriate for class level
        -- (exercise level <= class level + 1 to allow slight challenge)
        IF exercise_level_num <= class_level_num + 1 AND exercise_level_num > 0 THEN
          xp_to_add := GREATEST(NEW.score, 0) * 10;
          
          -- Insert or update XP for this student in this month
          INSERT INTO public.student_xp_rankings (
            student_id, 
            class_id,
            xp_points,
            month_year
          ) VALUES (
            NEW.student_id,
            class_id_var,
            xp_to_add,
            current_month
          )
          ON CONFLICT (student_id, class_id, month_year) 
          DO UPDATE SET
            xp_points = student_xp_rankings.xp_points + xp_to_add,
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
      END;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Similarly update student progress to only count appropriate level exercises
CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  class_id_var UUID;
  exercise_type_var TEXT;
  exercise_level_var TEXT;
  class_level_var TEXT;
BEGIN
  -- Get the exercise details
  SELECT e.type, e.class_id, e.level INTO exercise_type_var, class_id_var, exercise_level_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;

  -- Only proceed if we found a class
  IF class_id_var IS NOT NULL THEN
    -- Get class level
    SELECT c.level INTO class_level_var
    FROM public.classes c
    WHERE c.id = class_id_var;
    
    -- Only update progress if exercise level is appropriate for class level
    IF exercise_level_var IS NOT NULL AND class_level_var IS NOT NULL THEN
      DECLARE
        exercise_level_num INTEGER;
        class_level_num INTEGER;
      BEGIN
        exercise_level_num := CASE exercise_level_var
          WHEN 'A1' THEN 1
          WHEN 'A2' THEN 2
          WHEN 'B1' THEN 3
          WHEN 'B2' THEN 4
          WHEN 'C1' THEN 5
          WHEN 'C2' THEN 6
          ELSE 0
        END;
        
        class_level_num := CASE class_level_var
          WHEN 'A1' THEN 1
          WHEN 'A2' THEN 2
          WHEN 'B1' THEN 3
          WHEN 'B2' THEN 4
          WHEN 'C1' THEN 5
          WHEN 'C2' THEN 6
          ELSE 0
        END;
        
        -- Only update progress if appropriate level
        IF exercise_level_num <= class_level_num + 1 AND exercise_level_num > 0 THEN
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
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'grammar' THEN NEW.score ELSE public.student_progress.grammar_score END, public.student_progress.grammar_score), 0) +
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'vocabulary' THEN NEW.score ELSE public.student_progress.vocabulary_score END, public.student_progress.vocabulary_score), 0) +
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'listening' THEN NEW.score ELSE public.student_progress.listening_score END, public.student_progress.listening_score), 0) +
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'speaking' THEN NEW.score ELSE public.student_progress.speaking_score END, public.student_progress.speaking_score), 0) +
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'reading' THEN NEW.score ELSE public.student_progress.reading_score END, public.student_progress.reading_score), 0) +
              COALESCE(GREATEST(CASE WHEN exercise_type_var = 'writing' THEN NEW.score ELSE public.student_progress.writing_score END, public.student_progress.writing_score), 0)
            ) / 6;
        END IF;
      END;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;