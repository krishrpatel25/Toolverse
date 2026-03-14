"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Heart, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Tool } from "@/types/tools";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";
import { copyToClipboard } from "@/lib/utils";

interface ToolWrapperProps {
  tool: Tool;
  children: React.ReactNode;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          className={`shrink-0 h-4 w-4 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ToolWrapper({ tool, children }: ToolWrapperProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const Icon = tool.icon;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href,
        });
      } else {
        const success = await copyToClipboard(window.location.href);
        if (success) {
          toast.success("Link copied to clipboard");
        } else {
          toast.error("Failed to copy link");
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Failed to share");
      }
    }
  };

  const handleFavorite = () => {
    toggleFavorite(tool.slug);
    toast.success(
      isFavorite(tool.slug) ? "Removed from favorites" : "Added to favorites"
    );
  };

  return (
    <div className="space-y-8 w-full">
      {/* ── Tool Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: icon + title */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-accent">
              {Icon && (
                <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {tool.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex gap-2 shrink-0">
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
              className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Tool Content Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border border-border bg-card p-4 sm:p-6 overflow-hidden">
          <div className="w-full overflow-x-auto">{children}</div>
        </Card>
      </motion.div>

      {/* ── Share button ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end"
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

      {/* ── SEO Content Section ── */}
      {tool.seoContent && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          aria-label={`About ${tool.name}`}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-3"
        >
          <h2 className="text-lg font-semibold text-white">
            About {tool.name}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tool.seoContent}
          </p>
        </motion.section>
      )}

      {/* ── FAQ Section ── */}
      {tool.faqs && tool.faqs.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-label={`Frequently asked questions about ${tool.name}`}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {tool.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
