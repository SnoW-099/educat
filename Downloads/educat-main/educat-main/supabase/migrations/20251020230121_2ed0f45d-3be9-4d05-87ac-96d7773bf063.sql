-- Allow students to view professor profiles when searching for classes
CREATE POLICY "Students can view professor profiles for class enrollment"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  role = 'professor' AND
  EXISTS (
    SELECT 1 FROM public.classes
    WHERE classes.professor_id = profiles.user_id
    AND classes.is_active = true
  )
);