import { Building2 } from "lucide-react";

interface EmptyStateProps {
	title: string;
	description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg bg-background">
			<div className="size-16 flex items-center justify-center rounded-full bg-muted mb-4">
				<Building2 className="size-8 text-muted-foreground" />
			</div>
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground max-w-sm mb-6">{description}</p>
		</div>
	);
}
