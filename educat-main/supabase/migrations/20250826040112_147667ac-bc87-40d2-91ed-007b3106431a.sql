-- Fix the search path for existing functions to resolve security warning
-- Update all functions to have proper search_path

ALTER FUNCTION public.is_professor_of_class(_user_id uuid, _class_id uuid) SET search_path = public;
ALTER FUNCTION public.generate_unique_class_code() SET search_path = public;
ALTER FUNCTION public.check_enrollment_limit() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.set_class_code() SET search_path = public;
ALTER FUNCTION public.update_xp_rankings() SET search_path = public;
ALTER FUNCTION public.check_professor_class_limit() SET search_path = public;
ALTER FUNCTION public.reset_monthly_rankings() SET search_path = public;
ALTER FUNCTION public.has_role(_user_id uuid, _role app_role) SET search_path = public;
ALTER FUNCTION public.prevent_role_changes() SET search_path = public;
ALTER FUNCTION public.update_student_progress() SET search_path = public;