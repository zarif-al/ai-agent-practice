import { appendResponseMessages, streamText } from "ai";
import { saveChat } from "@/lib/chat-store";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import DatabaseSchema from "@/lib/supabase/table.json";
// import { z } from "zod";

export async function POST(req: Request) {
	const { messages, id } = await req.json();

	try {
		const openrouter = createOpenRouter({
			apiKey: process.env.OPEN_AI_KEY,
		});

		/**
		 * Notes:
		 * - It seems `generateObject` does not support tool calling, as this function calls tools internally.
		 * 	 I am proceeding with `generateText` for now.
		 */
		const result = await streamText({
			model: openrouter.chat("google/gemini-2.0-flash-exp:free"),
			system:
				`Here is the database schema of the system you are working with ${JSON.stringify(
					DatabaseSchema
				)}` +
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
			// tools: {
			// 	validatePrompt: {
			// 		description: "Validates the prompt and returns a boolean.",
			// 		parameters: z.object({
			// 			graphType: z.enum(["bar", "line", "pie"]),
			// 			xAxis: z.string(),
			// 			yAxis: z.string(),
			// 		}),
			// 		execute: async ({ graphType, xAxis, yAxis }) => {
			// 			// Check if graphType is defined and is of the right type
			// 			if (!graphType) {
			// 				throw new Error("Graph type is not defined.");
			// 			}

			// 			if (!["bar", "line", "pie"].includes(graphType)) {
			// 				throw new Error("Graph type is not valid.");
			// 			}

			// 			// Check if xAxis and yAxis are defined and are of the right type
			// 			if (!xAxis || !yAxis) {
			// 				throw new Error("xAxis or yAxis is not defined.");
			// 			}

			// 			if (typeof xAxis !== "string" || typeof yAxis !== "string") {
			// 				throw new Error("xAxis or yAxis is not a string.");
			// 			}
			// 		},
			// 	},
			// },
		});

		// console.log("Tool Calls:", toolCalls);
		// console.log("Warnings:", warnings);

		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Error generating graph:", error);

		return new Response("AI Model is not available. Please try again later.", {
			status: 500,
		});
	}
}
