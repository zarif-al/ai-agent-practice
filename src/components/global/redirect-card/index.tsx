import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import type { RedirectCardProps } from './interface';
import { ArrowRight } from 'lucide-react';

export function RedirectCard({
  content,
  description,
  icon,
  link,
  title,
}: RedirectCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        {/* <Bot className="size-10 text-primary mb-2" /> */}
        {icon}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={link.href} className="flex items-center justify-center">
            {link.label}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
