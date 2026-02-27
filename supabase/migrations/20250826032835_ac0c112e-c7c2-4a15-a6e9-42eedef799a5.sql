-- Fix foreign key relationships that are missing

-- Add foreign key for enrollments to profiles
ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_student_id_fkey 
FOREIGN KEY (student_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for student_xp_rankings to profiles  
ALTER TABLE public.student_xp_rankings 
ADD CONSTRAINT student_xp_rankings_student_id_fkey 
FOREIGN KEY (student_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for chat_messages to profiles
ALTER TABLE public.chat_messages 
ADD CONSTRAINT chat_messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for exercise_attempts to profiles
ALTER TABLE public.exercise_attempts 
ADD CONSTRAINT exercise_attempts_student_id_fkey 
FOREIGN KEY (student_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for student_progress to profiles
ALTER TABLE public.student_progress 
ADD CONSTRAINT student_progress_student_id_fkey 
FOREIGN KEY (student_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key relationships to classes table
ALTER TABLE public.classes 
ADD CONSTRAINT classes_professor_id_fkey 
FOREIGN KEY (professor_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for enrollments to classes
ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_class_id_fkey 
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE;

-- Add foreign key for student_xp_rankings to classes
ALTER TABLE public.student_xp_rankings 
ADD CONSTRAINT student_xp_rankings_class_id_fkey 
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE;

-- Add foreign key for student_progress to classes  
ALTER TABLE public.student_progress 
ADD CONSTRAINT student_progress_class_id_fkey 
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE;

-- Add foreign key for exercises to classes
ALTER TABLE public.exercises 
ADD CONSTRAINT exercises_class_id_fkey 
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL;

-- Add foreign key for exercises to profiles (professor)
ALTER TABLE public.exercises 
ADD CONSTRAINT exercises_professor_id_fkey 
FOREIGN KEY (professor_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key for chat_messages to classes
ALTER TABLE public.chat_messages 
ADD CONSTRAINT chat_messages_class_id_fkey 
FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE;

-- Add foreign key for exercise_attempts to exercises
ALTER TABLE public.exercise_attempts 
ADD CONSTRAINT exercise_attempts_exercise_id_fkey 
FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;

-- Add foreign key for message_reactions to chat_messages
ALTER TABLE public.message_reactions 
ADD CONSTRAINT message_reactions_message_id_fkey 
FOREIGN KEY (message_id) REFERENCES public.chat_messages(id) ON DELETE CASCADE;

-- Add foreign key for message_reactions to profiles
ALTER TABLE public.message_reactions 
ADD CONSTRAINT message_reactions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;