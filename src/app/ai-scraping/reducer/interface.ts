import type { Category, UrlItem } from '@/utils/ai-scraping/common-interfaces';

export interface IScrapingState {
  items: UrlItem[];
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

type SetItemsPayload = UrlItem[] | ((prevItems: UrlItem[]) => UrlItem[]);

export type ScrapingAction =
  | {
      type: 'SET_ITEMS';
      // Inside async calls to setItems, we can pass a function that takes the previous state and returns the new state
      payload: SetItemsPayload;
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
