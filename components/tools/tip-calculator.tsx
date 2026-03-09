'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('100');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');

  const bill = parseFloat(billAmount) || 0;
  const tip = (bill * (parseFloat(tipPercent) || 0)) / 100;
  const total = bill + tip;
  const perPerson = parseFloat(people) > 0 ? total / parseFloat(people) : 0;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Tip Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bill Amount ($)</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tip Percentage (%)</label>
            <div className="flex gap-2 mb-2">
              {[10, 15, 18, 20, 25].map((p) => (
                <button
                  key={p}
                  onClick={() => setTipPercent(p.toString())}
                  className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                    tipPercent === p.toString()
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Number of People</label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="1"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bill Amount:</span>
            <span className="font-medium text-foreground">${bill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tip Amount:</span>
            <span className="font-medium text-foreground">${tip.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <span className="text-lg font-semibold text-foreground">Total:</span>
            <span className="text-lg font-bold text-accent">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Per Person:</span>
            <span className="font-medium text-foreground">${perPerson.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => copyToClipboard(total.toFixed(2))} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy Total
        </Button>
        <Button onClick={() => { setBillAmount('100'); setTipPercent('15'); setPeople('1'); }} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
