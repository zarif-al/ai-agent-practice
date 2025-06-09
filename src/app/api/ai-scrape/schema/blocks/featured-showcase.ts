import { z } from 'zod';
import { ctaButtonSchema } from './common';

/**
 * Sub-schemas for Featured Showcase Block
 */
const featuredNavigationItemSchema = z.object({
  label: z.string().describe('The label of the navigation item'),
  url: z.string().describe('The URL of the navigation item'),
});

const featuredCarouselCaptionSchema = z
  .object({
    title: z.string().describe('The title of the carousel item'),
    subtitle: z.string().describe('The subtitle of the carousel item'),
    cta: ctaButtonSchema
      .describe('An optional call to action for the carousel item')
      .nullable(),
  })
  .describe('The caption for the carousel item');

/**
 * Schema for the Featured Showcase Block
 */
export const featuredShowcaseBlockSchema = z.object({
  type: z.literal('featuredShowCaseBlock'),

  // Featured Navigation Content
  featuredNavigation: z
    .object({
      title: z.string().describe('The title of the featured navigation'),
      items: z
        .array(featuredNavigationItemSchema)
        .describe('The list of navigation items'),
    })
    .describe('Featured navigation for the showcase section'),

  // Featured Carousel Content
  featuredCarousel: z
    .array(
      z.object({
        caption: featuredCarouselCaptionSchema,
        image: z.string().describe('The URL of the carousel image'),
      })
    )
    .describe('The list of featured items in the carousel'),
});
