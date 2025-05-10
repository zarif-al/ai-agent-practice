import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/global/ui/alert';
import { Button } from '@/components/global/ui/button';
import { AlertCircle } from 'lucide-react';
import type { IErrorAlertProps } from './interface';

export function ErrorAlert({ apiError, setApiError }: IErrorAlertProps) {
  if (!apiError) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="size-4" />
      <AlertTitle>Error Processing URLs</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{apiError}</p>
        <Button
          variant="outline"
          size="sm"
          className="self-end gap-2 mt-2"
          onClick={() => setApiError(null)}
        >
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  );
}
