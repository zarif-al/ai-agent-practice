import {
  PAGE_TYPE_DISPLAY_NAMES,
  type IURLCounts,
  type PageType,
  type UrlItem,
} from '@/app/ai-scraping/interface';
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

interface Props {
  urlCounts: IURLCounts;
  urls: UrlItem[];
  isProcessing: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedPageType: PageType;
  setUrls: React.Dispatch<React.SetStateAction<UrlItem[]>>;
}

export function ScrapingTabs({
  urlCounts,
  urls,
  isProcessing,
  activeTab,
  setActiveTab,
  selectedPageType,
  setUrls,
}: Props) {
  // Remove URL from the list
  const handleRemoveUrl = (id: string) => {
    setUrls((prev) => prev.filter((item) => item.id !== id));
  };

  // Get completed URLs with results
  const completedUrls = urls.filter(
    (url) => url.status === 'completed' && url.result
  );

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Export results as JSON
  const handleExportResults = () => {
    const results = urls
      .filter((url) => url.status === 'completed' && url.result)
      .map((url) => url.result);

    if (results.length === 0) {
      return;
    }

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });

    // Blob URL Download - a better way would be `showSaveFilePicker`
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr-scraping-results-${selectedPageType}-${
      new Date().toISOString().split('T')[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              URLs to Process - {PAGE_TYPE_DISPLAY_NAMES[selectedPageType]}
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
          {urls.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">
                No URLs added yet
              </div>
              <p className="text-sm text-muted-foreground">
                Add URLs above to extract{' '}
                {PAGE_TYPE_DISPLAY_NAMES[selectedPageType]} data from websites
              </p>
            </div>
          )}

          {/* URLS List */}
          {urls.length > 0 && (
            <ScrollArea className="h-[300px]">
              <div className="divide-y">
                {urls.map((item) => (
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
                      disabled={isProcessing}
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
              {PAGE_TYPE_DISPLAY_NAMES[selectedPageType]} Results (
              {completedUrls.length})
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportResults}
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
                            Scraped {PAGE_TYPE_DISPLAY_NAMES[selectedPageType]}{' '}
                            Data
                          </h4>
                          <pre className="text-sm overflow-auto p-2 bg-background rounded border max-h-[300px]">
                            {JSON.stringify(item.result, null, 2)}
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
