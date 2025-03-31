"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader({ title }: { title: string }) {
	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
			<SidebarTrigger className="lg:hidden" />
			<h1 className="text-xl font-semibold">{title}</h1>
		</header>
	);
}
