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
  Calendar,
} from 'lucide-react';
import Image from 'next/image';
import { ConfidenceBadge } from './confidence-badge';
import { formatDate } from '@/utils/ai-scraping/helpers';
import { peopleSchema } from '@/app/api/ai-scrape/schema/person';
import { newsSchema } from '@/app/api/ai-scrape/schema/news';

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
      const peopleParseResult = peopleSchema.safeParse(result.data);

      if (peopleParseResult.success === false) {
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

      const personData = peopleParseResult.data;

      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Avatar className="h-20 w-20 rounded-md border-2 border-slate-200">
              <AvatarImage
                src={personData.image || '/placeholder.svg'}
                alt={`${personData.firstName} ${personData.lastName}`}
              />
              <AvatarFallback className="text-3xl rounded-md">
                {personData.firstName.charAt(0)}
                {personData.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 ">
              <h3 className="text-xl font-semibold">
                {personData.preNominal} {personData.firstName}{' '}
                {personData.lastName}{' '}
                {personData.postNominal && (
                  <span className="text-sm font-normal">
                    {personData.postNominal}
                  </span>
                )}
              </h3>
              <p className="text-slate-600">{personData.position}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {personData.contactLinks?.map((contact, index) => (
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
                  {personData.seo.title}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Description</h5>
                <p className="p-2 bg-slate-50 rounded-md border text-slate-700">
                  {personData.seo.description}
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Keywords</h5>
                <div className="flex flex-wrap gap-1">
                  {personData.seo.keywords.map((keyword, index) => (
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
              dangerouslySetInnerHTML={{ __html: personData.content }}
            />
          </section>
        </div>
      );
    case 'news':
      const newsParseResult = newsSchema.safeParse(result.data);

      if (newsParseResult.success === false) {
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

      const newsData = newsParseResult.data;

      return (
        <div className="space-y-6">
          {/* Image Section */}
          {newsData.image && (
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={newsData.image}
                alt={newsData.name}
                className="w-full h-auto object-cover max-h-[400px]"
                height={400}
                width={800}
                unoptimized
              />
            </div>
          )}

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(new Date(newsData.publishDate))}</span>
            </div>
            <ConfidenceBadge confidence={newsData.confidenceLevel} />
          </div>

          {/* Content Section */}
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: newsData.content }}
          />

          <Separator className="my-2" />

          {/* Metadata Section */}
          <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Article Metadata
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-slate-700 mb-1">Slug</h5>
                <p className="p-2 bg-white rounded-md border border-slate-200 text-slate-600 font-mono text-xs">
                  {newsData.slug}
                </p>
              </div>
              <div>
                <h5 className="font-medium text-slate-700 mb-1">
                  Publish Date
                </h5>
                <p className="p-2 bg-white rounded-md border border-slate-200 text-slate-600 font-mono text-xs">
                  {formatDate(new Date(newsData.publishDate))}
                </p>
              </div>
            </div>
          </section>
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
