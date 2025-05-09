import {
  appendResponseMessages,
  InvalidToolArgumentsError,
  NoSuchToolError,
  streamText,
  ToolExecutionError,
  APICallError,
  TypeValidationError,
} from 'ai';
import { z } from 'zod';
import { saveChat } from './utils/chat-store';
import { generateGraphObjectsTool, queryDatabaseTool } from './utils/tools';
import tablesJSON from '@/db/schema/tables.json';
import { ollamaModel } from '@/lib/model';

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
    // Save user message to the database
    await saveChat({ id, messages });

    const result = await streamText({
      model: ollamaModel,
      system:
        `Here is the database schema of the system you are working with:
         Schema: ${JSON.stringify(tablesJSON, null, 2)}
        ` +
        `Your job is to help answer any and all queries regarding this database.` +
        `If the user wants to query data from this database you will first validate the users request against the schema to see if it is a valid request.` +
        `Do not proceed until the user provides a clear query with all necessary parameters.` +
        `Use the tools provided to address the users queries.` +
        `Do not make up any information or makeup any queries to the database.`,
      messages,
      maxSteps: 5,
      tools: {
        queryDatabase: queryDatabaseTool,
        generateGraphObjects: generateGraphObjectsTool,
      },
      onStepFinish({ toolCalls, finishReason, stepType }) {
        console.log('Step finished:', {
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
        if (NoSuchToolError.isInstance(error)) {
          console.error('No such tool error:', error.message);
        } else if (InvalidToolArgumentsError.isInstance(error)) {
          console.error('Invalid tool arguments error:', error.message);
        } else if (ToolExecutionError.isInstance(error)) {
          console.error('Tool execution error:', error.message);
        } else if (APICallError.isInstance(error)) {
          console.error('API call error:', error.message);
        } else if (TypeValidationError.isInstance(error)) {
          console.error('Type validation error:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
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
