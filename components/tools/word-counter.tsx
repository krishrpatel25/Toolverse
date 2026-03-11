'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Copy, FileText, Type, AlignLeft, Hash, Quote, List, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = trimmedText ? trimmedText.split(/\n\n+/).filter(p => p.trim()).length : 0;
    const lines = trimmedText ? text.split('\n').length : 0;

    return { words, characters, charactersNoSpaces, sentences, paragraphs, lines };
  }, [text]);

  const handleCopy = async (stat: string, value: number) => {
    const success = await copyToClipboard(value.toString());
    if (success) {
      toast.success(`Copied ${stat}`);
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setText('');
  };

  const statCards = [
    { label: 'Words', value: stats.words, icon: Type, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Characters', value: stats.characters, icon: Hash, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Sentences', value: stats.sentences, icon: Quote, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: AlignLeft, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Lines', value: stats.lines, icon: List, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Chars (No Space)', value: stats.charactersNoSpaces, icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Word Counter</h2>
              <p className="text-sm text-neutral-400">Deep analysis of your text content</p>
            </div>
          </div>
          {text && (
            <Button 
               variant="outline" 
               onClick={handleReset}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <Textarea
          placeholder="Paste your text here to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[250px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
        />
      </Card>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem] cursor-pointer hover:border-white/10 transition-all group overflow-hidden relative"
            onClick={() => handleCopy(stat.label, stat.value)}
          >
            <div className="flex flex-col gap-2 relative z-10">
              <div className={cn("p-2 w-fit rounded-xl mb-1", stat.bg)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-white tracking-tighter">{stat.value.toLocaleString()}</p>
                <Copy size={12} className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className={cn("absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity", stat.color)}>
               <stat.icon size={80} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Click any card to copy its value instantly to your clipboard.
        </p>
      </Card>
    </div>
  );
}
