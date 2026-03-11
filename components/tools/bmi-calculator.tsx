'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Activity } from 'lucide-react';

export function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('1.75');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const bmi = useMemo(() => {
    let value = 0;
    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height);
      if (w > 0 && h > 0) {
        value = w / (h * h);
      }
    } else {
      const w = parseFloat(weight);
      const ft = parseFloat(heightFt);
      const ins = parseFloat(heightIn);
      const totalInches = ft * 12 + ins;
      if (w > 0 && totalInches > 0) {
        value = (w / (totalInches * totalInches)) * 703;
      }
    }
    return value;
  }, [unit, weight, height, heightFt, heightIn]);

  const category = useMemo(() => {
    if (bmi === 0) return { label: 'Enter values', color: 'text-neutral-500', bg: 'bg-neutral-500/10', border: 'border-neutral-500/20' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20' };
    if (bmi < 25) return { label: 'Normal Weight', color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20' };
    return { label: 'Obese', color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' };
  }, [bmi]);

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setHeightFt('');
    setHeightIn('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">BMI Calculator</h2>
            <p className="text-sm text-neutral-400 mt-1">Calculate your Body Mass Index</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Unit System</label>
            <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
              {[
                { value: 'metric', label: 'Metric (kg, m)' },
                { value: 'imperial', label: 'Imperial (lbs, ft)' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setUnit(opt.value as typeof unit)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    unit === opt.value
                      ? 'bg-emerald-500 text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <Input
                type="number"
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
              />
            </div>

            {unit === 'metric' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Height (meters)</label>
                <Input
                  type="number"
                  placeholder="1.75"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Feet</label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Inches</label>
                  <Input
                    type="number"
                    placeholder="9"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {bmi > 0 && (
        <Card className={`p-8 rounded-[2rem] border transition-all ${category.bg} ${category.border}`}>
          <div className="text-center">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Your Body Mass Index</p>
            <p className="text-6xl font-bold text-white tracking-tighter mb-2">{bmi.toFixed(1)}</p>
            <p className={`text-xl font-bold ${category.color} tracking-tight`}>{category.label}</p>
          </div>
          
          <div className="mt-8 grid grid-cols-4 h-2 rounded-full overflow-hidden bg-white/5 border border-white/10">
            <div className={`h-full bg-blue-500/50 ${bmi < 18.5 ? 'ring-2 ring-white scale-y-150' : ''}`} />
            <div className={`h-full bg-emerald-500/50 ${bmi >= 18.5 && bmi < 25 ? 'ring-2 ring-white scale-y-150' : ''}`} />
            <div className={`h-full bg-yellow-500/50 ${bmi >= 25 && bmi < 30 ? 'ring-2 ring-white scale-y-150' : ''}`} />
            <div className={`h-full bg-red-500/50 ${bmi >= 30 ? 'ring-2 ring-white scale-y-150' : ''}`} />
          </div>
          <div className="flex justify-between mt-2 px-1">
             <span className="text-[10px] text-neutral-500 font-bold uppercase">Under</span>
             <span className="text-[10px] text-neutral-500 font-bold uppercase">Normal</span>
             <span className="text-[10px] text-neutral-500 font-bold uppercase">Over</span>
             <span className="text-[10px] text-neutral-500 font-bold uppercase">Obese</span>
          </div>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleReset} className="rounded-2xl border-white/10 hover:bg-white/5 h-12">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Calc
        </Button>
      </div>
    </div>
  );
}
