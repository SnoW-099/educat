-- Create user_roles table (app_role enum already exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing function if exists
DROP FUNCTION IF EXISTS public.has_role(UUID, app_role);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- RLS policy: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Drop existing function if exists
DROP FUNCTION IF EXISTS public.create_admin_user(TEXT, TEXT);

-- Function to create admin user
CREATE OR REPLACE FUNCTION public.create_admin_user(admin_email TEXT, admin_name TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert the admin role for the user if profile exists
  INSERT INTO public.user_roles (user_id, role)
  SELECT user_id, 'admin'::app_role
  FROM public.profiles
  WHERE email = admin_email
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'Admin role assigned to user with email: %', admin_email;
END;
$$;