-- Fix foreign key relationships without realtime publication conflicts
-- Create foreign key constraint for student_xp_rankings to profiles
ALTER TABLE public.student_xp_rankings 
DROP CONSTRAINT IF EXISTS student_xp_rankings_student_id_fkey;

ALTER TABLE public.student_xp_rankings 
ADD CONSTRAINT student_xp_rankings_student_id_fkey 
FOREIGN KEY (student_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create foreign key constraint for student_progress to profiles
ALTER TABLE public.student_progress 
DROP CONSTRAINT IF EXISTS student_progress_student_id_fkey;

ALTER TABLE public.student_progress 
ADD CONSTRAINT student_progress_student_id_fkey 
FOREIGN KEY (student_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create foreign key constraint for enrollments to profiles
ALTER TABLE public.enrollments 
DROP CONSTRAINT IF EXISTS enrollments_student_id_fkey;

ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_student_id_fkey 
FOREIGN KEY (student_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create foreign key constraint for exercise_attempts to profiles
ALTER TABLE public.exercise_attempts 
DROP CONSTRAINT IF EXISTS exercise_attempts_student_id_fkey;

ALTER TABLE public.exercise_attempts 
ADD CONSTRAINT exercise_attempts_student_id_fkey 
FOREIGN KEY (student_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create foreign key constraint for chat_messages to profiles
ALTER TABLE public.chat_messages 
DROP CONSTRAINT IF EXISTS chat_messages_sender_id_fkey;

ALTER TABLE public.chat_messages 
ADD CONSTRAINT chat_messages_sender_id_fkey 
FOREIGN KEY (sender_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create foreign key constraint for message_reactions to profiles
ALTER TABLE public.message_reactions 
DROP CONSTRAINT IF EXISTS message_reactions_user_id_fkey;

ALTER TABLE public.message_reactions 
ADD CONSTRAINT message_reactions_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_xp_rankings_class_month ON public.student_xp_rankings(class_id, month_year);
CREATE INDEX IF NOT EXISTS idx_student_progress_student_class ON public.student_progress(student_id, class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_active ON public.enrollments(class_id, is_active);
CREATE INDEX IF NOT EXISTS idx_chat_messages_class_created ON public.chat_messages(class_id, created_at);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_student_exercise ON public.exercise_attempts(student_id, exercise_id);

-- Enable realtime for enrollments only (chat_messages already enabled)
ALTER TABLE public.enrollments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;