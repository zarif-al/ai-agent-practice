import { AppHeader } from '@/components/global/app-header';
import { EmptyState } from '@/components/ai-dashboard/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/global/ui/table';
import { db } from '@/db';
import { departmentsTable } from '@/db/schema/departments';
import { employeesTable } from '@/db/schema/employees';
import { positionsTable } from '@/db/schema/positions';
import {
  formatEmployeeStatus,
  getEmployeeStatusColor,
} from '@/utils/ai-dashboard/helpers';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function Page() {
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
      );

    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Employee Management" />
        <main className="flex-1 p-4 lg:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Employees</h2>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Position
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Department
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Hire Date
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
                      <TableCell>{employee.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {employee.phone}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {employee.position}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {employee.department}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {employee.hire_date}
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
                  <EmptyState
                    title="No Employee Data found"
                    description="You haven't added any employees yet. Add your first employee to get started."
                  />
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching departments:', error);

    notFound();
  }
}
