'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft, Ruler } from 'lucide-react';

const UNIT_GROUPS = {
  length: [
    { value: 'meter', label: 'Meters', rate: 1 },
    { value: 'foot', label: 'Feet', rate: 3.28084 },
    { value: 'inch', label: 'Inches', rate: 39.3701 },
    { value: 'yard', label: 'Yards', rate: 1.09361 },
    { value: 'kilometer', label: 'Kilometers', rate: 0.001 },
    { value: 'mile', label: 'Miles', rate: 0.000621371 },
  ],
  weight: [
    { value: 'kilogram', label: 'Kilograms', rate: 1 },
    { value: 'gram', label: 'Grams', rate: 1000 },
    { value: 'pound', label: 'Pounds', rate: 2.20462 },
    { value: 'ounce', label: 'Ounces', rate: 35.274 },
  ],
};

export function UnitConverter() {
  const [group, setGroup] = useState<keyof typeof UNIT_GROUPS>('length');
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('meter');
  const [outputUnit, setOutputUnit] = useState('foot');

  const units = UNIT_GROUPS[group];

  const convertedValue = useMemo(() => {
    const value = parseFloat(inputValue) || 0;
    const fromUnit = units.find(u => u.value === inputUnit);
    const toUnit = units.find(u => u.value === outputUnit);
    
    if (!fromUnit || !toUnit) return '0';
    
    // Convert to base (rate=1) then to target
    const inBase = value / fromUnit.rate;
    return (inBase * toUnit.rate).toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [inputValue, inputUnit, outputUnit, units]);

  const handleSwap = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  const handleGroupChange = (newGroup: keyof typeof UNIT_GROUPS) => {
    setGroup(newGroup);
    setInputUnit(UNIT_GROUPS[newGroup][0].value);
    setOutputUnit(UNIT_GROUPS[newGroup][1].value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Unit Converter</h2>
            <p className="text-sm text-neutral-400 mt-1">Reliable length and weight conversion</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Ruler className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="grid gap-8">
           <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Category</label>
            <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1 gap-1">
              {Object.keys(UNIT_GROUPS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleGroupChange(key as keyof typeof UNIT_GROUPS)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all capitalize ${
                    group === key
                      ? 'bg-emerald-500 text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Input Value</label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
                placeholder="0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">From</label>
                <Select value={inputUnit} onValueChange={setInputUnit}>
                  <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSwap}
                className="h-14 w-14 rounded-2xl bg-white/[0.03] border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all md:mb-0 mb-4"
              >
                <ArrowRightLeft className="w-5 h-5 rotate-90 md:rotate-0" />
              </Button>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">To</label>
                <Select value={outputUnit} onValueChange={setOutputUnit}>
                  <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">Converted Value</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                {convertedValue}
              </span>
              <span className="text-xl font-medium text-emerald-400">
                {units.find(u => u.value === outputUnit)?.label}
              </span>
            </div>
          </div>
          
          <div className="text-left md:text-right">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Base Calculation</p>
            <p className="text-sm text-neutral-400 font-mono">
              1 {inputUnit} = {(UNIT_GROUPS[group].find(u => u.value === outputUnit)!.rate / UNIT_GROUPS[group].find(u => u.value === inputUnit)!.rate).toFixed(4)} {outputUnit}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
