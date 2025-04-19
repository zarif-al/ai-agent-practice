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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
	jobOpenings,
	getJobStatusColor,
	formatJobStatus,
} from "@/data/job-openings";

export function JobOpeningsSnippet() {
	// Only show open job openings and limit to 5
	const openJobs = jobOpenings
		.filter((job) => job.status === "open")
		.sort(
			(a, b) =>
				new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
		)
		.slice(0, 5);

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
						{openJobs.map((job) => (
							<TableRow key={job.id}>
								<TableCell>{job.title}</TableCell>
								<TableCell className="hidden md:table-cell">
									{job.department_name}
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
						))}
						{openJobs.length === 0 && (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center py-4 text-muted-foreground"
								>
									No open positions at this time
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
