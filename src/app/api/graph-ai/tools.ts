import 'server-only';

import { tool } from 'ai';
import { z } from 'zod';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

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
      };
    }
  },
});
