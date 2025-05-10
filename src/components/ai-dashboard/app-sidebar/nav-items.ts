import {
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  Building2,
  UserRound,
} from 'lucide-react';

// Navigation items for the sidebar
export const navItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/ai-dashboard',
  },
  {
    title: 'Employee Management',
    icon: Users,
    href: '/ai-dashboard/employee-management',
  },
  {
    title: 'Departments',
    icon: Building2,
    href: '/ai-dashboard/departments',
  },
  {
    title: 'Positions',
    icon: UserRound,
    href: '/ai-dashboard/positions',
  },
  {
    title: 'Job Openings',
    icon: Briefcase,
    href: '/ai-dashboard/job-openings',
  },
  {
    title: 'Leave Management',
    icon: Calendar,
    href: '/ai-dashboard/leave-management',
  },
  {
    title: 'Payroll & Compensation',
    icon: DollarSign,
    href: '/ai-dashboard/payroll-compensation',
  },
];
