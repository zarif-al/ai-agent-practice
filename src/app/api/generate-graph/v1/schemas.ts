import { z } from 'zod';

const graphType = z
  .enum(['bar', 'line', 'pie'])
  .describe(
    'The graph type. Acceptatable values include "bar", "line", "pie".'
  );

const chartDataEntry = z
  .record(
    // Key
    z
      .string()
      .describe(
        "Dimension keys (e.g., 'Month') or Series Keys (e.g., 'Users')"
      ),
    // Value
    z.union([z.string(), z.number()]).describe('Key Values')
  )
  .describe(
    'Object represents a single entry along the chart’s primary axis (typically the x-axis in a Cartesian chart, or the category axis in other types)'
  );

const chartDataSchema = z
  .array(chartDataEntry)
  .describe('Array of dynamic chart data rows');

const chartConfigSchema = z
  .record(
    // Key
    z
      .string()
      .describe(
        'The top-level keys in chartConfig match the series keys in chartData one-to-one.'
      ),
    // Value
    z.object({
      label: z
        .string()
        .describe(
          'A human-readable name for display in tooltips, legends, or axes.'
        ),
      color: z
        .string()
        .describe(
          'Visual styling metadata for the series (e.g., line color, bar fill, stroke pattern).'
        ),
    })
  )
  .describe(
    'This is a configuration object that maps data series keys to their presentation metadata.'
  );

export const graphObjectSchema = z.object({
  graphType: graphType,
  chartData: chartDataSchema,
  chartsConfig: chartConfigSchema,
  xAxisDataKey: z
    .string()
    .optional()
    .describe('The x-axis data key. This is required for bar charts.'),
});
