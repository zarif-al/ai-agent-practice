import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { ArrowRight, Bot, FileSearch } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the AI agent practice
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose one of the following modules to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <Bot className="size-10 text-primary mb-2" />
                <CardTitle>AI Dashboard</CardTitle>
                <CardDescription>
                  Access the HR management dashboard with AI-powered chat
                  assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p>
                  Manage employees, departments, positions, leave requests, and
                  payroll with an intelligent AI assistant to help answer your
                  HR-related questions.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href="/ai-dashboard"
                    className="flex items-center justify-center"
                  >
                    Go to AI Dashboard
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <FileSearch className="size-10 text-primary mb-2" />
                <CardTitle>Data Scraping</CardTitle>
                <CardDescription>
                  Extract and analyze data from external sources
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p>
                  Use our data scraping tools to extract information from
                  websites, job boards, and other sources to enhance your
                  recruitment and market analysis.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href="/ai-scraping"
                    className="flex items-center justify-center"
                  >
                    Go to Scraping Tools
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
