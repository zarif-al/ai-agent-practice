import { z } from 'zod';
import { featuredShowcaseBlockSchema } from './blocks/featured-showcase';
import { newsLetterBlockSchema } from './blocks/newsletter';

export const generalPageSchema = z.object({
  seo: z.object({
    title: z.string().describe('The SEO title of the page'),
    description: z.string().describe('The SEO description of the page'),
    keywords: z.array(z.string()).describe('The SEO keywords of the page'),
  }),
  pageSections: z.array(
    z.union([featuredShowcaseBlockSchema, newsLetterBlockSchema])
  ),
});
