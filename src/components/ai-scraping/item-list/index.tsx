import {
  CATEGORY_DISPLAY_NAMES,
  type UrlItem,
} from '@/utils/ai-scraping/common-interfaces';
import type { IItemListProps } from './interface';
import { StatusBadge } from './components/status-badge';
import { ExternalLink, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/ai-scraping/helpers';
import { Button } from '@/components/global/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/global/ui/tooltip';
import { Badge } from '@/components/global/ui/badge';
import { ScrollArea } from '@/components/global/ui/scroll-area';
import { useState } from 'react';
import { URLScrapeResults } from './components/modal';

export function ItemList({ dispatch, state, statusCounts }: IItemListProps) {
  const [selectedItem, setSelectedItem] = useState<UrlItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedPageTypeDisplayName =
    CATEGORY_DISPLAY_NAMES[state.selectedCategory];

  const handleRemoveUrl = (id: string) => {
    dispatch({
      type: 'SET_ITEMS',
      payload: (prevUrls) => prevUrls.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="border rounded-md">
      {/* Top Bar */}
      <div className="p-3 border-b bg-muted/50 flex justify-between items-center">
        <div className="font-medium">
          URLs to Process - {selectedPageTypeDisplayName}
        </div>
        <div className="flex gap-2">
          {statusCounts.total > 0 && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="bg-background">
                        {statusCounts.pending} pending
                      </Badge>
                      {statusCounts.processing > 0 && (
                        <Badge variant="secondary" className="animate-pulse">
                          {statusCounts.processing} processing
                        </Badge>
                      )}
                      {statusCounts.completed > 0 && (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          {statusCounts.completed} completed
                        </Badge>
                      )}
                      {statusCounts.error > 0 && (
                        <Badge variant="destructive">
                          {statusCounts.error} failed
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

      {state.items.length == 0 && (
        <div className="p-8 text-center">
          <div className="text-muted-foreground mb-2">No URLs added yet</div>
          <p className="text-sm text-muted-foreground">
            Add URLs above to extract {selectedPageTypeDisplayName} data from
            websites
          </p>
        </div>
      )}

      {/* URL List */}
      {state.items.length > 0 && (
        <ScrollArea className="h-[500px]">
          <div className="divide-y">
            {state.items.map((item) => (
              <div
                className="flex items-center justify-between px-4 py-3 hover:bg-muted/30"
                key={item.id}
                onClick={() => {
                  if (item.status === 'completed') {
                    setSelectedItem(item);
                    setIsDialogOpen(true);
                  }
                }}
              >
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
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* URL Scrape Results Modal */}
      <URLScrapeResults
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
}
