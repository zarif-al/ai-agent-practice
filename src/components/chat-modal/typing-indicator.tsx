import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2 max-w-[80%]">
        <div className="size-8 rounded-full flex items-center justify-center bg-muted">
          <Bot className="size-4" />
        </div>
        <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
          <div className="flex items-center gap-1">
            <span
              className="size-2 rounded-full bg-current animate-pulse"
              style={{ animationDelay: '0ms' }}
            ></span>
            <span
              className="size-2 rounded-full bg-current animate-pulse"
              style={{ animationDelay: '300ms' }}
            ></span>
            <span
              className="size-2 rounded-full bg-current animate-pulse"
              style={{ animationDelay: '600ms' }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
