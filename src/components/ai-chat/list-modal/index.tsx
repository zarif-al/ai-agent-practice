'use client';

import { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ChatListModalProps } from './interface';
import { useQuery } from '@tanstack/react-query';
import { fetchChatList } from './server/fetch-chat-list';
import { ListArea } from './components/list-area';

export function ChatListModal({
  isOpen,
  onClose,
  onSelectChat,
  onNewChat,
}: ChatListModalProps) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['chat_list'],
    queryFn: fetchChatList,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 z-50 bg-background border rounded-lg shadow-lg flex flex-col w-full max-w-5xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Your Conversations</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Search and New Chat */}
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={onNewChat}>
              <Plus className="size-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 w-full h-[200px]">
          <ListArea
            isError={isError}
            isLoading={isLoading}
            onNewChat={onNewChat}
            onSelectChat={onSelectChat}
            refetch={refetch}
            searchQuery={searchQuery}
            chats={data}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
