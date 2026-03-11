'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Wallet } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'JPY', symbol: '¥' },
];

export function LoanCalculator() {
  const [currency, setCurrency] = useState('INR');
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [term, setTerm] = useState('5');
  const [type, setType] = useState<'month' | 'year'>('year');

  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(term);
    
    if (!p || !r || !t) return null;
    
    const monthlyRate = r / 100 / 12;
    const numberOfPayments = type === 'year' ? t * 12 : t;
    
    if (monthlyRate === 0) {
      return {
        monthlyPayment: p / numberOfPayments,
        totalPayment: p,
        totalInterest: 0,
      };
    }
    
    const monthlyPayment = (p * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - p;
    
    return { monthlyPayment, totalPayment, totalInterest };
  };

  const result = calculate();

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTerm('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Loan Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Calculate EMI, interest, and total cost</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Wallet className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Currency</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code} ({curr.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-mono">{symbol}</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="pl-10 h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Interest Rate (%)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Loan Term</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl flex-1"
                />
                <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
                  {['year', 'month'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t as typeof type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        type === t
                          ? 'bg-emerald-500 text-black'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t === 'year' ? 'Yrs' : 'Mos'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Monthly EMI</p>
            <p className="text-3xl font-bold text-white tracking-tighter">{symbol}{result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </Card>
          <Card className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Payable</p>
            <p className="text-3xl font-bold text-white tracking-tighter">{symbol}{result.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </Card>
          <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
            <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-2">Total Interest</p>
            <p className="text-3xl font-bold text-emerald-400 tracking-tighter">{symbol}{result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </Card>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleReset} className="rounded-2xl border-white/10 hover:bg-white/5 h-12">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Calculator
        </Button>
      </div>
    </div>
  );
}
