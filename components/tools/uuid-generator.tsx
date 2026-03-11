'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, KeyRound, Sparkles, Hash, List, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function UUIDGenerator() {
  const [count, setCount] = useState('5');
  const [uuids, setUuids] = useState<string[]>([]);
  const [separator, setSeparator] = useState<'none' | 'newline' | 'comma'>('newline');

  const handleGenerate = () => {
    const num = Math.min(Math.max(parseInt(count) || 1, 1), 100);
    const generated = Array.from({ length: num }, () => generateUUIDv4());
    setUuids(generated);
    toast.success(`Generated ${num} UUIDs`);
  };

  const handleCopyAll = async () => {
    const text = separator === 'newline' 
      ? uuids.join('\n')
      : separator === 'comma'
      ? uuids.join(', ')
      : uuids.join('');
    
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('All UUIDs copied');
    }
  };

  const handleCopyOne = async (uuid: string) => {
    const success = await copyToClipboard(uuid);
    if (success) {
      toast.success('UUID copied');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <KeyRound className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">UUID V4 Generator</h2>
              <p className="text-sm text-neutral-400">Generate unique cryptographical identifiers</p>
            </div>
          </div>
          {uuids.length > 0 && (
            <Button 
               variant="outline" 
               onClick={() => { setUuids([]); setCount('5'); }}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 mb-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Quantity (Max 100)</label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-bold text-white font-mono transition-all focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Output Separator</label>
            <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
              {[
                { label: 'None', value: 'none' },
                { label: 'Newline', value: 'newline' },
                { label: 'Comma', value: 'comma' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSeparator(opt.value as typeof separator)}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                    separator === opt.value ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10" : "text-neutral-500 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleGenerate} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Unique IDs
        </Button>
      </Card>

      <AnimatePresence>
        {uuids.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-2">
                  <List size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Generated Results</span>
               </div>
               <Button size="sm" onClick={handleCopyAll} className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/10 rounded-xl h-10">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Copy All
               </Button>
            </div>

            <Card className="border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem] overflow-hidden">
               <div className="max-h-[400px] overflow-y-auto scrollbar-hide p-4 space-y-2">
                  {uuids.map((uuid, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all">
                       <code className="font-mono text-sm text-neutral-300 break-all">{uuid}</code>
                       <Button variant="ghost" size="sm" onClick={() => handleCopyOne(uuid)} className="opacity-0 group-hover:opacity-100 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all">
                          <Copy size={16} />
                       </Button>
                    </div>
                  ))}
               </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
