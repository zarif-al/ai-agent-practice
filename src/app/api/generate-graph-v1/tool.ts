import 'server-only';

import {
  tool,
  APICallError,
  generateObject,
  InvalidToolArgumentsError,
  NoSuchToolError,
  ToolExecutionError,
  TypeValidationError,
} from 'ai';
import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { ollamaModel } from '@/lib/model';
import { z } from 'zod';
import { log } from '@/utils/logger';

/**
 * This tool generates graph objects based on the provided SQL query and requested graph type.
 * It executes the SQL query against the database and formats the results into a JSON object
 * that can be used to render re-charts graphs.
 */
export const generateGraphObjectsTool = tool({
  description: 'Generate graph objects',
  parameters: z.object({
    requestedGraphType: z
      .enum(['bar', 'line', 'pie'])
      .nullable()
      .describe('The requested graph type'),
    query: z.string().describe('The SQL query to execute'),
  }),
  execute: async ({ query, requestedGraphType }) => {
    if (!query) {
      return {
        success: false,
        message: 'No SQL query provided',
        error: 'No SQL query provided',
      };
    }

    try {
      log.info('Executing SQL query:', { query });

      const results = await db.execute(sql.raw(query));

      log.info('Generating graph objects:', {
        requestedGraphType,
        results: JSON.stringify(results, null, 2),
      });

      const { object } = await generateObject({
        model: ollamaModel,
        schemaName: 'reCharts_graphing_data',
        schemaDescription:
          'The graph type and the data to be used to render the graph. The acceptable values for the graph type are "bar", "line", "pie".',
        maxRetries: 1,
        schema: z.object({
          graphType: graphType,
          chartDataSchema: chartDataSchema,
          chartsConfigSchema: chartConfigSchema,
        }),
        system:
          `You will be provided SQL query results and a requested graph type.` +
          `Your job is to format the SQL results into a JSON object that can be used to render re-charts graphs.`,
        prompt:
          `Based on the requested graph type you will format the SQL results to generate objects that can be used` +
          `to render re-charts graphs:` +
          `Query Response: ${JSON.stringify(results, null, 2)}.` +
          `Requested Graph Type: ${requestedGraphType}. `,
      });

      return {
        success: true,
        message: 'Query executed successfully',
        data: {
          graphType: object.graphType,
          chartData: object.chartDataSchema,
          chartConfig: object.chartsConfigSchema,
        },
      };
    } catch (error) {
      if (NoSuchToolError.isInstance(error)) {
        log.error('No such tool error:', { message: error.message });
      } else if (InvalidToolArgumentsError.isInstance(error)) {
        log.error('Invalid tool arguments error:', { message: error.message });
      } else if (ToolExecutionError.isInstance(error)) {
        log.error('Tool execution error:', { message: error.message });
      } else if (APICallError.isInstance(error)) {
        log.error('API call error:', { message: error.message });
      } else if (TypeValidationError.isInstance(error)) {
        log.error('Type validation error:', { message: error.message });
      } else {
        log.error('Unknown error:', { message: error });
      }

      return {
        success: false,
        message: 'Error generating graph objects',
        error,
      };
    }
  },
});

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
