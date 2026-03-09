'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [type, setType] = useState<'month' | 'year'>('year');

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
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Loan Amount ($)</label>
          <Input
            type="number"
            placeholder="Enter loan amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            step="1000"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Annual Interest Rate (%)</label>
          <Input
            type="number"
            placeholder="Enter interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.1"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Loan Term</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-1">
              {['year', 'month'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as typeof type)}
                  className={`px-4 py-2 rounded border-2 transition-all text-sm font-medium ${
                    type === t
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-secondary hover:border-accent/50'
                  }`}
                >
                  {t === 'year' ? 'Years' : 'Months'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-3xl font-bold text-foreground">${result.monthlyPayment.toFixed(2)}</p>
          </Card>
          <Card className="border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
            <p className="text-3xl font-bold text-foreground">${result.totalPayment.toFixed(2)}</p>
          </Card>
          <Card className="border border-accent bg-accent/10 p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
            <p className="text-3xl font-bold text-accent">${result.totalInterest.toFixed(2)}</p>
          </Card>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
