import { PAGE_TYPE_DISPLAY_NAMES } from '@/utils/ai-scraping/common-interfaces';
import { Badge } from '@/components/global/ui/badge';
import { ScrollArea } from '@/components/global/ui/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/global/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/global/ui/tooltip';
import { StatusBadge } from './status-badge';
import { AlertCircle, Download, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/global/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/global/ui/accordion';
import type { IScrapingTabsProps } from './interface';
import { formatDate, handleExportResults } from '@/utils/ai-scraping/helpers';
import { toast } from 'sonner';

export function ScrapingTabs({
  urlCounts,
  dispatch,
  state,
}: IScrapingTabsProps) {
  const selectedPageTypeDisplayName =
    PAGE_TYPE_DISPLAY_NAMES[state.selectedPageType];

  // Remove URL from the list
  const handleRemoveUrl = (id: string) => {
    dispatch({
      type: 'SET_URLS',
      payload: state.urls.filter((item) => item.id !== id),
    });
  };

  // Get completed URLs with results
  const completedUrls = state.urls.filter(
    (url) => url.status === 'completed' && url.result
  );

  return (
    <Tabs
      value={state.activeTab}
      onValueChange={(activeTab: string) => {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: activeTab });
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="urls">URLs ({urlCounts.total})</TabsTrigger>
        <TabsTrigger value="results" disabled={completedUrls.length === 0}>
          Results ({completedUrls.length})
        </TabsTrigger>
      </TabsList>

      {/* URLs Tab */}
      <TabsContent value="urls" className="mt-0">
        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
            <div className="font-medium">
              URLs to Process - {selectedPageTypeDisplayName}
            </div>
            <div className="flex gap-2">
              {urlCounts.total > 0 && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="bg-background">
                            {urlCounts.pending} pending
                          </Badge>
                          {urlCounts.processing > 0 && (
                            <Badge
                              variant="secondary"
                              className="animate-pulse"
                            >
                              {urlCounts.processing} processing
                            </Badge>
                          )}
                          {urlCounts.completed > 0 && (
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-800"
                            >
                              {urlCounts.completed} completed
                            </Badge>
                          )}
                          {urlCounts.error > 0 && (
                            <Badge variant="destructive">
                              {urlCounts.error} failed
                            </Badge>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Status summary of all URLs</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>

          {/* No URLs  */}
          {state.urls.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">
                No URLs added yet
              </div>
              <p className="text-sm text-muted-foreground">
                Add URLs above to extract {selectedPageTypeDisplayName} data
                from websites
              </p>
            </div>
          )}

          {/* URLS List */}
          {state.urls.length > 0 && (
            <ScrollArea className="h-[300px]">
              <div className="divide-y">
                {state.urls.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-start justify-between hover:bg-muted/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium truncate flex-1"
                        >
                          {item.url}
                          <ExternalLink className="inline-block size-3 ml-1" />
                        </a>
                        <StatusBadge status={item.status} />
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Added: {formatDate(item.addedAt)}
                        {item.processedAt &&
                          ` • Processed: ${formatDate(item.processedAt)}`}
                      </div>

                      {/* Show error message if there is one */}
                      {item.error && (
                        <div className="mt-1 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="size-3" />
                          {item.error}
                        </div>
                      )}

                      {/* Show brief result summary if completed */}
                      {item.status === 'completed' && item.result && (
                        <div className="mt-2 text-sm">
                          <div className="bg-muted/50 p-2 rounded">
                            <span className="block text-xs font-medium">
                              Data Retrieved
                            </span>
                            <span>
                              {Object.keys(item.result).length} fields •
                              {item.result.title
                                ? ` "${item.result.title.substring(0, 30)}${
                                    item.result.title.length > 30 ? '...' : ''
                                  }"`
                                : ' No title'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveUrl(item.id)}
                      disabled={state.isProcessing}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </TabsContent>

      {/* Results Tab */}
      <TabsContent value="results" className="mt-0">
        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
            <div className="font-medium">
              {selectedPageTypeDisplayName}
              Results ({completedUrls.length})
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const results = await handleExportResults(
                  state.urls,
                  state.selectedPageType
                );

                if (results.success) {
                  toast.success(results.message);
                } else {
                  toast.error(results.message);
                }
              }}
              disabled={completedUrls.length === 0}
              className="gap-1"
            >
              <Download className="size-3" />
              Export JSON
            </Button>
          </div>

          {/* No Completed Results */}
          {completedUrls.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">
                No results available
              </div>
              <p className="text-sm text-muted-foreground">
                Process URLs to see results here
              </p>
            </div>
          )}

          {/* Completed Results */}
          {completedUrls.length > 0 && (
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {completedUrls.map((item) => (
                  <Accordion type="single" collapsible key={item.id}>
                    <AccordionItem value={item.id} className="border-0">
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 text-left">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">
                              {item.url}
                            </span>
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-800"
                            >
                              Completed
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Processed: {formatDate(item.processedAt as Date)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-muted/30 p-4 rounded-md">
                          <h4 className="font-medium mb-2">
                            Scraped {selectedPageTypeDisplayName} Data
                          </h4>
                          <pre className="text-sm overflow-auto p-2 bg-background rounded border max-h-[300px]">
                            {JSON.stringify(item.result?.data, null, 2)}
                          </pre>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
