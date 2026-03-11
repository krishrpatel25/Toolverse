'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RotateCcw, Tag } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'JPY', symbol: '¥' },
];

export function DiscountCalculator() {
  const [currency, setCurrency] = useState('INR');
  const [originalPrice, setOriginalPrice] = useState('1000');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [discountAmount, setDiscountAmount] = useState('200');
  const [usePercent, setUsePercent] = useState(true);

  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol || '$';

  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    let discount = 0;
    
    if (usePercent) {
      discount = (price * (parseFloat(discountPercent) || 0)) / 100;
    } else {
      discount = parseFloat(discountAmount) || 0;
    }
    
    return { discount, finalPrice: price - discount };
  };

  const { discount, finalPrice } = calculate();
  const actualPercent = originalPrice && parseFloat(originalPrice) !== 0 
    ? ((discount / parseFloat(originalPrice)) * 100).toFixed(0) 
    : 0;

  const reset = () => {
    setOriginalPrice('');
    setDiscountPercent('20');
    setDiscountAmount('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Discount Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Calculate final price and savings</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Tag className="w-6 h-6 text-emerald-400" />
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
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Original Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-mono">{symbol}</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="pl-10 h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Discount (%)</label>
                <div className={`h-2 w-2 rounded-full ${usePercent ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-800'}`} />
              </div>
              <Input
                type="number"
                value={discountPercent}
                onChange={(e) => {
                  setDiscountPercent(e.target.value);
                  setUsePercent(true);
                }}
                className={`h-14 bg-white/[0.03] border-white/10 rounded-2xl transition-all ${usePercent ? 'border-emerald-500/50' : 'opacity-40'}`}
                placeholder="0"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Discount Amount</label>
                <div className={`h-2 w-2 rounded-full ${!usePercent ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-800'}`} />
              </div>
              <div className="relative">
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-mono transition-all ${!usePercent ? 'text-emerald-500' : 'text-neutral-500'}`}>{symbol}</span>
                <Input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                    setUsePercent(false);
                  }}
                  className={`pl-10 h-14 bg-white/[0.03] border-white/10 rounded-2xl transition-all ${!usePercent ? 'border-emerald-500/50' : 'opacity-40'}`}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">You Save</p>
          <p className="text-3xl font-bold text-white tracking-tighter">{symbol}{discount.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 mt-1">(-{actualPercent}%)</p>
        </Card>
        
        <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] sm:col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-2">Final Price</p>
              <p className="text-4xl font-bold text-emerald-400 tracking-tighter">
                {symbol}{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="hidden sm:block opacity-20">
               <Tag size={60} className="text-emerald-400" />
            </div>
          </div>
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
