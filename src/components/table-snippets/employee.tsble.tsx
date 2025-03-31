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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { employees, getStatusColor, formatStatus } from "@/data/employees";

export function EmployeeTableSnippet() {
	// Only show the first 5 employees for the snippet
	const recentEmployees = employees.slice(0, 5);

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
						{recentEmployees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell>
									{employee.first_name} {employee.last_name}
								</TableCell>
								<TableCell>{employee.position_title}</TableCell>
								<TableCell className="hidden md:table-cell">
									{employee.department_name}
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
			</CardContent>
		</Card>
	);
}
