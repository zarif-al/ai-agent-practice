"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { employees } from "@/data/employees";
import { calculateNetSalary, formatCurrency } from "@/data/payroll";

// Form schema validation
const formSchema = z.object({
	employee_id: z.string(),
	base_salary: z.coerce
		.number()
		.min(0, "Base salary must be a positive number"),
	bonus: z.coerce.number().min(0, "Bonus must be a positive number"),
	deductions: z.coerce.number().min(0, "Deductions must be a positive number"),
	payment_period: z.string().min(1, "Payment period is required"),
});

export type PayrollFormValues = z.infer<typeof formSchema>;

interface PayrollFormProps {
	onSubmit: (data: PayrollFormValues & { net_salary: number }) => void;
	onCancel: () => void;
}

export function PayrollForm({ onSubmit, onCancel }: PayrollFormProps) {
	const [netSalary, setNetSalary] = useState<number>(0);

	const form = useForm<PayrollFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			employee_id: "",
			base_salary: 0,
			bonus: 0,
			deductions: 0,
			payment_period: getCurrentMonthYear(),
		},
	});

	// Get current month and year for default payment period
	function getCurrentMonthYear() {
		const date = new Date();
		return `${date.toLocaleString("default", {
			month: "long",
		})} ${date.getFullYear()}`;
	}

	// Watch form values to calculate net salary
	const baseSalary = form.watch("base_salary") || 0;
	const bonus = form.watch("bonus") || 0;
	const deductions = form.watch("deductions") || 0;

	// Update net salary when form values change
	useEffect(() => {
		setNetSalary(calculateNetSalary(baseSalary, bonus, deductions));
	}, [baseSalary, bonus, deductions]);

	function handleSubmit(data: PayrollFormValues) {
		onSubmit({
			...data,
			net_salary: netSalary,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="employee_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Employee</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select an employee" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{employees.map((employee) => (
										<SelectItem
											key={employee.id}
											value={employee.id.toString()}
										>
											{employee.first_name} {employee.last_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="base_salary"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Base Salary (Annual)</FormLabel>
								<FormControl>
									<Input type="number" min="0" step="1000" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="bonus"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bonus</FormLabel>
								<FormControl>
									<Input type="number" min="0" step="500" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="deductions"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Deductions (Taxes, Benefits, etc.)</FormLabel>
								<FormControl>
									<Input type="number" min="0" step="500" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="payment_period"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Period</FormLabel>
								<FormControl>
									<Input placeholder="August 2023" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="rounded-md bg-muted p-4">
					<div className="text-sm font-medium">
						Net Salary:{" "}
						<span className="text-base">{formatCurrency(netSalary)}</span>
					</div>
					<div className="text-xs text-muted-foreground mt-1">
						Base Salary + Bonus - Deductions
					</div>
				</div>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">Save Payroll Record</Button>
				</div>
			</form>
		</Form>
	);
}
