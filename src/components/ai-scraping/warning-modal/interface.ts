export interface IWarningDialogProps {
  showPageTypeWarning: boolean;
  setPageTypeWarning: (show: boolean) => void;
  cancelPageTypeChange: () => void;
  confirmPageTypeChange: () => void;
}
