import { model } from '@/lib/model';
import {
  APICallError,
  generateObject,
  InvalidToolArgumentsError,
  NoSuchToolError,
  ToolExecutionError,
  TypeValidationError,
} from 'ai';
import { z } from 'zod';
import { log } from '@/utils/global/logger';
import { newsSchema, peopleSchema } from '../schema';

/**
 * Locally run Ollama models can't access web URLs.
 * I attempted to download the html file and pass it to the model as a buffer.
 * However, it seems the models run on Ollama can't process buffers (according to ChatGPT).
 *
 * I tried to pass the text version of the HTML file to the model, but it didn't work. I think the content is
 * too long for the model to process.
 *
 * I sliced the HTML content and passed it. Then I started seeing some results but it was incomplete/incorrect.
 *
 * So far google's model has performed far better.
 */
export async function POST(req: Request) {
  const body = await req.json();

  const { success, data } = requestBodySchema.safeParse(body);

  if (!success) {
    log.error('Invalid request body:', { data });

    return new Response('Invalid request body', { status: 400 });
  }

  const { url, pageType } = data;

  /**
   * Locally run Ollama can't access web URLs. So I going to download the HTML file
   * and pass it to the model.
   */

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

  try {
    switch (pageType) {
      case 'person': {
        const { object, usage, warnings } = await generateObject({
          model: model('ollama'),
          schemaName: 'Person',
          schema: peopleSchema,
          schemaDescription: 'The schema of a person',
          maxRetries: 5,
          system:
            `You will receive a text version of a web page of a university person` +
            `Please extract the data from this web page.`,
          prompt:
            `Here is the HTML content of a web page. Please extract the data from this web page. ` +
            `HTML Summary:
              - Title: ${title}
              - Meta Description: ${meta}
            ` +
            `Context: ${htmlText.slice(0, 10000)}` +
            `Extract data according the provided schema. `,
          // messages: [
          //   {
          //     role: 'user',
          //     content: [
          //       {
          //         type: 'file',
          //         data: buffer,
          //         mimeType: 'text/html',
          //       },
          //     ],
          //   },
          // ],
        });

        log.info('Usage: ', {
          url,
          usage,
        });

        log.warning('Warnings: ', {
          url,
          warnings,
        });

        return new Response(JSON.stringify(object), { status: 200 });
      }
      case 'news': {
        const { object, usage, warnings } = await generateObject({
          model: model('ollama'),
          schemaName: 'News',
          schema: newsSchema,
          system:
            `You will receive a web page URL of a university news topic` +
            `Please extract the data from this web page.`,
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

        if (warnings) {
          log.warning('Warnings: ', {
            url,
            warnings,
          });
        }

        return new Response(JSON.stringify(object), { status: 200 });
      }
    }
  } catch (error) {
    if (NoSuchToolError.isInstance(error)) {
      log.error('No such tool error:', { message: error.message });
    } else if (InvalidToolArgumentsError.isInstance(error)) {
      log.error('Invalid tool arguments error:', {
        message: error.message,
      });
    } else if (ToolExecutionError.isInstance(error)) {
      log.error('Tool execution error:', { message: error.message });
    } else if (APICallError.isInstance(error)) {
      log.error('API call error:', { message: error.message });
    } else if (TypeValidationError.isInstance(error)) {
      log.error('Type validation error:', { message: error.message });
    } else {
      log.error('Unknown error:', { message: error });
    }

    return new Response('AI Model is not available. Please try again later.', {
      status: 500,
    });
  }
}

const requestBodySchema = z.object({
  url: z.string().url(),
  pageType: z.enum(['person', 'news']),
});
