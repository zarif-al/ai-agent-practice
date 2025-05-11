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
import type {
  IGeneratedObjectResult,
  IURLCounts,
  PageType,
} from '@/utils/ai-scraping/common-interfaces';
import { initialScrapingState, scrapingReducer } from './reducer';

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

    // Update all pending URLs to processing
    dispatch({
      type: 'SET_URLS',
      payload: urls.map((item) =>
        item.status === 'pending' ? { ...item, status: 'processing' } : item
      ),
    });

    try {
      // Simulate API processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process each URL with mocked data
      const mockResults = pendingUrls.map((item) => {
        try {
          // Simulate occasional errors (10% chance)
          if (Math.random() < 0.1) {
            throw new Error('Failed to access website');
          }

          // Extract domain for mock data generation
          const domain = new URL(item.url).hostname.replace('www.', '');

          // Generate mock data based on the URL and selected category
          const mockData = generateMockData(item.url, domain, selectedPageType);

          return {
            url: item.url,
            data: mockData,
            error: null,
          };
        } catch (error) {
          return {
            url: item.url,
            data: null,
            error:
              error instanceof Error ? error.message : 'Failed to process URL',
          };
        }
      });

      // Update the URLs with the results
      dispatch({
        type: 'SET_URLS',
        payload: urls.map((urlItem) => {
          // Find this URL in the mock results
          const result = mockResults.find((r) => r.url === urlItem.url);

          if (result && urlItem.status === 'processing') {
            return {
              ...urlItem,
              status: result.error ? 'error' : 'completed',
              processedAt: new Date(),
              error: result.error || undefined,
              result: result.data || undefined,
            };
          }
          return urlItem;
        }),
      });

      // If we have results, switch to the results tab
      if (mockResults.some((r) => !r.error)) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: 'results' });
      }
    } catch (err) {
      console.error('Error processing URLs:', err);

      dispatch({ type: 'SET_API_ERROR', payload: 'Failed to process URLs' });

      // Mark all processing URLs as error
      dispatch({
        type: 'SET_URLS',
        payload: urls.map((item) =>
          item.status === 'processing'
            ? {
                ...item,
                status: 'error',
                processedAt: new Date(),
                error: 'Processing failed',
              }
            : item
        ),
      });
    } finally {
      // Reset processing state
      dispatch({ type: 'SET_IS_PROCESSING', payload: false });
    }
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

// Helper function to generate mock data based on the URL and category
function generateMockData(
  url: string,
  domain: string,
  pageType: PageType
): IGeneratedObjectResult | null {
  // Generate different types of data based on the URL path and selected category
  const path = new URL(url).pathname.toLowerCase();

  // Basic data that all responses will have
  const baseData = {
    title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - ${
      path.length > 1 ? path.split('/').pop() : 'Home Page'
    }`,
    url: url,
    scrapedAt: new Date().toISOString(),
    domain: domain,
    category: pageType,
  };

  // Generate category-specific data
  switch (pageType) {
    case 'person':
      return {
        ...baseData,
        result: {
          preNominal: 'Mr.',
          postNominal: 'PhD',
          firstName: 'John',
          lastName: 'Doe',
          slug: `${domain}-john-doe`,
          seo: {
            title: `Profile of ${domain} - John Doe`,
            description: `Learn more about John Doe, a key figure at ${domain}.`,
            keywords: ['HR', 'Profile', 'John Doe', domain],
          },
          position: 'Senior HR Manager',
          contactLinks: [
            {
              icon: 'email',
              link: `mailto:john.doe@${domain}.com`,
            },
            {
              icon: 'linkedin',
              link: `https://www.linkedin.com/in/johndoe`,
            },
            {
              icon: 'phone',
              link: `tel:+1234567890`,
            },
          ],
          image: `https://example.com/images/${domain}-john-doe.jpg`,
          content: `<p>John Doe is a Senior HR Manager at ${domain}. He has over 10 years of experience in the HR field.</p>`,
        },
      };

    case 'news':
      return {
        ...baseData,
        result: {
          name: `Latest News from ${domain}`,
          slug: `${domain}-latest-news`,
          image: `https://example.com/images/${domain}-news.jpg`,
          content: `<p>Stay updated with the latest news from ${domain}. We cover all the important events and updates.</p>`,
          publishDate: new Date(),
        },
      };

    default:
      // Fallback to generic data
      return null;
  }
}
