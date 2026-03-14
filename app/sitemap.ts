import { MetadataRoute } from "next";
import { TOOL_DEFINITIONS, getAllCategories } from "@/lib/tools/definitions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolverse-io.vercel.app";

  // Tool URLs
  const toolUrls = TOOL_DEFINITIONS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Category URLs
  const categories = getAllCategories();
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...toolUrls,
    ...categoryUrls,
  ];
}
