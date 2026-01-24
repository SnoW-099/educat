-- Create XP ranking table for monthly rankings
CREATE TABLE public.student_xp_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  class_id UUID NOT NULL,
  xp_points INTEGER NOT NULL DEFAULT 0,
  month_year TEXT NOT NULL, -- Format: YYYY-MM
  ranking_position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(student_id, class_id, month_year)
);

-- Enable RLS
ALTER TABLE public.student_xp_rankings ENABLE ROW LEVEL SECURITY;

-- Create policies for XP rankings
CREATE POLICY "Class members can view rankings" 
ON public.student_xp_rankings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.classes c
    WHERE c.id = student_xp_rankings.class_id 
    AND (
      c.professor_id = auth.uid() 
      OR EXISTS (
        SELECT 1 FROM public.enrollments e
        WHERE e.class_id = c.id 
        AND e.student_id = auth.uid() 
        AND e.is_active = true
      )
    )
  )
);

CREATE POLICY "System can manage rankings" 
ON public.student_xp_rankings 
FOR ALL 
USING (true);

-- Function to update XP rankings
CREATE OR REPLACE FUNCTION public.update_xp_rankings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_month TEXT;
  class_id_var UUID;
BEGIN
  -- Get current month in YYYY-MM format
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Get class_id from the exercise
  SELECT e.class_id INTO class_id_var
  FROM public.exercises e
  WHERE e.id = NEW.exercise_id;
  
  -- Only proceed if exercise has a class
  IF class_id_var IS NOT NULL THEN
    -- Insert or update XP for this student in this month
    INSERT INTO public.student_xp_rankings (
      student_id, 
      class_id,
      xp_points,
      month_year
    ) VALUES (
      NEW.student_id,
      class_id_var,
      GREATEST(NEW.score, 0) * 10, -- Convert score to XP (score * 10)
      current_month
    )
    ON CONFLICT (student_id, class_id, month_year) 
    DO UPDATE SET
      xp_points = student_xp_rankings.xp_points + (GREATEST(NEW.score, 0) * 10),
      updated_at = NOW();
    
    -- Update rankings for the class and month
    WITH ranked_students AS (
      SELECT 
        student_id,
        class_id,
        month_year,
        ROW_NUMBER() OVER (ORDER BY xp_points DESC) as new_position
      FROM public.student_xp_rankings
      WHERE class_id = class_id_var AND month_year = current_month
    )
    UPDATE public.student_xp_rankings
    SET ranking_position = ranked_students.new_position
    FROM ranked_students
    WHERE public.student_xp_rankings.student_id = ranked_students.student_id
      AND public.student_xp_rankings.class_id = ranked_students.class_id
      AND public.student_xp_rankings.month_year = ranked_students.month_year;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for XP rankings
CREATE TRIGGER update_xp_rankings_trigger
AFTER INSERT ON public.exercise_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_xp_rankings();

-- Function to reset monthly rankings (can be called monthly)
CREATE OR REPLACE FUNCTION public.reset_monthly_rankings()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  previous_month TEXT;
BEGIN
  -- Get previous month in YYYY-MM format
  previous_month := TO_CHAR(NOW() - INTERVAL '1 month', 'YYYY-MM');
  
  -- Archive previous month data (optional - for historical purposes)
  -- You could move old data to an archive table here
  
  -- Note: Current month data stays, new month will start fresh
  -- The rankings are automatically maintained per month
END;
$$;