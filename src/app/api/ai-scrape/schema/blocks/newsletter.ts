import { z } from 'zod';

export const newsLetterBlockSchema = z.object({
  type: z.literal('newsLetterBlock'),
  title: z.string().describe('The title of the newsletter block'),
  subtitle: z
    .string()
    .describe('An optional subtitle of the newsletter block')
    .nullable(),
  submitButtonLabel: z.string().describe('The label for the submit button'),
});
