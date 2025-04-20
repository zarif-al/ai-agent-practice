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
import { ChevronRight, DollarSign } from "lucide-react";
import Link from "next/link";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";
import { TableSnippetEmpty } from "./empty";
import { formatCurrency } from "@/lib/helpers";

export async function PayrollSnippet() {
	const supabase = await supabaseServerClient();

	const { data: payroll_items, error } = await supabase
		.from("payroll")
		.select(
			`
			*,
			employee(
				first_name,
				last_name
			)
			`
		)
		.limit(5)
		.order("net_salary", { ascending: false });

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

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
						{payroll_items.length > 0 ? (
							payroll_items.map((record) => (
								<TableRow key={record.id}>
									<TableCell>
										{record.employee.first_name} {record.employee.last_name}
									</TableCell>
									<TableCell className="text-right">
										{formatCurrency(record.base_salary)}
									</TableCell>
									<TableCell className="text-right font-medium">
										{formatCurrency(record.net_salary)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableSnippetEmpty
								icon={DollarSign}
								title="No payroll records"
								description="Add payroll records to see top compensations."
							/>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
