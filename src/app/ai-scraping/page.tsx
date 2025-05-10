'use client';

import { useState, useRef, useEffect } from 'react';
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
import {
  type IGeneratedObjectResult,
  type IURLCounts,
  type PageType,
  type UrlItem,
} from './interface';
import { WarningDialog } from '@/components/ai-scraping/warning-modal';
import { ScrapingCategorySelection } from '@/components/ai-scraping/category-selection';
import { URLInputForm } from '@/components/ai-scraping/url-input-form';
import { ErrorAlert } from '@/components/ai-scraping/error-alert';
import { ScrapingTabs } from '@/components/ai-scraping/tabs';

export default function ScrapingPage() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('urls');

  // Page type selection state
  const [selectedPageType, setSelectedCategory] = useState<PageType>('person');
  const [showPageTypeWarning, setShowPageTypeWarning] = useState(false);
  const [pendingPageType, setPendingPageType] = useState<PageType | null>(null);

  // Focus input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle category change
  const handlePageTypeChange = (pageType: PageType) => {
    // If there are no URLs or results, just change the category
    if (urls.length === 0) {
      setSelectedCategory(pageType);
      return;
    }

    // Otherwise, show warning and store the pending category
    setPendingPageType(pageType);
    setShowPageTypeWarning(true);
  };

  // Process all URLs with mocked responses
  const handleProcessUrls = async () => {
    if (urls.length === 0) {
      setError('Please add at least one URL to process');
      return;
    }

    // Reset any previous errors
    setApiError(null);
    setIsProcessing(true);

    // Get only pending URLs
    const pendingUrls = urls.filter((url) => url.status === 'pending');

    if (pendingUrls.length === 0) {
      setIsProcessing(false);
      return;
    }

    // Update all pending URLs to processing
    setUrls((prev) =>
      prev.map((item) =>
        item.status === 'pending' ? { ...item, status: 'processing' } : item
      )
    );

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
      setUrls((prev) =>
        prev.map((urlItem) => {
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
        })
      );

      // If we have results, switch to the results tab
      if (mockResults.some((r) => !r.error)) {
        setActiveTab('results');
      }
    } catch (err) {
      console.error('Error processing URLs:', err);
      setApiError(
        err instanceof Error ? err.message : 'Failed to process URLs'
      );

      // Mark all processing URLs as error
      setUrls((prev) =>
        prev.map((item) =>
          item.status === 'processing'
            ? {
                ...item,
                status: 'error',
                processedAt: new Date(),
                error: 'Processing failed',
              }
            : item
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear all URLs
  const handleClearUrls = () => {
    if (isProcessing) return;
    setUrls([]);
    setActiveTab('urls');
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
    <div className="container mx-auto py-6 px-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>HR Data Scraping Tool</CardTitle>
          <CardDescription>
            Add URLs to extract HR data from websites, job boards, and company
            pages
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Category Selection */}
          <ScrapingCategorySelection
            handlePageTypeChange={handlePageTypeChange}
            isProcessing={isProcessing}
            selectedPageType={selectedPageType}
          />

          {/* URL Input Form */}
          <URLInputForm
            error={error}
            inputRef={inputRef}
            inputUrl={inputUrl}
            isProcessing={isProcessing}
            setError={setError}
            setInputUrl={setInputUrl}
            selectedPageType={selectedPageType}
            setUrls={setUrls}
            urls={urls}
          />

          {/* API Error Alert */}
          <ErrorAlert apiError={apiError} setApiError={setApiError} />

          {/* Tabs for URLs and Results */}
          <ScrapingTabs
            activeTab={activeTab}
            isProcessing={isProcessing}
            selectedPageType={selectedPageType}
            setActiveTab={setActiveTab}
            urlCounts={urlCounts}
            urls={urls}
            setUrls={setUrls}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleClearUrls}
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

      <WarningDialog
        cancelPageTypeChange={() => {
          setShowPageTypeWarning(false);
          setPendingPageType(null);
        }}
        confirmPageTypeChange={() => {
          if (pendingPageType) {
            setSelectedCategory(pendingPageType);

            // Reset URLs and results
            setUrls([]);
            setActiveTab('urls');
            setError(null);
            setApiError(null);
          }

          setShowPageTypeWarning(false);
          setPendingPageType(null);
        }}
        setPageTypeWarning={setShowPageTypeWarning}
        showPageTypeWarning={showPageTypeWarning}
      />
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
