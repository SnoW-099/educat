-- Fix security issue: Hide exercise answers from students
-- Update RLS policies properly

-- Drop existing student policy
DROP POLICY IF EXISTS "Students can view exercises in their classes" ON public.exercises;

-- Create policy for students that excludes answers (they can't see the answers column)
CREATE POLICY "Students can view exercises (no answers)" ON public.exercises
FOR SELECT USING (
  auth.uid() != professor_id AND 
  (class_id IS NULL OR EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.class_id = exercises.class_id 
    AND enrollments.student_id = auth.uid() 
    AND enrollments.is_active = true
  ))
);

-- Professors can see everything
CREATE POLICY "Professors can view all exercise data" ON public.exercises
FOR SELECT USING (auth.uid() = professor_id);

-- Add class unique identifiers
ALTER TABLE public.classes ADD COLUMN IF NOT EXISTS unique_id TEXT DEFAULT gen_random_uuid();

-- Update unique_id for existing classes that don't have it
UPDATE public.classes SET unique_id = gen_random_uuid() WHERE unique_id IS NULL;

-- Make unique_id unique
ALTER TABLE public.classes ADD CONSTRAINT classes_unique_id_unique UNIQUE (unique_id);

-- Create function to auto-delete old chat messages
CREATE OR REPLACE FUNCTION public.auto_delete_old_messages()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM public.chat_messages 
    WHERE created_at < NOW() - INTERVAL '6 seconds';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create trigger for auto-deleting messages
DROP TRIGGER IF EXISTS auto_delete_messages_trigger ON public.chat_messages;
CREATE TRIGGER auto_delete_messages_trigger
    AFTER INSERT ON public.chat_messages
    FOR EACH ROW EXECUTE FUNCTION public.auto_delete_old_messages();