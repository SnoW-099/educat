-- Add FK between essay_reviews.student_id and profiles.user_id (to enable PostgREST relationship)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'essay_reviews_student_id_fkey'
  ) THEN
    ALTER TABLE public.essay_reviews
    ADD CONSTRAINT essay_reviews_student_id_fkey
    FOREIGN KEY (student_id) REFERENCES public.profiles(user_id)
    ON DELETE CASCADE;
  END IF;
END$$;

-- Helpful index for joins
CREATE INDEX IF NOT EXISTS idx_essay_reviews_student_id ON public.essay_reviews(student_id);

-- Recreate XP functions with unified multipliers
CREATE OR REPLACE FUNCTION public.update_student_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    current_month TEXT;
    exercise_level_var TEXT;
    class_level_var TEXT;
    xp_to_add INTEGER;
    level_multiplier NUMERIC;
    existing_record_id UUID;
BEGIN
    current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');

    SELECT e.level, e.class_id INTO exercise_level_var, existing_record_id
    FROM public.exercises e
    WHERE e.id = NEW.exercise_id;

    IF existing_record_id IS NOT NULL THEN
        SELECT c.level INTO class_level_var
        FROM public.classes c
        WHERE c.id = existing_record_id;
    END IF;

    -- Unified level multipliers (A1 highest boost per user request)
    level_multiplier := CASE exercise_level_var
        WHEN 'A1' THEN 1.5
        WHEN 'A2' THEN 1.7
        WHEN 'B1' THEN 2.0
        WHEN 'B2' THEN 2.2
        WHEN 'C1' THEN 2.4
        WHEN 'C2' THEN 2.5
        ELSE 1.5
    END;

    xp_to_add := ROUND(GREATEST(NEW.score, 0) * level_multiplier);

    IF EXISTS (
        SELECT 1 FROM public.exercises e
        JOIN public.enrollments en ON en.class_id = e.class_id
        WHERE e.id = NEW.exercise_id 
          AND en.student_id = NEW.student_id 
          AND en.is_active = true
          AND e.class_id IS NOT NULL
    ) THEN
        SELECT id INTO existing_record_id
        FROM public.student_xp_rankings 
        WHERE student_id = NEW.student_id 
          AND class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)
          AND month_year = current_month;
        
        IF existing_record_id IS NOT NULL THEN
            UPDATE public.student_xp_rankings 
            SET xp_points = xp_points + xp_to_add,
                updated_at = NOW()
            WHERE id = existing_record_id;
        ELSE
            INSERT INTO public.student_xp_rankings (
                student_id, 
                class_id, 
                month_year, 
                xp_points
            ) VALUES (
                NEW.student_id,
                (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id),
                current_month,
                xp_to_add
            );
        END IF;
        
        WITH ranked_students AS (
            SELECT 
                id,
                ROW_NUMBER() OVER (ORDER BY xp_points DESC, updated_at ASC) as new_position
            FROM public.student_xp_rankings 
            WHERE class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)
              AND month_year = current_month
        )
        UPDATE public.student_xp_rankings sxr
        SET ranking_position = rs.new_position
        FROM ranked_students rs
        WHERE sxr.id = rs.id;
        
        INSERT INTO public.student_progress (
            student_id,
            class_id,
            grammar_score,
            vocabulary_score,
            listening_score,
            speaking_score,
            reading_score,
            writing_score,
            overall_score
        ) VALUES (
            NEW.student_id,
            (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id),
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' AND NEW.score = 100 THEN NEW.score ELSE 0 END,
            COALESCE((SELECT SUM(xp_points) FROM public.student_xp_rankings WHERE student_id = NEW.student_id AND class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)), 0) + xp_to_add
        )
        ON CONFLICT (student_id, class_id) 
        DO UPDATE SET
            grammar_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' AND NEW.score = 100
                THEN GREATEST(public.student_progress.grammar_score, NEW.score)
                ELSE public.student_progress.grammar_score 
            END,
            vocabulary_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' AND NEW.score = 100
                THEN GREATEST(public.student_progress.vocabulary_score, NEW.score)
                ELSE public.student_progress.vocabulary_score 
            END,
            listening_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' AND NEW.score = 100
                THEN GREATEST(public.student_progress.listening_score, NEW.score)
                ELSE public.student_progress.listening_score 
            END,
            speaking_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' AND NEW.score = 100
                THEN GREATEST(public.student_progress.speaking_score, NEW.score)
                ELSE public.student_progress.speaking_score 
            END,
            reading_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' AND NEW.score = 100
                THEN GREATEST(public.student_progress.reading_score, NEW.score)
                ELSE public.student_progress.reading_score 
            END,
            writing_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' AND NEW.score = 100
                THEN GREATEST(public.student_progress.writing_score, NEW.score)
                ELSE public.student_progress.writing_score 
            END,
            overall_score = COALESCE((SELECT SUM(xp_points) FROM public.student_xp_rankings WHERE student_id = NEW.student_id AND class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)), 0),
            updated_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$;

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
  level_multiplier NUMERIC;
BEGIN
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  SELECT e.class_id, e.level INTO class_id_var, exercise_level_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;
  
  IF class_id_var IS NOT NULL THEN
    SELECT c.level INTO class_level_var
    FROM public.classes c
    WHERE c.id = class_id_var;
    
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
        
        IF exercise_level_num <= class_level_num + 1 AND exercise_level_num > 0 THEN
          -- Unified multipliers
          level_multiplier := CASE exercise_level_var
            WHEN 'A1' THEN 1.5
            WHEN 'A2' THEN 1.7
            WHEN 'B1' THEN 2.0
            WHEN 'B2' THEN 2.2
            WHEN 'C1' THEN 2.4
            WHEN 'C2' THEN 2.5
            ELSE 1.5
          END;
          
          xp_to_add := ROUND(GREATEST(NEW.score, 0) * level_multiplier);
          
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
          
          WITH ranked_students AS (
            SELECT 
              student_id,
              class_id,
              month_year,
              ROW_NUMBER() OVER (ORDER BY xp_points DESC, updated_at ASC) as new_position
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

-- Attach triggers on exercise_attempts (if missing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'tr_exercise_attempt_xp') THEN
    CREATE TRIGGER tr_exercise_attempt_xp
    AFTER INSERT ON public.exercise_attempts
    FOR EACH ROW EXECUTE FUNCTION public.update_xp_rankings();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'tr_exercise_attempt_progress') THEN
    CREATE TRIGGER tr_exercise_attempt_progress
    AFTER INSERT ON public.exercise_attempts
    FOR EACH ROW EXECUTE FUNCTION public.update_student_progress();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'tr_exercise_attempt_student_xp') THEN
    CREATE TRIGGER tr_exercise_attempt_student_xp
    AFTER INSERT ON public.exercise_attempts
    FOR EACH ROW EXECUTE FUNCTION public.update_student_xp();
  END IF;
END$$;
