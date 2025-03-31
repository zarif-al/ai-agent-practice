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
import { positions, type Position } from "@/data/positions";
import { departments } from "@/data/departments";
import { PositionForm } from "./form";

export default function PositionsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [positionsList, setPositionsList] = useState<Position[]>(positions);

	const handleAddPosition = (data: {
		title: string;
		department_id: string;
	}) => {
		// In a real app, this would be an API call
		const departmentId = Number.parseInt(data.department_id);
		const departmentName =
			departments.find((d) => d.id === departmentId)?.name || "";

		const newPosition: Position = {
			id: positionsList.length + 1,
			title: data.title,
			department_id: departmentId,
			department_name: departmentName,
		};

		setPositionsList([...positionsList, newPosition]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Positions" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Positions</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Position
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">ID</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Department</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{positionsList.map((position) => (
								<TableRow key={position.id}>
									<TableCell className="font-medium">{position.id}</TableCell>
									<TableCell>{position.title}</TableCell>
									<TableCell>{position.department_name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Position</DialogTitle>
						<DialogDescription>
							Enter the position details. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<PositionForm
						onSubmit={handleAddPosition}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
