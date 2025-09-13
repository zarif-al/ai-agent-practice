import type { IScrapingState, ScrapingAction } from './interface';

export const initialScrapingState: IScrapingState = {
  items: [
    {
      id: 'url-1746956645786',
      url: 'https://www.merton.ox.ac.uk/news/new-lighting-installed-college-chapel',
      status: 'pending',
      addedAt: new Date(),
      category: 'news',
    },
  ],
  isProcessing: false,
  error: undefined,
  activeTab: 'urls',
  selectedCategory: 'news',
  showPageTypeWarning: false,
  pendingCategory: undefined,
};

export const scrapingReducer = (
  state: IScrapingState,
  action: ScrapingAction
): IScrapingState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items:
          typeof action.payload === 'function'
            ? action.payload(state.items) // Call the function with the current state
            : action.payload, // Use the payload directly if it's not a function
      };
    case 'SET_IS_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'HANDLE_PAGE_TYPE_CHANGE': {
      const { category, urls } = action.payload;

      // If there are no URLs, directly update the selectedPageType
      if (urls.length === 0) {
        return {
          ...state,
          selectedCategory: category,
          showPageTypeWarning: false,
          pendingCategory: undefined,
        };
      }

      // Otherwise, show the warning and set the pendingPageType
      return { ...state, pendingCategory: category, showPageTypeWarning: true };
    }
    case 'HANDLE_CLEAR_URLS':
      return {
        ...state,
        items: [],
        activeTab: 'urls',
      };
    case 'HANDLE_PAGE_TYPE_WARNING_CONFIRM': {
      const { pendingCategory } = state;

      if (!pendingCategory) {
        return state;
      }

      return {
        ...state,
        selectedCategory: pendingCategory,
        showPageTypeWarning: false,
        pendingCategory: undefined,
        items: [],
        activeTab: 'urls',
        error: undefined,
        isProcessing: false,
      };
    }
    case 'HANDLE_PAGE_TYPE_WARNING_CANCEL': {
      return {
        ...state,
        showPageTypeWarning: false,
        pendingCategory: undefined,
      };
    }
    default:
      return state;
  }
};
