import { type LucideIcon } from "lucide-react";

interface TableSnippetEmptyProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export function TableSnippetEmpty({
	icon: Icon,
	title,
	description,
}: TableSnippetEmptyProps) {
	return (
		<div className="flex flex-col items-center justify-center py-6 text-center">
			<div className="size-12 flex items-center justify-center rounded-full bg-muted mb-3">
				<Icon className="size-6 text-muted-foreground" />
			</div>
			<h3 className="text-sm font-medium mb-1">{title}</h3>
			<p className="text-xs text-muted-foreground mb-3 max-w-[200px]">
				{description}
			</p>
		</div>
	);
}
