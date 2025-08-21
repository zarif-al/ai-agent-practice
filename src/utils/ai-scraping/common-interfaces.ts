import type { News, Person,HomePage } from '@/app/api/scrape-entity/schema';

// URL status types
export type UrlStatus = 'pending' | 'processing' | 'completed' | 'error';

// URL item interface
export interface UrlItem {
  id: string;
  url: string;
  status: UrlStatus;
  addedAt: Date;
  processedAt?: Date;
  error?: string;
  result?: IGeneratedObjectResult;
}

// AI Scrape results interface
export interface IGeneratedObjectResult {
  title: string;
  url: string;
  scrapedAt: string;
  domain: string;
  category: PageType;
  data: Person | News | HomePage;
}

// Page types
export type PageType = 'person' | 'news' | 'home';

// Page type display names
export const PAGE_TYPE_DISPLAY_NAMES: Record<PageType, string> = {
  person: 'Person',
  news: 'News',
  home: 'Home Page',
};

// URL counts interface
export interface IURLCounts {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  error: number;
}
