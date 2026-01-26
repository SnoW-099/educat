-- Fix the search path issue
CREATE OR REPLACE FUNCTION public.auto_delete_old_messages()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM public.chat_messages 
    WHERE created_at < NOW() - INTERVAL '6 seconds';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';