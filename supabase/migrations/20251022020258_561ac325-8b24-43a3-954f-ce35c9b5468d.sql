-- Add RLS policy to allow students to view profiles of other students in their class
CREATE POLICY "Students can view profiles of classmates"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.enrollments e1
    JOIN public.enrollments e2 ON e1.class_id = e2.class_id
    WHERE e1.student_id = auth.uid()
      AND e2.student_id = profiles.user_id
      AND e1.is_active = true
      AND e2.is_active = true
  )
);