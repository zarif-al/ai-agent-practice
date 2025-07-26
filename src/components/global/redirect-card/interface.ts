import type { JSX } from 'react';

export interface RedirectCardProps {
  title: string;
  description: string;
  content: string;
  icon: JSX.Element;
  link: {
    href: string;
    label: string;
  };
}
