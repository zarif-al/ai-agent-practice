import 'server-only';

import { model } from '@/lib/model';
import { generateObject } from 'ai';
import { log } from '@/utils/global/logger';
import type { z } from 'zod';

export async function scrapPageV2(
  schemaName: string,
  schema: z.ZodSchema,
  url: string
) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  });

  const htmlText = await response.text();

  const title = htmlText.match(/<title>(.*?)<\/title>/i)?.[1] || 'N/A';
  const meta =
    htmlText.match(
      /<meta name=["']description["'] content=["'](.*?)["']/i
    )?.[1] || 'N/A';

  const { object, usage, warnings } = await generateObject({
    model: model('ollama'),
    schemaName: schemaName,
    schema: schema,
    maxRetries: 5,
    system:
      `You will receive a text version of a web page of a university ${schemaName}` +
      `Please extract the data from this web page.`,
    prompt:
      `Here is the HTML content of a web page. Please extract the data from this web page. ` +
      `HTML Summary:
              - Title: ${title}
              - Meta Description: ${meta}
            ` +
      `Context: ${htmlText.slice(0, 10000)}` +
      `Extract data according the provided schema. `,
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

  return new Response(JSON.stringify(object), { status: 200 });
}
