import {
	BarChart3,
	Users,
	Briefcase,
	Calendar,
	DollarSign,
	Building2,
	UserRound,
} from "lucide-react";

// Navigation items for the sidebar
export const navItems = [
	{
		title: "Dashboard",
		icon: BarChart3,
		href: "/",
	},
	{
		title: "Employee Management",
		icon: Users,
		href: "/employee-management",
	},
	{
		title: "Departments",
		icon: Building2,
		href: "/departments",
	},
	{
		title: "Positions",
		icon: UserRound,
		href: "/positions",
	},
	{
		title: "Job Openings",
		icon: Briefcase,
		href: "/job-openings",
	},
	{
		title: "Leave Management",
		icon: Calendar,
		href: "/leave-management",
	},
	{
		title: "Payroll & Compensation",
		icon: DollarSign,
		href: "/payroll-compensation",
	},
];
