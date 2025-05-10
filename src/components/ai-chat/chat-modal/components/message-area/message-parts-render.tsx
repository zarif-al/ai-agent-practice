import { graphObjectSchema } from '@/app/api/generate-graph-v1/schemas';
import { Chart } from '@/components/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { type Message } from 'ai';

interface IMessagePartsRender {
  parts: Message['parts'];
}

export function MessagePartsRender({ parts }: IMessagePartsRender) {
  if (!parts) {
    return <></>;
  }

  return parts.map((part, index) => {
    switch (part.type) {
      /* Process different parts */
      case 'tool-invocation': {
        const toolCall = part.toolInvocation;

        /* Process different tool calls */
        switch (toolCall.toolName) {
          case 'generateGraphObjects': {
            // Handle loader
            if (toolCall.state !== 'result') {
              return (
                <div key={toolCall.toolCallId} className="mb-2">
                  <Skeleton className="h-[300px] w-[500px] bg-gray-300" />
                </div>
              );
            }

            // Attempt to parse result
            const parseResult = graphObjectSchema.safeParse(
              toolCall.result.data
            );

            if (parseResult.success) {
              return (
                <Chart
                  key={`${toolCall.toolCallId}-${index}`}
                  {...parseResult.data}
                />
              );
            } else {
              return (
                <p className="text-muted-foreground">
                  Oh no! Failed to generate a graph object. Lets me try again!
                </p>
              );
            }
          }
          default: {
            return <></>;
          }
        }
      }
      default: {
        return <></>;
      }
    }
  });
}
