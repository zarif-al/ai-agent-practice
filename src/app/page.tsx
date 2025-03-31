import { AppHeader } from "@/components/app-header";
import { EmployeeTableSnippet } from "@/components/table-snippets/employee.tsble";
import { JobOpeningsSnippet } from "@/components/table-snippets/job-openings";
import { LeaveRequestsSnippet } from "@/components/table-snippets/leave-requests";
import { PayrollSnippet } from "@/components/table-snippets/payroll";

export default function Dashboard() {
	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Dashboard" />
			<main className="flex-1 p-4 lg:p-6">
				<h2 className="text-xl font-semibold mb-6">Overview</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Employee Table Snippet */}
					<div className="md:col-span-1">
						<EmployeeTableSnippet />
					</div>

					{/* Job Openings Snippet */}
					<div className="md:col-span-1">
						<JobOpeningsSnippet />
					</div>

					{/* Leave Requests Snippet */}
					<div className="md:col-span-1">
						<LeaveRequestsSnippet />
					</div>

					{/* Payroll Snippet */}
					<div className="md:col-span-1">
						<PayrollSnippet />
					</div>
				</div>
			</main>
		</div>
	);
}
