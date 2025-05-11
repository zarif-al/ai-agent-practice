import type { IScrapingState, ScrapingAction } from './interface';

export const initialScrapingState: IScrapingState = {
  urls: [
    {
      id: 'url-1746956645786',
      url: 'https://www.merton.ox.ac.uk/people/professor-rhiannon-ash',
      status: 'pending',
      addedAt: new Date(),
      pageType: 'person',
    },
    {
      id: 'url-1746956649697',
      url: 'https://www.merton.ox.ac.uk/people/professor-jennifer-payne',
      status: 'pending',
      addedAt: new Date(),
      pageType: 'person',
    },
    {
      id: 'url-1746956652952',
      url: 'https://www.merton.ox.ac.uk/people/professor-judith-armitage',
      status: 'pending',
      addedAt: new Date(),
      pageType: 'person',
    },
    {
      id: 'url-1746956657092',
      url: 'https://www.merton.ox.ac.uk/people/nicholas-w-allard',
      status: 'pending',
      addedAt: new Date(),
      pageType: 'person',
    },
    {
      id: 'url-1746956660268',
      url: 'https://www.merton.ox.ac.uk/people/honourable-dame-kelyn-bacon',
      status: 'pending',
      addedAt: new Date(),
      pageType: 'person',
    },
  ],
  isProcessing: false,
  error: null,
  apiError: null,
  activeTab: 'urls',
  selectedPageType: 'person',
  showPageTypeWarning: false,
  pendingPageType: null,
};

export const scrapingReducer = (
  state: IScrapingState,
  action: ScrapingAction
): IScrapingState => {
  switch (action.type) {
    case 'SET_URLS':
      return {
        ...state,
        urls:
          typeof action.payload === 'function'
            ? action.payload(state.urls) // Call the function with the current state
            : action.payload, // Use the payload directly if it's not a function
      };
    case 'SET_IS_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_API_ERROR':
      return { ...state, apiError: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'HANDLE_PAGE_TYPE_CHANGE': {
      const { pageType, urls } = action.payload;

      // If there are no URLs, directly update the selectedPageType
      if (urls.length === 0) {
        return {
          ...state,
          selectedPageType: pageType,
          showPageTypeWarning: false,
          pendingPageType: null,
        };
      }

      // Otherwise, show the warning and set the pendingPageType
      return { ...state, pendingPageType: pageType, showPageTypeWarning: true };
    }
    case 'HANDLE_CLEAR_URLS':
      return {
        ...state,
        urls: [],
        activeTab: 'urls',
      };
    case 'HANDLE_PAGE_TYPE_WARNING_CONFIRM': {
      const { pendingPageType } = state;

      if (!pendingPageType) {
        return state;
      }

      return {
        ...state,
        selectedPageType: pendingPageType,
        showPageTypeWarning: false,
        pendingPageType: null,
        urls: [],
        activeTab: 'urls',
        error: null,
        apiError: null,
        isProcessing: false,
      };
    }
    case 'HANDLE_PAGE_TYPE_WARNING_CANCEL': {
      return {
        ...state,
        showPageTypeWarning: false,
        pendingPageType: null,
      };
    }
    default:
      return state;
  }
};
