import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/global/ui/chart';
import type { z } from 'zod';
import type { graphObjectSchema } from '@/app/api/generate-graph/v1/schemas';

type IChartProps = z.infer<typeof graphObjectSchema>;

export function Chart({
  graphType,
  chartData,
  chartsConfig,
  xAxisDataKey,
}: IChartProps) {
  switch (graphType) {
    case 'bar': {
      return (
        <ChartContainer config={chartsConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            {xAxisDataKey && (
              <XAxis
                dataKey={xAxisDataKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(chartsConfig).map(([key, item]) => (
              <Bar key={key} dataKey={key} fill={item.color} radius={4} />
            ))}
          </BarChart>
        </ChartContainer>
      );
    }
    default: {
      // Render a not suppported UI
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-muted-foreground">Graph type not supported</p>
        </div>
      );
    }
  }
}
