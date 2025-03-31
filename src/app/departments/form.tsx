"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import * as z from "zod";

// Form schema validation
const formSchema = z.object({
	name: z.string().min(2, "Department name must be at least 2 characters"),
});

type DepartmentFormValues = z.infer<typeof formSchema>;

interface DepartmentFormProps {
	onSubmit: (data: DepartmentFormValues) => void;
	onCancel: () => void;
}

export function DepartmentForm({ onSubmit, onCancel }: DepartmentFormProps) {
	const form = useForm<DepartmentFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	function handleSubmit(data: DepartmentFormValues) {
		onSubmit(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Department Name</FormLabel>
							<FormControl>
								<Input placeholder="Engineering" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">Save Department</Button>
				</div>
			</form>
		</Form>
	);
}
