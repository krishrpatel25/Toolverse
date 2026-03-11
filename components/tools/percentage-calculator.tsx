'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Percent, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type CalculationType = 'percentage' | 'value' | 'change' | 'reverse';

const CURRENCIES = [
  { code: 'NONE', symbol: '', name: 'No Currency' },
  { code: 'USD', symbol: '$', name: 'USD' },
  { code: 'EUR', symbol: '€', name: 'EUR' },
  { code: 'GBP', symbol: '£', name: 'GBP' },
  { code: 'INR', symbol: '₹', name: 'INR' },
];

export function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>('value');
  const [currency, setCurrency] = useState('INR');
  const [num1, setNum1] = useState('20');
  const [num2, setNum2] = useState('1000');

  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol || '';

  const result = useMemo(() => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) return null;

    switch (calcType) {
      case 'percentage':
        return ((n1 / n2) * 100).toFixed(2) + '%';
      case 'value':
        return symbol + ((n1 / 100) * n2).toLocaleString(undefined, { minimumFractionDigits: 2 });
      case 'change':
        const change = ((n2 - n1) / n1) * 100;
        return (change > 0 ? '+' : '') + change.toFixed(2) + '%';
      case 'reverse':
        return symbol + (n1 / (n2 / 100)).toLocaleString(undefined, { minimumFractionDigits: 2 });
      default:
        return null;
    }
  }, [num1, num2, calcType, symbol]);

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.toString());
        toast.success('Copied result');
      } catch {
        toast.error('Failed to copy');
      }
    }
  };

  const reset = () => {
    setNum1('');
    setNum2('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Percentage Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Quick and accurate percentage math</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Percent className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Calculation</label>
               <Select value={calcType} onValueChange={(v) => setCalcType(v as CalculationType)}>
                  <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">What is A% of B?</SelectItem>
                    <SelectItem value="percentage">What % is A of B?</SelectItem>
                    <SelectItem value="change">What is % change from A to B?</SelectItem>
                    <SelectItem value="reverse">If A is B%, what is total?</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Currency</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.name} {curr.symbol && `(${curr.symbol})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Value A</label>
              <Input
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Value B</label>
              <Input
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
              />
            </div>
          </div>
        </div>
      </Card>

      {result && (
        <Card 
          className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] cursor-pointer group transition-all hover:bg-emerald-500/10"
          onClick={handleCopy}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-2">Calculated Result</p>
              <p className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-tighter">
                {result}
              </p>
            </div>
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Copy className="w-6 h-6" />
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={reset} className="rounded-2xl border-white/10 hover:bg-white/5 h-12">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Calc
        </Button>
      </div>
    </div>
  );
}
