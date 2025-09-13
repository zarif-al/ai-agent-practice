import { Badge } from '@/components/global/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/global/ui/dialog';
import type { UrlItem } from '@/utils/ai-scraping/common-interfaces';
import { ResultsWithSelector } from './results';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedItem: UrlItem | null;
}

export function URLScrapeResults({ isOpen, setIsOpen, selectedItem }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-6xl min-h-[85vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            Results for: {selectedItem?.url}
            {selectedItem?.results && selectedItem.results.length > 1 && (
              <Badge variant="secondary" className="ml-2">
                {selectedItem.results.length} results
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Here is the results of the scraping for the URL:
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[calc(85vh-80px)] overflow-hidden">
          {selectedItem?.results && selectedItem.results.length > 0 && (
            <ResultsWithSelector results={selectedItem.results} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
