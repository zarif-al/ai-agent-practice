import { AppHeader } from '@/components/app-header';
import { EmptyState } from '@/components/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { employeesTable } from '@/db/schema/employees';
import { payrollTable } from '@/db/schema/payroll';
import { formatCurrency } from '@/utils/helpers';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function Page() {
  try {
    const payroll_items = await db
      .select({
        id: payrollTable.id,
        base_salary: payrollTable.base_salary,
        bonus: payrollTable.bonus,
        deductions: payrollTable.deductions,
        net_salary: payrollTable.net_salary,
        employee: {
          first_name: employeesTable.first_name,
          last_name: employeesTable.last_name,
        },
      })
      .from(payrollTable)
      .innerJoin(employeesTable, eq(payrollTable.employee, employeesTable.id));

    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Payroll & Compensation" />
        <main className="flex-1 p-4 lg:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Payroll Records</h2>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Base Salary</TableHead>
                  <TableHead className="text-right">Bonus</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payroll_items.length > 0 ? (
                  payroll_items.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell>
                        {payroll.employee.first_name}{' '}
                        {payroll.employee.last_name}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(payroll.base_salary)}
                      </TableCell>
                      <TableCell className="text-right">
                        {payroll.bonus ? formatCurrency(payroll.bonus) : 0}
                      </TableCell>
                      <TableCell className="text-right">
                        {payroll.deductions
                          ? formatCurrency(payroll.deductions)
                          : 0}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(payroll.net_salary)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyState
                    title="No Payroll Items Found"
                    description="Please create a payroll item to get started."
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
