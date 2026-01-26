-- Add allow_answer_checking column to classes table
ALTER TABLE public.classes 
ADD COLUMN allow_answer_checking boolean NOT NULL DEFAULT false;

-- Update existing classes to allow answer checking by default for backwards compatibility
UPDATE public.classes 
SET allow_answer_checking = true 
WHERE allow_answer_checking IS NULL;