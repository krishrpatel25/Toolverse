'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Sparkles, Hash as HashIcon, RotateCcw, ShieldCheck, Fingerprint, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Browser-safe hash using Web Crypto API for SHA and lightweight polyfill/logic for MD5 if needed
// For simplicity and speed in a modern browser context, we can use a small library or standard Crypto
async function computeHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  if (algorithm === 'md5') {
    // Note: Web Crypto doesn't support MD5. For a real app, use crypto-js or similar.
    // For this demonstration, we'll focus on SHA family which is natively supported.
    return 'MD5 not supported in browser native crypto';
  }

  const hashBuffer = await crypto.subtle.digest(algorithm.toUpperCase().replace('SHA', 'SHA-'), data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    try {
      const results: Record<string, string> = {};
      results.sha1 = await computeHash(input, 'sha1');
      results.sha256 = await computeHash(input, 'sha256');
      results.sha384 = await computeHash(input, 'sha384');
      results.sha512 = await computeHash(input, 'sha512');
      
      setHashes(results);
      toast.success('Hashes generated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Encryption pipeline failure');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) toast.success('Hash copied');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Fingerprint className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Encryption Hash Generator</h2>
              <p className="text-sm text-neutral-400">Secure cryptographic signatures for your data</p>
            </div>
          </div>
          {input && (
             <Button 
               variant="outline" 
               onClick={() => { setInput(''); setHashes({}); }}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
             >
               <RotateCcw size={16} className="mr-2" />
               Reset
             </Button>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Raw Input Data</label>
             <Textarea
               placeholder="Enter text string to generate signatures..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="min-h-[120px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
             />
          </div>

          <Button 
            onClick={generate} 
            disabled={isGenerating || !input.trim()}
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10 disabled:opacity-50"
          >
            {isGenerating ? "Executing..." : "Generate Cryptographic Hashes"}
            {!isGenerating && <Lock size={18} className="ml-2" />}
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {Object.keys(hashes).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid gap-4"
          >
            {Object.entries(hashes).map(([algo, hash]) => (
              <Card key={algo} className="p-6 border-white/5 bg-[#080808] rounded-[2rem] group hover:border-emerald-500/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{algo.toUpperCase()} signature</span>
                    </div>
                    <p className="text-xs font-mono text-emerald-400 break-all p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl leading-relaxed">
                      {hash}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleCopy(hash)}
                    className="sm:w-12 h-14 bg-white/5 hover:bg-emerald-500 hover:text-black rounded-2xl transition-all border-white/5 flex-shrink-0"
                  >
                    <Copy size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Secure processing using Web Crypto API. No data is sent to any server.
        </p>
      </Card>
    </div>
  );
}
