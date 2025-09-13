import type { UrlItem } from '@/utils/ai-scraping/common-interfaces';
import type { ScrapingAction } from './reducer/interface';
import type { Dispatch } from 'react';
import { scrapContent } from '../server-actions/scrape-data';

interface IHandleProcessItemsProps {
  items: UrlItem[];
  dispatch: Dispatch<ScrapingAction>;
}

export async function handleProcessItems({
  items,
  dispatch,
}: IHandleProcessItemsProps) {
  // Get incomplete items
  const incompleteItems = items.filter((item) => item.status !== 'completed');

  // If no incomplete items, exit
  if (incompleteItems.length === 0) {
    dispatch({ type: 'SET_IS_PROCESSING', payload: false });

    return;
  }

  // Reset any previous errors
  dispatch({ type: 'SET_ERROR', payload: undefined });

  // Set processing state
  dispatch({ type: 'SET_IS_PROCESSING', payload: true });

  // Generate promises for each item
  const promises = incompleteItems.map(async (item) => {
    // Set the item to processing
    dispatch({
      type: 'SET_ITEMS',
      payload: (prevItems) =>
        prevItems.map((i) =>
          item.url === i.url ? { ...item, status: 'processing' } : i
        ),
    });

    try {
      // Call server action to scrape content
      const result = await scrapContent({ item });

      // Process result based on Page Type
      dispatch({
        type: 'SET_ITEMS',
        payload: (prevItems) =>
          prevItems.map((i) => (i.url === item.url ? result : i)),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      // Handle errors
      dispatch({
        type: 'SET_ITEMS',
        payload: (prevItems) =>
          prevItems.map((i) =>
            i.url === item.url
              ? {
                  ...i,
                  status: 'error',
                  error: errorMessage,
                }
              : item
          ),
      });
    }
  });

  // Call Promise.all to wait for all promises to resolve
  await Promise.all(promises);

  // Reset processing state
  dispatch({ type: 'SET_IS_PROCESSING', payload: false });
}
