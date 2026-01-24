-- Add policy to allow students to search for classes by code
-- This allows students to view a class when they have the code to join it
CREATE POLICY "Anyone can view classes by code for joining"
ON public.classes
FOR SELECT
TO authenticated
USING (
  is_active = true
);