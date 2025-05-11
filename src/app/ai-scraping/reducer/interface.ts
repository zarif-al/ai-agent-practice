import type { PageType, UrlItem } from '@/utils/ai-scraping/common-interfaces';

export interface IScrapingState {
  urls: UrlItem[];
  isProcessing: boolean;
  error: string | null;
  apiError: string | null;
  activeTab: string;
  selectedPageType: PageType;
  showPageTypeWarning: boolean;
  pendingPageType: PageType | null;
}

export type ScrapingAction =
  | { type: 'SET_URLS'; payload: UrlItem[] }
  | { type: 'SET_IS_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_API_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | {
      type: 'HANDLE_PAGE_TYPE_CHANGE';
      payload: { pageType: PageType; urls: UrlItem[] };
    }
  | { type: 'HANDLE_CLEAR_URLS' }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CONFIRM';
    }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CANCEL';
    };
