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
	employees,
	type Employee,
	type EmployeeStatus,
	getStatusColor,
	formatStatus,
} from "@/data/employees";
import { EmployeeForm, type EmployeeFormValues } from "./form";

export default function EmployeesPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [employeesList, setEmployeesList] = useState<Employee[]>(employees);

	const handleAddEmployee = (data: EmployeeFormValues) => {
		// In a real app, this would be an API call
		const newEmployee: Employee = {
			id: employeesList.length + 1,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			position_id: Number.parseInt(data.position_id),
			position_title: data.position_id
				? employees.find(
						(e) => e.position_id === Number.parseInt(data.position_id)
				  )?.position_title || ""
				: "",
			department_id: Number.parseInt(data.department_id),
			department_name: data.department_id
				? employees.find(
						(e) => e.department_id === Number.parseInt(data.department_id)
				  )?.department_name || ""
				: "",
			hire_date: data.hire_date.toISOString().split("T")[0],
			status: data.status as EmployeeStatus,
		};

		setEmployeesList([...employeesList, newEmployee]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Employee Management" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Employees</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Employee
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
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
							{employeesList.map((employee) => (
								<TableRow key={employee.id}>
									<TableCell className="font-medium">{employee.id}</TableCell>
									<TableCell>
										{employee.first_name} {employee.last_name}
									</TableCell>
									<TableCell>{employee.email}</TableCell>
									<TableCell className="hidden md:table-cell">
										{employee.phone}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{employee.position_title}
									</TableCell>
									<TableCell className="hidden lg:table-cell">
										{employee.department_name}
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

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Add New Employee</DialogTitle>
						<DialogDescription>
							Fill in the employee details. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<EmployeeForm
						onSubmit={handleAddEmployee}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
