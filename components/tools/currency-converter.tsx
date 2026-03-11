'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, TrendingUp } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
];

const BASE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.21,
  AED: 3.67,
  SAR: 3.75,
  SGD: 1.35,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  const convertedAmount = useMemo(() => {
    const value = parseFloat(amount) || 0;
    const fromRate = BASE_RATES[fromCurrency];
    const toRate = BASE_RATES[toCurrency];
    
    // Convert to USD first, then to target
    const inUSD = value / fromRate;
    return (inUSD * toRate).toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Currency Converter</h2>
            <p className="text-sm text-neutral-400 mt-1">Real-time approximate market rates</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-mono">
                {CURRENCIES.find(c => c.code === fromCurrency)?.symbol}
              </span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium focus:ring-emerald-500/20"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-neutral-500">{curr.code}</span>
                        <span>{curr.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSwap}
              className="h-14 w-14 rounded-2xl bg-white/[0.03] border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-400 transition-all md:mb-0 mb-4"
            >
              <ArrowRightLeft className="w-5 h-5 rotate-90 md:rotate-0" />
            </Button>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-neutral-500">{curr.code}</span>
                        <span>{curr.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <TrendingUp size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">Converted Amount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                {convertedAmount}
              </span>
              <span className="text-xl font-medium text-emerald-400">
                {toCurrency}
              </span>
            </div>
          </div>
          
          <div className="text-left md:text-right space-y-1">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em]">Exchange Rate</p>
            <p className="text-sm text-neutral-400 font-mono">
              1 {fromCurrency} = {(parseFloat(convertedAmount) / (parseFloat(amount) || 1)).toFixed(4)} {toCurrency}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
