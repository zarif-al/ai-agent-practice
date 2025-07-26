import { z } from 'zod';

export const peopleSchema = z.object({
  preNominal: z
    .string()
    .describe("The person's pre-nominal title. Default to empty string"),
  postNominal: z
    .string()
    .describe("The person's post-nominal title. Default to empty string"),
  firstName: z.string().describe("The person's first name"),
  lastName: z.string().describe("The person's last name"),
  slug: z.string().describe("The person's slug"),
  seo: z.object({
    title: z.string().describe("The person's SEO title"),
    description: z.string().describe("The person's SEO description"),
    keywords: z.array(z.string()).describe("The person's SEO keywords"),
  }),
  position: z.string().describe("The person's position"),
  contactLinks: z
    .array(
      z.object({
        icon: z.enum([
          'facebook',
          'x',
          'youtube',
          'linkedin',
          'email',
          'phone',
          'web',
        ]),
        link: z.string().describe("Link to the person's contact page"),
      })
    )
    .optional(),
  image: z.string().describe("The URL of the person's image"),
  content: z
    .string()
    .describe(
      'The HTML content of the person containing biographical and personal achievements data. Include content hidden inside other UI. Only exclude the title and position.'
    ),
  confidenceLevel: z
    .number()
    .min(0)
    .max(10)
    .describe(
      'How confident are you that you have scraped all the revelant data? Score between 0 and 10. 0 means not confident at all, 10 means completely confident.'
    ),
});

export type Person = z.infer<typeof peopleSchema>;
