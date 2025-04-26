import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { positionsTable } from './positions';

export const jobOpeningStatusEnum = pgEnum('job_opening_status', [
  'open',
  'closed',
]);

export const jobOpeningsTable = pgTable('job_openings', {
  id: uuid('id').defaultRandom().primaryKey(),
  position: uuid('position').references(() => positionsTable.id, {
    onDelete: 'cascade',
  }),
  description: varchar('description', { length: 255 }).notNull(),
  status: jobOpeningStatusEnum('status').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type IJobOpeningsSelect = typeof jobOpeningsTable.$inferSelect;
export type IJobOpeningsInsert = typeof jobOpeningsTable.$inferInsert;
