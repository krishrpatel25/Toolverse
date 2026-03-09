'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type CalculationType = 'percentage' | 'value' | 'change' | 'reverse';

export function PercentageCalculator() {
  const [calcType, setCalcType] = useState<CalculationType>('percentage');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const result = useMemo(() => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) return null;

    switch (calcType) {
      case 'percentage':
        // What percentage is n1 of n2?
        return ((n1 / n2) * 100).toFixed(2);
      case 'value':
        // What is n1% of n2?
        return ((n1 / 100) * n2).toFixed(2);
      case 'change':
        // Percentage change from n1 to n2
        return (((n2 - n1) / n1) * 100).toFixed(2);
      case 'reverse':
        // If n1 is n2%, what is the original value?
        return (n1 / (n2 / 100)).toFixed(2);
      default:
        return null;
    }
  }, [num1, num2, calcType]);

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        toast.success('Copied to clipboard');
      } catch {
        toast.error('Failed to copy');
      }
    }
  };

  const getLabel = () => {
    switch (calcType) {
      case 'percentage':
        return `What percentage is ${num1 || '?'} of ${num2 || '?'}?`;
      case 'value':
        return `What is ${num1 || '?'}% of ${num2 || '?'}?`;
      case 'change':
        return `What is the percentage change from ${num1 || '?'} to ${num2 || '?'}?`;
      case 'reverse':
        return `If ${num1 || '?'} is ${num2 || '?'}%, what is the original value?`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-medium">Calculation Type</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: 'What % is A of B', value: 'percentage' },
            { label: 'What is A% of B', value: 'value' },
            { label: 'Change from A to B', value: 'change' },
            { label: 'If A is B%, find original', value: 'reverse' },
          ].map((opt) => (
            <Button
              key={opt.value}
              variant={calcType === opt.value ? 'default' : 'outline'}
              onClick={() => setCalcType(opt.value as CalculationType)}
              className="justify-start text-left h-auto py-2"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {calcType === 'percentage' ? 'First Number' : calcType === 'value' ? 'Percentage' : calcType === 'change' ? 'Starting Value' : 'Number'}
          </label>
          <Input
            type="number"
            placeholder="0"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="py-6 text-base"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {calcType === 'percentage' ? 'Second Number' : calcType === 'value' ? 'Of Value' : calcType === 'change' ? 'Ending Value' : 'Percentage'}
          </label>
          <Input
            type="number"
            placeholder="0"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="py-6 text-base"
          />
        </div>
      </div>

      <Card className="border border-border bg-secondary/30 p-4">
        <p className="text-sm text-muted-foreground mb-3">{getLabel()}</p>
      </Card>

      {result !== null && (
        <Card
          className="border border-border bg-secondary/30 p-6 cursor-pointer hover:border-accent transition-colors"
          onClick={handleCopy}
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Result</p>
              <p className="text-4xl font-bold text-foreground">{result}</p>
            </div>
            <Copy className="h-6 w-6 text-muted-foreground" />
          </div>
        </Card>
      )}

      {result !== null && (
        <Button onClick={handleCopy} className="w-full">
          <Copy className="mr-2 h-4 w-4" />
          Copy Result
        </Button>
      )}
    </div>
  );
}
