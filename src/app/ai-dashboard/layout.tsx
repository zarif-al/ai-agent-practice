import type { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import QueryProvider from '@/components/query-provider';

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
