import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/global/ui/alert';
import { Button } from '@/components/global/ui/button';
import type { RefetchOptions } from '@tanstack/react-query';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface IProps {
  refetch: (options?: RefetchOptions | undefined) => Promise<unknown>;
}

export function ChatListError({ refetch }: IProps) {
  return (
    <div className="p-6">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load conversation</AlertDescription>
      </Alert>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            refetch();
          }}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="size-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
