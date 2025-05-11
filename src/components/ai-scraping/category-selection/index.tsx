import { Label } from '@/components/global/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/global/ui/radio-group';
import type { IScrapingCategorySelection } from './interface';
import {
  PAGE_TYPE_DISPLAY_NAMES,
  type PageType,
} from '../../../utils/ai-scraping/common-interfaces';

export function ScrapingCategorySelection({
  dispatch,
  state,
}: IScrapingCategorySelection) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Select Page Type to Scrape</h3>
      <RadioGroup
        value={state.selectedPageType}
        onValueChange={(pageType: PageType) => {
          dispatch({
            type: 'HANDLE_PAGE_TYPE_CHANGE',
            payload: { pageType, urls: state.urls },
          });
        }}
        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
        disabled={state.isProcessing}
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
