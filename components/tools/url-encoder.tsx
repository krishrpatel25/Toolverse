'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, Globe, Link, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function URLEncoder() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = useMemo(() => {
    if (!text.trim()) return '';
    try {
      return mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
    } catch {
      return '';
    }
  }, [text, mode]);

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyToClipboard(result);
    if (success) {
      toast.success('Copied to clipboard');
    }
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
              <h2 className="text-xl font-bold text-white tracking-tight">URL Encoder / Decoder</h2>
              <p className="text-sm text-neutral-400">Safe conversion of URL components</p>
            </div>
          </div>
          {text && (
            <Button 
               variant="outline" 
               onClick={() => setText('')}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="grid gap-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Operation Mode</label>
              <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
                {[
                  { value: 'encode', label: 'Encode (Safe)' },
                  { value: 'decode', label: 'Decode (Raw)' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMode(opt.value as typeof mode)}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                      mode === opt.value ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/10" : "text-neutral-500 hover:text-white"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
           </div>

           <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Input Sequence</label>
                 <Textarea
                    placeholder="Enter text to process..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
                 />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 px-1">Resulting URL</label>
                 <Card className="min-h-[200px] bg-black/40 border-emerald-500/10 rounded-2xl p-6 relative group overflow-hidden border-dashed">
                    <div className="font-mono text-sm text-neutral-300 break-all whitespace-pre-wrap leading-relaxed">
                       {result || <span className="text-neutral-700 italic">https%3A%2F%2Fexample.com</span>}
                    </div>
                    {result && (
                       <Button 
                          onClick={handleCopy}
                          className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-10 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <Copy size={14} className="mr-2" />
                          Copy
                       </Button>
                    )}
                 </Card>
              </div>
           </div>
        </div>
      </Card>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          RFC 3986 compliant encoding. Processed safely in-browser.
        </p>
      </Card>
    </div>
  );
}
