import type { News } from '@/app/server-actions/scrape-data/schema/news';
import type { Person } from '@/app/server-actions/scrape-data/schema/person';

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
  category: Category;
}

// AI Scrape results interface
export interface IGeneratedObjectResult {
  title: string;
  url: string;
  scrapedAt: string;
  domain: string;
  category: Category;
  data: Person | News;
}

export type Category = 'general_page' | 'person' | 'news';

export const CATEGORY_DISPLAY_NAMES: Record<Category, string> = {
  person: 'Person',
  news: 'News',
  general_page: 'General Page',
};

// URL counts interface
export interface IURLCounts {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  error: number;
}
