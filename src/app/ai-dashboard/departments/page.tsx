import { AppHeader } from '@/components/global/app-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/global/ui/table';
import { notFound } from 'next/navigation';
import { EmptyState } from '@/components/ai-dashboard/empty-state';
import { db } from '@/db';
import { departmentsTable } from '@/db/schema/departments';

export default async function Page() {
  try {
    const departments = await db.select().from(departmentsTable);

    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Departments" />
        <main className="flex-1 p-4 lg:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Departments</h2>
          </div>

          {departments.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>{department.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              title="No departments found"
              description="You haven't added any departments yet. Add your first department to get started."
            />
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching departments:', error);

    notFound();
  }
}
