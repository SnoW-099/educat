-- Allow students to join classes (insert their own enrollment)
CREATE POLICY "Students can join classes"
ON public.enrollments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = student_id AND
  EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id 
    AND is_active = true
  )
);

-- Allow students to update their own enrollments (for leaving/changing classes)
CREATE POLICY "Students can update their own enrollments"
ON public.enrollments
FOR UPDATE
TO authenticated
USING (auth.uid() = student_id)
WITH CHECK (auth.uid() = student_id);