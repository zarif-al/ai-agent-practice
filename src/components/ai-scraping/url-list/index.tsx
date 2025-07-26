import { CATEGORY_DISPLAY_NAMES } from '@/utils/ai-scraping/common-interfaces';
import type { IUrlListProps, IViewMode } from './interface';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/global/ui/accordion';
import { StatusBadge } from './components/status-badge';
import {
  AlertCircle,
  Code,
  ExternalLink,
  Layout,
  Loader2,
  Trash2,
} from 'lucide-react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/global/ui/tabs';
import { useState } from 'react';
import { ScrollArea } from '@/components/global/ui/scroll-area';
import { RenderUiView } from './components/render-ui';
import { ConfidenceBadge } from './components/confidence-badge';

export function UrlList({ dispatch, state, urlCounts }: IUrlListProps) {
  const [viewModes, setViewModes] = useState<IViewMode[]>(
    state.urls.map((url) => ({
      id: url.id,
      viewMode: 'json',
    }))
  );

  const selectedPageTypeDisplayName =
    CATEGORY_DISPLAY_NAMES[state.selectedCategory];

  const handleRemoveUrl = (id: string) => {
    dispatch({
      type: 'SET_URLS',
      payload: (prevUrls) => prevUrls.filter((item) => item.id !== id),
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

      {state.urls.length == 0 && (
        <div className="p-8 text-center">
          <div className="text-muted-foreground mb-2">No URLs added yet</div>
          <p className="text-sm text-muted-foreground">
            Add URLs above to extract {selectedPageTypeDisplayName} data from
            websites
          </p>
        </div>
      )}

      {state.urls.length > 0 && (
        <ScrollArea className="h-[500px]">
          <div className="divide-y">
            {state.urls.map((item) => (
              <Accordion type="single" collapsible key={item.id}>
                <AccordionItem value={item.id} className="border-0">
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

                        {item.result && (
                          <ConfidenceBadge
                            confidence={item.result.data.confidenceLevel}
                          />
                        )}
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

                  <AccordionContent className="px-4 pb-4 overflow-hidden">
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
                      <div className="mb-4">
                        <Tabs
                          value={
                            viewModes.find((mode) => mode.id === item.id)
                              ?.viewMode || 'json'
                          }
                          onValueChange={(value) => {
                            setViewModes((prev) => {
                              const updatedModes = prev.map((mode) => {
                                if (mode.id === item.id) {
                                  return {
                                    ...mode,
                                    viewMode: value as IViewMode['viewMode'],
                                  };
                                }
                                return mode;
                              });

                              return updatedModes;
                            });
                          }}
                          className="w-full"
                        >
                          <TabsList className="grid w-full max-w-xs grid-cols-2">
                            <TabsTrigger
                              value="json"
                              className="flex items-center gap-1"
                            >
                              <Code className="size-4" />
                              <span>JSON View</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="ui"
                              className="flex items-center gap-1"
                            >
                              <Layout className="size-4" />
                              <span>UI View</span>
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="json">
                            <div className="bg-muted/30 p-4 rounded-md overflow-hidden">
                              <h4 className="font-medium mb-2">
                                Scraped {selectedPageTypeDisplayName} Data
                                (JSON)
                              </h4>
                              <pre className="text-sm overflow-auto p-2 bg-background rounded border max-h-[300px] whitespace-pre-wrap break-all">
                                {JSON.stringify(item.result, null, 2)}
                              </pre>
                            </div>
                          </TabsContent>
                          <TabsContent value="ui">
                            <div className="bg-muted/30 p-4 rounded-md">
                              <h4 className="font-medium mb-2">
                                Scraped {selectedPageTypeDisplayName} Data (UI)
                              </h4>
                              <div className="bg-background rounded border p-4 overflow-x-auto">
                                <RenderUiView
                                  result={item.result}
                                  selectedPageTypeDisplayName={
                                    selectedPageTypeDisplayName
                                  }
                                />
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
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
