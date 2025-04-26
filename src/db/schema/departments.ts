import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const departmentsTable = pgTable('departments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type IDepartmentsSelect = typeof departmentsTable.$inferSelect;
export type IDepartmentsInsert = typeof departmentsTable.$inferInsert;
