import { AppHeader } from "@/components/app-header";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import {
	calculateLeaveDays,
	formatLeaveStatus,
	formatLeaveType,
	getLeaveStatusColor,
} from "@/lib/helpers";

export default async function Page() {
	const supabase = await supabaseServerClient();

	const { data: leave_requests, error } = await supabase.from(
		"leave_management"
	).select(`
			*,
			employee(
				first_name,
				last_name
			)
			`);

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Leave Management" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Leave Requests</h2>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Employee</TableHead>
								<TableHead>Leave Type</TableHead>
								<TableHead>Start Date</TableHead>
								<TableHead>End Date</TableHead>
								<TableHead className="hidden md:table-cell">Duration</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{leave_requests.length > 0 ? (
								leave_requests.map((leave) => (
									<TableRow key={leave.id}>
										<TableCell>
											{leave.employee.first_name} {leave.employee.last_name}
										</TableCell>
										<TableCell>{formatLeaveType(leave.leave_type)}</TableCell>
										<TableCell>{leave.start_date}</TableCell>
										<TableCell>{leave.end_date}</TableCell>
										<TableCell className="hidden md:table-cell">
											{calculateLeaveDays(leave.start_date, leave.end_date)}{" "}
											days
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
								))
							) : (
								<EmptyState
									title="No Leave Requests Found"
									description="No one has requested leave yet."
								/>
							)}
						</TableBody>
					</Table>
				</div>
			</main>
		</div>
	);
}
