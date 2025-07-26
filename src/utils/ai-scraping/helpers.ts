import type { Category, UrlItem } from './common-interfaces';

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
  selectedPageType: Category
): Promise<{ success: boolean; message: string }> {
  /**
   * TODO: Update this code to not use the first item in results array.
   */
  const results = urls
    .filter((url) => url.status === 'completed' && url.results)
    .map((url) => url.results?.[0]);

  if (results.length === 0) {
    return {
      success: false,
      message: 'No results to export',
    };
  }

  const fileName = `scraping-results-${selectedPageType}-${
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
    // Fallback for browsers that do not support `showSaveFilePicker`
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scraping-results-${selectedPageType}-${
      new Date().toISOString().split('T')[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'Results exported successfully',
    };
  }
}
