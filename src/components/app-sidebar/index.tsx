"use client";

import { Building } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./data";

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className="border-b border-border h-14 flex justify-center">
				<div className="flex items-center gap-2">
					<Building className="h-6 w-6 text-primary" />
					<span className="text-xl font-semibold">HR Portal</span>
				</div>
			</SidebarHeader>
			<SidebarContent className="p-2">
				<SidebarMenu>
					{navItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								isActive={
									item.href === "/"
										? pathname === "/"
										: pathname.startsWith(item.href)
								}
							>
								<Link href={item.href}>
									<item.icon className="h-5 w-5" />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
