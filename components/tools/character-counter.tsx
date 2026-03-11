'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Copy, Type, Hash, FileText, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';

export function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const bytes = new Blob([text]).size;
    
    return { characters, charactersNoSpaces, bytes };
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
    { label: 'Characters', value: stats.characters, icon: Type, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'No Spaces', value: stats.charactersNoSpaces, icon: Hash, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Bytes (Size)', value: stats.bytes, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Type className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Character Counter</h2>
              <p className="text-sm text-neutral-400">Instantly count characters and file size</p>
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
          placeholder="Paste your text here to count..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[250px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
        />
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
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
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <Copy size={12} className="text-neutral-500" />
                </div>
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
          Accuracy verified. Click cards to copy values.
        </p>
      </Card>
    </div>
  );
}
