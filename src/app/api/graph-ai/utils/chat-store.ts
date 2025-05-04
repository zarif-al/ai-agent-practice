'use server';

import type { IChat } from '@/components/ai-chat/interface';
import { db } from '@/db';
import { chatsTable } from '@/db/schema/chat/chats';
import { chatMessagesTable } from '@/db/schema/chat/messages';
import { Message } from 'ai';
import { revalidatePath } from 'next/cache';

export async function createChat(name: string): Promise<IChat | null> {
  const results = await db
    .insert(chatsTable)
    .values({
      name,
    })
    .returning({
      id: chatsTable.id,
      name: chatsTable.name,
      created_at: chatsTable.created_at,
    });

  const insertedChat = results[0];

  if (insertedChat) {
    revalidatePath('/');

    return {
      id: insertedChat.id,
      name: insertedChat.name,
      created_at: insertedChat.created_at,
      messages: [],
    };
  }

  return null;
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  const lastMessage = messages[messages.length - 1];

  if (lastMessage) {
    const result = await db.insert(chatMessagesTable).values({
      chat: id,
      content: lastMessage.content,
      role: lastMessage.role,
      parts: lastMessage.parts,
    });

    if (result.rowCount === 0) {
      logSaveChatResult(lastMessage, 'error');
    } else {
      logSaveChatResult(lastMessage, 'success');
      revalidatePath('/', 'layout');
    }
  } else {
    console.error(
      `No messages to save for chat with ID: ${id}. Timestamp: ${new Date().toLocaleDateString()}`
    );
  }
}

function logSaveChatResult(message: Message, result: 'success' | 'error') {
  if (result === 'success') {
    console.log(
      `Role: ${message.role} | Content: ${message.content.substring(
        0,
        20
      )}... | Timestamp: ${new Date().toLocaleDateString()} | Saved sucessfully`
    );
  } else {
    console.error(
      `Role: ${message.role} | Content: ${message.content.substring(
        0,
        20
      )}... | Timestamp: ${new Date().toLocaleDateString()} | Failed to save`
    );
  }
}
