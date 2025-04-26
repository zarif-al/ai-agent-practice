import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Briefcase, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TableSnippetEmpty } from './empty';
import { formatJobStatus, getJobStatusColor } from '@/lib/helpers';
import { db } from '@/db';
import { jobOpeningsTable } from '@/db/schema/job-openings';
import { positionsTable } from '@/db/schema/positions';
import { eq } from 'drizzle-orm';
import { departmentsTable } from '@/db/schema/departments';

export async function JobOpeningsSnippet() {
  try {
    const job_openings = await db
      .select({
        id: jobOpeningsTable.id,
        position: positionsTable.title,
        department: departmentsTable.name,
        status: jobOpeningsTable.status,
      })
      .from(jobOpeningsTable)
      .innerJoin(
        positionsTable,
        eq(jobOpeningsTable.position, positionsTable.id)
      )
      .innerJoin(
        departmentsTable,
        eq(positionsTable.department, departmentsTable.id)
      )
      .limit(5);

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Open Positions</CardTitle>
            <CardDescription>Currently open job positions</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/job-openings" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Department
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {job_openings.length > 0 ? (
                job_openings.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.position}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.department}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getJobStatusColor(
                          job.status
                        )}`}
                      >
                        {formatJobStatus(job.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableSnippetEmpty
                  icon={Briefcase}
                  title="No open positions"
                  description="Add job openings to see them listed here."
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching job openings:', error);

    return (
      <TableSnippetEmpty
        icon={Briefcase}
        title="Failed to load job openings"
        description="There was an error loading the job openings. Please try again later."
      />
    );
  }
}
