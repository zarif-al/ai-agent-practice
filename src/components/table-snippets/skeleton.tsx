import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSnippetSkeletonProps {
	// title?: string;
	rowCount?: number;
	columnCount?: number;
}

export function TableSnippetSkeleton({
	// title = "Loading...",
	rowCount = 5,
	columnCount = 3,
}: TableSnippetSkeletonProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div>
					<Skeleton className="h-5 w-32 mb-1" />
					<Skeleton className="h-4 w-48" />
				</div>
				<Skeleton className="h-8 w-20" />
			</CardHeader>
			<CardContent>
				{/* Table header */}
				<div className="flex w-full border-b pb-2 mb-2">
					{Array.from({ length: columnCount }).map((_, index) => (
						<div key={`header-${index}`} className="flex-1 pr-2">
							<Skeleton className="h-4 w-full max-w-[100px]" />
						</div>
					))}
				</div>

				{/* Table rows */}
				{Array.from({ length: rowCount }).map((_, rowIndex) => (
					<div
						key={`row-${rowIndex}`}
						className="flex w-full py-2 border-b last:border-0"
					>
						{Array.from({ length: columnCount }).map((_, colIndex) => (
							<div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 pr-2">
								<Skeleton
									className={`h-4 ${
										colIndex === columnCount - 1
											? "w-16 rounded-full"
											: "w-full max-w-[120px]"
									}`}
								/>
							</div>
						))}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
