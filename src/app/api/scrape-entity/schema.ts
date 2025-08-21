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
  content: z.string().describe('The HTML content of the news'),
});

export type Person = z.infer<typeof peopleSchema>;
// Text Node — basic text content
const lexicalTextNode = z.object({
  type: z.literal("text"),
  version: z.number(),
  detail: z.number(),
  format: z.number(),
  mode: z.string(),
  style: z.string(),
  text: z.string(),
});


// Line Break Node — simple <br/> equivalent
const lexicalLineBreakNode = z.object({
  type: z.literal("linebreak"),
  version: z.number(),
});

/* Inline nodes union */
const lexicalInlineNodes = z.union([
  lexicalTextNode,
  lexicalLineBreakNode,
]);

// Paragraph Node — top-level block for text
const lexicalParagraphNode = z.object({
  type: z.literal("paragraph"),
  version: z.number(),
  direction: z.string().nullable(),
  format: z.string(),
  indent: z.number(),
  textFormat: z.number(),
  textStyle: z.string(),
  children: z.array(lexicalInlineNodes), // ✅ Inline nodes only
});

// Heading Node — h1, h2, etc.
const lexicalHeadingNode = z.object({
  type: z.literal("heading"),
  version: z.number(),
  tag: z.string(), // e.g. "h1", "h2"
  format: z.string(),
  children: z.array(lexicalInlineNodes),
});


// List Item Node — inside lists
const lexicalListItemNode = z.object({
  type: z.literal("listitem"),
  version: z.number(),
  format: z.string(),
  children: z.array(lexicalInlineNodes),
});

// List Node — unordered or ordered list
const lexicalListNode = z.object({
  type: z.literal("list"),
  version: z.number(),
  tag: z.string(), // "ul" or "ol"
  children: z.array(lexicalListItemNode),
});

/* Block nodes union — allowed directly under root */
const lexicalBlockNodes = z.union([
  lexicalParagraphNode,
  lexicalHeadingNode,
  lexicalListNode,
  lexicalListItemNode,
]);
// Root Node — only block-level elements allowed
const lexicalRootNode = z.object({
  type: z.literal("root"),
  version: z.number(),
  direction: z.string().nullable(),
  format: z.string(),
  indent: z.number(),
  children: z.array(lexicalBlockNodes), 
});


export const newsSchema = z.object({
  name: z.string().describe('The title of the news'),
  slug: z.string().describe('The page slug of the news'),
  image: z
    .string()
    .describe(
      'If the news page has a banner image then it should be included here. Otherwise it can be omitted.'
    ),
  // content: z.string().describe('The main HTML content of the news'),
  content: z
    .object({
      root: lexicalRootNode,
    })
    .describe("The main content of the news stored in Lexical JSON format."),
  publishDate: z.string().datetime().describe('The publish date of the news'),
  iframe: z
  .array(z.string().url())
  .describe(
    'A non-empty array of valid links (href values) extracted from all <a> tags inside the iframe HTML content of the news page. Each item must be a complete URL string (e.g., https://example.com). If no <a> tags are found, this field should be omitted or set to an empty array.'
  )

});

export type News = z.infer<typeof newsSchema>;


export const homePageSchema = z.object({
  hero: z.array(z.string()).describe(
    "Banner image URLs for the hero section (e.g., carousel slides)."
  ),
 
  events: z.array(
    z.object({
      title: z.string().describe("Title of the event"),
      publishDate: z.string().describe("Date (and time) Day of the event"),
      image: z.string().optional().describe(
        "Optional image URL for the event (if available)"
      ),
    })
  ).describe("List of upcoming or recent events"),
  about: z
    .object({
      title: z.string().describe("Heading/title for the About College section"),
      description: z
        .string()
        .describe("Description text providing an overview of the college"),
       news: z.array(
              z.object({
                title: z.string().describe("Title of the news item"),
                publishDate: z.string().describe("Publish date of the news item"),
                image: z.string().optional().describe(
                  "Optional image URL for the news item (if available)"
                ),
              })
      ).describe("List of latest news items,which is around of the About College section"),
      links: z
        .array(z.string())
        .describe(
          "List of section URLs (e.g., Life at Merton, Study Here, Library, etc.)."
        ),
    })
    .describe("About College section with title and description."),
  
});

export type HomePage = z.infer<typeof homePageSchema>;
