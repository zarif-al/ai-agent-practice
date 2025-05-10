'use client';

import { SidebarTrigger } from '@/components/global/ui/sidebar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/global/ui/button';

interface Props {
  title: string;
  disableSidebarToggle?: boolean;
}

export function AppHeader({ title, disableSidebarToggle }: Props) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 justify-between">
      {!disableSidebarToggle && <SidebarTrigger className="lg:hidden" />}
      <h1 className="text-xl font-semibold">{title}</h1>
      <Button variant="outline" size="sm" asChild>
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 size-4" />
          Back to Home
        </Link>
      </Button>
    </header>
  );
}
