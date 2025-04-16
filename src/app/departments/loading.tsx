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

export default function Loader() {
	// Create an array of 10 items for skeleton rows
	const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Departments" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-end items-center mb-6">
					<Skeleton className="h-10 w-[140px] rounded-md" />
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{skeletonRows.map((index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-5 w-full" />
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
