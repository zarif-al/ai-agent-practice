import {
  date,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { positionsTable } from './positions';

export const userStatusEnum = pgEnum('user_status', [
  'active',
  'inactive',
  'on_leave',
  'terminated',
  'probation',
]);

export const employeesTable = pgTable('employees', {
  id: uuid('id').defaultRandom().primaryKey(),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull(),
  // Do not delete employee records when position is deleted.
  position: uuid('position').references(() => positionsTable.id),
  hire_date: date('hire_date').notNull(),
  status: userStatusEnum('status').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type IEmployeesSelect = typeof employeesTable.$inferSelect;
export type IEmployeesInsert = typeof employeesTable.$inferInsert;
