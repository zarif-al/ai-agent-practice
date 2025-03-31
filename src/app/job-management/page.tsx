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
	jobOpenings,
	type JobOpening,
	type JobStatus,
	getJobStatusColor,
	formatJobStatus,
} from "@/data/job-openings";
import { departments } from "@/data/departments";
import { JobOpeningForm, type JobOpeningFormValues } from "./form";

export default function JobOpeningsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [jobOpeningsList, setJobOpeningsList] =
		useState<JobOpening[]>(jobOpenings);

	const handleAddJobOpening = (data: JobOpeningFormValues) => {
		// In a real app, this would be an API call
		const departmentId = Number.parseInt(data.department_id);
		const departmentName =
			departments.find((d) => d.id === departmentId)?.name || "";

		const newJobOpening: JobOpening = {
			id: jobOpeningsList.length + 1,
			title: data.title,
			department_id: departmentId,
			department_name: departmentName,
			description: data.description,
			status: data.status as JobStatus,
			posted_date: new Date().toISOString().split("T")[0],
			location: data.location || undefined,
		};

		setJobOpeningsList([...jobOpeningsList, newJobOpening]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Job Openings" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Job Openings</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Job Opening
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">ID</TableHead>
								<TableHead>Title</TableHead>
								<TableHead className="hidden md:table-cell">
									Department
								</TableHead>
								<TableHead className="hidden lg:table-cell">
									Description
								</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{jobOpeningsList.map((job) => (
								<TableRow key={job.id}>
									<TableCell className="font-medium">{job.id}</TableCell>
									<TableCell>{job.title}</TableCell>
									<TableCell className="hidden md:table-cell">
										{job.department_name}
									</TableCell>
									<TableCell className="hidden lg:table-cell max-w-md truncate">
										{job.description}
									</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getJobStatusColor(
												job.status
											)}`}
										>
											{formatJobStatus(job.status)}
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
						<DialogTitle>Add New Job Opening</DialogTitle>
						<DialogDescription>
							Enter the job opening details. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<JobOpeningForm
						onSubmit={handleAddJobOpening}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
