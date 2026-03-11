'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, Trash2, ListChecks, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';

export function DuplicateRemover() {
  const [text, setText] = useState('');

  const { result, duplicatesRemoved, inputLines, outputLines } = useMemo(() => {
    if (!text.trim()) return { result: '', duplicatesRemoved: 0, inputLines: 0, outputLines: 0 };
    const lines = text.split('\n');
    const seen = new Set<string>();
    const filtered = lines.filter(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return true; // Keep empty lines if desired, or skip? Let's keep for layout
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    });
    
    const res = filtered.join('\n');
    return {
      result: res,
      duplicatesRemoved: lines.length - filtered.length,
      inputLines: lines.length,
      outputLines: filtered.length
    };
  }, [text]);

  const handleCopy = async () => {
    const success = await copyToClipboard(result);
    if (success) {
      toast.success('Cleaned text copied');
    }
  };

  const stats = [
    { label: 'Input Lines', value: inputLines, color: 'text-neutral-400' },
    { label: 'Output Lines', value: outputLines, color: 'text-emerald-400' },
    { label: 'Removed', value: duplicatesRemoved, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ListChecks className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Duplicate Remover</h2>
              <p className="text-sm text-neutral-400">Clean your lists and remove redundant data</p>
            </div>
          </div>
          {text && (
            <Button 
               variant="outline" 
               onClick={() => setText('')}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
           {stats.map((s) => (
             <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">{s.label}</p>
                <p className={cn("text-2xl font-black", s.color)}>{s.value}</p>
             </div>
           ))}
        </div>

        <Textarea
          placeholder="Paste your text here (one item per line)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[250px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
        />
      </Card>

      {result && duplicatesRemoved > 0 && (
        <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] group relative overflow-hidden transition-all hover:bg-emerald-500/[0.08]">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full overflow-hidden">
               <div className="flex items-center gap-2 mb-4">
                 <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Cleaned List</h3>
               </div>
               <div className="max-h-[300px] overflow-auto scrollbar-hide font-mono text-sm text-white/90 whitespace-pre leading-relaxed">
                 {result}
               </div>
            </div>
            <Button 
               onClick={handleCopy}
               className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-2xl h-14 shadow-lg shadow-emerald-500/10 shrink-0"
            >
               <Copy size={20} className="mr-2" />
               Copy Cleaned
            </Button>
          </div>
        </Card>
      )}

      {!text && (
        <Card className="p-6 bg-white/[0.02] border-white/5 rounded-[2rem] text-center border-dashed">
          <p className="text-sm text-neutral-600 italic flex items-center justify-center gap-2 text-center">
            <Wand2 size={14} />
            Clean your data with a single click...
          </p>
        </Card>
      )}
    </div>
  );
}
