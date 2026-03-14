import type { Metadata } from "next";
import { getToolBySlug, TOOL_DEFINITIONS } from "@/lib/tools/definitions";
import ToolClientPage from "./ToolClientPage";

export async function generateStaticParams() {
  return TOOL_DEFINITIONS.map((tool) => ({ toolId: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolBySlug(toolId);

  if (!tool) {
    return {
      title: "Tool Not Found - ToolVerse",
      description: "The requested tool could not be found on ToolVerse.",
    };
  }

  const categoryLabel =
    tool.category.charAt(0).toUpperCase() + tool.category.slice(1);

  return {
    title: `${tool.name} - Free Online ${categoryLabel} Tool | ToolVerse`,
    description: `${tool.description}. Use our free online ${tool.name} instantly — no signup, no downloads required.`,
    keywords: [
      tool.name,
      ...tool.tags,
      "free online tool",
      "ToolVerse",
      categoryLabel,
    ],
    openGraph: {
      title: `${tool.name} | ToolVerse`,
      description: tool.description,
      type: "website",
      url: `https://toolverse-io.vercel.app/tools/${tool.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${tool.name} | ToolVerse`,
      description: tool.description,
    },
    alternates: {
      canonical: `https://toolverse-io.vercel.app/tools/${tool.slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const { toolId } = await params;
  return <ToolClientPage toolSlug={toolId} />;
}
