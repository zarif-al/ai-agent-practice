import 'server-only';

import { model } from '@/lib/model';
import { log } from '@/utils/global/logger';
import { generateObject } from 'ai';
import type { z } from 'zod';

export async function scrapPageV1(
  schemaName: string,
  schema: z.ZodSchema,
  url: string,
  systemPrompt: string
) {
  const { object, usage, warnings } = await generateObject({
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

  return new Response(JSON.stringify(object), { status: 200 });
}
