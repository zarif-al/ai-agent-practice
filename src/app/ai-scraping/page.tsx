import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileSearch, Globe, Briefcase, Building2 } from 'lucide-react';

export default function ScrapingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Data Scraping Tools</h2>
          <p className="text-muted-foreground">
            Extract and analyze HR data from various external sources to enhance
            your recruitment and market analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Globe className="size-8 text-primary mb-2" />
              <CardTitle>Website Scraper</CardTitle>
              <CardDescription>
                Extract data from company websites and career pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This tool allows you to extract job listings, company
                information, and other HR-related data from company websites and
                career pages.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Briefcase className="size-8 text-primary mb-2" />
              <CardTitle>Job Board Scraper</CardTitle>
              <CardDescription>
                Collect job listings from popular job boards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Automatically collect job listings from popular job boards to
                analyze market trends, salary ranges, and required skills.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Building2 className="size-8 text-primary mb-2" />
              <CardTitle>Company Data Scraper</CardTitle>
              <CardDescription>
                Gather company information and employee data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Extract company information, employee data, and organizational
                structures from various online sources to enhance your market
                research.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileSearch className="size-8 text-primary mb-2" />
              <CardTitle>Resume Parser</CardTitle>
              <CardDescription>
                Extract structured data from resumes and CVs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Parse resumes and CVs to extract structured data such as skills,
                experience, education, and contact information for easier
                candidate evaluation.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Note on Ethical Data Collection</h3>
          <p className="text-sm">
            When using these tools, please ensure you comply with all applicable
            laws and regulations regarding data collection, privacy, and terms
            of service of the websites you scrape. Always respect robots.txt
            files and rate limits to avoid overloading servers.
          </p>
        </div>
      </div>
    </div>
  );
}
