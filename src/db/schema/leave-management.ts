import { date, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { employeesTable } from './employees';

export const leaveTypeEnum = pgEnum('leave_type', [
  'vacation',
  'sick_leave',
  'parental_leave',
  'medical_leave',
]);

export const leaveRequestStatusEnum = pgEnum('leave_request_status', [
  'approved',
  'pending',
  'rejected',
]);

export const leaveManagementTable = pgTable('leave_management', {
  id: uuid('id').defaultRandom().primaryKey(),
  employee: uuid('employee').references(() => employeesTable.id, {
    onDelete: 'cascade',
  }),
  leave_type: leaveTypeEnum('leave_type').notNull(),
  start_date: date('start_date').notNull(),
  end_date: date('end_date').notNull(),
  status: leaveRequestStatusEnum('status').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type ILeaveManagementSelect = typeof leaveManagementTable.$inferSelect;
export type ILeaveManagementInsert = typeof leaveManagementTable.$inferInsert;
