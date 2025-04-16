import { v4 as uuidv4 } from "uuid";
import {
	CurrencyType,
	EmployeeStatus,
	JobOpeningStatus,
	LeaveRequestStatus,
	LeaveType,
} from "@/lib/enums";

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
export const departments = [
	{ id: uuidv4(), name: "Engineering" },
	{ id: uuidv4(), name: "Product" },
	{ id: uuidv4(), name: "Design" },
	{ id: uuidv4(), name: "Human Resources" },
	{ id: uuidv4(), name: "Marketing" },
	{ id: uuidv4(), name: "Finance" },
	{ id: uuidv4(), name: "Customer Support" },
	{ id: uuidv4(), name: "Sales" },
	{ id: uuidv4(), name: "Legal" },
	{ id: uuidv4(), name: "Research & Development" },
];

// Positions
export const positions = [
	{
		id: uuidv4(),
		title: "Software Engineer",
		department_id: departments[0].id, // Engineering
	},
	{
		id: uuidv4(),
		title: "Product Manager",
		department_id: departments[1].id, // Product
	},
	{
		id: uuidv4(),
		title: "UX/UI Designer",
		department_id: departments[2].id, // Design
	},
	{
		id: uuidv4(),
		title: "HR Coordinator",
		department_id: departments[3].id, // Human Resources
	},
	{
		id: uuidv4(),
		title: "Marketing Specialist",
		department_id: departments[4].id, // Marketing
	},
	{
		id: uuidv4(),
		title: "Financial Analyst",
		department_id: departments[5].id, // Finance
	},
	{
		id: uuidv4(),
		title: "Customer Support Representative",
		department_id: departments[6].id, // Customer Support
	},
	{
		id: uuidv4(),
		title: "Sales Representative",
		department_id: departments[7].id, // Sales
	},
	{
		id: uuidv4(),
		title: "Legal Advisor",
		department_id: departments[8].id, // Legal
	},
	{
		id: uuidv4(),
		title: "Research Scientist",
		department_id: departments[9].id, // Research & Development
	},
];

// Employees
export const employees = [
	{
		id: uuidv4(),
		first_name: "John",
		last_name: "Doe",
		email: "john.doe@example.com",
		phone: "(555) 123-4567",
		position_id: positions[0].id, // Software Engineer
		hire_date: "2020-03-15",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Jane",
		last_name: "Smith",
		email: "jane.smith@example.com",
		phone: "(555) 987-6543",
		position_id: positions[1].id, // Product Manager
		hire_date: "2019-07-22",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Michael",
		last_name: "Johnson",
		email: "michael.johnson@example.com",
		phone: "(555) 456-7890",
		position_id: positions[2].id, // UX/UI Designer
		hire_date: "2021-01-10",
		status: EmployeeStatus.ON_LEAVE,
	},
	{
		id: uuidv4(),
		first_name: "Emily",
		last_name: "Williams",
		email: "emily.williams@example.com",
		phone: "(555) 234-5678",
		position_id: positions[3].id, // HR Coordinator
		hire_date: "2018-11-05",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "David",
		last_name: "Brown",
		email: "david.brown@example.com",
		phone: "(555) 876-5432",
		position_id: positions[4].id, // Marketing Specialist
		hire_date: "2022-02-28",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Sarah",
		last_name: "Miller",
		email: "sarah.miller@example.com",
		phone: "(555) 345-6789",
		position_id: positions[5].id, // Financial Analyst
		hire_date: "2020-09-14",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Robert",
		last_name: "Wilson",
		email: "robert.wilson@example.com",
		phone: "(555) 765-4321",
		position_id: positions[6].id, // Customer Support Representative
		hire_date: "2017-06-30",
		status: EmployeeStatus.TERMINATED,
	},
	{
		id: uuidv4(),
		first_name: "Jennifer",
		last_name: "Taylor",
		email: "jennifer.taylor@example.com",
		phone: "(555) 567-8901",
		position_id: positions[7].id, // Sales Representative
		hire_date: "2021-05-17",
		status: EmployeeStatus.ACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Thomas",
		last_name: "Anderson",
		email: "thomas.anderson@example.com",
		phone: "(555) 654-3210",
		position_id: positions[8].id, // Legal Advisor
		hire_date: "2019-12-01",
		status: EmployeeStatus.INACTIVE,
	},
	{
		id: uuidv4(),
		first_name: "Lisa",
		last_name: "Garcia",
		email: "lisa.garcia@example.com",
		phone: "(555) 432-1098",
		position_id: positions[9].id, // Research Scientist
		hire_date: "2020-07-08",
		status: EmployeeStatus.ACTIVE,
	},
];

// Job Openings
export const jobOpenings = [
	{
		id: uuidv4(),
		position_id: positions[0].id, // Software Engineer
		description: "We are looking for a Software Engineer to join our team.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[1].id, // Product Manager
		description:
			"We are looking for a Product Manager to lead our product development.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[2].id, // UX/UI Designer
		description:
			"We are looking for a UX/UI Designer to create user-friendly interfaces.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[3].id, // HR Coordinator
		description:
			"Join our HR team as a Coordinator to manage employee relations.",
		status: JobOpeningStatus.CLOSED,
	},
	{
		id: uuidv4(),
		position_id: positions[4].id, // Marketing Specialist
		description: "We need a Marketing Specialist to drive our campaigns.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[5].id, // Financial Analyst
		description: "Seeking a Financial Analyst to manage company finances.",
		status: JobOpeningStatus.CLOSED,
	},
	{
		id: uuidv4(),
		position_id: positions[6].id, // Customer Support Representative
		description:
			"Looking for a Customer Support Representative to assist clients.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[7].id, // Sales Representative
		description: "Join our Sales team to drive revenue growth.",
		status: JobOpeningStatus.CLOSED,
	},
	{
		id: uuidv4(),
		position_id: positions[8].id, // Legal Advisor
		description: "We are hiring a Legal Advisor to oversee compliance.",
		status: JobOpeningStatus.OPEN,
	},
	{
		id: uuidv4(),
		position_id: positions[9].id, // Research Scientist
		description:
			"Seeking a Research Scientist to innovate in our R&D department.",
		status: JobOpeningStatus.CLOSED,
	},
];

// Leave Management
export const leaveManagement = [
	{
		id: uuidv4(),
		employee_id: employees[0].id, // John Doe
		leave_type: LeaveType.VACATION,
		start_date: "2023-06-01",
		end_date: "2023-06-10",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[1].id, // Jane Smith
		leave_type: LeaveType.SICK_LEAVE,
		start_date: "2023-07-15",
		end_date: "2023-07-20",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[2].id, // Michael Johnson
		leave_type: LeaveType.PARENTAL_LEAVE,
		start_date: "2023-08-01",
		end_date: "2023-08-30",
		status: LeaveRequestStatus.PENDING,
	},
	{
		id: uuidv4(),
		employee_id: employees[3].id, // Emily Williams
		leave_type: LeaveType.VACATION,
		start_date: "2023-09-10",
		end_date: "2023-09-15",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[4].id, // David Brown
		leave_type: LeaveType.SICK_LEAVE,
		start_date: "2023-10-05",
		end_date: "2023-10-07",
		status: LeaveRequestStatus.REJECTED,
	},
	{
		id: uuidv4(),
		employee_id: employees[5].id, // Sarah Miller
		leave_type: LeaveType.VACATION,
		start_date: "2023-11-20",
		end_date: "2023-11-25",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[6].id, // Robert Wilson
		leave_type: LeaveType.VACATION, // Assuming "Unpaid Leave" maps to "Vacation"
		start_date: "2023-12-01",
		end_date: "2023-12-10",
		status: LeaveRequestStatus.PENDING,
	},
	{
		id: uuidv4(),
		employee_id: employees[7].id, // Jennifer Taylor
		leave_type: LeaveType.VACATION,
		start_date: "2024-01-15",
		end_date: "2024-01-20",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[8].id, // Thomas Anderson
		leave_type: LeaveType.MEDICAL_LEAVE,
		start_date: "2024-02-01",
		end_date: "2024-02-15",
		status: LeaveRequestStatus.APPROVED,
	},
	{
		id: uuidv4(),
		employee_id: employees[9].id, // Lisa Garcia
		leave_type: LeaveType.VACATION,
		start_date: "2024-03-10",
		end_date: "2024-03-15",
		status: LeaveRequestStatus.APPROVED,
	},
];

// Payroll
export const payroll = [
	{
		id: uuidv4(),
		employee_id: employees[0].id, // John Doe
		base_salary: 85000,
		bonus: 5000,
		deductions: 25500,
		net_salary: 64500, // 85000 + 5000 - 25500
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[1].id, // Jane Smith
		base_salary: 95000,
		bonus: 7500,
		deductions: 30900,
		net_salary: 71600, // 95000 + 7500 - 30900
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[2].id, // Michael Johnson
		base_salary: 78000,
		bonus: 3000,
		deductions: 24300,
		net_salary: 56700, // 78000 + 3000 - 24300
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[3].id, // Emily Williams
		base_salary: 72000,
		bonus: 2500,
		deductions: 22350,
		net_salary: 52150, // 72000 + 2500 - 22350
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[4].id, // David Brown
		base_salary: 68000,
		bonus: 2000,
		deductions: 21000,
		net_salary: 49000, // 68000 + 2000 - 21000
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[5].id, // Sarah Miller
		base_salary: 82000,
		bonus: 4000,
		deductions: 25800,
		net_salary: 60200, // 82000 + 4000 - 25800
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[6].id, // Robert Wilson
		base_salary: 92000,
		bonus: 6000,
		deductions: 29400,
		net_salary: 68600, // 92000 + 6000 - 29400
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[7].id, // Jennifer Taylor
		base_salary: 75000,
		bonus: 3500,
		deductions: 23550,
		net_salary: 54950, // 75000 + 3500 - 23550
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[8].id, // Thomas Anderson
		base_salary: 88000,
		bonus: 0,
		deductions: 26400,
		net_salary: 61600, // 88000 + 0 - 26400
		currency: CurrencyType.USD,
	},
	{
		id: uuidv4(),
		employee_id: employees[9].id, // Lisa Garcia
		base_salary: 70000,
		bonus: 2000,
		deductions: 21600,
		net_salary: 50400, // 70000 + 2000 - 21600
		currency: CurrencyType.USD,
	},
];
