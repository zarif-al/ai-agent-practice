'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { TypingIndicator } from './components/typing-indicator';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchChat } from './server/fetch-chat';
import { MessageArea } from './components/message-area';
import { useQueryClient } from '@tanstack/react-query';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedChatId?: string;
}

export function ChatModal({ isOpen, onClose, selectedChatId }: ChatModalProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['chat_history', selectedChatId],
    queryFn: async () => {
      const data = await fetchChat(selectedChatId);

      return data;
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    id: data?.id || '',
    initialMessages: data?.messages || [],
    api: '/api/generate-graph-v1',
    sendExtraMessageFields: true,
    onResponse: () => {
      scrollToBottom();
    },
    onError: () => {
      toast.error('An error occurred while processing your request.');
    },
    onFinish() {
      queryClient.invalidateQueries({
        queryKey: ['chat_list'],
      });
    },
  });

  // Scroll to bottom function
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If modal is not open, don't render anything
  if (!isOpen || !selectedChatId) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 z-50 bg-background border rounded-lg shadow-lg flex flex-col max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          {isLoading ? (
            <Skeleton className="h-7 w-48" />
          ) : (
            <h2 className="text-xl font-semibold">
              {data ? data.name : 'Unknown'}
            </h2>
          )}

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4 h-[200px]">
          <div className="space-y-4">
            <MessageArea
              isError={isError}
              isLoading={isLoading}
              messages={messages}
              refetch={refetch}
            />

            {status == 'submitted' && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={status === 'submitted'}
            />
            <Button
              type="submit"
              disabled={!input.trim() || status === 'submitted'}
            >
              <Send className="size-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
