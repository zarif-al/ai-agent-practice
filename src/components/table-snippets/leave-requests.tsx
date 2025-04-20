import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
	getLeaveStatusColor,
	formatLeaveStatus,
	formatLeaveType,
} from "@/data/leave-requests";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";
import { TableSnippetEmpty } from "./empty";

export async function LeaveRequestsSnippet() {
	const supabase = await supabaseServerClient();

	const { data: leave_requests, error } = await supabase
		.from("leave_management")
		.select(
			`
			*,
			employee(
				first_name,
				last_name
			)
			`
		)
		.limit(5)
		.order("created_at", {
			ascending: false,
		});

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div>
					<CardTitle>Pending Leave Requests</CardTitle>
					<CardDescription>Leave requests awaiting approval</CardDescription>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/leave-management" className="flex items-center">
						View All
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Employee</TableHead>
							<TableHead>Type</TableHead>
							<TableHead className="hidden md:table-cell">Dates</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{leave_requests.length > 0 ? (
							leave_requests.map((request) => (
								<TableRow key={request.id}>
									<TableCell>
										{request.employee.first_name} {request.employee.last_name}
									</TableCell>
									<TableCell>{formatLeaveType(request.leave_type)}</TableCell>
									<TableCell className="hidden md:table-cell">
										{request.start_date} to {request.end_date}
									</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveStatusColor(
												request.status
											)}`}
										>
											{formatLeaveStatus(request.status)}
										</span>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableSnippetEmpty
								icon={Calendar}
								title="No pending requests"
								description="There are no leave requests awaiting approval."
							/>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
