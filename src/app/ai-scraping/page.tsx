'use client';

import { useReducer, useMemo } from 'react';
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
import type { IStatusCounts } from '@/utils/ai-scraping/common-interfaces';
import { initialScrapingState, scrapingReducer } from './reducer';
import { ItemList } from '@/components/ai-scraping/item-list';
import { handleExportResults } from '@/utils/ai-scraping/helpers';
import { handleProcessItems } from './utils';

export default function ScrapingPage() {
  const [state, dispatch] = useReducer(scrapingReducer, initialScrapingState);
  const { items, isProcessing, selectedCategory } = state;

  // Count URLs by status
  const statusCounts: IStatusCounts = useMemo(
    () => ({
      total: items.length,
      pending: items.filter((u) => u.status === 'pending').length,
      processing: items.filter((u) => u.status === 'processing').length,
      completed: items.filter((u) => u.status === 'completed').length,
      error: items.filter((u) => u.status === 'error').length,
    }),
    [items]
  );

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
            <ItemList
              statusCounts={statusCounts}
              dispatch={dispatch}
              state={state}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  dispatch({ type: 'HANDLE_CLEAR_URLS' });
                }}
                disabled={items.length === 0 || isProcessing}
              >
                Clear All
              </Button>

              <Button
                variant="outline"
                onClick={() => handleExportResults(items, selectedCategory)}
                disabled={isProcessing}
                className="gap-1"
              >
                <Download className="size-4 mr-1" />
                Export Results
              </Button>
            </div>

            <Button
              onClick={() => handleProcessItems({ items, dispatch })}
              disabled={
                items.length === 0 || isProcessing || statusCounts.pending === 0
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
