'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, RotateCcw, Eye, EyeOff, ShieldCheck, Sparkles, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = () => {
    let chars = '';
    if (includeLowercase) chars += LOWERCASE;
    if (includeUppercase) chars += UPPERCASE;
    if (includeNumbers) chars += NUMBERS;
    if (includeSymbols) chars += SYMBOLS;

    if (!chars) {
      toast.error('Select at least one character type');
      return;
    }

    const len = Math.min(Math.max(length || 4, 4), 128);
    let password = '';

    for (let i = 0; i < len; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPasswords([password, ...passwords.slice(0, 4)]);
    toast.success('Generated Secure Password');
  };

  const handleCopy = async (password: string) => {
    const success = await copyToClipboard(password);
    if (success) {
      toast.success('Copied to clipboard');
    }
  };

  const calculateStrength = (pwd: string): { strength: string; color: string; score: number } => {
    let score = 0;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 20) score++;

    if (score < 3) return { strength: 'Weak', color: 'text-red-400', score: 1 };
    if (score < 5) return { strength: 'Good', color: 'text-yellow-400', score: 2 };
    return { strength: 'Excellent', color: 'text-emerald-400', score: 3 };
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Password Generator</h2>
              <p className="text-sm text-neutral-400">Generate uncrackable secure passwords</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="space-y-4">
             <div className="flex justify-between items-end px-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Password Length</label>
                <span className="text-2xl font-black text-white">{length}</span>
             </div>
             <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
             />
             <div className="flex justify-between text-[10px] text-neutral-600 font-bold uppercase px-1">
               <span>4 Bits</span>
               <span>64 Bits</span>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lowercase', sub: 'a-z', active: includeLowercase, set: setIncludeLowercase },
              { label: 'Uppercase', sub: 'A-Z', active: includeUppercase, set: setIncludeUppercase },
              { label: 'Numbers', sub: '0-9', active: includeNumbers, set: setIncludeNumbers },
              { label: 'Symbols', sub: '!@#', active: includeSymbols, set: setIncludeSymbols },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => opt.set(!opt.active)}
                className={`p-4 rounded-[1.5rem] border transition-all text-left ${
                  opt.active 
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' 
                    : 'border-white/5 bg-white/[0.02] text-neutral-500 hover:border-white/10'
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">{opt.label}</p>
                <p className="text-xs font-mono opacity-60">{opt.sub}</p>
              </button>
            ))}
          </div>

          <Button 
            onClick={generate} 
            className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Strong Password
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {passwords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Recent Generations</h3>
               <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
               >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? 'Hide' : 'Reveal'}
               </button>
            </div>
            
            <div className="grid gap-3">
              {passwords.map((pwd, idx) => {
                const { strength, color, score } = calculateStrength(pwd);
                return (
                  <Card 
                    key={idx} 
                    className={cn(
                      "p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-white/10",
                      idx === 0 && "ring-1 ring-emerald-500/20"
                    )}
                  >
                    <div className="flex-1 w-full overflow-hidden">
                       <p className="font-mono text-xl text-white break-all tracking-wider mb-2">
                         {showPassword ? pwd : '•'.repeat(pwd.length)}
                       </p>
                       <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                             {[1, 2, 3].map((s) => (
                               <div key={s} className={cn("h-1 w-6 rounded-full", s <= score ? color.replace('text', 'bg').replace('-400', '-500/40') : 'bg-white/5')} />
                             ))}
                          </div>
                          <span className={cn("text-[10px] font-black uppercase tracking-widest", color)}>{strength}</span>
                       </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                       <Button 
                          variant="outline" 
                          onClick={() => handleCopy(pwd)}
                          className="rounded-xl border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400 h-12 px-6"
                       >
                          <Copy size={16} className="mr-2" />
                          Copy
                       </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
               <Button variant="ghost" onClick={() => setPasswords([])} className="text-neutral-500 hover:text-white rounded-xl">
                 <RotateCcw size={14} className="mr-2" />
                 Clear History
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
