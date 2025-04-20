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

export default async function Page() {
	const supabase = await supabaseServerClient();

	const { data: departments, error } = await supabase
		.from("departments")
		.select("*");

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Departments" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Departments</h2>
				</div>

				{departments.length > 0 ? (
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{departments.map((department) => (
									<TableRow key={department.id}>
										<TableCell>{department.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				) : (
					<EmptyState
						title="No departments found"
						description="You haven't added any departments yet. Add your first department to get started."
					/>
				)}
			</main>
		</div>
	);
}
