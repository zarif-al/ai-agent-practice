import { v4 as uuidv4 } from 'uuid';
import type { ILeaveManagementInsert } from '../schema/leave-management';
import type { IDepartmentsInsert } from '../schema/departments';
import type { IPositionsInsert } from '../schema/positions';
import type { IEmployeesInsert } from '../schema/employees';
import type { IJobOpeningsInsert } from '../schema/job-openings';
import type { IPayrollInsert } from '../schema/payroll';

/**
 * Database Schema
 *
 * Departments
 * - id: string (PK)
 * - name: string
 *
 * Positions
 * - id: string (PK)
 * - title: string
 * - department_id: string (FK)
 *
 * Job Openings
 * - id: string (PK)
 * - position_id: string (FK)
 * - description: string
 * - status: ENUM ("open", "closed")
 *
 * Employees
 * - id: string (PK)
 * - first_name: string
 * - last_name: string
 * - email: string
 * - phone: string
 * - position_id: string (FK)
 * - hire_date: date
 * - status: ENUM ('active', 'inactive', 'on_leave')
 *
 * Leave Management
 * - id: string (PK)
 * - employee_id: string (FK)
 * - leave_type: ENUM ('vacation', 'sick_leave', 'parental_Leave', 'medical_Leave')
 * - start_date: date
 * - end_date: date
 * - status: ENUM ('pending', 'approved', 'rejected')
 *
 * Payroll
 * - id: string (PK)
 * - employee_id: string (FK)
 * - base_salary: decimal
 * - bonus: decimal
 * - deductions: decimal
 * - net_salary: decimal
 * - currency: string
 *
 */

// Departments
export const departments: IDepartmentsInsert[] = [
  { id: uuidv4(), name: 'Engineering', created_at: new Date() },
  { id: uuidv4(), name: 'Product', created_at: new Date() },
  { id: uuidv4(), name: 'Design', created_at: new Date() },
  {
    id: uuidv4(),
    name: 'Human Resources',
    created_at: new Date(),
  },
  { id: uuidv4(), name: 'Marketing', created_at: new Date() },
  { id: uuidv4(), name: 'Finance', created_at: new Date() },
  {
    id: uuidv4(),
    name: 'Customer Support',
    created_at: new Date(),
  },
  { id: uuidv4(), name: 'Sales', created_at: new Date() },
  { id: uuidv4(), name: 'Legal', created_at: new Date() },
  {
    id: uuidv4(),
    name: 'Research & Development',
    created_at: new Date(),
  },
];

// Positions
export const positions: IPositionsInsert[] = [
  {
    id: uuidv4(),
    title: 'Software Engineer',
    department: departments[0]?.id || '', // Engineering
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Product Manager',
    department: departments[1]?.id || '', // Product
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'UX/UI Designer',
    department: departments[2]?.id || '', // Design
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'HR Coordinator',
    department: departments[3]?.id || '', // Human Resources
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Marketing Specialist',
    department: departments[4]?.id || '', // Marketing
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Financial Analyst',
    department: departments[5]?.id || '', // Finance
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Customer Support Representative',
    department: departments[6]?.id || '', // Customer Support
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Sales Representative',
    department: departments[7]?.id || '', // Sales
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Legal Advisor',
    department: departments[8]?.id || '', // Legal
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Research Scientist',
    department: departments[9]?.id || '', // Research & Development
    created_at: new Date(),
  },
];

// Employees
export const employees: IEmployeesInsert[] = [
  {
    id: uuidv4(),
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    position: positions[0]?.id || '', // Software Engineer
    hire_date: '2020-03-15',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    position: positions[1]?.id || '', // Product Manager
    hire_date: '2019-07-22',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Michael',
    last_name: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '(555) 456-7890',
    position: positions[2]?.id || '', // UX/UI Designer
    hire_date: '2021-01-10',
    status: 'on_leave',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Emily',
    last_name: 'Williams',
    email: 'emily.williams@example.com',
    phone: '(555) 234-5678',
    position: positions[3]?.id || '', // HR Coordinator
    hire_date: '2018-11-05',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'David',
    last_name: 'Brown',
    email: 'david.brown@example.com',
    phone: '(555) 876-5432',
    position: positions[4]?.id || '', // Marketing Specialist
    hire_date: '2022-02-28',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Sarah',
    last_name: 'Miller',
    email: 'sarah.miller@example.com',
    phone: '(555) 345-6789',
    position: positions[5]?.id || '', // Financial Analyst
    hire_date: '2020-09-14',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Robert',
    last_name: 'Wilson',
    email: 'robert.wilson@example.com',
    phone: '(555) 765-4321',
    position: positions[6]?.id || '', // Customer Support Representative
    hire_date: '2017-06-30',
    status: 'terminated',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Jennifer',
    last_name: 'Taylor',
    email: 'jennifer.taylor@example.com',
    phone: '(555) 567-8901',
    position: positions[7]?.id || '', // Sales Representative
    hire_date: '2021-05-17',
    status: 'active',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Thomas',
    last_name: 'Anderson',
    email: 'thomas.anderson@example.com',
    phone: '(555) 654-3210',
    position: positions[8]?.id || '', // Legal Advisor
    hire_date: '2019-12-01',
    status: 'inactive',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    first_name: 'Lisa',
    last_name: 'Garcia',
    email: 'lisa.garcia@example.com',
    phone: '(555) 432-1098',
    position: positions[9]?.id || '', // Research Scientist
    hire_date: '2020-07-08',
    status: 'active',
    created_at: new Date(),
  },
];

// Job Openings
export const jobOpenings: IJobOpeningsInsert[] = [
  {
    id: uuidv4(),
    position: positions[0]?.id || '', // Software Engineer
    description: 'We are looking for a Software Engineer to join our team.',
    status: 'open', // Matches the ENUM definition
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[1]?.id || '', // Product Manager
    description:
      'We are looking for a Product Manager to lead our product development.',
    status: 'open',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[2]?.id || '', // UX/UI Designer
    description:
      'We are looking for a UX/UI Designer to create user-friendly interfaces.',
    status: 'open',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[3]?.id || '', // HR Coordinator
    description:
      'Join our HR team as a Coordinator to manage employee relations.',
    status: 'closed',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[4]?.id || '', // Marketing Specialist
    description: 'We need a Marketing Specialist to drive our campaigns.',
    status: 'open',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[5]?.id || '', // Financial Analyst
    description: 'Seeking a Financial Analyst to manage company finances.',
    status: 'closed',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[6]?.id || '', // Customer Support Representative
    description:
      'Looking for a Customer Support Representative to assist clients.',
    status: 'open',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[7]?.id || '', // Sales Representative
    description: 'Join our Sales team to drive revenue growth.',
    status: 'closed',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[8]?.id || '', // Legal Advisor
    description: 'We are hiring a Legal Advisor to oversee compliance.',
    status: 'open',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    position: positions[9]?.id || '', // Research Scientist
    description:
      'Seeking a Research Scientist to innovate in our R&D department.',
    status: 'closed',
    created_at: new Date(),
  },
];

// Leave Management
export const leaveManagement: ILeaveManagementInsert[] = [
  {
    id: uuidv4(),
    employee: employees[0]?.id || '', // John Doe
    leave_type: 'vacation',
    start_date: '2023-06-01',
    end_date: '2023-06-10',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[1]?.id || '', // Jane Smith
    leave_type: 'sick_leave',
    start_date: '2023-07-15',
    end_date: '2023-07-20',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[2]?.id || '', // Michael Johnson
    leave_type: 'parental_leave',
    start_date: '2023-08-01',
    end_date: '2023-08-30',
    status: 'pending',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[3]?.id || '', // Emily Williams
    leave_type: 'vacation',
    start_date: '2023-09-10',
    end_date: '2023-09-15',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[4]?.id || '', // David Brown
    leave_type: 'sick_leave',
    start_date: '2023-10-05',
    end_date: '2023-10-07',
    status: 'rejected',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[5]?.id || '', // Sarah Miller
    leave_type: 'vacation',
    start_date: '2023-11-20',
    end_date: '2023-11-25',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[6]?.id || '', // Robert Wilson
    leave_type: 'vacation', // Assuming "Unpaid Leave" maps to "vacation"
    start_date: '2023-12-01',
    end_date: '2023-12-10',
    status: 'pending',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[7]?.id || '', // Jennifer Taylor
    leave_type: 'vacation',
    start_date: '2024-01-15',
    end_date: '2024-01-20',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[8]?.id || '', // Thomas Anderson
    leave_type: 'medical_leave',
    start_date: '2024-02-01',
    end_date: '2024-02-15',
    status: 'approved',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[9]?.id || '', // Lisa Garcia
    leave_type: 'vacation',
    start_date: '2024-03-10',
    end_date: '2024-03-15',
    status: 'approved',
    created_at: new Date(),
  },
];

// Payroll
export const payroll: IPayrollInsert[] = [
  {
    id: uuidv4(),
    employee: employees[0]?.id || '', // John Doe
    base_salary: 85000,
    bonus: 5000,
    deductions: 25500,
    net_salary: 64500, // 85000 + 5000 - 25500
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[1]?.id || '', // Jane Smith
    base_salary: 95000,
    bonus: 7500,
    deductions: 30900,
    net_salary: 71600, // 95000 + 7500 - 30900
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[2]?.id || '', // Michael Johnson
    base_salary: 78000,
    bonus: 3000,
    deductions: 24300,
    net_salary: 56700, // 78000 + 3000 - 24300
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[3]?.id || '', // Emily Williams
    base_salary: 72000,
    bonus: 2500,
    deductions: 22350,
    net_salary: 52150, // 72000 + 2500 - 22350
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[4]?.id || '', // David Brown
    base_salary: 68000,
    bonus: 2000,
    deductions: 21000,
    net_salary: 49000, // 68000 + 2000 - 21000
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[5]?.id || '', // Sarah Miller
    base_salary: 82000,
    bonus: 4000,
    deductions: 25800,
    net_salary: 60200, // 82000 + 4000 - 25800
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[6]?.id || '', // Robert Wilson
    base_salary: 92000,
    bonus: 6000,
    deductions: 29400,
    net_salary: 68600, // 92000 + 6000 - 29400
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[7]?.id || '', // Jennifer Taylor
    base_salary: 75000,
    bonus: 3500,
    deductions: 23550,
    net_salary: 54950, // 75000 + 3500 - 23550
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[8]?.id || '', // Thomas Anderson
    base_salary: 88000,
    bonus: 0,
    deductions: 26400,
    net_salary: 61600, // 88000 + 0 - 26400
    currency: 'USD',
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    employee: employees[9]?.id || '', // Lisa Garcia
    base_salary: 70000,
    bonus: 2000,
    deductions: 21600,
    net_salary: 50400, // 70000 + 2000 - 21600
    currency: 'USD',
    created_at: new Date(),
  },
];
