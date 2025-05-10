import {
  PAGE_TYPE_DISPLAY_NAMES,
  type PageType,
} from '@/app/ai-scraping/interface';
import { Label } from '@/components/global/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/global/ui/radio-group';
import type { IScrapingCategorySelection } from './interface';

export function ScrapingCategorySelection({
  handlePageTypeChange,
  isProcessing,
  selectedPageType,
}: IScrapingCategorySelection) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">
        Select Data Category to Scrape
      </h3>
      <RadioGroup
        value={selectedPageType}
        onValueChange={(value: PageType) => handlePageTypeChange(value)}
        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
        disabled={isProcessing}
      >
        {Object.entries(PAGE_TYPE_DISPLAY_NAMES).map(([value, label]) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={`category-${value}`} />
            <Label htmlFor={`category-${value}`} className="cursor-pointer">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
