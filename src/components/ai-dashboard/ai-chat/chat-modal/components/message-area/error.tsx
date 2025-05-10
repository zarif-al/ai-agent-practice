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

export function ChatModalError({ refetch }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <Alert variant="destructive" className="mb-6 max-w-md">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch chat history</AlertDescription>
      </Alert>
      <Button
        onClick={() => {
          refetch();
        }}
        className="gap-2"
      >
        <RefreshCw className="size-4" />
        Try Again
      </Button>
    </div>
  );
}
