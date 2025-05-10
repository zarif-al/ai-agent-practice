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
import { graphObjectSchema } from './schemas';

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
        schema: graphObjectSchema,
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
        data: object,
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
