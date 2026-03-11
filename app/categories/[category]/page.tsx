import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { TOOL_DEFINITIONS, getAllCategories } from "@/lib/tools/definitions";
import { ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const tools = TOOL_DEFINITIONS.filter((t) => t.category === category);

  return {
    title: `${categoryName} Tools - ToolVerse`,
    description: `Browse ${tools.length} free ${categoryName.toLowerCase()} tools.`,
    keywords: [
      category,
      "free tools",
      "online tools",
      ...tools.map((t) => t.name),
    ],
    openGraph: {
      title: `${categoryName} Tools - ToolVerse`,
      description: `${tools.length} free ${categoryName.toLowerCase()} tools`,
      type: "website",
      url: `https://toolverse.app/categories/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const tools = TOOL_DEFINITIONS.filter((t) => t.category === category);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-26">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {categoryName} Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              {tools.length} tools in this category
            </p>
          </div>

          {/* Tools */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link key={tool.id} href={`/tools/${tool.slug}`}>
                  <Card className="tool-card h-full cursor-pointer">
                    <div className="flex items-start justify-between mb-4 relative z-10 w-full">
                      <div className="tool-icon-wrapper">
                        <Icon className="tool-icon" />
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col flex-1 h-full">
                      <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {tool.name}
                      </h3>

                      <p className="text-sm text-neutral-400 font-light mb-4 flex-grow">
                        {tool.description}
                      </p>
                      {/* --- DYNAMIC ICON WATERMARK --- */}
                      <div className="absolute -bottom-0 -right-6 text-white/8 group-hover:text-emerald-500/8 transition-all duration-700 ">
                        <Icon
                          size={90}
                          strokeWidth={
                            2
                          } /* Thinner stroke looks more premium at large sizes */
                          className="transition-all"
                        />
                      </div>

                      <div className="flex items-center text-emerald-400 text-sm group-hover:translate-x-1 transition-transform mt-auto">
                        Use Tool <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
