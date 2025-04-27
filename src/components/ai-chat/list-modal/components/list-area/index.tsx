import type { RefetchOptions } from '@tanstack/react-query';
import { ChatListSkeleton } from './loader';
import { ChatListError } from './error';
import { Clock, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { SimplifiedChat } from '../../interface';

interface Props {
  refetch: (options?: RefetchOptions | undefined) => Promise<unknown>;
  chats?: SimplifiedChat[];
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ListArea({
  chats,
  isError,
  isLoading,
  refetch,
  searchQuery,
  onNewChat,
  onSelectChat,
}: Props) {
  const filteredChats = chats?.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (isLoading) {
    return <ChatListSkeleton />;
  }

  if (isError) {
    return <ChatListError refetch={refetch} />;
  }

  if (filteredChats == undefined || filteredChats?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageSquare className="size-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No conversations found</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {searchQuery
            ? 'Try a different search term'
            : 'Start a new conversation with the HR assistant'}
        </p>
        <Button onClick={onNewChat}>
          <Plus className="size-4 mr-2" />
          New Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {filteredChats.map((chat) => (
        <button
          key={chat.id}
          className="w-full text-left p-4 hover:bg-muted transition-colors flex items-start gap-3 relative"
          onClick={() => onSelectChat(chat.id)}
        >
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex justify-between items-center mb-1 gap-2">
              <h3 className="font-medium truncate">{chat.name}</h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                  {chat.messageCount} messages
                </span>
                <span className="text-xs text-muted-foreground flex items-center whitespace-nowrap">
                  <Clock className="size-3 mr-1" />
                  {formatDistanceToNow(chat.lastUpdated, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage}...
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
