import {
  PAGE_TYPE_DISPLAY_NAMES,
  type PageType,
  type UrlItem,
} from '@/app/ai-scraping/interface';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input';
import { Plus } from 'lucide-react';
import type React from 'react';

interface IURLInputFormProps {
  inputUrl: string;
  setInputUrl: (url: string) => void;
  isProcessing: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  selectedPageType: PageType;
  urls: UrlItem[];
  setUrls: React.Dispatch<React.SetStateAction<UrlItem[]>>;
}

export function URLInputForm({
  error,
  inputRef,
  inputUrl,
  isProcessing,
  setError,
  setInputUrl,
  selectedPageType,
  setUrls,
  urls,
}: IURLInputFormProps) {
  const handleAddUrl = () => {
    // Trim the URL and ensure it has a protocol
    let trimmedUrl = inputUrl.trim();

    if (
      !trimmedUrl.startsWith('http://') &&
      !trimmedUrl.startsWith('https://')
    ) {
      trimmedUrl = 'https://' + trimmedUrl;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    // Check if URL already exists in the list
    if (
      urls.some((item) => item.url.toLowerCase() === trimmedUrl.toLowerCase())
    ) {
      setError('This URL is already in the list');
      return;
    }

    // Add URL to the list
    const newUrlItem: UrlItem = {
      id: `url-${Date.now()}`,
      url: trimmedUrl,
      status: 'not started',
      addedAt: new Date(),
    };

    setUrls((prev) => [...prev, newUrlItem]);

    setInputUrl('');

    setError(null);
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUrl();
        }}
        className="flex gap-2"
      >
        <div className="flex-1">
          <Input
            ref={inputRef}
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              if (error) setError(null);
            }}
            placeholder={`Enter website URL for ${PAGE_TYPE_DISPLAY_NAMES[selectedPageType]} data`}
            className="w-full"
            disabled={isProcessing}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <Button type="submit" disabled={!inputUrl.trim() || isProcessing}>
          <Plus className="size-4 mr-2" />
          Add URL
        </Button>
      </form>
    </div>
  );
}

// URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

// Validate URL
function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}
