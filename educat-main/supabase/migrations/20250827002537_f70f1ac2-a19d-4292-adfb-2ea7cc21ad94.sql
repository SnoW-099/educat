-- Fix foreign key relationship for student_xp_rankings to reference user_id instead of non-existent student_id
-- and create missing indexes for better performance

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

-- Enable realtime for chat_messages
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Enable realtime for enrollments
ALTER TABLE public.enrollments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;

-- Create function to update student progress based on exercise attempts
CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update student progress after a new exercise attempt
  INSERT INTO public.student_progress (student_id, class_id, grammar_score, vocabulary_score, reading_score, writing_score, listening_score, speaking_score, overall_score, level_progress)
  SELECT 
    NEW.student_id,
    COALESCE(e.class_id, (SELECT class_id FROM enrollments WHERE student_id = NEW.student_id AND is_active = true LIMIT 1)),
    COALESCE(AVG(CASE WHEN e.type = 'grammar' THEN ea.score END), 0) as grammar_score,
    COALESCE(AVG(CASE WHEN e.type = 'vocabulary' THEN ea.score END), 0) as vocabulary_score,
    COALESCE(AVG(CASE WHEN e.type = 'reading' THEN ea.score END), 0) as reading_score,
    COALESCE(AVG(CASE WHEN e.type = 'writing' THEN ea.score END), 0) as writing_score,
    COALESCE(AVG(CASE WHEN e.type = 'listening' THEN ea.score END), 0) as listening_score,
    COALESCE(AVG(CASE WHEN e.type = 'speaking' THEN ea.score END), 0) as speaking_score,
    COALESCE(AVG(ea.score), 0) as overall_score,
    COALESCE(AVG(ea.score), 0) as level_progress
  FROM public.exercise_attempts ea
  JOIN public.exercises e ON e.id = ea.exercise_id
  WHERE ea.student_id = NEW.student_id
  GROUP BY ea.student_id, e.class_id
  ON CONFLICT (student_id, class_id) 
  DO UPDATE SET
    grammar_score = EXCLUDED.grammar_score,
    vocabulary_score = EXCLUDED.vocabulary_score,
    reading_score = EXCLUDED.reading_score,
    writing_score = EXCLUDED.writing_score,
    listening_score = EXCLUDED.listening_score,
    speaking_score = EXCLUDED.speaking_score,
    overall_score = EXCLUDED.overall_score,
    level_progress = EXCLUDED.level_progress,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic progress updates
DROP TRIGGER IF EXISTS trigger_update_student_progress ON public.exercise_attempts;
CREATE TRIGGER trigger_update_student_progress
AFTER INSERT ON public.exercise_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_student_progress();

-- Create function to update XP rankings
CREATE OR REPLACE FUNCTION public.update_xp_rankings()
RETURNS TRIGGER AS $$
DECLARE
  current_month text;
  class_record record;
BEGIN
  current_month := to_char(now(), 'YYYY-MM');
  
  -- Get class from the exercise attempt
  SELECT e.class_id INTO class_record
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;
  
  -- Update XP rankings
  IF class_record.class_id IS NOT NULL THEN
    INSERT INTO public.student_xp_rankings (student_id, class_id, month_year, xp_points)
    VALUES (NEW.student_id, class_record.class_id, current_month, GREATEST(NEW.score::integer, 0))
    ON CONFLICT (student_id, class_id, month_year)
    DO UPDATE SET
      xp_points = student_xp_rankings.xp_points + GREATEST(NEW.score::integer, 0),
      updated_at = now();
      
    -- Update ranking positions
    WITH ranked_students AS (
      SELECT student_id, 
             ROW_NUMBER() OVER (ORDER BY xp_points DESC) as new_position
      FROM public.student_xp_rankings
      WHERE class_id = class_record.class_id 
      AND month_year = current_month
    )
    UPDATE public.student_xp_rankings
    SET ranking_position = ranked_students.new_position
    FROM ranked_students
    WHERE student_xp_rankings.student_id = ranked_students.student_id
    AND student_xp_rankings.class_id = class_record.class_id
    AND student_xp_rankings.month_year = current_month;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic XP updates
DROP TRIGGER IF EXISTS trigger_update_xp_rankings ON public.exercise_attempts;
CREATE TRIGGER trigger_update_xp_rankings
AFTER INSERT ON public.exercise_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_xp_rankings();