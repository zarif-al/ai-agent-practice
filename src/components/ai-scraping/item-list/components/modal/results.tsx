import { Badge } from '@/components/global/ui/badge';
import { Button } from '@/components/global/ui/button';
import type {
  Category,
  IGeneratedObjectResult,
} from '@/utils/ai-scraping/common-interfaces';
import { formatDate } from '@/utils/ai-scraping/helpers';
import {
  CalendarDays,
  ExternalLink,
  Globe,
  Newspaper,
  User,
} from 'lucide-react';
import { useState } from 'react';
import JsonView from '@uiw/react-json-view';

interface ResultsCardProps {
  results: IGeneratedObjectResult[];
}

export function ResultsWithSelector({ results }: ResultsCardProps) {
  const [selectedResultId, setSelectedResultId] = useState<string | undefined>(
    results?.[0]?._id
  );

  const selectedResult =
    results.find((r) => r._id === selectedResultId) || results[0];

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'person':
        return <User className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Results List Sidebar */}
      <div className="w-80 border-r bg-muted/20 flex flex-col">
        <div className="p-4 border-b bg-background">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Results ({results.length})
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result._id}
              className={`p-4 border-b cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                selectedResultId === result._id
                  ? 'bg-primary/10 border-primary/20 shadow-sm'
                  : 'hover:shadow-sm'
              }`}
              onClick={() => setSelectedResultId(result._id)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {getCategoryIcon(result.category)}
                    <span
                      className={`text-sm font-medium transition-colors ${
                        selectedResultId === result._id
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      #{index + 1}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {result.category}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4
                    className={`text-sm line-clamp-2 leading-tight transition-colors ${
                      selectedResultId === result._id
                        ? 'font-semibold text-foreground'
                        : 'font-medium text-foreground'
                    }`}
                  >
                    {result.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 shrink-0" />
                    <span className="truncate">{result.domain}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3 shrink-0" />
                    <span>{formatDate(new Date(result.scrapedAt))}</span>
                  </div>
                </div>

                {/* Preview of data */}
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {result.url}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Result Details */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedResult && (
          <div className="space-y-4">
            {/* Header with metadata */}
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(selectedResult.category)}
                  <h3 className="text-lg font-semibold">
                    {selectedResult.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {selectedResult.domain}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(new Date(selectedResult.scrapedAt))}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {selectedResult.category}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={selectedResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* JSON Viewer for Complete Result Object */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Complete Result Object
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <JsonView
                  value={selectedResult.data}
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    fontSize: '13px',
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                  }}
                  displayDataTypes={false}
                  displayObjectSize={true}
                  enableClipboard={true}
                  collapsed={3}
                  shortenTextAfterLength={100}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
