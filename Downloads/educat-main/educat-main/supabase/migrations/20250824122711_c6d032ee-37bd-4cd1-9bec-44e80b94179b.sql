-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  
  -- If student and has class_code, try to enroll in class
  IF NEW.raw_user_meta_data->>'role' = 'student' AND NEW.raw_user_meta_data->>'class_code' IS NOT NULL THEN
    INSERT INTO public.enrollments (student_id, class_id)
    SELECT NEW.id, classes.id
    FROM public.classes
    WHERE classes.code = NEW.raw_user_meta_data->>'class_code'
    AND classes.is_active = true
    LIMIT 1;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();