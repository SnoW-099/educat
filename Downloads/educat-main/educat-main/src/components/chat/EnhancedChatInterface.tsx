import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  MessageCircle,
  Users,
  Settings,
  Pin,
  Smile,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';
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
  is_pinned?: boolean;
  message_type: 'text' | 'file' | 'announcement';
  file_url?: string;
  file_name?: string;
  reply_to?: string;
}

interface EnhancedChatInterfaceProps {
  classId: string;
  className?: string;
  chatPermissions: 'all' | 'professor_only';
}

export const EnhancedChatInterface = ({
  classId,
  className = '',
  chatPermissions
}: EnhancedChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!classId || !profile) return;

    fetchMessages();
    setupRealtimeSubscription();
    setupPresenceTracking();

    return () => {
      supabase.removeAllChannels();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [classId, profile]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          content,
          sender_id,
          created_at,
          is_announcement,
          message_type,
          file_url,
          file_name,
          reply_to,
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
        is_announcement: msg.is_announcement,
        message_type: msg.message_type as 'text' | 'file' | 'announcement',
        file_url: msg.file_url || undefined,
        file_name: msg.file_name || undefined,
        reply_to: msg.reply_to || undefined
      })) || [];

      setMessages(formattedMessages);

      // Set pinned message (latest announcement)
      const latestAnnouncement = formattedMessages
        .filter(msg => msg.is_announcement)
        .slice(-1)[0];
      if (latestAnnouncement) {
        setPinnedMessage(latestAnnouncement);
      }
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
      .channel(`enhanced_chat_${classId}`)
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
            const { data, error } = await supabase
              .from('chat_messages')
              .select(`
                id,
                content,
                sender_id,
                created_at,
                is_announcement,
                message_type,
                file_url,
                file_name,
                reply_to,
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
                is_announcement: data.is_announcement,
                message_type: data.message_type as 'text' | 'file' | 'announcement',
                file_url: data.file_url || undefined,
                file_name: data.file_name || undefined,
                reply_to: data.reply_to || undefined
              };

              setMessages(prev => {
                if (prev.some(msg => msg.id === newMessage.id)) {
                  return prev;
                }
                return [...prev, newMessage];
              });

              // Update pinned message if it's an announcement
              if (newMessage.is_announcement) {
                setPinnedMessage(newMessage);
              }

              // Play notification sound for other users' messages
              if (newMessage.sender_id !== profile?.user_id) {
                try {
                  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBj2+6P7QdiMGK4TO8tiJOQcYZ7zs55xLEgxPpuLxtmQdBjiS2OvNeSsFJHfH8N+OQAoUXrTp6qlVFAlGnuDyv2whBj++6P7Qdi8GLogN9t1tCBISaLjl7LNaHQU+ltrywnEiBSmAzvLXiToHFmS57N+XThELTKXh8LJnHgU9k9n1wG0jBSh+ye7dmEULElyx6um2XBoF');
                  audio.play().catch(() => { });
                } catch (e) {
                  // Ignore audio errors
                }
              }
            }
          } catch (error) {
            console.error('Error in realtime subscription:', error);
          }
        }
      )
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id !== profile?.user_id) {
          setIsTyping(prev => {
            if (payload.is_typing) {
              return [...prev.filter(id => id !== payload.user_id), payload.user_id];
            } else {
              return prev.filter(id => id !== payload.user_id);
            }
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const setupPresenceTracking = () => {
    const channel = supabase.channel(`presence_enhanced_${classId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state).map(userId => userId);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        setOnlineUsers(prev => [...prev.filter(id => id !== key), key]);
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
          is_announcement: profile.role === 'professor' && newMessage.startsWith('📢'),
          reply_to: replyTo
        });

      if (error) throw error;

      setNewMessage('');
      setReplyTo(null);
      inputRef.current?.focus();

      // Broadcast typing stop
      const channel = supabase.channel(`enhanced_chat_${classId}`);
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: profile.user_id, is_typing: false }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'No s\'ha pogut enviar el missatge',
        variant: 'destructive'
      });
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!profile) return;

    // Broadcast typing indicator
    const channel = supabase.channel(`enhanced_chat_${classId}`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: { user_id: profile.user_id, is_typing: e.target.value.length > 0 }
    });

    // Clear typing after 2 seconds of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: profile.user_id, is_typing: false }
      });
    }, 2000);
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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ca-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isNewDay = (current: string, previous?: string) => {
    if (!previous) return true;
    return new Date(current).toDateString() !== new Date(previous).toDateString();
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
    <Card className={`${className} shadow-card bg-gradient-surface border-0`}>
      <CardHeader className="pb-3 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5" />
            <div>
              <CardTitle className="text-lg">Xat de Classe</CardTitle>
              <p className="text-sm opacity-90">Comunicació professional</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
              <Users className="h-3 w-3 mr-1" />
              {onlineUsers.length} connectats
            </Badge>
            {chatPermissions === 'professor_only' && (
              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/30">
                <Settings className="h-3 w-3 mr-1" />
                Professor només
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Pinned Message */}
      {pinnedMessage && (
        <div className="bg-accent/10 border-l-4 border-accent px-4 py-3">
          <div className="flex items-start space-x-2">
            <Pin className="h-4 w-4 text-accent mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-accent">
                  Missatge destacat • {pinnedMessage.sender_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(pinnedMessage.created_at)}
                </span>
              </div>
              <p className="text-sm">{pinnedMessage.content}</p>
            </div>
          </div>
        </div>
      )}

      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <h3 className="font-medium mb-1">Xat buit</h3>
                <p className="text-sm">Sigues el primer en participar en la conversa!</p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isCurrentUser = message.sender_id === profile?.user_id;
                const showDateSeparator = isNewDay(message.created_at, messages[index - 1]?.created_at);

                return (
                  <div key={message.id}>
                    {showDateSeparator && (
                      <div className="flex items-center justify-center my-6">
                        <Separator className="flex-1" />
                        <div className="px-3 py-1 bg-muted rounded-full">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(message.created_at)}
                          </span>
                        </div>
                        <Separator className="flex-1" />
                      </div>
                    )}

                    <div className={`flex space-x-3 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                            {getInitials(message.sender_name)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                        {!isCurrentUser && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-foreground">
                              {message.sender_name}
                            </span>
                            <Badge
                              variant={message.sender_role === 'professor' ? 'default' : 'secondary'}
                              className="text-xs h-4"
                            >
                              {message.sender_role === 'professor' ? 'Professor' : 'Alumne'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-2 ${isCurrentUser
                              ? 'bg-primary text-primary-foreground'
                              : message.is_announcement
                                ? 'bg-accent text-accent-foreground border border-accent/30'
                                : 'bg-muted text-muted-foreground'
                            } ${message.is_announcement ? 'ring-2 ring-accent/20' : ''}`}
                        >
                          {message.is_announcement && (
                            <div className="flex items-center space-x-1 mb-2">
                              <Pin className="h-3 w-3" />
                              <span className="text-xs font-medium">Anunci</span>
                            </div>
                          )}

                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                          {isCurrentUser && (
                            <div className="flex items-center justify-end space-x-1 mt-1">
                              <CheckCheck className="h-3 w-3 opacity-70" />
                              <span className="text-xs opacity-70">
                                {formatTime(message.created_at)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {isCurrentUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="text-xs bg-gradient-accent text-accent-foreground">
                            {getInitials(message.sender_name)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing Indicators */}
            {isTyping.length > 0 && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs">
                  {isTyping.length} {isTyping.length === 1 ? 'persona està' : 'persones estan'} escrivint...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-background p-4">
          {replyTo && (
            <div className="mb-3 p-2 bg-muted/50 rounded-lg border-l-2 border-accent">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Responent a un missatge</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo(null)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={
                  chatPermissions === 'professor_only' && profile?.role !== 'professor'
                    ? 'Només el professor pot escriure...'
                    : profile?.role === 'professor'
                      ? 'Escriu un missatge... (usa 📢 per anuncis)'
                      : 'Escriu un missatge...'
                }
                disabled={chatPermissions === 'professor_only' && profile?.role !== 'professor'}
                className="pr-20 rounded-full border-2 focus:border-accent"
                maxLength={500}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  disabled
                >
                  <Smile className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <Button
              onClick={sendMessage}
              disabled={
                !newMessage.trim() ||
                (chatPermissions === 'professor_only' && profile?.role !== 'professor')
              }
              className="rounded-full bg-accent hover:bg-accent/90 shadow-md"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {newMessage && (
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                {newMessage.length}/500 caràcters
              </p>
              {profile?.role === 'professor' && newMessage.startsWith('📢') && (
                <Badge variant="outline" className="text-xs">
                  Aquest missatge es marcarà com a anunci
                </Badge>
              )}
            </div>
          )}
        </div>

        {chatPermissions === 'professor_only' && profile?.role !== 'professor' && (
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground text-center bg-muted/50 rounded-lg py-2">
              El professor ha restringit els permisos del xat
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};