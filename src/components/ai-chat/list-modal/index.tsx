'use client';

import { useState } from 'react';
import { X, MessageSquare, Plus, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import type { ChatListModalProps } from './interface';

export function ChatListModal({
  isOpen,
  onClose,
  onSelectChat,
  onNewChat,
  chats,
}: ChatListModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <ScrollArea className="flex-1 w-full">
          {filteredChats.length > 0 ? (
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
          ) : (
            // Keep the empty state as is
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
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
