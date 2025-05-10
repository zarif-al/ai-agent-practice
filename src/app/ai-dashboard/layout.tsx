import type { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/global/ui/sidebar';
import { AppSidebar } from '@/components/ai-dashboard/app-sidebar';
import QueryProvider from '@/components/global/query-provider';

export const metadata: Metadata = {
  title: 'AI Dashboard',
  description: 'An AI powered HR application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <QueryProvider>
        <AppSidebar />
        <SidebarInset className="text-black">{children}</SidebarInset>
      </QueryProvider>
    </SidebarProvider>
  );
}
