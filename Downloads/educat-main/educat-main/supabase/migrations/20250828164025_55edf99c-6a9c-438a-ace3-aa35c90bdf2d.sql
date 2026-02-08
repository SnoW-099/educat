-- Update the XP calculation function to be level-based and cumulative
CREATE OR REPLACE FUNCTION public.update_student_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    current_month TEXT;
    exercise_level_var TEXT;
    class_level_var TEXT;
    xp_to_add INTEGER;
    level_multiplier NUMERIC;
    existing_record_id UUID;
BEGIN
    -- Get current month in YYYY-MM format
    current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');
    
    -- Get exercise and class details
    SELECT e.level, e.class_id INTO exercise_level_var, existing_record_id
    FROM public.exercises e
    WHERE e.id = NEW.exercise_id;
    
    -- Get class level if exercise has class context
    IF existing_record_id IS NOT NULL THEN
        SELECT c.level INTO class_level_var
        FROM public.classes c
        WHERE c.id = existing_record_id;
    END IF;
    
    -- Determine XP multiplier based on exercise level
    level_multiplier := CASE exercise_level_var
        WHEN 'A1' THEN 1.0
        WHEN 'A2' THEN 1.2
        WHEN 'B1' THEN 1.5
        WHEN 'B2' THEN 1.8
        WHEN 'C1' THEN 2.2
        WHEN 'C2' THEN 2.5
        ELSE 1.0
    END;
    
    -- Calculate XP based on score and level multiplier
    -- Only give full XP if score is 100%, proportional otherwise
    xp_to_add := ROUND(NEW.score * level_multiplier);
    
    -- Only give XP if student is enrolled in a class and exercise has class context
    IF EXISTS (
        SELECT 1 FROM public.exercises e
        JOIN public.enrollments en ON en.class_id = e.class_id
        WHERE e.id = NEW.exercise_id 
        AND en.student_id = NEW.student_id 
        AND en.is_active = true
        AND e.class_id IS NOT NULL
    ) THEN
        -- Check if student already has XP record for this month/class
        SELECT id INTO existing_record_id
        FROM public.student_xp_rankings 
        WHERE student_id = NEW.student_id 
        AND class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)
        AND month_year = current_month;
        
        IF existing_record_id IS NOT NULL THEN
            -- Update existing record
            UPDATE public.student_xp_rankings 
            SET xp_points = xp_points + xp_to_add,
                updated_at = NOW()
            WHERE id = existing_record_id;
        ELSE
            -- Create new record
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
        
        -- Update rankings for this class/month
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
        
        -- Also update student progress with exercise type-specific scores
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
            -- Global score is cumulative XP from all time (sum of all monthly XP)
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
            -- Update cumulative global score
            overall_score = COALESCE((SELECT SUM(xp_points) FROM public.student_xp_rankings WHERE student_id = NEW.student_id AND class_id = (SELECT class_id FROM public.exercises WHERE id = NEW.exercise_id)), 0),
            updated_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$function$;