import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chatsTable = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
