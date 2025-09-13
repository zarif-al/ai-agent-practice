import type {
  IScrapingState,
  ScrapingAction,
} from '@/app/ai-scraping/reducer/interface';
import type { IStatusCounts } from '@/utils/ai-scraping/common-interfaces';
import type { Dispatch } from 'react';

export interface IItemListProps {
  statusCounts: IStatusCounts;
  state: IScrapingState;
  dispatch: Dispatch<ScrapingAction>;
}

export interface IViewMode {
  id: string;
  viewMode: 'json' | 'ui';
}
