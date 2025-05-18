import { Badge } from '@/components/global/ui/badge';

interface ConfidenceBadgeProps {
  confidence: number;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  let variant: 'outline' | 'default' | 'secondary' | 'destructive' = 'outline';
  let colorClass = '';
  let label = `${confidence}/10`;

  if (confidence >= 8) {
    variant = 'default';
    colorClass = 'bg-green-100 text-green-800 hover:bg-green-100';
    label = `High (${confidence}/10)`;
  } else if (confidence >= 5) {
    variant = 'secondary';
    colorClass = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    label = `Medium (${confidence}/10)`;
  } else {
    variant = 'destructive';
    colorClass = 'bg-red-100 text-red-800 hover:bg-red-100';
    label = `Low (${confidence}/10)`;
  }

  return (
    <Badge variant={variant} className={colorClass}>
      Confidence: {label}
    </Badge>
  );
}
