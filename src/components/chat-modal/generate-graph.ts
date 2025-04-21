"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export async function generateGraph(prompt: string) {
	try {
		const openrouter = createOpenRouter({
			apiKey: process.env.OPEN_AI_KEY,
		});

		const { text } = await generateText({
			model: openrouter.chat("google/gemini-2.0-flash-exp:free"),
			prompt,
		});

		return text;
	} catch (error) {
		console.error("Error generating graph:", error);

		return "AI Model is not available. Please try again later.";
	}
}
