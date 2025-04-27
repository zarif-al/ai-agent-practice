import { Skeleton } from '@/components/ui/skeleton';

export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start gap-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse' : ''
        }`}
      >
        <Skeleton className="size-8 rounded-full flex-shrink-0" />
        <Skeleton
          className={`h-10 w-64 rounded-lg ${isUser ? 'ml-auto' : 'mr-auto'}`}
        />
      </div>
    </div>
  );
}
