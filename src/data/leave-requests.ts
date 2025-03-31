import { employees } from "./employees"

// Types for our leave request data
export type LeaveType = "annual" | "sick" | "personal" | "maternity" | "paternity" | "bereavement" | "unpaid"
export type LeaveStatus = "pending" | "approved" | "rejected"

export interface LeaveRequest {
  id: number
  employee_id: number
  employee_name?: string // For display purposes
  leave_type: LeaveType
  start_date: string
  end_date: string
  status: LeaveStatus
  reason?: string
  requested_date: string
}

// Helper function to get status badge color
export function getLeaveStatusColor(status: LeaveStatus): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Helper function to format leave type for display
export function formatLeaveType(leaveType: LeaveType): string {
  switch (leaveType) {
    case "annual":
      return "Annual Leave"
    case "sick":
      return "Sick Leave"
    case "personal":
      return "Personal Leave"
    case "maternity":
      return "Maternity Leave"
    case "paternity":
      return "Paternity Leave"
    case "bereavement":
      return "Bereavement Leave"
    case "unpaid":
      return "Unpaid Leave"
    default:
      return leaveType
  }
}

// Helper function to format status for display
export function formatLeaveStatus(status: LeaveStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Helper function to calculate the number of days between two dates
export function calculateLeaveDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end dates
  return diffDays
}

// Mock leave requests data
export const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee_id: 1,
    employee_name: `${employees.find((e) => e.id === 1)?.first_name} ${employees.find((e) => e.id === 1)?.last_name}`,
    leave_type: "annual",
    start_date: "2023-07-10",
    end_date: "2023-07-14",
    status: "approved",
    reason: "Family vacation",
    requested_date: "2023-06-15",
  },
  {
    id: 2,
    employee_id: 3,
    employee_name: `${employees.find((e) => e.id === 3)?.first_name} ${employees.find((e) => e.id === 3)?.last_name}`,
    leave_type: "sick",
    start_date: "2023-06-05",
    end_date: "2023-06-07",
    status: "approved",
    reason: "Flu",
    requested_date: "2023-06-05",
  },
  {
    id: 3,
    employee_id: 5,
    employee_name: `${employees.find((e) => e.id === 5)?.first_name} ${employees.find((e) => e.id === 5)?.last_name}`,
    leave_type: "personal",
    start_date: "2023-08-21",
    end_date: "2023-08-21",
    status: "pending",
    reason: "Personal appointment",
    requested_date: "2023-08-01",
  },
  {
    id: 4,
    employee_id: 2,
    employee_name: `${employees.find((e) => e.id === 2)?.first_name} ${employees.find((e) => e.id === 2)?.last_name}`,
    leave_type: "annual",
    start_date: "2023-09-11",
    end_date: "2023-09-22",
    status: "pending",
    reason: "Summer vacation",
    requested_date: "2023-07-25",
  },
  {
    id: 5,
    employee_id: 4,
    employee_name: `${employees.find((e) => e.id === 4)?.first_name} ${employees.find((e) => e.id === 4)?.last_name}`,
    leave_type: "bereavement",
    start_date: "2023-05-15",
    end_date: "2023-05-19",
    status: "approved",
    reason: "Family funeral",
    requested_date: "2023-05-14",
  },
  {
    id: 6,
    employee_id: 6,
    employee_name: `${employees.find((e) => e.id === 6)?.first_name} ${employees.find((e) => e.id === 6)?.last_name}`,
    leave_type: "sick",
    start_date: "2023-07-03",
    end_date: "2023-07-05",
    status: "approved",
    reason: "Doctor's appointment and recovery",
    requested_date: "2023-07-02",
  },
  {
    id: 7,
    employee_id: 8,
    employee_name: `${employees.find((e) => e.id === 8)?.first_name} ${employees.find((e) => e.id === 8)?.last_name}`,
    leave_type: "personal",
    start_date: "2023-08-07",
    end_date: "2023-08-07",
    status: "rejected",
    reason: "Personal matters",
    requested_date: "2023-08-01",
  },
  {
    id: 8,
    employee_id: 7,
    employee_name: `${employees.find((e) => e.id === 7)?.first_name} ${employees.find((e) => e.id === 7)?.last_name}`,
    leave_type: "unpaid",
    start_date: "2023-10-02",
    end_date: "2023-10-13",
    status: "pending",
    reason: "Extended personal time",
    requested_date: "2023-08-15",
  },
  {
    id: 9,
    employee_id: 9,
    employee_name: `${employees.find((e) => e.id === 9)?.first_name} ${employees.find((e) => e.id === 9)?.last_name}`,
    leave_type: "annual",
    start_date: "2023-12-18",
    end_date: "2023-12-29",
    status: "approved",
    reason: "Holiday vacation",
    requested_date: "2023-09-01",
  },
  {
    id: 10,
    employee_id: 10,
    employee_name: `${employees.find((e) => e.id === 10)?.first_name} ${employees.find((e) => e.id === 10)?.last_name}`,
    leave_type: "maternity",
    start_date: "2023-11-01",
    end_date: "2024-01-31",
    status: "approved",
    reason: "Maternity leave",
    requested_date: "2023-08-15",
  },
]

