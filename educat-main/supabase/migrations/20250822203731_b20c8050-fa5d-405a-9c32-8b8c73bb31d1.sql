-- EduCat Database Schema Migration
-- Comprehensive setup for Catalan learning platform

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('professor', 'student')) DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL UNIQUE,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  professor_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  chat_permissions TEXT NOT NULL CHECK (chat_permissions IN ('professor_only', 'all')) DEFAULT 'all',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student enrollments table
CREATE TABLE public.enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(student_id, class_id)
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing')),
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  content JSONB NOT NULL,
  answers JSONB NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  is_exam BOOLEAN NOT NULL DEFAULT false,
  max_attempts INTEGER DEFAULT NULL,
  anti_cheat_enabled BOOLEAN NOT NULL DEFAULT false,
  time_limit INTEGER, -- minutes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exercise attempts table
CREATE TABLE public.exercise_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attempt_number INTEGER NOT NULL DEFAULT 1,
  time_taken INTEGER, -- seconds
  cheating_detected BOOLEAN DEFAULT false
);

-- Create progress tracking table
CREATE TABLE public.student_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  grammar_score NUMERIC(5,2) DEFAULT 0,
  vocabulary_score NUMERIC(5,2) DEFAULT 0,
  listening_score NUMERIC(5,2) DEFAULT 0,
  speaking_score NUMERIC(5,2) DEFAULT 0,
  reading_score NUMERIC(5,2) DEFAULT 0,
  writing_score NUMERIC(5,2) DEFAULT 0,
  overall_score NUMERIC(5,2) DEFAULT 0,
  level_progress NUMERIC(5,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, class_id)
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('text', 'file', 'announcement')) DEFAULT 'text',
  file_url TEXT,
  file_name TEXT,
  reply_to UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  is_announcement BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create message reactions table
CREATE TABLE public.message_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for classes
CREATE POLICY "Professors can manage their classes" ON public.classes
  FOR ALL USING (auth.uid() = professor_id);

CREATE POLICY "Students can view their enrolled classes" ON public.classes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.enrollments 
      WHERE enrollments.class_id = classes.id 
      AND enrollments.student_id = auth.uid() 
      AND enrollments.is_active = true
    )
  );

-- RLS Policies for enrollments
CREATE POLICY "Professors can manage enrollments in their classes" ON public.enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = enrollments.class_id 
      AND classes.professor_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = student_id);

-- RLS Policies for exercises
CREATE POLICY "Professors can manage exercises in their classes" ON public.exercises
  FOR ALL USING (auth.uid() = professor_id);

CREATE POLICY "Students can view exercises in their classes" ON public.exercises
  FOR SELECT USING (
    class_id IS NULL OR 
    EXISTS (
      SELECT 1 FROM public.enrollments 
      WHERE enrollments.class_id = exercises.class_id 
      AND enrollments.student_id = auth.uid() 
      AND enrollments.is_active = true
    )
  );

-- RLS Policies for exercise attempts
CREATE POLICY "Students can manage their own attempts" ON public.exercise_attempts
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Professors can view attempts in their exercises" ON public.exercise_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.exercises 
      WHERE exercises.id = exercise_attempts.exercise_id 
      AND exercises.professor_id = auth.uid()
    )
  );

-- RLS Policies for student progress
CREATE POLICY "Students can view their own progress" ON public.student_progress
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Professors can view progress in their classes" ON public.student_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = student_progress.class_id 
      AND classes.professor_id = auth.uid()
    )
  );

CREATE POLICY "System can update progress" ON public.student_progress
  FOR ALL USING (true);

-- RLS Policies for chat messages
CREATE POLICY "Class members can view messages" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = chat_messages.class_id 
      AND (
        classes.professor_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.enrollments 
          WHERE enrollments.class_id = classes.id 
          AND enrollments.student_id = auth.uid() 
          AND enrollments.is_active = true
        )
      )
    )
  );

CREATE POLICY "Class members can send messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = chat_messages.class_id 
      AND (
        classes.professor_id = auth.uid() OR
        (classes.chat_permissions = 'all' AND EXISTS (
          SELECT 1 FROM public.enrollments 
          WHERE enrollments.class_id = classes.id 
          AND enrollments.student_id = auth.uid() 
          AND enrollments.is_active = true
        ))
      )
    )
  );

CREATE POLICY "Users can update their own messages" ON public.chat_messages
  FOR UPDATE USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own messages" ON public.chat_messages
  FOR DELETE USING (auth.uid() = sender_id);

-- RLS Policies for message reactions
CREATE POLICY "Class members can manage reactions" ON public.message_reactions
  FOR ALL USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.chat_messages cm
      JOIN public.classes c ON c.id = cm.class_id
      WHERE cm.id = message_reactions.message_id 
      AND (
        c.professor_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.enrollments e
          WHERE e.class_id = c.id 
          AND e.student_id = auth.uid() 
          AND e.is_active = true
        )
      )
    )
  );

-- Create indexes for performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_classes_professor_id ON public.classes(professor_id);
CREATE INDEX idx_classes_code ON public.classes(code);
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_class_id ON public.enrollments(class_id);
CREATE INDEX idx_exercises_class_id ON public.exercises(class_id);
CREATE INDEX idx_exercises_professor_id ON public.exercises(professor_id);
CREATE INDEX idx_exercises_level ON public.exercises(level);
CREATE INDEX idx_exercise_attempts_exercise_id ON public.exercise_attempts(exercise_id);
CREATE INDEX idx_exercise_attempts_student_id ON public.exercise_attempts(student_id);
CREATE INDEX idx_student_progress_student_id ON public.student_progress(student_id);
CREATE INDEX idx_student_progress_class_id ON public.student_progress(class_id);
CREATE INDEX idx_chat_messages_class_id ON public.chat_messages(class_id);
CREATE INDEX idx_chat_messages_sender_id ON public.chat_messages(sender_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX idx_message_reactions_message_id ON public.message_reactions(message_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON public.classes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
  BEFORE UPDATE ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate and update student progress
CREATE OR REPLACE FUNCTION public.update_student_progress()
RETURNS TRIGGER AS $$
DECLARE
  class_record RECORD;
  progress_record public.student_progress%ROWTYPE;
BEGIN
  -- Get the class for this exercise
  SELECT c.* INTO class_record
  FROM public.exercises e
  JOIN public.classes c ON c.id = e.class_id
  WHERE e.id = NEW.exercise_id;

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
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' THEN NEW.score ELSE 0 END,
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' THEN NEW.score ELSE 0 END,
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' THEN NEW.score ELSE 0 END,
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' THEN NEW.score ELSE 0 END,
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' THEN NEW.score ELSE 0 END,
    CASE WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' THEN NEW.score ELSE 0 END
  ) 
  ON CONFLICT (student_id, class_id) 
  DO UPDATE SET
    grammar_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'grammar' 
      THEN GREATEST(public.student_progress.grammar_score, NEW.score)
      ELSE public.student_progress.grammar_score
    END,
    vocabulary_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'vocabulary' 
      THEN GREATEST(public.student_progress.vocabulary_score, NEW.score)
      ELSE public.student_progress.vocabulary_score
    END,
    listening_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'listening' 
      THEN GREATEST(public.student_progress.listening_score, NEW.score)
      ELSE public.student_progress.listening_score
    END,
    speaking_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'speaking' 
      THEN GREATEST(public.student_progress.speaking_score, NEW.score)
      ELSE public.student_progress.speaking_score
    END,
    reading_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'reading' 
      THEN GREATEST(public.student_progress.reading_score, NEW.score)
      ELSE public.student_progress.reading_score
    END,
    writing_score = CASE 
      WHEN (SELECT type FROM public.exercises WHERE id = NEW.exercise_id) = 'writing' 
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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update progress after exercise completion
CREATE TRIGGER trigger_update_student_progress
  AFTER INSERT ON public.exercise_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_student_progress();

-- Enable real-time updates for chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;