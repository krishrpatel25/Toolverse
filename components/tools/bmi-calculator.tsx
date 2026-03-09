'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');

  const calculateBMI = () => {
    let bmi = 0;
    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height);
      if (w > 0 && h > 0) {
        bmi = w / (h * h);
      }
    } else {
      const w = parseFloat(weight);
      const ft = parseFloat(heightFt);
      const ins = parseFloat(heightIn);
      const totalInches = ft * 12 + ins;
      if (w > 0 && totalInches > 0) {
        bmi = (w / (totalInches * totalInches)) * 703;
      }
    }
    return bmi;
  };

  const bmi = calculateBMI();

  const getCategory = (bmi: number) => {
    if (bmi === 0) return { label: 'Enter values', color: 'text-muted-foreground' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  const category = getCategory(bmi);

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setHeightFt('');
    setHeightIn('');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Unit System</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { value: 'metric', label: 'Metric (kg, m)' },
            { value: 'imperial', label: 'Imperial (lbs, ft/in)' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setUnit(opt.value as typeof unit)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                unit === opt.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-secondary hover:border-accent/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <Input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
          />
        </div>

        {unit === 'metric' ? (
          <div>
            <label className="text-sm font-medium mb-2 block">Height (meters)</label>
            <Input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              step="0.01"
            />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Feet</label>
              <Input
                type="number"
                placeholder="Feet"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Inches</label>
              <Input
                type="number"
                placeholder="Inches"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {bmi > 0 && (
        <Card className="border border-border bg-secondary p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
          <p className="text-4xl font-bold text-foreground mb-2">{bmi.toFixed(1)}</p>
          <p className={`text-lg font-semibold ${category.color}`}>{category.label}</p>
        </Card>
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
