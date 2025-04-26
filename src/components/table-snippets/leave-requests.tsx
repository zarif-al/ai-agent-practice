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
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { TableSnippetEmpty } from './empty';
import {
  formatLeaveStatus,
  formatLeaveType,
  getLeaveStatusColor,
} from '@/lib/helpers';
import { db } from '@/db';
import { leaveManagementTable } from '@/db/schema/leave-management';
import { employeesTable } from '@/db/schema/employees';
import { eq } from 'drizzle-orm';

export async function LeaveRequestsSnippet() {
  try {
    const leave_requests = await db
      .select({
        id: leaveManagementTable.id,
        employee: {
          first_name: employeesTable.first_name,
          last_name: employeesTable.last_name,
        },
        leave_type: leaveManagementTable.leave_type,
        start_date: leaveManagementTable.start_date,
        end_date: leaveManagementTable.end_date,
        status: leaveManagementTable.status,
      })
      .from(leaveManagementTable)
      .innerJoin(
        employeesTable,
        eq(leaveManagementTable.employee, employeesTable.id)
      )
      .limit(5);

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Pending Leave Requests</CardTitle>
            <CardDescription>Leave requests awaiting approval</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/leave-management" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Dates</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leave_requests.length > 0 ? (
                leave_requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      {request.employee.first_name} {request.employee.last_name}
                    </TableCell>
                    <TableCell>{formatLeaveType(request.leave_type)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {request.start_date} to {request.end_date}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveStatusColor(
                          request.status
                        )}`}
                      >
                        {formatLeaveStatus(request.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableSnippetEmpty
                  icon={Calendar}
                  title="No pending requests"
                  description="There are no leave requests awaiting approval."
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching leave requests:', error);

    return (
      <TableSnippetEmpty
        icon={Calendar}
        title="Failed to load leave requests"
        description="There was an error loading the leave requests. Please try again later."
      />
    );
  }
}
