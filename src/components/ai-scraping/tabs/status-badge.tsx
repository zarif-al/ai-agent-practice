import type { UrlStatus } from '@/app/ai-scraping/interface';
import { Badge } from '@/components/global/ui/badge';

interface Props {
  status: UrlStatus;
}

// Get status badge
export function StatusBadge({ status }: Props) {
  switch (status) {
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'processing':
      return (
        <Badge variant="secondary" className="animate-pulse">
          Processing
        </Badge>
      );
    case 'completed':
      return (
        <Badge
          variant="default"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Completed
        </Badge>
      );
    case 'error':
      return <Badge variant="destructive">Error</Badge>;
  }
}
