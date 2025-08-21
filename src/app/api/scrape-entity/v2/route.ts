import { z } from 'zod';
import { newsSchema, peopleSchema,homePageSchema } from '../schema';
import { log, logVercelAISDKError } from '@/utils/global/logger';
import { scrapPageV2 } from './utils';

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data } = requestBodySchema.safeParse(body);

  if (!success) {
    log.error('Invalid request body:', { data });

    return new Response('Invalid request body', { status: 400 });
  }

  const { url, pageType } = data;

  try {
    switch (pageType) {
      case 'person': {
        return await scrapPageV2(
          'Person',
          peopleSchema,
          url,
          `You will receive a web page URL of a university person. Please extract the data from this web page.`
        );
      }
      case 'news': {
        return await scrapPageV2(
          'News',
          newsSchema,
          url,
          'You will receive a web page URL of a university news topic. Please extract the data from this web page.'
        );
      }
      case 'home': {
        return await scrapPageV2(
          'HomePage',
          homePageSchema,
          url,
          'You will receive a web page URL of a university home page. Please extract the data from this web page.'
        );
      }
    }
  } catch (error) {
    logVercelAISDKError(error);

    return new Response('AI Model is not available. Please try again later.', {
      status: 500,
    });
  }
}

const requestBodySchema = z.object({
  url: z.string().url(),
  pageType: z.enum(['person', 'news','home']),
});
