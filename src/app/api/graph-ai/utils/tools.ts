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
import { z } from 'zod';
import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { createOllama } from 'ollama-ai-provider';
import { generateGraphToolSchemas } from './schemas';

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
    'Format the SQL results to generate objects that can be used to render re-charts graphs',
  parameters: z.object({
    requestedGraphType: z
      .enum(['bar', 'line', 'pie'])
      .nullable()
      .describe('The requested graph type'),
    queryResponse: z
      .array(z.record(z.union([z.string(), z.number()])))
      .describe(
        'The SQL query results from `queryDatabaseTool` tool call, that need to be formatted.'
      ),
  }),
  execute: async ({ queryResponse, requestedGraphType }) => {
    const OLLAMA_API_ENDPOINT = process.env.OLLAMA_API_ENDPOINT;

    if (!OLLAMA_API_ENDPOINT) {
      console.error('OLLAMA_API_ENDPOINT environment variable is not set');
      return new Response('Server error', { status: 500 });
    }

    try {
      const ollama = createOllama({
        baseURL: OLLAMA_API_ENDPOINT,
      });

      const { object } = await generateObject({
        model: ollama('qwen2.5:7b', {
          simulateStreaming: true,
        }),
        schemaName: 'reCharts_graphing_data',
        schemaDescription:
          'The graph type and the data to be used to render the graph. The acceptable values for the graph type are "bar", "line", "pie".',
        maxRetries: 3,
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
