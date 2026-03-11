'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, RotateCcw, FileText, Type, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const LOREM_WORDS = LOREM_TEXT.split(/\s+/);

export function LoremIpsum() {
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);

  const generateWords = (count: number) => {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
    }
    return words.join(' ');
  };

  const generateSentences = (count: number) => {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      const words = generateWords(Math.floor(Math.random() * 10) + 8);
      sentences.push(words.charAt(0).toUpperCase() + words.slice(1) + '.');
    }
    return sentences.join(' ');
  };

  const generateParagraphs = (count: number) => {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(generateSentences(Math.floor(Math.random() * 5) + 4));
    }
    return paragraphs.join('\n\n');
  };

  const result = useMemo(() => {
    switch (type) {
      case 'words': return generateWords(count);
      case 'sentences': return generateSentences(count);
      case 'paragraphs': return generateParagraphs(count);
      default: return '';
    }
  }, [type, count]);

  const handleCopy = async () => {
    const success = await copyToClipboard(result);
    if (success) {
      toast.success('Generated text copied');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Type className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Lorem Ipsum Generator</h2>
              <p className="text-sm text-neutral-400">Generate placeholder text for layouts</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="space-y-4">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Output Type</label>
            <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
              {[
                { value: 'words', label: 'Words' },
                { value: 'sentences', label: 'Sentences' },
                { value: 'paragraphs', label: 'Paragraphs' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value as typeof type)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    type === opt.value ? 'bg-emerald-500 text-black' : 'text-neutral-400 hover:text-white font-medium'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-end px-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Amount to Generate</label>
                <span className="text-2xl font-black text-white">{count}</span>
             </div>
             <input
                type="range"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
             />
             <div className="flex justify-between text-[10px] text-neutral-600 font-bold uppercase px-1">
               <span>1 Unit</span>
               <span>20 Units</span>
             </div>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="p-8 bg-white/[0.02] border-white/5 rounded-[2rem] group relative overflow-hidden transition-all hover:bg-white/[0.04]">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest">Generated Result</h3>
               <Button 
                  onClick={handleCopy}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-10 px-4 rounded-xl shadow-lg shadow-emerald-500/10"
               >
                  <Copy size={16} className="mr-2" />
                  Copy Text
               </Button>
            </div>
            
            <div className="min-h-[150px] max-h-[400px] overflow-auto scrollbar-hide">
               <p className="text-lg text-neutral-300 leading-relaxed font-serif italic opacity-90">
                 {result}
               </p>
            </div>
          </div>
          
          <div className="absolute -right-12 -bottom-12 opacity-[0.02] text-white pointer-events-none group-hover:opacity-[0.04] transition-opacity">
             <FileText size={200} />
          </div>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button 
          variant="outline" 
          onClick={() => setCount(3)}
          className="rounded-2xl border-white/10 hover:bg-white/5 h-12 text-neutral-500"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Defaults
        </Button>
      </div>
    </div>
  );
}
