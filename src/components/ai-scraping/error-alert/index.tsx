import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/global/ui/alert';
import { Button } from '@/components/global/ui/button';
import { AlertCircle } from 'lucide-react';
import type { IErrorAlertProps } from './interface';

export function ErrorAlert({ dispatch, state }: IErrorAlertProps) {
  if (!state.apiError) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="size-4" />
      <AlertTitle>Error Processing URLs</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{state.apiError}</p>
        <Button
          variant="outline"
          size="sm"
          className="self-end gap-2 mt-2"
          onClick={() => {
            dispatch({
              type: 'SET_API_ERROR',
              payload: null,
            });
          }}
        >
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  );
}
