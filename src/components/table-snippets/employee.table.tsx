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
import { ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { TableSnippetEmpty } from './empty';
import { formatEmployeeStatus, getEmployeeStatusColor } from '@/lib/helpers';
import { db } from '@/db';
import { employeesTable } from '@/db/schema/employees';
import { positionsTable } from '@/db/schema/positions';
import { desc, eq } from 'drizzle-orm';
import { departmentsTable } from '@/db/schema/departments';

export async function EmployeeTableSnippet() {
  try {
    const employees = await db
      .select({
        id: employeesTable.id,
        first_name: employeesTable.first_name,
        last_name: employeesTable.last_name,
        email: employeesTable.email,
        phone: employeesTable.phone,
        hire_date: employeesTable.hire_date,
        status: employeesTable.status,
        position: positionsTable.title,
        department: departmentsTable.name,
      })
      .from(employeesTable)
      .innerJoin(positionsTable, eq(employeesTable.position, positionsTable.id))
      .innerJoin(
        departmentsTable,
        eq(positionsTable.department, departmentsTable.id)
      )
      .limit(5)
      .orderBy(desc(employeesTable.created_at));

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Recent Employees</CardTitle>
            <CardDescription>
              Overview of the most recent employee records
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employee-management" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="hidden md:table-cell">
                  Department
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      {employee.first_name} {employee.last_name}
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.department}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getEmployeeStatusColor(
                          employee.status
                        )}`}
                      >
                        {formatEmployeeStatus(employee.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableSnippetEmpty
                  icon={Users}
                  title="No employees found"
                  description="Add employees to see them listed here."
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching employees:', error);

    return (
      <TableSnippetEmpty
        icon={Users}
        title="Error fetching employees"
        description="There was an error fetching the employee data. Please try again later."
      />
    );
  }
}
