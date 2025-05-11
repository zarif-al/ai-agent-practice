import type {
  IScrapingState,
  ScrapingAction,
} from '@/app/ai-scraping/reducer/interface';
import type { Dispatch } from 'react';

export interface IScrapingCategorySelection {
  state: IScrapingState;
  dispatch: Dispatch<ScrapingAction>;
}
