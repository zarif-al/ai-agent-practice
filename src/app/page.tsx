import { Bot, FileSearch } from 'lucide-react';
import { RedirectCard } from '@/components/global/redirect-card';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the AI agent practice
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose one of the following modules to get started
            </p>
          </div>

          {/* Redirects */}
          <div className="grid md:grid-cols-2 gap-8">
            <RedirectCard
              title="AI Dashboard"
              description="Access the HR management dashboard with AI-powered chat assistance"
              content="Manage employees, departments, positions, leave requests, and payroll with an intelligent AI assistant to help answer your HR-related questions."
              icon={<Bot className="size-10 text-primary mb-2" />}
              link={{
                href: '/ai-dashboard',
                label: 'Go to AI Dashboard',
              }}
            />

            <RedirectCard
              title="Data Scraping"
              description="Extract and analyze data from external sources"
              content="Use our data scraping tools to extract information from websites, job boards, and other sources to enhance your recruitment and market analysis."
              icon={<FileSearch className="size-10 text-primary mb-2" />}
              link={{
                href: '/ai-scraping',
                label: 'Go to Scraping Tools',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
