'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { TOOL_DEFINITIONS, getAllCategories } from '@/lib/tools/definitions';
import { Icon, Search } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function ToolsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedCategory = initialCategory;

  const handleCategorySelect = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Scroll active category into view
  useEffect(() => {
    if (selectedCategory && scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(
        `[data-category="${selectedCategory}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedCategory]);

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-12 pb-12 md:pt-26">
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
                  <h3 className="font-semibold text-foreground mb-3 hidden lg:block">
                    Categories
                  </h3>
                  <div 
                    ref={scrollContainerRef}
                    className="flex flex-row overflow-x-auto pb-4 gap-2 lg:flex-col lg:pb-0 lg:gap-2 snap-x hide-scrollbar"
                  >
                    <Button
                      variant={
                        selectedCategory === null ? "default" : "outline"
                      }
                      className="whitespace-nowrap flex-shrink-0 lg:w-full lg:justify-start snap-start"
                      onClick={() => handleCategorySelect(null)}
                    >
                      All Tools
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        data-category={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        className="whitespace-nowrap flex-shrink-0 lg:w-full lg:justify-start capitalize snap-start"
                        onClick={() => handleCategorySelect(category)}
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
                  {filteredTools.map((tool) => {
                    const ToolIcon = tool.icon;

                    return (
                      <Link key={tool.id} href={`/tools/${tool.slug}`}>
                        <Card className="tool-card group h-full cursor-pointer relative rounded-[2rem] overflow-hidden p-6">

                          {/* Top section */}
                          <div className="flex items-start justify-between mb-4 w-full">
                            <div className="tool-icon-wrapper">
                              {ToolIcon && <ToolIcon className="tool-icon" />}
                            </div>

                            <span className="inline-flex items-center rounded-full bg-neutral-800/50 border border-neutral-700/50 px-3 py-1 text-xs font-medium text-neutral-300 capitalize">
                              {tool.category}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex flex-col h-full">
                            <h3 className="font-semibold text-white mb-2 transition-colors group-hover:text-emerald-400">
                              {tool.name}
                            </h3>

                            <p className="text-sm text-neutral-400 font-light mb-4 flex-grow">
                              {tool.description}
                            </p>

                            {/* Background Icon */}
                            {ToolIcon && (
                              <div className="absolute -bottom-4 -right-4 text-white/5 group-hover:text-emerald-500/10 transition-all duration-700 pointer-events-none">
                                <ToolIcon size={90} strokeWidth={2} />
                              </div>
                            )}

                            {/* Tags */}
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
                    );
                  })}
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
                      handleCategorySelect(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTools.length} of {TOOL_DEFINITIONS.length} tools
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
