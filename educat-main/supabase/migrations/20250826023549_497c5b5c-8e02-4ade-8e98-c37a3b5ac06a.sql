-- Fix remaining security warnings

-- Fix search_path for the two functions that still have mutable search_path
CREATE OR REPLACE FUNCTION public.set_class_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- If no code provided, generate one
    IF NEW.code IS NULL OR NEW.code = '' THEN
        NEW.code := public.generate_unique_class_code();
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.reset_monthly_rankings()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  previous_month TEXT;
BEGIN
  -- Get previous month in YYYY-MM format
  previous_month := TO_CHAR(NOW() - INTERVAL '1 month', 'YYYY-MM');
  
  -- Archive previous month data (optional - for historical purposes)
  -- You could move old data to an archive table here
  
  -- Note: Current month data stays, new month will start fresh
  -- The rankings are automatically maintained per month
END;
$$;