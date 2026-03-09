'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { TOOL_DEFINITIONS, getAllCategories } from '@/lib/tools/definitions';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ToolsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const categories = getAllCategories();

  const filteredTools = useMemo(() => {
    let tools = TOOL_DEFINITIONS;

    if (selectedCategory) {
      tools = tools.filter(t => t.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return tools;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              All Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse and use {TOOL_DEFINITIONS.length} free online tools
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar - Categories */}
            <aside className="lg:w-56">
              <div className="sticky top-24 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant={
                        selectedCategory === null ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Tools
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        className="w-full justify-start capitalize"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content - Tools Grid */}
            <div className="flex-1">
              {filteredTools.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTools.map((tool) => (
                    <Link key={tool.id} href={`/tools/${tool.slug}`}>
                      <Card className="tool-card h-full cursor-pointer">
                        <div className="flex items-start justify-between mb-4 relative z-10 w-full">
                          <div className="tool-icon-wrapper">
                            {tool.icon && <tool.icon className="tool-icon" />}
                          </div>
                          <span className="inline-flex items-center rounded-full bg-neutral-800/50 border border-neutral-700/50 px-3 py-1 text-xs font-medium text-neutral-300 capitalize">
                            {tool.category}
                          </span>
                        </div>

                        <div className="relative z-10 flex flex-col flex-1 h-full">
                          <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-neutral-400 font-light mb-4 flex-grow">
                            {tool.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {tool.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-neutral-800/30 border border-neutral-800 px-2 py-1 text-xs text-neutral-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                  <p className="text-lg text-muted-foreground mb-4">
                    No tools found matching your search
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTools.length} of {TOOL_DEFINITIONS.length}{" "}
                  tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="text-emerald-400">Loading tools...</div>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}
