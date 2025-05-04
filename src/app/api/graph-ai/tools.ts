import 'server-only';

import { tool } from 'ai';
import { z } from 'zod';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

/**
 * This is a simple tool that simulates a weather API.
 */
export const weatherTool = tool({
  description: 'Get the weather in a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});

/**
 * This is a tool that validates the user's query to see if it contains the minimum parameters to generate a graph.
 */
export const validateQueryTool = tool({
  description:
    "Validate the user's query to see if it contains the minimum parameters to generate a graph.",
  parameters: z.object({
    graphType: z
      .enum(['bar', 'line', 'pie'])
      .describe('The type of graph to generate'),
    tableNames: z.array(z.string()).describe('The name of the table to query'),
    tableColumns: z
      .array(z.string())
      .describe('The columns to query from the table'),
    dateRange: z
      .object({
        start: z.string(),
        end: z.string(),
      })
      .describe('The date range of the data to be displayed on the graph')
      .optional()
      .nullable(),
  }),
  execute: async ({ graphType, tableNames, tableColumns, dateRange }) => {
    // Validate the query
    if (!graphType || !tableNames || !tableColumns) {
      throw new Error('Invalid query');
    }

    // Simulate a successful response
    return {
      success: true,
      message: 'Query is valid',
      graphType,
      tableNames,
      tableColumns,
      dateRange,
    };
  },
});

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

      throw new Error('Error executing query');
    }
  },
});
