import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { departmentsTable } from './departments';
import {} from 'console';

export const positionsTable = pgTable('positions', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull().unique(),
  department: uuid('department')
    .notNull()
    .references(() => departmentsTable.id, {
      onDelete: 'cascade',
    }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type IPositionsSelect = typeof positionsTable.$inferSelect;
export type IPositionsInsert = typeof positionsTable.$inferInsert;
