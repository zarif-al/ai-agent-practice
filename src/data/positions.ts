import { departments } from "./departments"

// Types for our position data
export interface Position {
  id: number
  title: string
  department_id: number
  department_name?: string // For display purposes
}

// Mock positions data
export const positions: Position[] = [
  {
    id: 1,
    title: "Software Engineer",
    department_id: 1,
    department_name: departments.find((d) => d.id === 1)?.name,
  },
  {
    id: 2,
    title: "Product Manager",
    department_id: 2,
    department_name: departments.find((d) => d.id === 2)?.name,
  },
  {
    id: 3,
    title: "UX Designer",
    department_id: 3,
    department_name: departments.find((d) => d.id === 3)?.name,
  },
  {
    id: 4,
    title: "HR Specialist",
    department_id: 4,
    department_name: departments.find((d) => d.id === 4)?.name,
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    department_id: 5,
    department_name: departments.find((d) => d.id === 5)?.name,
  },
  {
    id: 6,
    title: "Financial Analyst",
    department_id: 6,
    department_name: departments.find((d) => d.id === 6)?.name,
  },
  {
    id: 7,
    title: "Customer Support Representative",
    department_id: 7,
    department_name: departments.find((d) => d.id === 7)?.name,
  },
  {
    id: 8,
    title: "Sales Representative",
    department_id: 8,
    department_name: departments.find((d) => d.id === 8)?.name,
  },
  {
    id: 9,
    title: "Legal Counsel",
    department_id: 9,
    department_name: departments.find((d) => d.id === 9)?.name,
  },
  {
    id: 10,
    title: "Research Scientist",
    department_id: 10,
    department_name: departments.find((d) => d.id === 10)?.name,
  },
  {
    id: 11,
    title: "Senior Software Engineer",
    department_id: 1,
    department_name: departments.find((d) => d.id === 1)?.name,
  },
  {
    id: 12,
    title: "Senior Product Manager",
    department_id: 2,
    department_name: departments.find((d) => d.id === 2)?.name,
  },
  {
    id: 13,
    title: "Senior UX Designer",
    department_id: 3,
    department_name: departments.find((d) => d.id === 3)?.name,
  },
  {
    id: 14,
    title: "HR Manager",
    department_id: 4,
    department_name: departments.find((d) => d.id === 4)?.name,
  },
  {
    id: 15,
    title: "Marketing Manager",
    department_id: 5,
    department_name: departments.find((d) => d.id === 5)?.name,
  },
]

