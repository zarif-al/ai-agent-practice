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
import { ChevronRight, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { TableSnippetEmpty } from './empty';
import { formatCurrency } from '@/utils/helpers';
import { db } from '@/db';
import { payrollTable } from '@/db/schema/payroll';
import { employeesTable } from '@/db/schema/employees';
import { desc, eq } from 'drizzle-orm';

export async function PayrollSnippet() {
  try {
    const payroll_items = await db
      .select({
        id: payrollTable.id,
        employee: {
          first_name: employeesTable.first_name,
          last_name: employeesTable.last_name,
        },
        base_salary: payrollTable.base_salary,
        net_salary: payrollTable.net_salary,
      })
      .from(payrollTable)
      .innerJoin(employeesTable, eq(payrollTable.employee, employeesTable.id))
      .orderBy(desc(payrollTable.net_salary))
      .limit(5);

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Top Compensations</CardTitle>
            <CardDescription>Highest paid employees</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/payroll-compensation" className="flex items-center">
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
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Net Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payroll_items.length > 0 ? (
                payroll_items.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {record.employee.first_name} {record.employee.last_name}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(record.base_salary)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(record.net_salary)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableSnippetEmpty
                  icon={DollarSign}
                  title="No payroll records"
                  description="Add payroll records to see top compensations."
                />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching payroll records:', error);

    return (
      <TableSnippetEmpty
        icon={DollarSign}
        title="Error fetching payroll records"
        description="There was an error fetching payroll records."
      />
    );
  }
}
