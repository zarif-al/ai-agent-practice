import type { Category, UrlItem } from '@/utils/ai-scraping/common-interfaces';

export interface IScrapingState {
  urls: UrlItem[];
  isProcessing: boolean;
  error?: {
    type: 'error' | 'apiError';
    message: string;
  };
  activeTab: string;
  selectedCategory: Category;
  showPageTypeWarning: boolean;
  pendingCategory?: Category;
}

type SetUrlsPayload = UrlItem[] | ((prevUrls: UrlItem[]) => UrlItem[]);

export type ScrapingAction =
  | {
      type: 'SET_URLS';
      // Inside async calls to setUrls, we can pass a function that takes the previous state and returns the new state
      payload: SetUrlsPayload;
    }
  | { type: 'SET_IS_PROCESSING'; payload: boolean }
  | {
      type: 'SET_ERROR';
      payload?: {
        type: 'error' | 'apiError';
        message: string;
      };
    }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | {
      type: 'HANDLE_PAGE_TYPE_CHANGE';
      payload: { category: Category; urls: UrlItem[] };
    }
  | { type: 'HANDLE_CLEAR_URLS' }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CONFIRM';
    }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CANCEL';
    };
