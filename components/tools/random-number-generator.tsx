'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function RandomNumberGenerator() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState<number | null>(null);
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min) || 0;
    const maxNum = parseInt(max) || 100;
    const numCount = parseInt(count) || 1;
    const newResults: number[] = [];

    for (let i = 0; i < numCount; i++) {
      const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      newResults.push(random);
    }

    setResults(newResults);
    setResult(newResults[0] || null);
  };

  const copyToClipboard = () => {
    const text = results.join(', ');
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Random Number Generator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </Card>

      {result !== null && (
        <Card className="p-6 bg-accent/10 border-accent">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Generated Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {results.map((num, idx) => (
              <div key={idx} className="px-4 py-2 bg-secondary rounded-lg text-foreground font-mono font-bold">
                {num}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1">
          Generate
        </Button>
        <Button onClick={copyToClipboard} variant="outline" disabled={!result} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}
