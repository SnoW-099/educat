-- Enable INSERT/UPDATE on student_xp_rankings table for authenticated users
-- First update RLS policies

-- Allow authenticated users to insert their own XP records
CREATE POLICY "Students can insert their own XP records" 
ON public.student_xp_rankings 
FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- Allow authenticated users to update their own XP records
CREATE POLICY "Students can update their own XP records" 
ON public.student_xp_rankings 
FOR UPDATE 
USING (auth.uid() = student_id);