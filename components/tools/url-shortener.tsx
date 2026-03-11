'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, Copy, RotateCcw, Sparkles, ExternalLink, Globe, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
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
      // Call our server-side proxy to avoid CORS restrictions
      const response = await fetch(`/api/shorten?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setShortUrl(data.shortUrl);
      toast.success('URL shortened successfully');
    } catch (error: any) {
      toast.error(error.message || 'Service unavailable. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(shortUrl);
    if (success) toast.success('Short link copied');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') shortenUrl();
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">URL Shortener</h2>
              <p className="text-sm text-neutral-400">Instant direct links — no redirects or delays</p>
            </div>
          </div>
          {(url || shortUrl) && (
            <Button 
               variant="outline" 
               onClick={() => { setUrl(''); setShortUrl(''); }}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Original URL</label>
              <div className="relative group">
                 <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 w-5 h-5 pointer-events-none" />
                 <Input
                    placeholder="https://example.com/very-long-path-name"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl pl-12 pr-6 font-mono text-white focus:border-emerald-500/50"
                 />
              </div>
           </div>

           <Button 
            disabled={isLoading || !url} 
            onClick={shortenUrl} 
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10 transition-all"
           >
            {isLoading ? "Shortening..." : (
              <span className="flex items-center">
                Shorten Link <Zap className="ml-2 w-4 h-4" />
              </span>
            )}
           </Button>
        </div>
      </Card>

      <AnimatePresence>
        {shortUrl && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
             <div className="flex items-center gap-2 px-2">
                <Sparkles size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Shortened Link</span>
             </div>
             <Card className="p-6 border-white/5 bg-[#080808] rounded-[2rem] group hover:border-emerald-500/20 transition-all overflow-hidden relative">
                <div className="flex items-center justify-between gap-4">
                   <div className="flex-1">
                      <p className="font-mono text-emerald-400 text-lg break-all">{shortUrl}</p>
                   </div>
                   <div className="flex gap-2 shrink-0">
                      <Button
                        onClick={handleCopy}
                        className="w-12 h-12 bg-white/5 hover:bg-emerald-500 hover:text-black rounded-xl transition-all border-white/5"
                      >
                        <Copy className='text-white' size={18} />
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl transition-all border-white/5 text-neutral-400"
                      >
                         <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                           <ExternalLink size={18} />
                         </a>
                      </Button>
                   </div>
                </div>
             </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}