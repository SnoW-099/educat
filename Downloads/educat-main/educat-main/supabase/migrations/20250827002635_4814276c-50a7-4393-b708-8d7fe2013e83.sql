-- Just fix the foreign keys without realtime conflicts
-- Create foreign key constraint for student_xp_rankings to profiles
ALTER TABLE public.student_xp_rankings 
DROP CONSTRAINT IF EXISTS student_xp_rankings_student_id_fkey;

ALTER TABLE public.student_xp_rankings 
ADD CONSTRAINT student_xp_rankings_student_id_fkey 
FOREIGN KEY (student_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_xp_rankings_class_month ON public.student_xp_rankings(class_id, month_year);
CREATE INDEX IF NOT EXISTS idx_student_progress_student_class ON public.student_progress(student_id, class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_active ON public.enrollments(class_id, is_active);
CREATE INDEX IF NOT EXISTS idx_chat_messages_class_created ON public.chat_messages(class_id, created_at);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_student_exercise ON public.exercise_attempts(student_id, exercise_id);