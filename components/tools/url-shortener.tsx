'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Copy, RotateCcw, Sparkles, ExternalLink, Globe, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    if (!url.startsWith('http')) {
      toast.error('URL must start with http:// or https://');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/shorten?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to shorten URL');
      }
      setShortUrl(data.shortUrl);
      toast.success('URL shortened successfully');
    } catch (error: any) {
      toast.error(error.message || 'Service unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(shortUrl);
    if (success) toast.success('Short link copied');
  };

  const handleReset = () => { setUrl(''); setShortUrl(''); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') shortenUrl(); };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">URL Shortener</p>
            <p className="text-xs text-neutral-400">Instant direct links — no redirects</p>
          </div>
        </div>
        {(url || shortUrl) && (
          <Button
            variant="outline"
            onClick={handleReset}
            size="sm"
            className="self-start sm:self-auto border-white/10 hover:bg-white/5 text-neutral-400"
          >
            <RotateCcw size={14} className="mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* URL input */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          Original URL
        </label>
        <div className="relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4 pointer-events-none" />
          <Input
            placeholder="https://example.com/very-long-path-name"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl font-mono text-white text-sm focus:border-emerald-500/50 w-full"
          />
        </div>
      </div>

      {/* Submit button */}
      <Button
        disabled={isLoading || !url}
        onClick={shortenUrl}
        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl"
      >
        {isLoading ? 'Shortening…' : (
          <span className="flex items-center gap-2">
            Shorten Link <Zap className="w-4 h-4" />
          </span>
        )}
      </Button>

      {/* Result */}
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/70">
                Shortened Link
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="font-mono text-emerald-400 text-sm break-all flex-1 min-w-0">
                {shortUrl}
              </p>
              <div className="flex gap-2 shrink-0">
                <Button
                  onClick={handleCopy}
                  size="icon"
                  className="h-9 w-9 bg-white/10 hover:bg-emerald-500 hover:text-black rounded-lg transition-all"
                >
                  <Copy size={15} />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 bg-white/5 hover:bg-white/10 rounded-lg border-white/10 text-neutral-400"
                >
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={15} />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}