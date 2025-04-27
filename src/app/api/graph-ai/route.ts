import { appendResponseMessages, streamText } from 'ai';
import { saveChat } from '@/lib/chat-store';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import tablesJSON from '@/db/schema/tables.json';
import { z } from 'zod';

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

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data } = requestBodySchema.safeParse(body);

  if (!success) {
    console.error('Invalid request body:', data);
    return new Response('Invalid request body', { status: 400 });
  }

  const { messages, id } = data;

  try {
    const openrouter = createOpenRouter({
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    // Save user message to the database
    await saveChat({ id, messages });

    /**
     * Notes:
     * - It seems `generateObject` does not support tool calling, as this function calls tools internally.
     * 	 I am proceeding with `generateText` for now.
     */
    const result = await streamText({
      model: openrouter.chat('google/gemini-2.0-flash-exp:free'),
      system:
        `Here is the database schema of the system you are working with:
         Schema: ${JSON.stringify(tablesJSON, null, 2)}
        ` +
        `Your job is to help answer any and all queries regarding this database` +
        `If the user wants to generate graphs based on data from this database you will first validate the users request against the schema to see if it is a valid request.`,
      messages,
      async onFinish({ response }) {
        await saveChat({
          id,
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }),
        });
      },
    });

    // consume the stream to ensure it runs to completion & triggers onFinish
    // even when the client response is aborted:
    result.consumeStream(); // no await

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error generating graph:', error);

    return new Response('AI Model is not available. Please try again later.', {
      status: 500,
    });
  }
}
