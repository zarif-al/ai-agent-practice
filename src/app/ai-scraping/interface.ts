import type { News, Person } from '../api/scrape-entity/v1/schema';

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

export interface IGeneratedObjectResult {
  title: string;
  url: string;
  scrapedAt: string;
  domain: string;
  category: PageType;
  result: Person | News;
}

// Category types
export type PageType = 'person' | 'news';

// Category display names
export const PAGE_TYPE_DISPLAY_NAMES: Record<PageType, string> = {
  person: 'Person',
  news: 'News',
};

export interface IURLCounts {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  error: number;
}
