-- Add essay review functionality and multi-level access
-- Add column to classes table for allowing multi-level exercises
ALTER TABLE public.classes 
ADD COLUMN allow_all_levels boolean NOT NULL DEFAULT false;

-- Create table for manual essay reviews
CREATE TABLE public.essay_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_attempt_id uuid NOT NULL,
  student_id uuid NOT NULL,
  professor_id uuid NOT NULL,
  class_id uuid NOT NULL,
  essay_text text NOT NULL,
  professor_feedback text,
  score numeric,
  status text NOT NULL DEFAULT 'pending',
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.essay_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for essay reviews
CREATE POLICY "Students can view their own essay reviews" 
ON public.essay_reviews 
FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Professors can manage essay reviews in their classes" 
ON public.essay_reviews 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM classes 
    WHERE classes.id = essay_reviews.class_id 
    AND classes.professor_id = auth.uid()
  )
);

-- Create index for better performance
CREATE INDEX idx_essay_reviews_class_status ON public.essay_reviews(class_id, status);
CREATE INDEX idx_essay_reviews_student ON public.essay_reviews(student_id);

-- Add trigger for updating timestamp
CREATE TRIGGER update_essay_reviews_updated_at
BEFORE UPDATE ON public.essay_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();