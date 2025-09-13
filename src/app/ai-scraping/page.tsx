'use client';

import { useReducer } from 'react';
import { Loader2, Check, Download } from 'lucide-react';
import { Button } from '@/components/global/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/global/ui/card';
import { WarningDialog } from '@/components/ai-scraping/warning-modal';
import { ScrapingCategorySelection } from '@/components/ai-scraping/category-selection';
import { URLInputForm } from '@/components/ai-scraping/url-input-form';
import { ErrorAlert } from '@/components/ai-scraping/error-alert';
import { AppHeader } from '@/components/global/app-header';
import type { IURLCounts } from '@/utils/ai-scraping/common-interfaces';
import { initialScrapingState, scrapingReducer } from './reducer';
import { UrlList } from '@/components/ai-scraping/url-list';
import { scrapContent } from '../server-actions/scrape-data';
import { handleExportResults } from '@/utils/ai-scraping/helpers';

export default function ScrapingPage() {
  const [state, dispatch] = useReducer(scrapingReducer, initialScrapingState);
  const { urls, isProcessing, selectedCategory } = state;

  // Process all URLs with mocked responses
  const handleProcessUrls = async () => {
    // Get incomplete urls
    const incompleteUrls = urls.filter((url) => url.status !== 'completed');

    // If no incomplete URLs, exit
    if (incompleteUrls.length === 0) {
      dispatch({ type: 'SET_IS_PROCESSING', payload: false });

      return;
    }

    // Reset any previous errors
    dispatch({ type: 'SET_ERROR', payload: undefined });

    // Set processing state
    dispatch({ type: 'SET_IS_PROCESSING', payload: true });

    // Generate promises for each URL
    const promises = incompleteUrls.map(async (urlItem) => {
      // Set the URL to processing
      dispatch({
        type: 'SET_URLS',
        payload: (prevUrls) =>
          prevUrls.map((item) =>
            item.url === urlItem.url ? { ...item, status: 'processing' } : item
          ),
      });

      try {
        // Call server action to scrape content
        const result = await scrapContent({ item: urlItem });

        // Process result based on Page Type
        switch (urlItem.category) {
          case 'news': {
            dispatch({
              type: 'SET_URLS',
              payload: (prevUrls) =>
                prevUrls.map((item) =>
                  item.url === urlItem.url ? result : item
                ),
            });

            break;
          }
          case 'person': {
            dispatch({
              type: 'SET_URLS',
              payload: (prevUrls) =>
                prevUrls.map((item) =>
                  item.url === urlItem.url ? result : item
                ),
            });

            break;
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        // Handle errors
        dispatch({
          type: 'SET_URLS',
          payload: (prevUrls) =>
            prevUrls.map((item) =>
              item.url === urlItem.url
                ? {
                    ...item,
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
  };

  // Count URLs by status
  const urlCounts: IURLCounts = {
    total: urls.length,
    pending: urls.filter((u) => u.status === 'pending').length,
    processing: urls.filter((u) => u.status === 'processing').length,
    completed: urls.filter((u) => u.status === 'completed').length,
    error: urls.filter((u) => u.status === 'error').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader title="AI Scraping" disableSidebarToggle />

      <div className="container mx-auto py-6 px-4">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Data Scraping Tool</CardTitle>
            <CardDescription>
              Add URLs to extract entity specific data from websites.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Category Selection */}
            <ScrapingCategorySelection dispatch={dispatch} state={state} />

            {/* URL Input Form */}
            <URLInputForm dispatch={dispatch} state={state} />

            {/* API Error Alert */}
            <ErrorAlert dispatch={dispatch} state={state} />

            {/* Unified Results View */}
            <UrlList urlCounts={urlCounts} dispatch={dispatch} state={state} />
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  dispatch({ type: 'HANDLE_CLEAR_URLS' });
                }}
                disabled={urls.length === 0 || isProcessing}
              >
                Clear All
              </Button>

              <Button
                variant="outline"
                onClick={() => handleExportResults(urls, selectedCategory)}
                disabled={isProcessing}
                className="gap-1"
              >
                <Download className="size-4 mr-1" />
                Export Results
              </Button>
            </div>

            <Button
              onClick={handleProcessUrls}
              disabled={
                urls.length === 0 || isProcessing || urlCounts.pending === 0
              }
              className="gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Process URLs
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <WarningDialog dispatch={dispatch} state={state} />
      </div>
    </div>
  );
}
