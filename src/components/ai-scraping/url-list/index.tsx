import { PAGE_TYPE_DISPLAY_NAMES } from '@/utils/ai-scraping/common-interfaces';
import type { IUrlListProps } from './interface';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/global/ui/accordion';
import { StatusBadge } from './status-badge';
import { AlertCircle, ExternalLink, Loader2, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/ai-scraping/helpers';
import { Button } from '@/components/global/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/global/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/global/ui/tooltip';
import { Badge } from '@/components/global/ui/badge';

export function UrlList({ dispatch, state, urlCounts }: IUrlListProps) {
  const selectedPageType = state.selectedPageType;

  const selectedPageTypeDisplayName = PAGE_TYPE_DISPLAY_NAMES[selectedPageType];

  const activeUrls = state.urls[selectedPageType] || [];

  const handleRemoveUrl = (id: string) => {
    dispatch({
      type: 'SET_URLS',
      payload: (prevUrls) => ({
        ...prevUrls,
        [selectedPageType]: prevUrls[selectedPageType].filter(
          (item) => item.id !== id
        ),
      }),
    });
  };

  return (
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
                        <Badge variant="secondary" className="animate-pulse">
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

      {activeUrls.length == 0 && (
        <div className="p-8 text-center">
          <div className="text-muted-foreground mb-2">No URLs added yet</div>
          <p className="text-sm text-muted-foreground">
            Add URLs above to extract {selectedPageTypeDisplayName} data from
            websites
          </p>
        </div>
      )}

      {activeUrls.length > 0 && (
        <ScrollArea className="h-[500px]">
          <div className="divide-y">
            {activeUrls.map((item) => (
              <Accordion type="single" collapsible key={item.id}>
                <AccordionItem value={item.id} className="border-0 ">
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium truncate"
                          onClick={(e) => e.stopPropagation()}
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
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveUrl(item.id);
                        }}
                        disabled={state.isProcessing}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        <span className="sr-only">Remove</span>
                      </Button>

                      <AccordionTrigger className="cursor-pointer text-muted-foreground" />
                    </div>
                  </div>

                  <AccordionContent className="px-4 pb-4">
                    {/* Show error message if there is one */}
                    {item.error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="size-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{item.error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Show loading state if processing */}
                    {item.status === 'processing' && (
                      <div className="flex items-center justify-center p-8">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="size-8 text-primary animate-spin" />
                          <p className="text-sm text-muted-foreground">
                            Processing URL...
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Show results if completed */}
                    {item.status === 'completed' && item.result && (
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="font-medium mb-2">
                          Scraped {selectedPageTypeDisplayName} Data
                        </h4>
                        <pre className="text-sm overflow-auto p-2 bg-background rounded border max-h-[300px]">
                          {JSON.stringify(item.result, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Show pending state */}
                    {item.status === 'pending' && (
                      <div className="flex items-center justify-center p-8">
                        <p className="text-sm text-muted-foreground">
                          URL is pending processing
                        </p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
