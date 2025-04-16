import { NextResponse } from "next/server";
import {
	departments,
	employees,
	jobOpenings,
	leaveManagement,
	payroll,
	positions,
} from "./seed-data";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { waitUntil } from "@vercel/functions";

export async function GET() {
	waitUntil(seedDatabase());

	return NextResponse.json(
		{ message: "Database seeder started" },
		{ status: 200 }
	);
}

async function seedDatabase() {
	console.log("Seeding database...");

	try {
		await down();

		await up();
	} catch (e) {
		console.error(e);
	}

	console.log("Database seeded successfully");
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
	const supabase = await supabaseServerClient();

	console.log("Deleting existing data");

	// Payroll
	console.log("	Deleting all payroll items...");

	const { error: payrollError } = await supabase
		.from("payroll")
		.delete()
		.not("id", "is", null);

	if (payrollError) {
		throw new Error(payrollError.message);
	}

	// Leave Management
	console.log("	Deleting all leave managment items...");

	const { error: leaveManagementError } = await supabase
		.from("leave_management")
		.delete()
		.not("id", "is", null);

	if (leaveManagementError) {
		throw new Error(leaveManagementError.message);
	}

	// Employees
	console.log("	Deleting all employees");

	const { error: employeeError } = await supabase
		.from("employees")
		.delete()
		.not("id", "is", null);

	if (employeeError) {
		throw new Error(employeeError.message);
	}

	// Job Openings
	console.log("	Deleting all job openings...");

	const { error: jobOpeningsError } = await supabase
		.from("job_openings")
		.delete()
		.not("id", "is", null);

	if (jobOpeningsError) {
		throw new Error(jobOpeningsError.message);
	}

	// Positions
	console.log("	Deleting all job openings...");

	const { error: positionsError } = await supabase
		.from("positions")
		.delete()
		.not("id", "is", null);

	if (positionsError) {
		throw new Error(positionsError.message);
	}

	// Deparments
	console.log("	Deleting all departments...");

	const { error: departmentError } = await supabase
		.from("departments")
		.delete()
		.not("id", "is", null);

	if (departmentError) {
		throw new Error(departmentError.message);
	}

	console.log("\n");
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

	const supabase = await supabaseServerClient();

	console.log("Seeding database");

	// Departments
	console.log("	Seeding departments...");

	const { error: departmentError } = await supabase
		.from("departments")
		.insert(departments);

	if (departmentError) {
		throw new Error(departmentError.message);
	}

	// Positions
	console.log("	Seeding positions...");

	const { error: positionsError } = await supabase
		.from("positions")
		.insert(positions);

	if (positionsError) {
		throw new Error(positionsError.message);
	}

	// Job Openings
	console.log("	Seeding job openings...");
	const { error: jobOpeningsError } = await supabase
		.from("job_openings")
		.insert(jobOpenings);

	if (jobOpeningsError) {
		throw new Error(jobOpeningsError.message);
	}

	// Employees
	console.log("	Seeding employees...");

	const { error: employeeError } = await supabase
		.from("employees")
		.insert(employees);

	if (employeeError) {
		throw new Error(employeeError.message);
	}

	// Leave Management
	console.log("	Seeding leave management...");

	const { error: leaveManagementError } = await supabase
		.from("leave_management")
		.insert(leaveManagement);

	if (leaveManagementError) {
		throw new Error(leaveManagementError.message);
	}

	// Payroll
	console.log("	Seeding payroll...");

	const { error: payrollError } = await supabase
		.from("payroll")
		.insert(payroll);

	if (payrollError) {
		throw new Error(payrollError.message);
	}

	console.log("\n");
}
