import type { IScrapingCategorySelection } from './interface';
import {
  CATEGORY_DISPLAY_NAMES,
  type Category,
} from '../../../utils/ai-scraping/common-interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/global/ui/select';

export function ScrapingCategorySelection({
  dispatch,
  state,
}: IScrapingCategorySelection) {
  return (
    <div className="mb-6 gap-2">
      <Select
        value={state.selectedCategory}
        onValueChange={(category: Category) => {
          dispatch({
            type: 'HANDLE_PAGE_TYPE_CHANGE',
            payload: { category, urls: state.urls },
          });
        }}
        disabled={state.isProcessing}
      >
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'none'}>Select a Category</SelectItem>
          {Object.entries(CATEGORY_DISPLAY_NAMES).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
