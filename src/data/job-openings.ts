import { departments } from "./departments"

// Types for our job opening data
export type JobStatus = "open" | "closed"

export interface JobOpening {
  id: number
  title: string
  department_id: number
  department_name?: string // For display purposes
  description: string
  status: JobStatus
  posted_date: string
  location?: string
}

// Helper function to get status badge color
export function getJobStatusColor(status: JobStatus): string {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800 border-green-200"
    case "closed":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Helper function to format status for display
export function formatJobStatus(status: JobStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Mock job openings data
export const jobOpenings: JobOpening[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department_id: 1,
    department_name: departments.find((d) => d.id === 1)?.name,
    description:
      "We are looking for a Senior Software Engineer to join our team. The ideal candidate will have 5+ years of experience in web development with React and Node.js.",
    status: "open",
    posted_date: "2023-05-15",
    location: "San Francisco, CA (Remote)",
  },
  {
    id: 2,
    title: "Product Manager",
    department_id: 2,
    department_name: departments.find((d) => d.id === 2)?.name,
    description:
      "We are seeking a Product Manager to help define and execute our product roadmap. The ideal candidate will have experience in SaaS products.",
    status: "open",
    posted_date: "2023-06-01",
    location: "New York, NY (Hybrid)",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department_id: 3,
    department_name: departments.find((d) => d.id === 3)?.name,
    description:
      "We are looking for a UX/UI Designer to create intuitive and visually appealing interfaces for our products.",
    status: "open",
    posted_date: "2023-06-10",
    location: "Austin, TX (Remote)",
  },
  {
    id: 4,
    title: "HR Coordinator",
    department_id: 4,
    department_name: departments.find((d) => d.id === 4)?.name,
    description:
      "We are seeking an HR Coordinator to support our HR team with administrative tasks and employee onboarding.",
    status: "closed",
    posted_date: "2023-04-20",
    location: "Chicago, IL (On-site)",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    department_id: 5,
    department_name: departments.find((d) => d.id === 5)?.name,
    description: "We are looking for a Marketing Specialist to help execute our marketing campaigns and strategies.",
    status: "open",
    posted_date: "2023-05-25",
    location: "Boston, MA (Hybrid)",
  },
  {
    id: 6,
    title: "Financial Analyst",
    department_id: 6,
    department_name: departments.find((d) => d.id === 6)?.name,
    description: "We are seeking a Financial Analyst to help with financial planning, analysis, and reporting.",
    status: "closed",
    posted_date: "2023-03-15",
    location: "Seattle, WA (On-site)",
  },
  {
    id: 7,
    title: "Customer Support Representative",
    department_id: 7,
    department_name: departments.find((d) => d.id === 7)?.name,
    description: "We are looking for a Customer Support Representative to provide excellent service to our customers.",
    status: "open",
    posted_date: "2023-06-05",
    location: "Denver, CO (Remote)",
  },
  {
    id: 8,
    title: "Sales Representative",
    department_id: 8,
    department_name: departments.find((d) => d.id === 8)?.name,
    description: "We are seeking a Sales Representative to help grow our customer base and revenue.",
    status: "open",
    posted_date: "2023-05-30",
    location: "Los Angeles, CA (Hybrid)",
  },
]

