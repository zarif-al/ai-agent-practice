'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import { X, Send, User, Bot } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { TypingIndicator } from './typing-indicator';
import { cn } from '@/utils/shadcn';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! How can I help you with HR-related questions today?',
      },
    ],
    api: '/api/graph-ai', // This would be your endpoint for chat functionality
    onResponse: () => {
      // Scroll to bottom when we get a response
      scrollToBottom();
    },
    onError: () => {
      toast.error('An error occurred while processing your request.');
    },
  });

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom function
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 z-50 bg-background border rounded-lg shadow-lg flex flex-col max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">HR Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4 h-[200px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                // Align user messages to the right, assistant messages to the left
                className={cn(
                  'flex',
                  message.role === 'user' && 'justify-end',
                  message.role !== 'user' && 'justify-start'
                )}
              >
                <div
                  // Container for avatar and message bubble
                  // For user messages, reverse the order (avatar on right)
                  className={cn(
                    'flex items-start gap-2 max-w-[80%]',
                    message.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  {/* Avatar circle with icon based on sender */}
                  <div
                    className={cn(
                      'size-8 rounded-full flex items-center justify-center',
                      message.role === 'user' &&
                        'bg-primary text-primary-foreground',
                      message.role !== 'user' && 'bg-muted'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="size-4" />
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </div>

                  {/* Message bubble with content */}
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 prose',
                      message.role === 'user' &&
                        'bg-primary text-primary-foreground',
                      message.role !== 'user' && 'bg-muted text-foreground'
                    )}
                  >
                    {/* Message content */}
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

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
              disabled={status !== 'ready'}
            />
            <Button
              type="submit"
              disabled={!input.trim() || status !== 'ready'}
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
