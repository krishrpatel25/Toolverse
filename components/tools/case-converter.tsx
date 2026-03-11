'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, CaseSensitive, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type CaseType = 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase' | 'camelcase' | 'snakecase' | 'kebabcase';

export function CaseConverter() {
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('uppercase');

  const convertCase = (text: string, type: CaseType): string => {
    if (!text) return '';
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'titlecase':
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'sentencecase':
        return text.toLowerCase().replace(/(^\s*\w|[\\.!?]\s*\w)/g, char => char.toUpperCase());
      case 'camelcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      case 'snakecase':
        return text
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      case 'kebabcase':
        return text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
      default:
        return text;
    }
  };

  const output = useMemo(() => convertCase(input, selectedCase), [input, selectedCase]);

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      toast.success('Converted text copied');
    }
  };

  const caseOptions: { label: string; value: CaseType; example: string }[] = [
    { label: 'UPPERCASE', value: 'uppercase', example: 'TEXT' },
    { label: 'lowercase', value: 'lowercase', example: 'text' },
    { label: 'Title Case', value: 'titlecase', example: 'Text' },
    { label: 'Sentence case', value: 'sentencecase', example: 'Text.' },
    { label: 'camelCase', value: 'camelcase', example: 'text' },
    { label: 'snake_case', value: 'snakecase', example: 'text' },
    { label: 'kebab-case', value: 'kebabcase', example: 'text' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <CaseSensitive className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Case Converter</h2>
              <p className="text-sm text-neutral-400">Instantly transform text formatting</p>
            </div>
          </div>
          {input && (
            <Button 
               variant="outline" 
               onClick={() => setInput('')}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Clear
            </Button>
          )}
        </div>

        <Textarea
          placeholder="Enter text to convert..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[180px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none mb-8"
        />

        <div className="space-y-4">
           <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-2">
             <Wand2 size={12} className="text-emerald-400" />
             Convert To
           </label>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {caseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCase(option.value)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-xs font-bold transition-all border",
                    selectedCase === option.value 
                      ? "bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/10" 
                      : "border-white/5 bg-white/[0.02] text-neutral-500 hover:border-white/10"
                  )}
                >
                  {option.label}
                </button>
              ))}
           </div>
        </div>
      </Card>

      {output && (
        <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] group relative overflow-hidden transition-all hover:bg-emerald-500/[0.08]">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full overflow-hidden">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 mb-4">Converted Output</h3>
               <div className="font-mono text-lg text-white break-words whitespace-pre-wrap leading-relaxed">
                 {output}
               </div>
            </div>
            <Button 
               onClick={handleCopy}
               className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-2xl h-14 shadow-lg shadow-emerald-500/10 shrink-0"
            >
               <Copy size={20} className="mr-2" />
               Copy Text
            </Button>
          </div>
          
          <div className="absolute -right-8 -bottom-8 text-emerald-500 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
             <CaseSensitive size={160} />
          </div>
        </Card>
      )}

      {!output && (
        <Card className="p-6 bg-white/[0.02] border-white/5 rounded-[2rem] text-center border-dashed">
          <p className="text-sm text-neutral-600 italic">Example text will transform here magically... ✨</p>
        </Card>
      )}
    </div>
  );
}
