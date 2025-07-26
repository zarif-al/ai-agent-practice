import { appendResponseMessages, streamText } from 'ai';
import { z } from 'zod';
import tablesJSON from '@/db/schema/tables.json';
import { model } from '@/lib/model';
import { saveChat } from '@/utils/ai-dashboard/chat-store';
import { generateGraphObjectsTool } from './tool';
import { log, logVercelAISDKError } from '@/utils/global/logger';

/**
 * Note: The useChat hook relies on an API route to function correctly.
 * This API route is used to handle the chat messages and stream responses.
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  const body = await req.json();

  const { success, data } = requestBodySchema.safeParse(body);

  if (!success) {
    log.error('Invalid request body:', { data });

    return new Response('Invalid request body', { status: 400 });
  }

  const { messages, id } = data;

  try {
    // Save user message to the database
    await saveChat({ id, messages });

    const result = await streamText({
      model: model('ollama'),
      system:
        `Here is the database schema of the system you are working with :
				 Schema: ${JSON.stringify(tablesJSON, null, 2)}
				` +
        `Your job is to help answer any and all queries regarding this database. ` +
        `If the user wants to query data from this database you will first validate the users request against the schema to see if it is a valid request. ` +
        `Do not proceed until the user provides a clear query with all necessary parameters. ` +
        `Use the tools provided to address the users queries. ` +
        `Do not make up any information or makeup any queries to the database. ` +
        `If any tool returns an error then try again.`,
      messages,
      maxSteps: 5,
      tools: {
        generateGraphObjects: generateGraphObjectsTool,
      },
      onStepFinish({ toolCalls, finishReason, stepType }) {
        log.info('Step finished:', {
          stepType,
          toolCalls: toolCalls.map((tool) => tool.toolName),
          finishReason,
        });
      },
      async onFinish({ response }) {
        await saveChat({
          id,
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }),
        });
      },
      onError({ error }) {
        logVercelAISDKError(error);
      },
    });

    // consume the stream to ensure it runs to completion & triggers onFinish
    // even when the client response is aborted:
    result.consumeStream(); // no await

    return result.toDataStreamResponse();
  } catch (error) {
    log.error('Error generating graph:', { message: error });

    return new Response('AI Model is not available. Please try again later.', {
      status: 500,
    });
  }
}

/**
 * A zod schema to validate the request body.
 */
const requestBodySchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      role: z.enum(['user', 'assistant', 'system', 'data']),
    })
  ),
  id: z.string(),
});
