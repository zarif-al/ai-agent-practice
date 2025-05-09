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

/**
 * This tool will query the database and return the results.
 */
export const queryDatabaseTool = tool({
  description: 'Query the database and return the results',
  parameters: z.object({
    query: z.string().describe('The SQL query to execute'),
  }),
  execute: async ({ query }) => {
    try {
      const results = await db.execute(sql.raw(query));

      return {
        success: true,
        message: 'Query executed successfully',
        data: results,
      };
    } catch (error) {
      console.error('Query Database Tool Error => ', error);

      return {
        success: false,
        message: 'Error executing query',
        error,
      };
    }
  },
});

/**
 * This tool accepts SQL results and returns a structured object
 */
export const generateGraphObjectsTool = tool({
  description:
    'Format the SQL results to generate objects that can be used to render re-charts graphs.' +
    'This tool should only be used if the `queryDatabaseTool` returns a successful response.',
  parameters: z.object({
    requestedGraphType: z
      .enum(['bar', 'line', 'pie'])
      .nullable()
      .describe('The requested graph type'),
    queryResponse: z
      .array(z.record(z.string(), z.union([z.string(), z.number()])))
      .describe(
        'The SQL query results from `queryDatabaseTool` tool call, that need to be formatted. Do not provide any hallucinated data.'
      ),
  }),
  execute: async ({ queryResponse, requestedGraphType }) => {
    console.log('Generate Graph Objects Tool => ', {
      queryResponse,
      requestedGraphType,
    });

    try {
      const { object } = await generateObject({
        model: ollamaModel,
        schemaName: 'reCharts_graphing_data',
        schemaDescription:
          'The graph type and the data to be used to render the graph. The acceptable values for the graph type are "bar", "line", "pie".',
        maxRetries: 1,
        schema: z.object({
          graphType: generateGraphToolSchemas.graphType,
          chartDataSchema: generateGraphToolSchemas.chartDataSchema,
          chartsConfigSchema: generateGraphToolSchemas.chartConfigSchema,
        }),
        system:
          `You are a helpful assistant that formats SQL results to generate` +
          `objects that can be used to render re-charts graphs.` +
          `If the SQL results are not in the correct format, return an error message.` +
          `If the SQL results are not sufficient to generate the requested graph type or any other graph type,` +
          `return an error message.` +
          `If the SQL results are sufficient to generate the requested graph type, return the graph type and the data.` +
          `The data should be in the format that can be used to render re-charts graphs.`,
        prompt:
          `Based on the requested graph type you will format the SQL results to generate objects that can be used` +
          `to render re-charts graphs:` +
          `Query Response: ${JSON.stringify(queryResponse, null, 2)}.` +
          `Requested Graph Type: ${requestedGraphType}. `,
      });

      return {
        success: true,
        message: 'Graph objects generated successfully',
        data: {
          graphType: object.graphType,
          chartDataSchema: object.chartDataSchema,
          chartsConfigSchema: object.chartsConfigSchema,
        },
      };
    } catch (error) {
      if (NoSuchToolError.isInstance(error)) {
        console.error('No such tool error:', error.message);
      } else if (InvalidToolArgumentsError.isInstance(error)) {
        console.error('Invalid tool arguments error:', error.message);
      } else if (ToolExecutionError.isInstance(error)) {
        console.error('Tool execution error:', error.message);
      } else if (APICallError.isInstance(error)) {
        console.error('API call error:', error.message);
      } else if (TypeValidationError.isInstance(error)) {
        console.error('Type validation error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }

      return {
        success: false,
        message: 'Error generating graph objects',
        error,
      };
    }
  },
});

// TODO: There should be a cleaner way to manage this
export const generateGraphToolSchemas = {
  graphType: z
    .enum(['bar', 'line', 'pie'])
    .describe(
      'The graph type. Acceptatable values include "bar", "line", "pie".'
    ),
  chartDataSchema: z
    .array(
      z
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
          'object represents a single entry along the chart’s primary axis (typically the x-axis in a Cartesian chart, or the category axis in other types)'
        )
    )
    .describe('Array of dynamic chart data rows'),
  chartConfigSchema: z
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
    ),
};
