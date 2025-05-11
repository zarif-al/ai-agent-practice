import { z } from 'zod';

export const peopleSchema = z.object({
  preNominal: z.string().describe("The prefix of the person's name"),
  postNominal: z.string().describe("The suffix of the person's name"),
  firstName: z.string().describe("The person's first name"),
  lastName: z.string().describe("The person's last name"),
  slug: z.string().describe("The person's slug"),
  seo: z.object({
    title: z.string().describe("The person's SEO title"),
    description: z.string().describe("The person's SEO description"),
    keywords: z.array(z.string()).describe("The person's SEO keywords"),
  }),
  position: z.string().describe("The person's position"),
  contactLinks: z.array(
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
      link: z.string().url(),
    })
  ),
  image: z.string().url().describe("The URL of the person's image"),
  content: z.string().describe('The HTML content of the news'),
});

export type Person = z.infer<typeof peopleSchema>;

export const newsSchema = z.object({
  name: z.string().describe('The name of the news'),
  slug: z.string().describe('The slug of the news'),
  image: z.string().url().describe('The URL of the news image'),
  content: z.string().describe('The HTML content of the news'),
  publishDate: z.date().describe('The publish date of the news'),
});

export type News = z.infer<typeof newsSchema>;
