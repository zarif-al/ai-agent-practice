import { peopleSchema } from '@/app/api/scrape-entity/schema';
import { Badge } from '@/components/global/ui/badge';
import type { IGeneratedObjectResult } from '@/utils/ai-scraping/common-interfaces';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Separator } from '@radix-ui/react-separator';
import {
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

interface IRenderUiViewProps {
  result: IGeneratedObjectResult;
  selectedPageTypeDisplayName: string;
}

export function RenderUiView({
  result,
  selectedPageTypeDisplayName,
}: IRenderUiViewProps) {
  switch (result.category) {
    case 'person':
      const parseResult = peopleSchema.safeParse(result.data);

      if (parseResult.success === false) {
        return (
          <div>
            <h4 className="font-medium mb-2">Error</h4>
            <div className="bg-background rounded border p-4">
              <div className="text-sm text-muted-foreground">
                Failed to parse {selectedPageTypeDisplayName} data
              </div>
            </div>
          </div>
        );
      }

      const data = parseResult.data;

      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Avatar className="h-20 w-20 rounded-md border-2 border-slate-200">
              <AvatarImage
                src={data.image || '/placeholder.svg'}
                alt={`${data.firstName} ${data.lastName}`}
              />
              <AvatarFallback className="text-3xl rounded-md">
                {data.firstName.charAt(0)}
                {data.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 ">
              <h3 className="text-xl font-semibold">
                {data.preNominal} {data.firstName} {data.lastName}{' '}
                {data.postNominal && (
                  <span className="text-sm font-normal">
                    {data.postNominal}
                  </span>
                )}
              </h3>
              <p className="text-slate-600">{data.position}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {data.contactLinks?.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white hover:bg-slate-50 transition-colors shadow-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contact.icon === 'x' ? 'Twitter' : contact.icon}
                  >
                    <ContactIcon iconName={contact.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <section>
            <h4 className="text-lg font-medium mb-2">SEO Information</h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium mb-1">Title</h5>
                <p className="p-2 bg-slate-50 rounded-md border text-slate-700">
                  {data.seo.title}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Description</h5>
                <p className="p-2 bg-slate-50 rounded-md border text-slate-700">
                  {data.seo.description}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Keywords</h5>
                <div className="flex flex-wrap gap-1">
                  {data.seo.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Biography Section */}
          <section>
            <h4 className="text-lg font-medium mb-2">Richtext Content</h4>
            <div
              className="prose prose-sm max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </section>
        </div>
      );
    case 'news':
      return (
        <div>
          <h4 className="font-medium mb-2">
            Scraped {selectedPageTypeDisplayName} Data (UI)
          </h4>
          <div className="bg-background rounded border p-4">
            <div className="text-sm text-muted-foreground">
              No UI view available for this page type
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <h4 className="font-medium mb-2">
            Scraped {selectedPageTypeDisplayName} Data (UI)
          </h4>
          <div className="bg-background rounded border p-4">
            <div className="text-sm text-muted-foreground">
              No UI view available for this page type
            </div>
          </div>
        </div>
      );
  }
}

// Helper function to render contact icons
const ContactIcon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'facebook':
      return <Facebook className="h-5 w-5" />;
    case 'x':
      return <Twitter className="h-5 w-5" />;
    case 'youtube':
      return <Youtube className="h-5 w-5" />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />;
    case 'email':
      return <Mail className="h-5 w-5" />;
    case 'phone':
      return <Phone className="h-5 w-5" />;
    case 'web':
      return <Globe className="h-5 w-5" />;
    default:
      return <Globe className="h-5 w-5" />;
  }
};
