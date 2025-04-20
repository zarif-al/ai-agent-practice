import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { getStatusColor, formatStatus } from "@/data/employees";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";
import { TableSnippetEmpty } from "./empty";

export async function EmployeeTableSnippet() {
	const supabase = await supabaseServerClient();

	const { data: employees, error } = await supabase
		.from("employees")
		.select(
			`
				*,
				position (
					title,
					department(
						name
					)
				)
				`
		)
		.limit(5)
		.order("hire_date", { ascending: false });

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div>
					<CardTitle>Recent Employees</CardTitle>
					<CardDescription>
						Overview of the most recent employee records
					</CardDescription>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/employee-management" className="flex items-center">
						View All
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Position</TableHead>
							<TableHead className="hidden md:table-cell">Department</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{employees.length > 0 ? (
							employees.map((employee) => (
								<TableRow key={employee.id}>
									<TableCell>
										{employee.first_name} {employee.last_name}
									</TableCell>
									<TableCell>{employee.position.title}</TableCell>
									<TableCell className="hidden md:table-cell">
										{employee.position.department.name}
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
							))
						) : (
							<TableSnippetEmpty
								icon={Users}
								title="No employees found"
								description="Add employees to see them listed here."
							/>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
