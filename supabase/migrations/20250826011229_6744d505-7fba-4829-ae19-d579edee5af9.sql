-- Create a SECURITY DEFINER function to avoid recursive RLS checks
CREATE OR REPLACE FUNCTION public.is_professor_of_class(_user_id uuid, _class_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.classes c
    WHERE c.id = _class_id AND c.professor_id = _user_id
  );
$$;

-- Safely replace the enrollments policy that referenced classes directly
DROP POLICY IF EXISTS "Professors can manage enrollments in their classes" ON public.enrollments;

-- Recreate policy using the definer function to break recursion
CREATE POLICY "Professors can manage enrollments in their classes"
ON public.enrollments
FOR ALL
TO authenticated
USING (
  public.is_professor_of_class(auth.uid(), class_id)
)
WITH CHECK (
  public.is_professor_of_class(auth.uid(), class_id)
);

-- Ensure existing student view policy remains (idempotent safety)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'enrollments' 
      AND policyname = 'Students can view their own enrollments'
  ) THEN
    CREATE POLICY "Students can view their own enrollments"
    ON public.enrollments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);
  END IF;
END $$;
