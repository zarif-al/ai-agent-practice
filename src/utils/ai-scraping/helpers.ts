import type { PageType, UrlItem } from './common-interfaces';

// URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

// Validate URL
export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}

// Format date
export function formatDate(date: Date) {
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Export results as JSON
export async function handleExportResults(
  urls: UrlItem[],
  selectedPageType: PageType
): Promise<{ success: boolean; message: string }> {
  const results = urls
    .filter((url) => url.status === 'completed' && url.result)
    .map((url) => url.result);

  if (results.length === 0) {
    return {
      success: false,
      message: 'No results to export',
    };
  }

  const fileName = `hr-scraping-results-${selectedPageType}-${
    new Date().toISOString().split('T')[0]
  }.json`;

  const fileContent = JSON.stringify(results, null, 2);

  // Check for `showSaveFilePicker` support
  if (window.showSaveFilePicker) {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      await writableStream.write(fileContent);
      await writableStream.close();

      return {
        success: true,
        message: 'Results exported successfully',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      return {
        success: false,
        message: `Failed to export results: ${errorMessage}`,
      };
    }
  } else {
    return {
      success: false,
      message: 'Your browser does not support the modern file saving API.',
    };
  }
}
