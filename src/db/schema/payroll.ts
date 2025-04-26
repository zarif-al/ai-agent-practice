import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { employeesTable } from './employees';

export const currencyEnum = pgEnum('currency', ['USD', 'BDT']);

export const payrollTable = pgTable('payroll', {
  id: uuid('id').defaultRandom().primaryKey(),
  employee: uuid('employee')
    .references(() => employeesTable.id)
    .notNull(),
  base_salary: integer('base_salary').notNull(),
  bonus: integer('bonus').notNull(),
  deductions: integer('deductions').notNull(),
  net_salary: integer('tax').notNull(),
  currency: currencyEnum('currency').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type IPayrollSelect = typeof payrollTable.$inferSelect;
export type IPayrollInsert = typeof payrollTable.$inferInsert;
