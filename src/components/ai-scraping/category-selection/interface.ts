import type { PageType } from '@/app/ai-scraping/interface';

export interface IScrapingCategorySelection {
  selectedPageType: PageType;
  handlePageTypeChange: (value: PageType) => void;
  isProcessing: boolean;
}
