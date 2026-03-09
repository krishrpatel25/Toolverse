import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools/definitions';

export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolBySlug(toolId);
  
  if (!tool) {
    return {
      title: 'Tool Not Found - ToolVerse',
      description: 'The tool you are looking for does not exist.',
    };
  }

  return {
    title: `${tool.name} - ToolVerse | Free Online Tool`,
    description: tool.description,
    keywords: [...tool.tags, 'free tool', 'online tool', 'free online tool'],
    openGraph: {
      title: `${tool.name} - ToolVerse`,
      description: tool.description,
      type: 'website',
      url: `https://toolverse.app/tools/${tool.slug}`,
    },
  };
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
