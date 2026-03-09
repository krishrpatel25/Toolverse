'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ExternalLink } from 'lucide-react';
import { TOOL_DEFINITIONS } from '@/lib/tools/definitions';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('toolverse_favorites');
    setFavorites(saved ? JSON.parse(saved) : []);
    setIsLoading(false);
  }, []);

  const favoriteTools = TOOL_DEFINITIONS.filter(tool =>
    favorites.includes(tool.slug)
  );

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">My Favorites</h1>
            <p className="text-lg text-muted-foreground">
              {favoriteTools.length} tool{favoriteTools.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {favoriteTools.length === 0 ? (
            <Card className="border border-border bg-card p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground mb-8">
                Start adding tools to your favorites by clicking the heart icon on any tool.
              </p>
              <Button asChild>
                <Link href="/tools">Browse Tools</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTools.map((tool) => (
                <Card key={tool.slug} className="tool-card h-full">
                  <div className="flex items-start justify-between mb-4 relative z-10 w-full">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{tool.name}</h3>
                      <p className="text-xs text-neutral-400 capitalize">{tool.category}</p>
                    </div>
                    <Heart className="h-5 w-5 text-emerald-400 fill-emerald-400 flex-shrink-0 ml-2" />
                  </div>

                  <div className="relative z-10 flex flex-col flex-1 h-full">
                    <p className="text-sm text-neutral-400 font-light mb-4 line-clamp-2 flex-grow">{tool.description}</p>
                    <Button variant="outline" size="sm" asChild className="w-full mt-auto bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-white hover:text-white">
                      <Link href={`/tools/${tool.slug}`} className="flex items-center justify-center gap-2">
                        Open Tool
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
