import { AppHeader } from "@/components/app-header";
import { EmptyState } from "@/components/empty-state";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getJobStatusColor, formatJobStatus } from "@/data/job-openings";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";

export default async function Page() {
	const supabase = await supabaseServerClient();

	const { data: job_openings, error } = await supabase.from("job_openings")
		.select(`
			*,
			position (
				title,
				department(
					name
				)
			)
			`);

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Job Openings" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Job Openings</h2>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
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
							{job_openings.length > 0 ? (
								job_openings.map((job) => (
									<TableRow key={job.id}>
										<TableCell>{job.position.title}</TableCell>
										<TableCell className="hidden md:table-cell">
											{job.position.department.name}
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
								))
							) : (
								<EmptyState
									title="No Job Openings Found"
									description="You haven't added any job openings yet. Add your job opening to get started."
								/>
							)}
						</TableBody>
					</Table>
				</div>
			</main>
		</div>
	);
}
