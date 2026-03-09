import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools - ToolVerse | 100+ Free Online Tools',
  description: 'Browse 100+ free online tools including text processing, JSON formatters, code minifiers, calculators, and more. No signup required.',
  keywords: [
    'online tools',
    'free tools',
    'text tools',
    'developer tools',
    'calculator',
    'JSON formatter',
    'text counter',
    'password generator',
    'image tools',
    'conversion tools',
  ],
  openGraph: {
    title: 'All Tools - ToolVerse',
    description: '100+ free online tools for productivity and development',
    type: 'website',
    url: 'https://toolverse.app/tools',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
