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
import { departments } from "@/data/departments";

// Form schema validation
const formSchema = z.object({
	title: z.string().min(2, "Position title must be at least 2 characters"),
	department_id: z.string(),
});

export type PositionFormValues = z.infer<typeof formSchema>;

interface PositionFormProps {
	onSubmit: (data: PositionFormValues) => void;
	onCancel: () => void;
}

export function PositionForm({ onSubmit, onCancel }: PositionFormProps) {
	const form = useForm<PositionFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			department_id: "",
		},
	});

	function handleSubmit(data: PositionFormValues) {
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
							<FormLabel>Position Title</FormLabel>
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

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">Save Position</Button>
				</div>
			</form>
		</Form>
	);
}
