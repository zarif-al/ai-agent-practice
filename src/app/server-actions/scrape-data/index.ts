'use server';

import type { z } from 'zod';
import type { IScrapDataAction } from './interface';
import { newsSchema, type News } from './schema/news';
import { peopleSchema, type Person } from './schema/person';
import { generateObject } from 'ai';
import { model } from '@/lib/model';
import { log } from '@/utils/global/logger';
import type { UrlItem } from '@/utils/ai-scraping/common-interfaces';
import { v4 as uuidv4 } from 'uuid';

export async function scrapContent({
  item,
}: IScrapDataAction): Promise<UrlItem> {
  switch (item.category) {
    case 'person':
      const personScrapeResult = await aiScrape<Person>(
        'Person',
        peopleSchema,
        item.url,
        `You will receive a web page URL of a university person. Please extract the data from this web page.`
      );

      return {
        ...item,
        status: 'completed',
        processedAt: new Date(),
        results: [
          {
            _id: uuidv4(),
            title: `${personScrapeResult.preNominal} ${personScrapeResult.firstName} ${personScrapeResult.lastName} ${personScrapeResult.postNominal}`,
            category: 'person',
            url: item.url,
            scrapedAt: new Date().toISOString(),
            domain: new URL(item.url).hostname,
            data: personScrapeResult,
          },
        ],
      };

    case 'news':
      const newsScrapeResult = await aiScrape<News>(
        'News',
        newsSchema,
        item.url,
        'You will receive a web page URL of a university news topic. Scroll the full page to make sure all data is loaded. Please extract the data from this web page.'
      );

      return {
        ...item,
        status: 'completed',
        processedAt: new Date(),
        results: [
          {
            _id: uuidv4(),
            title: newsScrapeResult.name,
            category: 'news',
            url: item.url,
            scrapedAt: new Date().toISOString(),
            domain: new URL(item.url).hostname,
            data: newsScrapeResult,
          },
        ],
      };

    default:
      throw new Error(`Unsupported category: ${item.category}`);
  }
}

async function aiScrape<T>(
  schemaName: string,
  schema: z.ZodSchema,
  url: string,
  systemPrompt: string
) {
  const { object, usage, warnings } = await generateObject<T>({
    model: model('google'),
    schemaName: schemaName,
    schema: schema,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: new URL(url),
            mimeType: 'text/html',
          },
        ],
      },
    ],
  });

  log.info('Usage: ', {
    url,
    usage,
  });

  if (warnings && warnings.length > 0) {
    log.warning('Warnings: ', {
      url,
      warnings,
    });
  }

  return object;
}
