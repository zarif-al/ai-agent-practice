"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { employees } from "@/data/employees";
import { calculateLeaveDays } from "@/data/leave-requests";

// Form schema validation
const formSchema = z
	.object({
		employee_id: z.string(),
		leave_type: z.enum([
			"annual",
			"sick",
			"personal",
			"maternity",
			"paternity",
			"bereavement",
			"unpaid",
		]),
		start_date: z.date(),
		end_date: z.date(),
		reason: z
			.string()
			.min(5, "Reason must be at least 5 characters")
			.max(200, "Reason must not exceed 200 characters"),
	})
	.refine(
		(data) => {
			return data.end_date >= data.start_date;
		},
		{
			message: "End date must be after or equal to start date",
			path: ["end_date"],
		}
	);

export type LeaveRequestFormValues = z.infer<typeof formSchema>;

interface LeaveRequestFormProps {
	onSubmit: (data: LeaveRequestFormValues) => void;
	onCancel: () => void;
}

export function LeaveRequestForm({
	onSubmit,
	onCancel,
}: LeaveRequestFormProps) {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [leaveDays, setLeaveDays] = useState<number | null>(null);

	const form = useForm<LeaveRequestFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			employee_id: "",
			leave_type: "annual",
			reason: "",
		},
	});

	// Calculate leave days when dates change
	const updateLeaveDays = (start?: Date, end?: Date) => {
		if (start && end) {
			const startStr = start.toISOString().split("T")[0];
			const endStr = end.toISOString().split("T")[0];
			setLeaveDays(calculateLeaveDays(startStr, endStr));
		} else {
			setLeaveDays(null);
		}
	};

	function handleSubmit(data: LeaveRequestFormValues) {
		onSubmit(data);
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

				<FormField
					control={form.control}
					name="leave_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Leave Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select leave type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="annual">Annual Leave</SelectItem>
									<SelectItem value="sick">Sick Leave</SelectItem>
									<SelectItem value="personal">Personal Leave</SelectItem>
									<SelectItem value="maternity">Maternity Leave</SelectItem>
									<SelectItem value="paternity">Paternity Leave</SelectItem>
									<SelectItem value="bereavement">Bereavement Leave</SelectItem>
									<SelectItem value="unpaid">Unpaid Leave</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Start Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={`w-full pl-3 text-left font-normal ${
													!field.value ? "text-muted-foreground" : ""
												}`}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setStartDate(date);
												updateLeaveDays(date, endDate);
											}}
											disabled={(date) =>
												date < new Date(new Date().setHours(0, 0, 0, 0))
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>End Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={`w-full pl-3 text-left font-normal ${
													!field.value ? "text-muted-foreground" : ""
												}`}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setEndDate(date);
												updateLeaveDays(startDate, date);
											}}
											disabled={(date) =>
												date < new Date(new Date().setHours(0, 0, 0, 0)) ||
												(startDate ? date < startDate : false)
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{leaveDays && (
					<div className="text-sm text-muted-foreground">
						Duration:{" "}
						<span className="font-medium">
							{leaveDays} day{leaveDays !== 1 ? "s" : ""}
						</span>
					</div>
				)}

				<FormField
					control={form.control}
					name="reason"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reason</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Please provide a reason for your leave request"
									className="min-h-[80px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">Submit Request</Button>
				</div>
			</form>
		</Form>
	);
}
