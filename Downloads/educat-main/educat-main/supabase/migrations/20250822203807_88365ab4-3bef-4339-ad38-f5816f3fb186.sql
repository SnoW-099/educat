-- Fix security issues: Set proper search paths for functions

-- Drop existing functions to recreate with proper search paths
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP FUNCTION IF EXISTS public.update_student_progress();

-- Recreate function to update timestamps with proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate function to calculate and update student progress with proper search path
CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  class_record RECORD;
  exercise_type TEXT;
BEGIN
  -- Get the exercise type and class
  SELECT e.type, c.* INTO exercise_type, class_record
  FROM public.exercises e
  JOIN public.classes c ON c.id = e.class_id
  WHERE e.id = NEW.exercise_id;

  -- Only proceed if we found a class
  IF class_record.id IS NOT NULL THEN
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
      class_record.id,
      CASE WHEN exercise_type = 'grammar' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type = 'vocabulary' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type = 'listening' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type = 'speaking' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type = 'reading' THEN NEW.score ELSE 0 END,
      CASE WHEN exercise_type = 'writing' THEN NEW.score ELSE 0 END
    ) 
    ON CONFLICT (student_id, class_id) 
    DO UPDATE SET
      grammar_score = CASE 
        WHEN exercise_type = 'grammar' 
        THEN GREATEST(public.student_progress.grammar_score, NEW.score)
        ELSE public.student_progress.grammar_score
      END,
      vocabulary_score = CASE 
        WHEN exercise_type = 'vocabulary' 
        THEN GREATEST(public.student_progress.vocabulary_score, NEW.score)
        ELSE public.student_progress.vocabulary_score
      END,
      listening_score = CASE 
        WHEN exercise_type = 'listening' 
        THEN GREATEST(public.student_progress.listening_score, NEW.score)
        ELSE public.student_progress.listening_score
      END,
      speaking_score = CASE 
        WHEN exercise_type = 'speaking' 
        THEN GREATEST(public.student_progress.speaking_score, NEW.score)
        ELSE public.student_progress.speaking_score
      END,
      reading_score = CASE 
        WHEN exercise_type = 'reading' 
        THEN GREATEST(public.student_progress.reading_score, NEW.score)
        ELSE public.student_progress.reading_score
      END,
      writing_score = CASE 
        WHEN exercise_type = 'writing' 
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