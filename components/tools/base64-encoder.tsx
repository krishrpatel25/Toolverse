'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, Lock, Unlock, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    if (!input.trim()) return;
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      toast.success('Encoded to Base64');
    } catch {
      toast.error('Encoding failed');
    }
  };

  const handleDecode = () => {
    if (!input.trim()) return;
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      toast.success('Decoded from Base64');
    } catch {
      toast.error('Invalid Base64 string');
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
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
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Base64 Converter</h2>
              <p className="text-sm text-neutral-400">Encode or decode strings instantly</p>
            </div>
          </div>
          {(input || output) && (
            <Button 
               variant="outline" 
               onClick={() => { setInput(''); setOutput(''); }}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Source Text</label>
            <Textarea
              placeholder="Paste text or Base64 here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[250px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
            />
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 px-1">Result</label>
             <Card className="min-h-[250px] bg-black/40 border-white/5 rounded-2xl p-6 relative group overflow-hidden border-dashed">
                <div className="font-mono text-sm text-neutral-300 break-all whitespace-pre-wrap leading-relaxed h-full">
                   {output || <span className="text-neutral-700 italic">Example: SGVsbG8gV29ybGQh</span>}
                </div>
                {output && (
                   <Button 
                      onClick={handleCopy}
                      size="sm"
                      className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <Copy size={14} className="mr-2" />
                      Copy
                   </Button>
                )}
             </Card>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
           <Button 
             onClick={handleEncode}
             disabled={!input.trim()}
             className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10"
           >
             <Lock size={18} className="mr-2" />
             Encode
           </Button>
           <Button 
             variant="outline"
             onClick={handleDecode}
             disabled={!input.trim()}
             className="flex-1 h-14 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-500/10"
           >
             <Unlock size={18} className="mr-2" />
             Decode
           </Button>
        </div>
      </Card>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Secure local processing. Supports Unicode characters.
        </p>
      </Card>
    </div>
  );
}
