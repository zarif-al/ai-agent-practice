import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/global/ui/dialog';
import type { IWarningDialogProps } from './interface';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/global/ui/button';

export function WarningDialog({ dispatch, state }: IWarningDialogProps) {
  return (
    <Dialog open={state.showPageTypeWarning}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            Change Category?
          </DialogTitle>
          <DialogDescription>
            Changing the category will clear all current URLs and results. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              dispatch({ type: 'HANDLE_PAGE_TYPE_WARNING_CANCEL' });
            }}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => {
              dispatch({ type: 'HANDLE_PAGE_TYPE_WARNING_CONFIRM' });
            }}
          >
            Change Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
