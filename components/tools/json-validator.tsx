'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ClipboardCheck, RotateCcw, CheckCircle2, AlertCircle, Braces, Sparkles, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function JSONValidator() {
  const [json, setJson] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message: string; details?: any } | null>(null);

  const validate = () => {
    if (!json.trim()) return;
    try {
      const parsed = JSON.parse(json);
      setResult({ valid: true, message: 'Valid JSON Object', details: parsed });
      toast.success('JSON is valid');
    } catch (error: any) {
      setResult({ valid: false, message: error.message });
      toast.error('Invalid JSON structure');
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(json);
    if (success) {
      toast.success('JSON copied');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Braces className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">JSON Validator</h2>
              <p className="text-sm text-neutral-400">Validate and check your JSON syntax</p>
            </div>
          </div>
          {json && (
            <div className="flex gap-2">
               <Button 
                  variant="outline" 
                  onClick={() => { setJson(''); setResult(null); }}
                  className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
               >
                 <RotateCcw size={16} className="mr-2" />
                 Clear
               </Button>
               <Button 
                  onClick={handleCopy}
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl h-10"
               >
                  <Copy size={16} className="mr-2" />
                  Copy
               </Button>
            </div>
          )}
        </div>

        <Textarea
          placeholder="Paste your JSON here to validate..."
          value={json}
          onChange={(e) => {
             setJson(e.target.value);
             if (result) setResult(null);
          }}
          className="min-h-[300px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none mb-6"
        />

        <Button 
           onClick={validate} 
           className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10"
        >
           <ClipboardCheck size={20} className="mr-2" />
           Validate JSON
        </Button>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className={cn(
               "p-6 rounded-[2rem] border-2 transition-all",
               result.valid 
                 ? "bg-emerald-500/10 border-emerald-500/20" 
                 : "bg-red-500/10 border-red-500/20"
            )}>
              <div className="flex items-start gap-4">
                 <div className={cn(
                    "p-3 rounded-2xl",
                    result.valid ? "bg-emerald-500/20" : "bg-red-500/20"
                 )}>
                    {result.valid ? (
                       <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                       <AlertCircle className="w-6 h-6 text-red-400" />
                    )}
                 </div>
                 <div className="flex-1">
                    <h3 className={cn(
                       "text-lg font-bold mb-1",
                       result.valid ? "text-emerald-400" : "text-red-400"
                    )}>
                       {result.valid ? "Structure Validated" : "Syntax Error Detected"}
                    </h3>
                    <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                       {result.message}
                    </p>
                 </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-6 bg-white/[0.02] border-white/5 rounded-[2rem]">
        <p className="text-sm text-neutral-500 flex items-center gap-2">
          <span className="p-1 bg-white/10 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Tip: Use the JSON Formatter for advanced editing and beautification.
        </p>
      </Card>
    </div>
  );
}
