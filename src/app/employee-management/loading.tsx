import { AppHeader } from "@/components/app-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function Loading() {
	// Create an array of 10 items for skeleton rows
	const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Employee Management" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Employees</h2>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead className="hidden md:table-cell">Phone</TableHead>
								<TableHead className="hidden md:table-cell">Position</TableHead>
								<TableHead className="hidden lg:table-cell">
									Department
								</TableHead>
								<TableHead className="hidden lg:table-cell">
									Hire Date
								</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{skeletonRows.map((index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-5 w-[120px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-[180px]" />
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Skeleton className="h-5 w-[120px]" />
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<Skeleton className="h-5 w-[150px]" />
									</TableCell>
									<TableCell className="hidden lg:table-cell">
										<Skeleton className="h-5 w-[120px]" />
									</TableCell>
									<TableCell className="hidden lg:table-cell">
										<Skeleton className="h-5 w-[100px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-[80px] rounded-full" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>
		</div>
	);
}
