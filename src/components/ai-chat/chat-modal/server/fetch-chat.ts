'use server';

import { db } from '@/db';
import type { IChat } from '../../interface';
import { chatsTable } from '@/db/schema/chat/chats';
import { chatMessagesTable } from '@/db/schema/chat/messages';
import { asc, eq } from 'drizzle-orm';

export async function fetchChat(id?: string): Promise<IChat | null> {
  if (!id) {
    return null;
  }

  /**
   * WARNING: This is a highly inefficient query that fetches all chats and their messages.
   * Example response:
   * ---------------------------------------------------
   * chat_id | chat_name | message_id | message_content
   * ---------------------------------------------------
   * 1 | Chat A | 101 | "Hello"
   * 1 | Chat A | 102 | "How are you?"
   * 2 | Chat B | 103 | "Hi"
   * -----------------------------------------------------
   *
   * As you can see, the query returns a lot of duplicate data.
   */
  const allChats = await db
    .select({
      id: chatsTable.id,
      name: chatsTable.name,
      message: {
        id: chatMessagesTable.id,
        created_at: chatMessagesTable.created_at,
        role: chatMessagesTable.role,
        content: chatMessagesTable.content,
        parts: chatMessagesTable.parts,
      },
      created_at: chatsTable.created_at,
    })
    .from(chatsTable)
    .where(eq(chatsTable.id, id))
    .leftJoin(chatMessagesTable, eq(chatsTable.id, chatMessagesTable.chat))
    .orderBy(asc(chatMessagesTable.created_at));

  /**
   * Process the raw chats data into a more structured format.
   */
  const chatsMap = new Map<string, IChat>();

  for (const row of allChats) {
    if (!chatsMap.has(row.id)) {
      chatsMap.set(row.id, {
        id: row.id,
        name: row.name,
        messages: [],
        created_at: row.created_at,
      });
    }

    if (row.message) {
      chatsMap.get(row.id)!.messages.push({
        id: row.message.id,
        content: row.message.content,
        created_at: row.message.created_at,
        role: row.message.role,
        parts: row.message.parts || undefined,
      });
    }
  }

  // Convert the Map to an array of chats
  const chats = Array.from(chatsMap.values());

  return chats[0] || null;
}
