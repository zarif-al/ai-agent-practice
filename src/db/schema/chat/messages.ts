import {
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { chatsTable } from './chats';
import type { Message } from 'ai';

export const chatMessageRoleEnum = pgEnum('chat_message_role', [
  'user',
  'assistant',
  'system',
  'data',
]);

export const chatMessagesTable = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  created_at: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  chat: uuid('chat')
    .references(() => chatsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  role: chatMessageRoleEnum('role').notNull(),
  content: varchar('content', { length: 10000 }).notNull(),
  parts: jsonb('parts').$type<Message['parts']>(),
});

export type ChatMessageRoleEnum =
  (typeof chatMessageRoleEnum)['enumValues'][number];
