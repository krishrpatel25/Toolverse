'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, ShieldCheck, Lock, Sparkles, AlertTriangle, RotateCcw, ShieldAlert, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function PasswordStrength() {
  const [password, setPassword] = useState('');

  const analysis = useMemo(() => {
    const checks = {
      length: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  }, [password]);

  const strength = useMemo(() => {
    if (password.length === 0) return { label: 'Awaiting Input', color: 'text-neutral-500', bg: 'bg-neutral-500/10' };
    if (analysis.score <= 1) return { label: 'Critical Risk', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (analysis.score === 2) return { label: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500/10' };
    if (analysis.score === 3) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    if (analysis.score === 4) return { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    return { label: 'Elite Secure', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  }, [analysis.score, password.length]);

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Security Audit</h2>
              <p className="text-sm text-neutral-400">Deep password entropy and vulnerability check</p>
            </div>
          </div>
          {password && (
            <Button 
               variant="outline" 
               onClick={() => setPassword('')}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          )}
        </div>

        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Candidate Secret</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 w-5 h-5" />
                 <Input
                    type="text"
                    placeholder="Type or paste password to analyze..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl pl-12 pr-6 font-mono text-white focus:border-emerald-500/50"
                 />
              </div>
           </div>

           <AnimatePresence>
              {password.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 overflow-hidden">
                   <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="h-2 rounded-full overflow-hidden bg-white/5 relative">
                           <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: s <= analysis.score ? '100%' : '0%' }}
                              className={cn("h-full transition-colors", strength.bg.replace('/10', '').replace('/20', ''))} 
                           />
                        </div>
                      ))}
                   </div>
                   
                   <div className="flex items-center justify-between px-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Security Rating</span>
                       <span className={cn("text-xs font-bold px-3 py-1 rounded-full border border-current", strength.color, strength.bg)}>
                          {strength.label}
                       </span>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
         {Object.entries({
           "Minimum 10 characters": analysis.checks.length,
           "Uppercase characters": analysis.checks.uppercase,
           "Lowercase characters": analysis.checks.lowercase,
           "Numerical digits": analysis.checks.numbers,
           "Special symbols": analysis.checks.special
         }).map(([label, active]) => (
           <Card key={label} className={cn(
             "p-5 rounded-3xl border transition-all duration-300",
             active ? "bg-emerald-500/5 border-emerald-500/20" : "bg-neutral-900/30 border-white/5 opacity-50"
           )}>
             <div className="flex items-center justify-between">
                <span className={cn("text-xs font-bold", active ? "text-emerald-400" : "text-neutral-500")}>{label}</span>
                {active ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-neutral-600" />}
             </div>
           </Card>
         ))}
      </div>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Entropy calculated locally. Your potential secrets never leave this browser tab.
        </p>
      </Card>
    </div>
  );
}
