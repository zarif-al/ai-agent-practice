'use client';

import { useReducer } from 'react';
import { Loader2, Check } from 'lucide-react';
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
import { ScrapingTabs } from '@/components/ai-scraping/tabs';
import { AppHeader } from '@/components/global/app-header';
import type { IURLCounts } from '@/utils/ai-scraping/common-interfaces';
import { initialScrapingState, scrapingReducer } from './reducer';
import { newsSchema, peopleSchema } from '../api/scrape-entity/schema';

export default function ScrapingPage() {
  const [state, dispatch] = useReducer(scrapingReducer, initialScrapingState);
  const { urls, isProcessing, selectedPageType } = state;

  // Process all URLs with mocked responses
  const handleProcessUrls = async () => {
    if (urls.length === 0) {
      dispatch({ type: 'SET_API_ERROR', payload: 'No URLs to process' });
      return;
    }

    // Reset any previous errors
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_API_ERROR', payload: null });

    // Set processing state
    dispatch({ type: 'SET_IS_PROCESSING', payload: true });

    // Get only pending URLs
    const pendingUrls = urls.filter((url) => url.status === 'pending');

    if (pendingUrls.length === 0) {
      dispatch({ type: 'SET_IS_PROCESSING', payload: false });
      return;
    }

    // Loop over all URLs and process them
    for (const urlItem of pendingUrls) {
      // Set the URL to processing
      dispatch({
        type: 'SET_URLS',
        payload: urls.map((item) =>
          item.url === urlItem.url ? { ...item, status: 'processing' } : item
        ),
      });

      // Call API to generate object
      const result = await fetch('/api/scrape-entity/v1', {
        method: 'POST',
        body: JSON.stringify({
          url: urlItem.url,
          pageType: selectedPageType,
        }),
      });

      // Check if the response is ok
      if (!result.ok) {
        // Set error on the URL
        dispatch({
          type: 'SET_URLS',
          payload: urls.map((item) =>
            item.url === urlItem.url
              ? {
                  ...item,
                  status: 'error',
                  error: 'Failed to process URL',
                }
              : item
          ),
        });

        continue;
      }

      // Parse the response
      const resultJSON = await result.json();

      // Process result based on Page Type
      switch (urlItem.pageType) {
        case 'news': {
          const { success, data } = newsSchema.safeParse(resultJSON);

          if (!success) {
            dispatch({
              type: 'SET_URLS',
              payload: urls.map((item) =>
                item.url === urlItem.url
                  ? {
                      ...item,
                      status: 'error',
                      error: 'Failed to parse news data',
                    }
                  : item
              ),
            });

            continue;
          }

          // Update the URL with the parsed data
          dispatch({
            type: 'SET_URLS',
            payload: urls.map((item) =>
              item.url === urlItem.url
                ? {
                    ...item,
                    status: 'completed',
                    processedAt: new Date(),
                    result: {
                      title: data.name,
                      category: 'news',
                      url: item.url,
                      scrapedAt: new Date().toISOString(),
                      domain: new URL(item.url).hostname,
                      data,
                    },
                  }
                : item
            ),
          });
        }
        case 'person': {
          const { success, data } = peopleSchema.safeParse(resultJSON);

          if (!success) {
            dispatch({
              type: 'SET_URLS',
              payload: urls.map((item) =>
                item.url === urlItem.url
                  ? {
                      ...item,
                      status: 'error',
                      error: 'Failed to parse person data',
                    }
                  : item
              ),
            });

            continue;
          }

          // Update the URL with the parsed data
          dispatch({
            type: 'SET_URLS',
            payload: urls.map((item) =>
              item.url === urlItem.url
                ? {
                    ...item,
                    status: 'completed',
                    processedAt: new Date(),
                    result: {
                      title: `${data.preNominal} ${data.firstName} ${data.lastName} ${data.postNominal}`,
                      category: 'person',
                      url: item.url,
                      scrapedAt: new Date().toISOString(),
                      domain: new URL(item.url).hostname,
                      data,
                    },
                  }
                : item
            ),
          });
        }
      }
    }

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

            {/* Tabs for URLs and Results */}
            <ScrapingTabs
              urlCounts={urlCounts}
              dispatch={dispatch}
              state={state}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
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
