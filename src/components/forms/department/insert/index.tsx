"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DepartmentForm } from "./form";
import { insertDepartment } from "./server";
import { toast } from "sonner";

export function AddDepartmentUI() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddDepartment = async (data: { name: string }) => {
		const result = await insertDepartment(data.name);

		if (result == true) {
			toast.success("Department added successfully");

			setIsDialogOpen(false);
		} else {
			toast.error(result);
		}
	};

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>
				<PlusCircle className="mr-2 h-4 w-4" />
				Add Department
			</Button>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
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
		</>
	);
}
