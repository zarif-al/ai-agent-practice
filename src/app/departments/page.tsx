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
import { departments, type Department } from "@/data/departments";
import { DepartmentForm } from "./form";

export default function DepartmentsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [departmentsList, setDepartmentsList] =
		useState<Department[]>(departments);

	const handleAddDepartment = (data: { name: string }) => {
		// In a real app, this would be an API call
		const newDepartment: Department = {
			id: departmentsList.length + 1,
			name: data.name,
		};

		setDepartmentsList([...departmentsList, newDepartment]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Departments" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Departments</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Department
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">ID</TableHead>
								<TableHead>Name</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{departmentsList.map((department) => (
								<TableRow key={department.id}>
									<TableCell className="font-medium">{department.id}</TableCell>
									<TableCell>{department.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Department</DialogTitle>
						<DialogDescription>
							Enter the department name. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<DepartmentForm
						onSubmit={handleAddDepartment}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
