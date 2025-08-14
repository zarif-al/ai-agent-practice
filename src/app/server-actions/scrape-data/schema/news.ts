import { z } from 'zod';

/* TODO: Update news schema to generate page sections */
export const newsSchema = z.object({
  name: z.string().describe('The name of the news'),
  slug: z.string().describe('The slug of the news'),
  image: z
    .string()
    .describe(
      'The URL of the news image. Do not include any search params in this URL string.'
    ),
  content: z
    .string()
    .describe(
      'The HTML content containing news details. Include content hidden inside other UI. Only exclude the title and date. If it contains any iframe then bring the full iframe.'
    ),
  publishDate: z.string().describe('The UTC publish date of the news'),
  confidenceLevel: z
    .number()
    .min(0)
    .max(10)
    .describe(
      'How confident are you that you have scraped all the revelant data? Score between 0 and 10. 0 means not confident at all, 10 means completely confident.'
    ),
});

export type News = z.infer<typeof newsSchema>;
