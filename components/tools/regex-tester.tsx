'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Search, Sparkles, RotateCcw, AlertTriangle, CheckCircle2, FlaskConical, Braces } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<string[][]>([]);
  const [error, setError] = useState('');

  const runTest = () => {
    try {
      setError('');
      setMatches([]);
      
      if (!pattern) return;
      
      const regex = new RegExp(pattern, flags);
      const allMatches: string[][] = [];
      let match;
      
      if (flags.includes('g')) {
        let lastIndex = -1;
        while ((match = regex.exec(text)) !== null) {
          if (match.index === lastIndex) {
            regex.lastIndex++;
            continue;
          }
          lastIndex = match.index;
          allMatches.push([...match]);
        }
      } else {
        match = regex.exec(text);
        if (match) allMatches.push([...match]);
      }
      
      setMatches(allMatches);
      if (allMatches.length > 0) {
        toast.success(`Found ${allMatches.length} matches`);
      } else {
        toast.info('No matches found');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Regex Syntax Error');
    }
  };

  const handleCopy = async (val: string) => {
    const success = await copyToClipboard(val);
    if (success) toast.success('Copied to clipboard');
  };

  const toggleFlag = (f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FlaskConical className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-white tracking-tight">Regex Tester</h2>
               <p className="text-sm text-neutral-400">test your regular expressions in real-time</p>
            </div>
          </div>
          {(pattern || text) && (
            <Button 
               variant="outline" 
               onClick={() => { setPattern(''); setText(''); setMatches([]); setError(''); }}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-[1fr,auto]">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Pattern</label>
              <div className="relative group">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 font-mono">/</span>
                 <Input
                   placeholder="^([a-z0-9]+)$"
                   value={pattern}
                   onChange={(e) => setPattern(e.target.value)}
                   className="h-14 bg-white/[0.03] border-white/10 rounded-2xl pl-8 pr-12 font-mono text-emerald-400 focus:border-emerald-500/50"
                 />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 font-mono">/{flags}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Flags</label>
              <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1 h-14 items-center">
                 {['g', 'i', 'm', 's'].map((f) => (
                   <button
                     key={f}
                     onClick={() => toggleFlag(f)}
                     className={cn(
                       "w-10 h-10 flex items-center justify-center rounded-xl font-mono text-sm transition-all",
                       flags.includes(f) ? "bg-emerald-500 text-black font-bold" : "text-neutral-500 hover:bg-white/5"
                     )}
                     title={f === 'g' ? 'Global' : f === 'i' ? 'Ignore Case' : f === 'm' ? 'Multiline' : 'Singleline'}
                   >
                     {f}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Test String</label>
            <Textarea
              placeholder="Paste text to test against the pattern..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
            />
          </div>

          <Button onClick={runTest} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10 transition-all">
            Execute Pattern Check
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
             <Card className="p-4 border-red-500/20 bg-red-500/5 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0" />
                <p className="text-red-400 font-mono text-xs">{error}</p>
             </Card>
          </motion.div>
        )}

        {matches.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center gap-2 px-2">
               <CheckCircle2 size={14} className="text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60">Execution Results ({matches.length})</span>
            </div>
            <div className="grid gap-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
               {matches.map((match, idx) => (
                 <Card key={idx} className="p-5 border-white/5 bg-white/[0.02] rounded-2xl group hover:bg-white/[0.05] transition-all relative">
                    <div className="flex justify-between items-start gap-4">
                       <div className="space-y-1">
                          <code className="text-emerald-400 font-bold font-mono text-sm break-all">{match[0]}</code>
                          {match.length > 1 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                               {match.slice(1).map((g, gi) => (
                                 <div key={gi} className="px-2 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-500/60 font-mono">
                                    Group {gi + 1}: {g}
                                 </div>
                               ))}
                            </div>
                          )}
                       </div>
                       <Button variant="ghost" size="sm" onClick={() => handleCopy(match[0])} className="opacity-0 group-hover:opacity-100 transition-all text-neutral-400 hover:text-emerald-500">
                          <Copy size={16} />
                       </Button>
                    </div>
                 </Card>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
