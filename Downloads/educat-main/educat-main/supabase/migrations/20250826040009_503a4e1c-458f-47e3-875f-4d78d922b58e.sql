-- Enable realtime for chat_messages table to ensure persistent messaging
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- Add the chat_messages table to realtime publication
DO $$
BEGIN
    -- Check if the table is already in the publication
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND tablename = 'chat_messages'
    ) THEN
        -- Add the table to the publication
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
    END IF;
END $$;