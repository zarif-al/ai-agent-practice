import { type UserStatusEnum } from '@/db/schema/employees';
import type { JobOpeningStatusEnum } from '@/db/schema/job-openings';
import type {
  LeaveRequestStatusEnum,
  LeaveTypeEnum,
} from '@/db/schema/leave-management';
import { format } from 'date-fns';

// Helper function to get status badge color
export function getEmployeeStatusColor(status: UserStatusEnum): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'on_leave':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'terminated':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'terminated':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Helper function to format status for display
export function formatEmployeeStatus(status: UserStatusEnum): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get status badge color
export function getJobStatusColor(status: JobOpeningStatusEnum): string {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Helper function to format status for display
export function formatJobStatus(status: JobOpeningStatusEnum): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Helper function to get status badge color
export function getLeaveStatusColor(status: LeaveRequestStatusEnum): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Helper function to format leave type for display
export function formatLeaveType(leaveType: LeaveTypeEnum): string {
  switch (leaveType) {
    case 'vacation':
      return 'Vacation';
    case 'sick_leave':
      return 'Sick Leave';
    case 'medical_leave':
      return 'Medical Leave';
    case 'parental_leave':
      return 'Parental Leave';
    default:
      return leaveType;
  }
}

// Helper function to format status for display
export function formatLeaveStatus(status: LeaveRequestStatusEnum): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Helper function to calculate the number of days between two dates
export function calculateLeaveDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
  return diffDays;
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Helper function to calculate net salary
export function calculateNetSalary(
  baseSalary: number,
  bonus: number,
  deductions: number
): number {
  return baseSalary + bonus - deductions;
}

export function formatTimestamp(date?: Date) {
  if (!date) {
    return '';
  }

  return format(date, 'dd MMM h:mm a');
}
