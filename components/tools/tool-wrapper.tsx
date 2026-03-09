"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Heart } from "lucide-react";
import { toast } from "sonner";
import { Tool } from "@/types/tools";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";

interface ToolWrapperProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolWrapper({ tool, children }: ToolWrapperProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [mounted, setMounted] = useState(false);

  const Icon = tool.icon; // important fix

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }
    } catch {
      toast.error("Failed to share");
    }
  };

  const handleFavorite = () => {
    toggleFavorite(tool.slug);

    toast.success(
      isFavorite(tool.slug) ? "Removed from favorites" : "Added to favorites",
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* Tool Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Left Section */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-accent shrink-0">
              {Icon && (
                <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent-foreground" />
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                {tool.name}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex gap-2 self-start md:self-auto">
            {mounted && isLoaded && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavorite}
                className={
                  isFavorite(tool.slug) ? "bg-accent/10 text-accent" : ""
                }
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite(tool.slug) ? "currentColor" : "none"}
                />
              </Button>
            )}

            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs sm:text-sm text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tool Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border border-border bg-card p-4 sm:p-6 md:p-8 min-h-[300px]">
          {children}
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 justify-start sm:justify-end"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="w-full sm:w-auto"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Tool
        </Button>
      </motion.div>
    </div>
  );
}
