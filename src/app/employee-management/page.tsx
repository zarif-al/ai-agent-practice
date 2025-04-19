import { AppHeader } from "@/components/app-header";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getStatusColor, formatStatus } from "@/data/employees";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";

export default async function Page() {
	const supabase = await supabaseServerClient();

	const { data: employees, error } = await supabase.from("employees").select(`
			*,
			position (
				title,
				department(
					name
				)
			)
			`);

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Employee Management" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Employees</h2>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead className="hidden md:table-cell">Phone</TableHead>
								<TableHead className="hidden md:table-cell">Position</TableHead>
								<TableHead className="hidden lg:table-cell">
									Department
								</TableHead>
								<TableHead className="hidden lg:table-cell">
									Hire Date
								</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{employees.map((employee) => (
								<TableRow key={employee.id}>
									<TableCell>
										{employee.first_name} {employee.last_name}
									</TableCell>
									<TableCell>{employee.email}</TableCell>
									<TableCell className="hidden md:table-cell">
										{employee.phone}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{employee.position.title}
									</TableCell>
									<TableCell className="hidden lg:table-cell">
										{employee.position.department.name}
									</TableCell>
									<TableCell className="hidden lg:table-cell">
										{employee.hire_date}
									</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
												employee.status
											)}`}
										>
											{formatStatus(employee.status)}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>
		</div>
	);
}
