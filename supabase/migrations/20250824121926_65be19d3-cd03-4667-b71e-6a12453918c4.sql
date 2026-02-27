-- Fix the progress update function with correct PostgreSQL syntax

CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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