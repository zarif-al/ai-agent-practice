import { employees } from "./employees"

// Types for our payroll data
export interface PayrollRecord {
  id: number
  employee_id: number
  employee_name?: string // For display purposes
  base_salary: number
  bonus: number
  deductions: number
  net_salary: number
  payment_date?: string
  payment_period?: string
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Helper function to calculate net salary
export function calculateNetSalary(baseSalary: number, bonus: number, deductions: number): number {
  return baseSalary + bonus - deductions
}

// Mock payroll data
export const payrollRecords: PayrollRecord[] = [
  {
    id: 1,
    employee_id: 1,
    employee_name: `${employees.find((e) => e.id === 1)?.first_name} ${employees.find((e) => e.id === 1)?.last_name}`,
    base_salary: 85000,
    bonus: 5000,
    deductions: 25500,
    net_salary: 64500, // 85000 + 5000 - 25500
    payment_date: "2023-06-30",
    payment_period: "June 2023",
  },
  {
    id: 2,
    employee_id: 2,
    employee_name: `${employees.find((e) => e.id === 2)?.first_name} ${employees.find((e) => e.id === 2)?.last_name}`,
    base_salary: 95000,
    bonus: 7500,
    deductions: 30900,
    net_salary: 71600, // 95000 + 7500 - 30900
    payment_date: "2023-06-30",
    payment_period: "June 2023",
  },
  {
    id: 3,
    employee_id: 3,
    employee_name: `${employees.find((e) => e.id === 3)?.first_name} ${employees.find((e) => e.id === 3)?.last_name}`,
    base_salary: 78000,
    bonus: 3000,
    deductions: 24300,
    net_salary: 56700, // 78000 + 3000 - 24300
    payment_date: "2023-06-30",
    payment_period: "June 2023",
  },
  {
    id: 4,
    employee_id: 4,
    employee_name: `${employees.find((e) => e.id === 4)?.first_name} ${employees.find((e) => e.id === 4)?.last_name}`,
    base_salary: 72000,
    bonus: 2500,
    deductions: 22350,
    net_salary: 52150, // 72000 + 2500 - 22350
    payment_date: "2023-06-30",
    payment_period: "June 2023",
  },
  {
    id: 5,
    employee_id: 5,
    employee_name: `${employees.find((e) => e.id === 5)?.first_name} ${employees.find((e) => e.id === 5)?.last_name}`,
    base_salary: 68000,
    bonus: 2000,
    deductions: 21000,
    net_salary: 49000, // 68000 + 2000 - 21000
    payment_date: "2023-06-30",
    payment_period: "June 2023",
  },
  {
    id: 6,
    employee_id: 6,
    employee_name: `${employees.find((e) => e.id === 6)?.first_name} ${employees.find((e) => e.id === 6)?.last_name}`,
    base_salary: 82000,
    bonus: 4000,
    deductions: 25800,
    net_salary: 60200, // 82000 + 4000 - 25800
    payment_date: "2023-07-31",
    payment_period: "July 2023",
  },
  {
    id: 7,
    employee_id: 7,
    employee_name: `${employees.find((e) => e.id === 7)?.first_name} ${employees.find((e) => e.id === 7)?.last_name}`,
    base_salary: 92000,
    bonus: 6000,
    deductions: 29400,
    net_salary: 68600, // 92000 + 6000 - 29400
    payment_date: "2023-07-31",
    payment_period: "July 2023",
  },
  {
    id: 8,
    employee_id: 8,
    employee_name: `${employees.find((e) => e.id === 8)?.first_name} ${employees.find((e) => e.id === 8)?.last_name}`,
    base_salary: 75000,
    bonus: 3500,
    deductions: 23550,
    net_salary: 54950, // 75000 + 3500 - 23550
    payment_date: "2023-07-31",
    payment_period: "July 2023",
  },
  {
    id: 9,
    employee_id: 9,
    employee_name: `${employees.find((e) => e.id === 9)?.first_name} ${employees.find((e) => e.id === 9)?.last_name}`,
    base_salary: 88000,
    bonus: 0,
    deductions: 26400,
    net_salary: 61600, // 88000 + 0 - 26400
    payment_date: "2023-07-31",
    payment_period: "July 2023",
  },
  {
    id: 10,
    employee_id: 10,
    employee_name: `${employees.find((e) => e.id === 10)?.first_name} ${employees.find((e) => e.id === 10)?.last_name}`,
    base_salary: 70000,
    bonus: 2000,
    deductions: 21600,
    net_salary: 50400, // 70000 + 2000 - 21600
    payment_date: "2023-07-31",
    payment_period: "July 2023",
  },
]

