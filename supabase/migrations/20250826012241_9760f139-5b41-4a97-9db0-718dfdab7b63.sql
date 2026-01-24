-- Fix class code generation to use 3 letters + 4 numbers format
DROP FUNCTION IF EXISTS public.generate_unique_class_code();

CREATE OR REPLACE FUNCTION public.generate_unique_class_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_code TEXT;
    code_exists BOOLEAN;
    letters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
BEGIN
    LOOP
        -- Generate a code with 3 random letters + 4 random digits
        new_code := 
            SUBSTR(letters, FLOOR(RANDOM() * 26 + 1)::INT, 1) ||
            SUBSTR(letters, FLOOR(RANDOM() * 26 + 1)::INT, 1) ||
            SUBSTR(letters, FLOOR(RANDOM() * 26 + 1)::INT, 1) ||
            LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM public.classes WHERE code = new_code) INTO code_exists;
        
        -- If code doesn't exist, we can use it
        IF NOT code_exists THEN
            RETURN new_code;
        END IF;
    END LOOP;
END;
$$;

-- Update class code trigger to use new format
DROP TRIGGER IF EXISTS auto_set_class_code ON public.classes;

CREATE OR REPLACE FUNCTION public.set_class_code()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    -- If no code provided, generate one
    IF NEW.code IS NULL OR NEW.code = '' THEN
        NEW.code := public.generate_unique_class_code();
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER auto_set_class_code
    BEFORE INSERT ON public.classes
    FOR EACH ROW
    EXECUTE FUNCTION public.set_class_code();

-- Add auto-delete for chat messages (5-7 seconds)
CREATE OR REPLACE FUNCTION public.auto_delete_old_messages()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Delete messages older than 6 seconds
    DELETE FROM public.chat_messages 
    WHERE created_at < NOW() - INTERVAL '6 seconds';
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER auto_delete_messages
    AFTER INSERT ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_delete_old_messages();

-- Ensure 50 student limit per class
ALTER TABLE public.classes 
ALTER COLUMN max_students SET DEFAULT 50;

-- Add constraint to enforce max 50 students
CREATE OR REPLACE FUNCTION public.check_enrollment_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE TRIGGER check_enrollment_limit
    BEFORE INSERT ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION public.check_enrollment_limit();