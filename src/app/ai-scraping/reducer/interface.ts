import type { PageType, UrlItem } from '@/utils/ai-scraping/common-interfaces';

type StateUrls = Record<PageType, UrlItem[]>;

export interface IScrapingState {
  urls: StateUrls;
  isProcessing: boolean;
  error: string | null;
  apiError: string | null;
  activeTab: string;
  selectedPageType: PageType;
  pendingPageType: PageType | null;
}

type SetUrlsPayload = StateUrls | ((prevUrls: StateUrls) => StateUrls);

export type ScrapingAction =
  | {
      type: 'SET_URLS';
      // Inside async calls to setUrls, we can pass a function that takes the previous state and returns the new state
      payload: SetUrlsPayload;
    }
  | { type: 'SET_IS_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_API_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | {
      type: 'HANDLE_PAGE_TYPE_CHANGE';
      payload: { pageType: PageType; urls: StateUrls };
    }
  | { type: 'HANDLE_CLEAR_URLS' }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CONFIRM';
    }
  | {
      type: 'HANDLE_PAGE_TYPE_WARNING_CANCEL';
    };
