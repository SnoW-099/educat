-- Update class code generation function to use 3 letters + 4 numbers format
CREATE OR REPLACE FUNCTION public.generate_unique_class_code()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

-- Update classes table to increase max_students default to 50
ALTER TABLE public.classes ALTER COLUMN max_students SET DEFAULT 50;

-- Add unique constraint on profiles email to prevent duplicates
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);

-- Create storage bucket for class images
INSERT INTO storage.buckets (id, name, public) VALUES ('class-images', 'class-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for class images
CREATE POLICY "Anyone can view class images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'class-images');

CREATE POLICY "Professors can upload class images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'class-images' 
  AND auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'professor'
  )
);

CREATE POLICY "Professors can update class images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'class-images' 
  AND auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'professor'
  )
);

CREATE POLICY "Professors can delete class images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'class-images' 
  AND auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'professor'
  )
);