-- Fix the last function with mutable search_path
CREATE OR REPLACE FUNCTION public.auto_delete_old_messages()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Delete messages older than 6 seconds
    DELETE FROM public.chat_messages 
    WHERE created_at < NOW() - INTERVAL '6 seconds';
    
    RETURN NEW;
END;
$$;