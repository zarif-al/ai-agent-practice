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
import { payrollRecords, formatCurrency } from "@/data/payroll";

export function PayrollSnippet() {
	// Get the top 5 highest paid employees
	const topPaidEmployees = [...payrollRecords]
		.sort((a, b) => b.net_salary - a.net_salary)
		.slice(0, 5);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div>
					<CardTitle>Top Compensations</CardTitle>
					<CardDescription>Highest paid employees</CardDescription>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/payroll-compensation" className="flex items-center">
						View All
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Employee</TableHead>
							<TableHead className="text-right">Base Salary</TableHead>
							<TableHead className="text-right">Net Salary</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topPaidEmployees.map((record) => (
							<TableRow key={record.id}>
								<TableCell>{record.employee_name}</TableCell>
								<TableCell className="text-right">
									{formatCurrency(record.base_salary)}
								</TableCell>
								<TableCell className="text-right font-medium">
									{formatCurrency(record.net_salary)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
