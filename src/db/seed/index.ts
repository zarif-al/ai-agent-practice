import {
  departments,
  employees,
  jobOpenings,
  leaveManagement,
  payroll,
  positions,
} from '@/db/seed/data';
import { db } from '..';
import { departmentsTable } from '../schema/departments';
import { employeesTable } from '../schema/employees';
import { jobOpeningsTable } from '../schema/job-openings';
import { leaveManagementTable } from '../schema/leave-management';
import { payrollTable } from '../schema/payroll';
import { positionsTable } from '../schema/positions';

async function main() {
  console.log('Seeding database...');
  await down();
  await up();
}

async function down() {
  /**
   * Down Order
   * - Payroll
   * - Leave Management
   * - Employees
   * - Job Openings
   * - Positions
   * - Departments
   */
  try {
    console.log('\n\nDeleting existing data');

    // Payroll
    console.log('	Deleting all payroll items...');

    await db.delete(payrollTable);

    // Leave Management
    console.log('	Deleting all leave managment items...');

    await db.delete(leaveManagementTable);

    // Employees
    console.log('	Deleting all employees');

    await db.delete(employeesTable);

    // Job Openings
    console.log('	Deleting all job openings...');

    await db.delete(jobOpeningsTable);

    // Positions
    console.log('	Deleting all job openings...');

    await db.delete(positionsTable);

    // Deparments
    console.log('	Deleting all departments...');

    await db.delete(departmentsTable);

    console.log('\n');
  } catch (e) {
    console.error('Error deleting data', e);
  }
}

async function up() {
  /**
   * Up Order
   * - Departments
   * - Positions
   * - Job Openings
   * - Employees
   * - Leave Management
   * - Payroll
   */

  console.log('\n\nSeeding database');

  // Departments
  console.log('	Seeding departments...');

  await db.insert(departmentsTable).values(departments);

  // Positions
  console.log('	Seeding positions...');

  await db.insert(positionsTable).values(positions);

  // Job Openings
  console.log('	Seeding job openings...');

  await db.insert(jobOpeningsTable).values(jobOpenings);

  // Employees
  console.log('	Seeding employees...');

  await db.insert(employeesTable).values(employees);

  // Leave Management
  console.log('	Seeding leave management...');

  await db.insert(leaveManagementTable).values(leaveManagement);

  // Payroll
  console.log('	Seeding payroll...');

  await db.insert(payrollTable).values(payroll);

  console.log('\n');
}

main();
