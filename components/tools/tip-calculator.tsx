'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RotateCcw, Coins } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'JPY', symbol: '¥' },
];

export function TipCalculator() {
  const [currency, setCurrency] = useState('INR');
  const [billAmount, setBillAmount] = useState('1000');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');

  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  const bill = parseFloat(billAmount) || 0;
  const tip = (bill * (parseFloat(tipPercent) || 0)) / 100;
  const total = bill + tip;
  const numPeople = Math.max(1, parseInt(people) || 1);
  const perPerson = total / numPeople;

  const reset = () => {
    setBillAmount('');
    setTipPercent('15');
    setPeople('1');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Tip Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Split bills and calculate tips easily</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Coins className="w-6 h-6 text-emerald-400" />
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
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Bill Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-mono">{symbol}</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="pl-10 h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Tip Percentage (%)</label>
               <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
                {[10, 15, 18, 20].map((p) => (
                  <button
                    key={p}
                    onClick={() => setTipPercent(p.toString())}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                      tipPercent === p.toString()
                        ? 'bg-emerald-500 text-black'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                placeholder="Custom %"
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Split Between</label>
              <div className="relative">
                <Input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  min="1"
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                  placeholder="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">People</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Tip Amount</p>
          <p className="text-3xl font-bold text-white tracking-tighter">
            {symbol}{tip.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </Card>
        
        <Card className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Total Bill</p>
          <p className="text-3xl font-bold text-white tracking-tighter">
            {symbol}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </Card>

        <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
          <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-2">Per Person</p>
          <p className="text-3xl font-bold text-emerald-400 tracking-tighter">
            {symbol}{perPerson.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={reset} className="rounded-2xl border-white/10 hover:bg-white/5 h-12">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Calculator
        </Button>
      </div>
    </div>
  );
}
