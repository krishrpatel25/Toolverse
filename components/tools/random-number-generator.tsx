'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, RotateCcw, Hash, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function RandomNumberGenerator() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min) || 0;
    const maxNum = parseInt(max) || 100;
    const numCount = Math.min(100, Math.max(1, parseInt(count) || 1));
    const newResults: number[] = [];

    if (minNum > maxNum) {
      toast.error('Min cannot be greater than Max');
      return;
    }

    for (let i = 0; i < numCount; i++) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      newResults.push(random);
    }

    setResults(newResults);
    toast.success(`Generated ${numCount} number${numCount > 1 ? 's' : ''}`);
  };

  const copyToClipboard = () => {
    if (results.length === 0) return;
    const text = results.join(', ');
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const reset = () => {
    setMin('1');
    setMax('100');
    setCount('1');
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Random Number Generator</h2>
            <p className="text-sm text-neutral-400 mt-1">Generate one or multiple random numbers</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Hash className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Minimum</label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Maximum</label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
                placeholder="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">How many numbers?</label>
            <div className="relative">
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                min="1"
                max="100"
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
                placeholder="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">Max: 100</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
           <Button onClick={generate} className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg shadow-lg shadow-emerald-500/20">
             <Sparkles className="w-5 h-5 mr-2" />
             Generate Numbers
           </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-emerald-500/60 uppercase tracking-widest">Results</h3>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl">
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {results.map((num, idx) => (
              <div 
                key={idx} 
                className="px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-mono text-2xl font-bold transition-all hover:scale-110 hover:border-emerald-500/40"
              >
                {num}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={reset} className="rounded-2xl border-white/10 hover:bg-white/5 h-12 text-neutral-400">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All
        </Button>
      </div>
    </div>
  );
}
