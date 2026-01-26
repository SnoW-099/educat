import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  MessageCircle,
  Users,
  Pin,
  Smile,
  Paperclip,
  Heart,
  ThumbsUp,
  Laugh,
  Angry,
  Clock,
  CheckCheck,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MessageActions } from './MessageActions';

interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'professor' | 'student';
  sender_avatar?: string;
  created_at: string;
  is_announcement: boolean;
  message_type: 'text' | 'file' | 'announcement';
  file_url?: string;
  file_name?: string;
  reply_to?: string;
  reactions?: Record<string, string[]>; // emoji -> user_ids
}

interface ImprovedChatInterfaceProps {
  classId: string;
  className?: string;
  chatPermissions: 'all' | 'professor_only';
}

export const ImprovedChatInterface = ({
  classId,
  className = '',
  chatPermissions
}: ImprovedChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyAnnouncements, setShowOnlyAnnouncements] = useState(false);

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
    // Disabled realtime subscriptions to fix connectivity issues
    // setupRealtimeSubscription();
    // setupPresenceTracking();

    return () => {
      // supabase.removeAllChannels();
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
            role,
            avatar_url
          )
        `)
        .eq('class_id', classId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Fetch reactions for messages
      const messageIds = data?.map(msg => msg.id) || [];
      const { data: reactions } = await supabase
        .from('message_reactions')
        .select('message_id, emoji, user_id, profiles!message_reactions_user_id_fkey(name)')
        .in('message_id', messageIds);

      // Group reactions by message
      const reactionsByMessage = reactions?.reduce((acc: Record<string, Record<string, string[]>>, reaction) => {
        if (!acc[reaction.message_id]) {
          acc[reaction.message_id] = {};
        }
        if (!acc[reaction.message_id][reaction.emoji]) {
          acc[reaction.message_id][reaction.emoji] = [];
        }
        acc[reaction.message_id][reaction.emoji].push(reaction.user_id);
        return acc;
      }, {}) || {};

      const formattedMessages: ChatMessage[] = data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        sender_name: (msg.profiles as any)?.name || 'Usuari desconegut',
        sender_role: (msg.profiles as any)?.role || 'student',
        sender_avatar: (msg.profiles as any)?.avatar_url,
        created_at: msg.created_at,
        is_announcement: msg.is_announcement,
        message_type: msg.message_type as 'text' | 'file' | 'announcement',
        file_url: msg.file_url || undefined,
        file_name: msg.file_name || undefined,
        reply_to: msg.reply_to || undefined,
        reactions: reactionsByMessage[msg.id] || {}
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
      .channel(`improved_chat_${classId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `class_id=eq.${classId}`
        },
        async (payload) => {
          // Re-fetch all messages to get proper data with joins
          await fetchMessages();
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
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const setupPresenceTracking = () => {
    const channel = supabase.channel(`presence_improved_${classId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat();
        setOnlineUsers(users as any[]);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        setOnlineUsers(prev => [...prev, ...newPresences]);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        setOnlineUsers(prev =>
          prev.filter(user => !leftPresences.some(left => left.user_id === user.user_id))
        );
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED' && profile) {
          await channel.track({
            user_id: profile.user_id,
            name: profile.name,
            role: profile.role,
            avatar_url: profile.avatar_url,
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

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
          reply_to: replyTo?.id
        });

      if (error) throw error;

      setNewMessage('');
      setReplyTo(null);
      inputRef.current?.focus();

      // Broadcast typing stop
      const channel = supabase.channel(`improved_chat_${classId}`);
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

  const addReaction = async (messageId: string, emoji: string) => {
    if (!profile) return;

    try {
      // Check if user already reacted with this emoji
      const existingReaction = await supabase
        .from('message_reactions')
        .select('id')
        .eq('message_id', messageId)
        .eq('user_id', profile.user_id)
        .eq('emoji', emoji)
        .maybeSingle();

      if (existingReaction.data) {
        // Remove reaction
        await supabase
          .from('message_reactions')
          .delete()
          .eq('id', existingReaction.data.id);
      } else {
        // Add reaction
        await supabase
          .from('message_reactions')
          .insert({
            message_id: messageId,
            user_id: profile.user_id,
            emoji: emoji
          });
      }

      // Refresh messages to update reactions
      await fetchMessages();
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!profile) return;

    // Broadcast typing indicator
    const channel = supabase.channel(`improved_chat_${classId}`);
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
      day: 'numeric',
      month: 'long'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isNewDay = (current: string, previous?: string) => {
    if (!previous) return true;
    return new Date(current).toDateString() !== new Date(previous).toDateString();
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = !searchTerm ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !showOnlyAnnouncements || message.is_announcement;
    return matchesSearch && matchesFilter;
  });

  const commonEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  if (isLoading) {
    return (
      <Card className={`${className} shadow-card`}>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-muted-foreground">Carregant xat...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-card bg-gradient-surface border-0`}>
      {/* Header */}
      <CardHeader className="pb-3 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-5 w-5" />
            <div>
              <CardTitle className="text-lg">Xat</CardTitle>
              <p className="text-sm opacity-90">Comunicació en temps real</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
              <Users className="h-3 w-3 mr-1" />
              {onlineUsers.length} en línia
            </Badge>
            {chatPermissions === 'professor_only' && (
              <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/30">
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
                  📢 Anunci • {pinnedMessage.sender_name}
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

      {/* Search and Filter */}
      <div className="p-4 border-b bg-muted/5">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca missatges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showOnlyAnnouncements ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowOnlyAnnouncements(!showOnlyAnnouncements)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Anuncis
          </Button>
        </div>
      </div>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="p-4 space-y-4">
            {/* Online Users */}
            {onlineUsers.length > 0 && (
              <div className="flex items-center space-x-2 pb-2 border-b">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {onlineUsers.slice(0, 5).map((user: any) => (
                    <div key={user.user_id} className="flex items-center space-x-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{user.name}</span>
                    </div>
                  ))}
                  {onlineUsers.length > 5 && (
                    <span className="text-xs text-muted-foreground">+{onlineUsers.length - 5} més</span>
                  )}
                </div>
              </div>
            )}

            {/* Messages */}
            {filteredMessages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <h3 className="font-medium mb-1">
                  {searchTerm ? 'Cap missatge trobat' : 'Xat buit'}
                </h3>
                <p className="text-sm">
                  {searchTerm ? 'Prova amb un altre terme de cerca' : 'Sigues el primer en participar!'}
                </p>
              </div>
            ) : (
              filteredMessages.map((message, index) => {
                const isCurrentUser = message.sender_id === profile?.user_id;
                const showDateSeparator = isNewDay(message.created_at, filteredMessages[index - 1]?.created_at);
                const replyToMessage = message.reply_to ?
                  messages.find(m => m.id === message.reply_to) : null;

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

                    <div className={`group flex space-x-3 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={message.sender_avatar} />
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

                        {/* Reply indicator */}
                        {replyToMessage && (
                          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded mb-1 border-l-2 border-accent">
                            <div className="font-medium">{replyToMessage.sender_name}</div>
                            <div className="truncate">{replyToMessage.content}</div>
                          </div>
                        )}

                        {/* Message content */}
                        <div className={`
                          px-4 py-2 max-w-full break-words shadow-sm rounded-2xl
                          ${isCurrentUser
                            ? 'bg-primary text-primary-foreground'
                            : message.is_announcement
                              ? 'bg-accent/20 border border-accent/30'
                              : 'bg-muted'
                          }
                        `}>
                          {message.is_announcement && (
                            <div className="flex items-center mb-1">
                              <Pin className="h-3 w-3 mr-1" />
                              <span className="text-xs font-medium">Anunci</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>

                        {/* Reactions */}
                        {Object.keys(message.reactions || {}).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(message.reactions || {}).map(([emoji, userIds]) => (
                              <Button
                                key={emoji}
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => addReaction(message.id, emoji)}
                              >
                                {emoji} {userIds.length}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Quick reaction buttons (on hover) */}
                        <div className="hidden group-hover:flex mt-1 space-x-1 items-center">
                          {commonEmojis.map(emoji => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-xs opacity-70 hover:opacity-100"
                              onClick={() => addReaction(message.id, emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                          <MessageActions
                            messageId={message.id}
                            isCurrentUser={isCurrentUser}
                            canDelete={isCurrentUser || profile?.role === 'professor'}
                            onReply={() => setReplyTo(message)}
                          />
                        </div>

                        {isCurrentUser && (
                          <div className="flex items-center space-x-1 mt-1">
                            <CheckCheck className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing indicators */}
            {isTyping.length > 0 && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs">
                  {isTyping.length === 1 ? 'Algú està escrivint...' : `${isTyping.length} persones estan escrivint...`}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Reply indicator */}
        {replyTo && (
          <div className="px-4 py-2 bg-muted/30 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Responent a </span>
                <span className="font-medium">{replyTo.sender_name}</span>
                <span className="text-muted-foreground">: {replyTo.content.slice(0, 50)}...</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(null)}
              >
                ✕
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={
                  chatPermissions === 'professor_only' && profile?.role !== 'professor'
                    ? "Només el professor pot enviar missatges"
                    : replyTo
                      ? "Respon al missatge..."
                      : "Escriu un missatge..."
                }
                disabled={chatPermissions === 'professor_only' && profile?.role !== 'professor'}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || (chatPermissions === 'professor_only' && profile?.role !== 'professor')}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {profile?.role === 'professor' && (
            <p className="text-xs text-muted-foreground mt-2">
              💡 Consell: Comença amb "📢" per crear un anunci destacat
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};