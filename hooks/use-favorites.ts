import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('toolverse_favorites');
    setFavorites(saved ? JSON.parse(saved) : []);
    setIsLoaded(true);
  }, []);

  const toggleFavorite = useCallback((toolSlug: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(toolSlug)
        ? prev.filter((slug) => slug !== toolSlug)
        : [...prev, toolSlug];
      
      localStorage.setItem('toolverse_favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((toolSlug: string) => {
    return favorites.includes(toolSlug);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
