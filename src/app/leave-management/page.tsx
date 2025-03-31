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
	leaveRequests,
	type LeaveRequest,
	type LeaveStatus,
	type LeaveType,
	getLeaveStatusColor,
	formatLeaveStatus,
	formatLeaveType,
	calculateLeaveDays,
} from "@/data/leave-requests";
import { employees } from "@/data/employees";
import { LeaveRequestForm, type LeaveRequestFormValues } from "./form";

export default function LeaveManagementPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [leaveRequestsList, setLeaveRequestsList] =
		useState<LeaveRequest[]>(leaveRequests);

	const handleAddLeaveRequest = (data: LeaveRequestFormValues) => {
		// In a real app, this would be an API call
		const employeeId = Number.parseInt(data.employee_id);
		const employee = employees.find((e) => e.id === employeeId);
		const employeeName = employee
			? `${employee.first_name} ${employee.last_name}`
			: "";

		const newLeaveRequest: LeaveRequest = {
			id: leaveRequestsList.length + 1,
			employee_id: employeeId,
			employee_name: employeeName,
			leave_type: data.leave_type as LeaveType,
			start_date: data.start_date.toISOString().split("T")[0],
			end_date: data.end_date.toISOString().split("T")[0],
			status: "pending" as LeaveStatus,
			reason: data.reason,
			requested_date: new Date().toISOString().split("T")[0],
		};

		setLeaveRequestsList([...leaveRequestsList, newLeaveRequest]);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Leave Management" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Leave Requests</h2>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Request Leave
					</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[60px]">ID</TableHead>
								<TableHead>Employee</TableHead>
								<TableHead>Leave Type</TableHead>
								<TableHead>Start Date</TableHead>
								<TableHead>End Date</TableHead>
								<TableHead className="hidden md:table-cell">Duration</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leaveRequestsList.map((leave) => (
								<TableRow key={leave.id}>
									<TableCell className="font-medium">{leave.id}</TableCell>
									<TableCell>{leave.employee_name}</TableCell>
									<TableCell>{formatLeaveType(leave.leave_type)}</TableCell>
									<TableCell>{leave.start_date}</TableCell>
									<TableCell>{leave.end_date}</TableCell>
									<TableCell className="hidden md:table-cell">
										{calculateLeaveDays(leave.start_date, leave.end_date)} days
									</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveStatusColor(
												leave.status
											)}`}
										>
											{formatLeaveStatus(leave.status)}
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
						<DialogTitle>Request Leave</DialogTitle>
						<DialogDescription>
							Fill in the leave request details. All requests require approval.
						</DialogDescription>
					</DialogHeader>
					<LeaveRequestForm
						onSubmit={handleAddLeaveRequest}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
