import {
  PAGE_TYPE_DISPLAY_NAMES,
  type UrlItem,
} from '@/utils/ai-scraping/common-interfaces';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input';
import { Plus } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { isValidUrl } from '@/utils/ai-scraping/helpers';
import type { IURLInputFormProps } from './interface';

export function URLInputForm({ dispatch, state }: IURLInputFormProps) {
  const [inputUrl, setInputUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddUrl = () => {
    // TODO: Trim the trailing slash
    // Trim the URL and ensure it has a protocol
    let trimmedUrl = inputUrl.trim();

    if (
      !trimmedUrl.startsWith('http://') &&
      !trimmedUrl.startsWith('https://')
    ) {
      trimmedUrl = 'https://' + trimmedUrl;
    }

    if (!isValidUrl(trimmedUrl)) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please enter a valid URL',
      });

      return;
    }

    // Check if URL already exists in the list
    if (
      state.urls.some(
        (item) => item.url.toLowerCase() === trimmedUrl.toLowerCase()
      )
    ) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'This URL is already in the list',
      });

      return;
    }

    // Add URL to the list
    const newUrlItem: UrlItem = {
      id: `url-${Date.now()}`,
      url: trimmedUrl,
      status: 'pending',
      addedAt: new Date(),
      pageType: state.selectedPageType,
    };

    dispatch({
      type: 'SET_URLS',
      payload: [...state.urls, newUrlItem],
    });

    setInputUrl('');

    dispatch({ type: 'SET_ERROR', payload: null });
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

              // Reset Error on input change
              dispatch({
                type: 'SET_ERROR',
                payload: null,
              });
            }}
            placeholder={`Enter website URL for ${
              PAGE_TYPE_DISPLAY_NAMES[state.selectedPageType]
            } data`}
            className="w-full"
            disabled={state.isProcessing}
          />
          {state.error && (
            <p className="text-sm text-destructive mt-1">{state.error}</p>
          )}
        </div>
        <Button type="submit" disabled={!inputUrl.trim() || state.isProcessing}>
          <Plus className="size-4 mr-2" />
          Add URL
        </Button>
      </form>
    </div>
  );
}
