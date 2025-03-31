"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { departments } from "@/data/departments";

// Form schema validation
const formSchema = z.object({
	title: z.string().min(2, "Job title must be at least 2 characters"),
	department_id: z.string(),
	description: z.string().min(10, "Description must be at least 10 characters"),
	status: z.enum(["open", "closed"]),
	location: z.string().optional(),
});

export type JobOpeningFormValues = z.infer<typeof formSchema>;

interface JobOpeningFormProps {
	onSubmit: (data: JobOpeningFormValues) => void;
	onCancel: () => void;
}

export function JobOpeningForm({ onSubmit, onCancel }: JobOpeningFormProps) {
	const form = useForm<JobOpeningFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			department_id: "",
			description: "",
			status: "open",
			location: "",
		},
	});

	function handleSubmit(data: JobOpeningFormValues) {
		onSubmit(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Title</FormLabel>
							<FormControl>
								<Input placeholder="Software Engineer" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="department_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a department" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{departments.map((department) => (
										<SelectItem
											key={department.id}
											value={department.id.toString()}
										>
											{department.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Job description and requirements..."
									className="min-h-[120px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="open">Open</SelectItem>
										<SelectItem value="closed">Closed</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location (Optional)</FormLabel>
								<FormControl>
									<Input placeholder="San Francisco, CA (Remote)" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">Save Job Opening</Button>
				</div>
			</form>
		</Form>
	);
}
