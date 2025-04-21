"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

export async function generateGraph(prompt: string) {
	try {
		const openrouter = createOpenRouter({
			apiKey: process.env.OPEN_AI_KEY,
		});

		const { object } = await generateObject({
			model: openrouter.chat("google/gemini-2.0-flash-exp:free"),
			prompt,
			schema: z.object({
				response: z.string(),
			}),
		});

		return object.response;
	} catch (error) {
		console.error("Error generating graph:", error);

		return "AI Model is not available. Please try again later.";
	}
}
