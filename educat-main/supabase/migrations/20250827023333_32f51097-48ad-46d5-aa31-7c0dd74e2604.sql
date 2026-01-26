-- Fix security issue: Add search_path to function
CREATE OR REPLACE FUNCTION update_student_xp()
RETURNS TRIGGER AS $$
DECLARE
    current_month TEXT;
    xp_to_add INTEGER;
    existing_record_id UUID;
BEGIN
    -- Get current month in YYYY-MM format
    current_month := TO_CHAR(CURRENT_DATE, 'YYYY-MM');
    
    -- Calculate XP based on score (score is already a percentage)
    -- Base XP: score itself, with bonus for high scores
    xp_to_add := CASE 
        WHEN NEW.score >= 90 THEN NEW.score + 20  -- Bonus for excellent performance
        WHEN NEW.score >= 80 THEN NEW.score + 10  -- Bonus for good performance
        WHEN NEW.score >= 70 THEN NEW.score + 5   -- Small bonus for passing
        ELSE NEW.score                              -- Base score for lower performance
    END;
    
    -- Only give XP if student is enrolled in a class and exercise has class context
    IF EXISTS (
        SELECT 1 FROM public.exercises e
        JOIN public.enrollments en ON en.class_id = e.class_id
        WHERE e.id = NEW.exercise_id 
        AND en.student_id = NEW.student_id 
        AND en.is_active = true
        AND e.class_id IS NOT NULL
    ) THEN
        -- Get the class_id from the exercise
        SELECT e.class_id INTO existing_record_id
        FROM public.exercises e 
        WHERE e.id = NEW.exercise_id;
        
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
        
        -- Also update student progress if it doesn't exist
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
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' THEN NEW.score ELSE 0 END,
            CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' THEN NEW.score ELSE 0 END,
            NEW.score
        )
        ON CONFLICT (student_id, class_id) 
        DO UPDATE SET
            grammar_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' 
                THEN GREATEST(public.student_progress.grammar_score, NEW.score)
                ELSE public.student_progress.grammar_score 
            END,
            vocabulary_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' 
                THEN GREATEST(public.student_progress.vocabulary_score, NEW.score)
                ELSE public.student_progress.vocabulary_score 
            END,
            listening_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' 
                THEN GREATEST(public.student_progress.listening_score, NEW.score)
                ELSE public.student_progress.listening_score 
            END,
            speaking_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' 
                THEN GREATEST(public.student_progress.speaking_score, NEW.score)
                ELSE public.student_progress.speaking_score 
            END,
            reading_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' 
                THEN GREATEST(public.student_progress.reading_score, NEW.score)
                ELSE public.student_progress.reading_score 
            END,
            writing_score = CASE 
                WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' 
                THEN GREATEST(public.student_progress.writing_score, NEW.score)
                ELSE public.student_progress.writing_score 
            END,
            overall_score = (
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' THEN NEW.score ELSE public.student_progress.grammar_score END,
                    0
                ) +
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' THEN NEW.score ELSE public.student_progress.vocabulary_score END,
                    0
                ) +
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' THEN NEW.score ELSE public.student_progress.listening_score END,
                    0
                ) +
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' THEN NEW.score ELSE public.student_progress.speaking_score END,
                    0
                ) +
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' THEN NEW.score ELSE public.student_progress.reading_score END,
                    0
                ) +
                GREATEST(
                    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' THEN NEW.score ELSE public.student_progress.writing_score END,
                    0
                )
            ) / 6.0,
            updated_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;