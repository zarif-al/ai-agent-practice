import { z } from 'zod';

export const ctaButtonSchema = z.object({
  label: z.string().describe('The label for the call to action button'),
  url: z.string().describe('The URL for the call to action button'),
});
