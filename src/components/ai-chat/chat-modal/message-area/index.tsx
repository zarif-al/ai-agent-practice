import type { RefetchOptions } from '@tanstack/react-query';
import type { UIMessage } from 'ai';
import { ChatMessageSkeleton } from './loader';
import { ChatModalError } from './error';
import { cn } from '@/utils/shadcn';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface IProps {
  refetch: (options?: RefetchOptions | undefined) => Promise<unknown>;
  messages: UIMessage[];
  isLoading: boolean;
  isError: boolean;
}

export function MessageArea({ isError, isLoading, messages, refetch }: IProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <ChatMessageSkeleton />
        <ChatMessageSkeleton isUser={true} />
        <ChatMessageSkeleton />
        <ChatMessageSkeleton isUser={true} />
        <ChatMessageSkeleton />
      </div>
    );
  }

  if (isError) {
    return <ChatModalError refetch={refetch} />;
  }

  return messages.map((message) => (
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
            message.role === 'user' && 'bg-primary text-primary-foreground',
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
            message.role === 'user' && 'bg-primary text-primary-foreground',
            message.role !== 'user' && 'bg-muted text-foreground'
          )}
        >
          {/* Message content */}
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  ));
}
