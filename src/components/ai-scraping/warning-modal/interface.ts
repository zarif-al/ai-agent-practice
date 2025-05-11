import type {
  IScrapingState,
  ScrapingAction,
} from '@/app/ai-scraping/reducer/interface';
import type { Dispatch } from 'react';

export interface IWarningDialogProps {
  state: IScrapingState;
  dispatch: Dispatch<ScrapingAction>;
}
