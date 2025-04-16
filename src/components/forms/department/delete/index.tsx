"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteDepartment } from "./server";
import { toast } from "sonner";

interface Props {
	id: string;
	name: string;
}

export function DeleteDepartmentsButton({ id, name }: Props) {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={async () => {
				const result = await deleteDepartment(id);

				if (result == true) {
					toast.success("Department deleted successfully");
				} else {
					toast.error(result);
				}
			}}
			aria-label={`Delete ${name}`}
			className="size-8 text-muted-foreground hover:text-destructive"
		>
			<Trash2 className="size-4" />
		</Button>
	);
}
