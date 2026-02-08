-- Prevent duplicate XP gains for repeated exercises
CREATE OR REPLACE FUNCTION public.prevent_duplicate_xp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    existing_attempts INTEGER;
    exercise_score INTEGER;
BEGIN
    -- Check if student has already completed this exercise with 100% score
    SELECT COUNT(*), MAX(score) INTO existing_attempts, exercise_score
    FROM public.exercise_attempts 
    WHERE student_id = NEW.student_id 
      AND exercise_id = NEW.exercise_id;
    
    -- If student already has a perfect score (100%), prevent XP gain
    IF exercise_score = 100 THEN
        -- Allow the attempt but mark it as no XP gain
        NEW.score := LEAST(NEW.score, 99); -- Cap at 99% to prevent XP
    END IF;
    
    RETURN NEW;
END;
$function$;

-- Create trigger to prevent duplicate XP
DROP TRIGGER IF EXISTS prevent_duplicate_xp_trigger ON public.exercise_attempts;
CREATE TRIGGER prevent_duplicate_xp_trigger
    BEFORE INSERT ON public.exercise_attempts
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_duplicate_xp();