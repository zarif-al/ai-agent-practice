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

export default function PositionsLoading() {
	// Create an array of 10 items for skeleton rows
	const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Positions" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Positions</h2>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Department</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{skeletonRows.map((index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-5 w-[200px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-5 w-[150px]" />
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
