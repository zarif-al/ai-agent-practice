import { generateId, Message } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

export async function createChat(): Promise<string> {
	const id = generateId(); // generate a unique chat ID
	await writeFile(getChatFile(id), "[]"); // create an empty chat file
	return id;
}

function getChatFile(id: string): string {
	const chatDir = path.join(process.cwd(), ".chats");
	if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
	return path.join(chatDir, `${id}.json`);
}

export async function saveChat({
	id,
	messages,
}: {
	id: string;
	messages: Message[];
}): Promise<void> {
	const content = JSON.stringify(messages, null, 2);
	await writeFile(getChatFile(id), content);
}
