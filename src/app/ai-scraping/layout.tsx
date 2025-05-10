import type React from 'react';
import { AppHeader } from '@/components/global/app-header';

export default function ScrapingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader title="AI Scraping" disableSidebarToggle />
      {children}
    </div>
  );
}
