-- Allow professors to view profiles of students enrolled in their classes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'profiles' 
      AND policyname = 'Professors can view their students profiles'
  ) THEN
    CREATE POLICY "Professors can view their students profiles"
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    USING (
      EXISTS (
        SELECT 1 
        FROM classes c
        JOIN enrollments e ON e.class_id = c.id
        WHERE c.professor_id = auth.uid()
          AND e.student_id = profiles.user_id
          AND e.is_active = true
      )
    );
  END IF;
END $$;