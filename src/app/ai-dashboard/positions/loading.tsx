import { AppHeader } from '@/components/app-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Positions" />
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Positions</h2>
        </div>

        <Skeleton className="w-full h-[500px] rounded-md" />
      </main>
    </div>
  );
}
