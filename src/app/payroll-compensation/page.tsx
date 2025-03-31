"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import {
	payrollRecords,
	type PayrollRecord,
	formatCurrency,
} from "@/data/payroll";
import { employees } from "@/data/employees";
import { PayrollForm, type PayrollFormValues } from "./form";

export default function PayrollPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [payrollList, setPayrollList] =
		useState<PayrollRecord[]>(payrollRecords);

	const handleAddPayroll = (data: PayrollFormValues) => {
		// In a real app, this would be an API call
		const employeeId = Number.parseInt(data.employee_id);
		const employee = employees.find((e) => e.id === employeeId);
		const employeeName = employee
			? `${employee.first_name} ${employee.last_name}`
			: "";

		const newPayroll: PayrollRecord = {
			id: payrollList.length + 1,
			employee_id: employeeId,
			employee_name: employeeName,
			base_salary: data.base_salary,
			bonus: data.bonus,
			deductions: data.deductions,
			net_salary: data.base_salary + data.bonus - data.deductions,
			payment_date: new Date().toISOString().split("T")[0],
			payment_period: data.payment_period,
		};

		setPayrollList([...payrollList, newPayroll]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Payroll & Compensation" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Payroll Records</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Payroll Record
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[60px]">ID</TableHead>
								<TableHead>Employee</TableHead>
								<TableHead className="text-right">Base Salary</TableHead>
								<TableHead className="text-right">Bonus</TableHead>
								<TableHead className="text-right">Deductions</TableHead>
								<TableHead className="text-right">Net Salary</TableHead>
								<TableHead className="hidden md:table-cell">Period</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{payrollList.map((payroll) => (
								<TableRow key={payroll.id}>
									<TableCell className="font-medium">{payroll.id}</TableCell>
									<TableCell>{payroll.employee_name}</TableCell>
									<TableCell className="text-right">
										{formatCurrency(payroll.base_salary)}
									</TableCell>
									<TableCell className="text-right">
										{formatCurrency(payroll.bonus)}
									</TableCell>
									<TableCell className="text-right">
										{formatCurrency(payroll.deductions)}
									</TableCell>
									<TableCell className="text-right font-medium">
										{formatCurrency(payroll.net_salary)}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{payroll.payment_period}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Add Payroll Record</DialogTitle>
						<DialogDescription>
							Enter the payroll details for the employee.
						</DialogDescription>
					</DialogHeader>
					<PayrollForm
						onSubmit={handleAddPayroll}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
