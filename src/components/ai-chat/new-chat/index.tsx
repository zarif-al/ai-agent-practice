'use client';

import type React from 'react';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createChat } from '@/lib/chat-store';
import type { IChat } from '../interface';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (chat: IChat) => void;
}

export function NewChatModal({
  isOpen,
  onClose,
  onCreateChat,
}: NewChatModalProps) {
  const [chatName, setChatName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!chatName.trim()) {
      setError('Please enter a name for your chat');
      return;
    }

    setIsLoading(true);

    const result = await createChat(chatName.trim());

    if (!result) {
      setError('Failed to create chat');
      return;
    }

    onCreateChat(result);

    setChatName('');

    setError(null);
    setIsLoading(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-background border rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">New Conversation</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chat-name">Conversation Name</Label>
                <Input
                  id="chat-name"
                  placeholder="Enter a name for this conversation"
                  value={chatName}
                  onChange={(e) => {
                    setChatName(e.target.value);
                    if (error) setError(null);
                  }}
                  autoFocus
                  disabled={isLoading}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Create Chat
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
