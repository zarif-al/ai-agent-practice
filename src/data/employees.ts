// Types for our employee data
export type EmployeeStatus =
	| "active"
	| "on_leave"
	| "terminated"
	| "probation"
	| "inactive";

export interface Employee {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	position_id: number;
	position_title: string; // For display purposes
	department_id: number;
	department_name: string; // For display purposes
	hire_date: string;
	status: EmployeeStatus;
}

// Mock positions data
export const positions = [
	{ id: 1, title: "Software Engineer" },
	{ id: 2, title: "Product Manager" },
	{ id: 3, title: "UX Designer" },
	{ id: 4, title: "HR Specialist" },
	{ id: 5, title: "Marketing Coordinator" },
];

// Mock departments data
export const departments = [
	{ id: 1, name: "Engineering" },
	{ id: 2, name: "Product" },
	{ id: 3, name: "Design" },
	{ id: 4, name: "Human Resources" },
	{ id: 5, name: "Marketing" },
];

// Mock employees data
export const employees: Employee[] = [
	{
		id: 1,
		first_name: "John",
		last_name: "Doe",
		email: "john.doe@example.com",
		phone: "(555) 123-4567",
		position_id: 1,
		position_title: "Software Engineer",
		department_id: 1,
		department_name: "Engineering",
		hire_date: "2020-03-15",
		status: "active",
	},
	{
		id: 2,
		first_name: "Jane",
		last_name: "Smith",
		email: "jane.smith@example.com",
		phone: "(555) 987-6543",
		position_id: 2,
		position_title: "Product Manager",
		department_id: 2,
		department_name: "Product",
		hire_date: "2019-07-22",
		status: "active",
	},
	{
		id: 3,
		first_name: "Michael",
		last_name: "Johnson",
		email: "michael.johnson@example.com",
		phone: "(555) 456-7890",
		position_id: 3,
		position_title: "UX Designer",
		department_id: 3,
		department_name: "Design",
		hire_date: "2021-01-10",
		status: "on_leave",
	},
	{
		id: 4,
		first_name: "Emily",
		last_name: "Williams",
		email: "emily.williams@example.com",
		phone: "(555) 234-5678",
		position_id: 4,
		position_title: "HR Specialist",
		department_id: 4,
		department_name: "Human Resources",
		hire_date: "2018-11-05",
		status: "active",
	},
	{
		id: 5,
		first_name: "David",
		last_name: "Brown",
		email: "david.brown@example.com",
		phone: "(555) 876-5432",
		position_id: 5,
		position_title: "Marketing Coordinator",
		department_id: 5,
		department_name: "Marketing",
		hire_date: "2022-02-28",
		status: "active",
	},
	{
		id: 6,
		first_name: "Sarah",
		last_name: "Miller",
		email: "sarah.miller@example.com",
		phone: "(555) 345-6789",
		position_id: 1,
		position_title: "Software Engineer",
		department_id: 1,
		department_name: "Engineering",
		hire_date: "2020-09-14",
		status: "active",
	},
	{
		id: 7,
		first_name: "Robert",
		last_name: "Wilson",
		email: "robert.wilson@example.com",
		phone: "(555) 765-4321",
		position_id: 2,
		position_title: "Product Manager",
		department_id: 2,
		department_name: "Product",
		hire_date: "2017-06-30",
		status: "terminated",
	},
	{
		id: 8,
		first_name: "Jennifer",
		last_name: "Taylor",
		email: "jennifer.taylor@example.com",
		phone: "(555) 567-8901",
		position_id: 3,
		position_title: "UX Designer",
		department_id: 3,
		department_name: "Design",
		hire_date: "2021-05-17",
		status: "active",
	},
	{
		id: 9,
		first_name: "Thomas",
		last_name: "Anderson",
		email: "thomas.anderson@example.com",
		phone: "(555) 654-3210",
		position_id: 1,
		position_title: "Software Engineer",
		department_id: 1,
		department_name: "Engineering",
		hire_date: "2019-12-01",
		status: "terminated",
	},
	{
		id: 10,
		first_name: "Lisa",
		last_name: "Garcia",
		email: "lisa.garcia@example.com",
		phone: "(555) 432-1098",
		position_id: 4,
		position_title: "HR Specialist",
		department_id: 4,
		department_name: "Human Resources",
		hire_date: "2020-07-08",
		status: "active",
	},
];

// Helper function to get status badge color
export function getStatusColor(status: EmployeeStatus): string {
	switch (status) {
		case "active":
			return "bg-green-100 text-green-800 border-green-200";
		case "on_leave":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "terminated":
			return "bg-red-100 text-red-800 border-red-200";
		case "terminated":
			return "bg-blue-100 text-blue-800 border-blue-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
}

// Helper function to format status for display
export function formatStatus(status: EmployeeStatus): string {
	return status
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
