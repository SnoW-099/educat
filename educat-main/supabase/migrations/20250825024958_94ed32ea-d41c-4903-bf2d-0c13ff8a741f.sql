-- Add class limit validation trigger for professors
CREATE OR REPLACE FUNCTION public.check_professor_class_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Create trigger for class limit check
DROP TRIGGER IF EXISTS check_class_limit_trigger ON public.classes;
CREATE TRIGGER check_class_limit_trigger
    BEFORE INSERT ON public.classes
    FOR EACH ROW
    EXECUTE FUNCTION public.check_professor_class_limit();

-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.profiles 
ADD CONSTRAINT unique_email 
UNIQUE (email);