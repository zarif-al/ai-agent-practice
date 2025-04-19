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

export default async function Page() {
	const supabase = await supabaseServerClient();

	const { data: positions, error } = await supabase.from("positions").select(`
			*,
			department(
				name
			)
			`);

	if (error) {
		console.error("Error fetching departments:", error);

		notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<AppHeader title="Positions" />
			<main className="flex-1 p-4 lg:p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Positions</h2>
					{/* <Button onClick={() => setIsDialogOpen(true)}>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Position
					</Button> */}
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
							{positions.map((position) => (
								<TableRow key={position.id}>
									<TableCell>{position.title}</TableCell>
									<TableCell>{position.department.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</main>

			{/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Position</DialogTitle>
						<DialogDescription>
							Enter the position details. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<PositionForm
						onSubmit={handleAddPosition}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog> */}
		</div>
	);
}
