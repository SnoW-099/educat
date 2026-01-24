import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, Users, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'professor' | 'student';
  created_at: string;
  is_announcement: boolean;
}

interface ChatInterfaceProps {
  classId: string;
  className?: string;
  chatPermissions: 'all' | 'professor_only';
}

export const ChatInterface = ({ classId, className = '', chatPermissions }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!classId || !profile) return;

    fetchMessages();
    setupRealtimeSubscription();
    setupPresenceTracking();

    return () => {
      supabase.removeAllChannels();
    };
  }, [classId, profile]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          content,
          sender_id,
          created_at,
          is_announcement,
          profiles!chat_messages_sender_id_fkey (
            name,
            role
          )
        `)
        .eq('class_id', classId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      const formattedMessages: ChatMessage[] = data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        sender_name: (msg.profiles as any)?.name || 'Usuari desconegut',
        sender_role: (msg.profiles as any)?.role || 'student',
        created_at: msg.created_at,
        is_announcement: msg.is_announcement
      })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'No s\'han pogut carregar els missatges',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`chat_${classId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `class_id=eq.${classId}`
        },
        async (payload) => {
          try {
            // Fetch the complete message with profile data
            const { data, error } = await supabase
              .from('chat_messages')
              .select(`
                id,
                content,
                sender_id,
                created_at,
                is_announcement,
                profiles (
                  name,
                  role
                )
              `)
              .eq('id', payload.new.id)
              .single();

            if (error) {
              console.error('Error fetching new message:', error);
              return;
            }

            if (data) {
              const newMessage: ChatMessage = {
                id: data.id,
                content: data.content,
                sender_id: data.sender_id,
                sender_name: (data.profiles as any)?.name || 'Usuari desconegut',
                sender_role: (data.profiles as any)?.role || 'student',
                created_at: data.created_at,
                is_announcement: data.is_announcement
              };

              // Avoid duplicates
              setMessages(prev => {
                if (prev.some(msg => msg.id === newMessage.id)) {
                  return prev;
                }
                return [...prev, newMessage];
              });
            }
          } catch (error) {
            console.error('Error in realtime subscription:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const setupPresenceTracking = () => {
    const channel = supabase.channel(`presence_${classId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state).map(userId => userId);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        setOnlineUsers(prev => [...prev, key]);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setOnlineUsers(prev => prev.filter(userId => userId !== key));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED' && profile) {
          await channel.track({
            user_id: profile.user_id,
            name: profile.name,
            role: profile.role,
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !profile) return;

    // Check permissions
    if (chatPermissions === 'professor_only' && profile.role !== 'professor') {
      toast({
        title: 'Permisos insuficients',
        description: 'Només el professor pot enviar missatges en aquesta classe',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          class_id: classId,
          sender_id: profile.user_id,
          content: newMessage.trim(),
          message_type: 'text',
          is_announcement: profile.role === 'professor'
        });

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut enviar el missatge',
        variant: 'destructive'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ca-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card className={`${className} shadow-card`}>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Carregant xat...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-card`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <CardTitle className="text-lg">Xat de classe</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {onlineUsers.length} en línia
            </Badge>
            {chatPermissions === 'professor_only' && (
              <Badge variant="outline" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Només professor
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ScrollArea className="h-80 clean-scroll">
          <div className="space-y-3 pr-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Encara no hi ha missatges.</p>
                <p className="text-sm">Sigues el primer en participar!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex space-x-3 ${
                    message.sender_id === profile?.user_id ? 'justify-end' : ''
                  }`}
                >
                  {message.sender_id !== profile?.user_id && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(message.sender_name)}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-xs lg:max-w-md ${
                      message.sender_id === profile?.user_id
                        ? 'bg-primary text-primary-foreground'
                        : message.is_announcement
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted'
                    } rounded-lg px-3 py-2`}
                  >
                    {message.sender_id !== profile?.user_id && (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium">
                          {message.sender_name}
                        </span>
                        <Badge 
                          variant={message.sender_role === 'professor' ? 'default' : 'secondary'} 
                          className="text-xs h-4"
                        >
                          {message.sender_role === 'professor' ? 'Professor' : 'Alumne'}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.created_at)}
                    </p>
                  </div>

                  {message.sender_id === profile?.user_id && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(message.sender_name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value.slice(0, 500))}
              onKeyPress={handleKeyPress}
              placeholder={
                chatPermissions === 'professor_only' && profile?.role !== 'professor'
                  ? 'Només el professor pot escriure...'
                  : 'Escriu un missatge...'
              }
              disabled={chatPermissions === 'professor_only' && profile?.role !== 'professor'}
              className="flex-1"
              maxLength={500}
            />
            <Button
              onClick={sendMessage}
              disabled={
                !newMessage.trim() ||
                (chatPermissions === 'professor_only' && profile?.role !== 'professor')
              }
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {newMessage && (
            <p className="text-xs text-muted-foreground text-right">
              {newMessage.length}/500 caràcters
            </p>
          )}
        </div>

        {chatPermissions === 'professor_only' && profile?.role !== 'professor' && (
          <p className="text-xs text-muted-foreground text-center">
            El professor ha restringit els permisos del xat
          </p>
        )}
      </CardContent>
    </Card>
  );
};