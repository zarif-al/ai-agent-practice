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
import { Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getJobStatusColor, formatJobStatus } from "@/data/job-openings";
import { supabaseServerClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";
import { TableSnippetEmpty } from "./empty";

export async function JobOpeningsSnippet() {
	const supabase = await supabaseServerClient();

	const { data: job_openings, error } = await supabase
		.from("job_openings")
		.select(
			`
			*,
			position (
				title,
				department(
					name
				)
			)
			`
		)
		.limit(5)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div>
					<CardTitle>Open Positions</CardTitle>
					<CardDescription>Currently open job positions</CardDescription>
				</div>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/job-openings" className="flex items-center">
						View All
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead className="hidden md:table-cell">Department</TableHead>
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
							<TableSnippetEmpty
								icon={Briefcase}
								title="No open positions"
								description="Add job openings to see them listed here."
							/>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
