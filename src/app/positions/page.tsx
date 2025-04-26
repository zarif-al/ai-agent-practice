import { AppHeader } from '@/components/app-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { departmentsTable } from '@/db/schema/departments';
import { positionsTable } from '@/db/schema/positions';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function Page() {
  try {
    const positions = await db
      .select({
        id: positionsTable.id,
        title: positionsTable.title,
        department: departmentsTable.name,
      })
      .from(positionsTable)
      .innerJoin(
        departmentsTable,
        eq(positionsTable.department, departmentsTable.id)
      );

    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Positions" />
        <main className="flex-1 p-4 lg:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Positions</h2>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>{position.title}</TableCell>
                    <TableCell>{position.department}</TableCell>
                  </TableRow>
                ))}
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
