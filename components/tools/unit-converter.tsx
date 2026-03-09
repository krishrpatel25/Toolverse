'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function UnitConverter() {
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('meter');
  const [outputUnit, setOutputUnit] = useState('foot');

  const conversions: Record<string, Record<string, number>> = {
    meter: { meter: 1, foot: 3.28084, inch: 39.3701, yard: 1.09361, kilometer: 0.001, mile: 0.000621371 },
    foot: { meter: 0.3048, foot: 1, inch: 12, yard: 0.333333, kilometer: 0.0003048, mile: 0.000189394 },
    inch: { meter: 0.0254, foot: 0.0833333, inch: 1, yard: 0.0277778, kilometer: 0.0000254, mile: 0.0000157828 },
    kilogram: { kilogram: 1, gram: 1000, pound: 2.20462, ounce: 35.274 },
    gram: { kilogram: 0.001, gram: 1, pound: 0.00220462, ounce: 0.035274 },
    pound: { kilogram: 0.453592, gram: 453.592, pound: 1, ounce: 16 },
  };

  const lengthUnits = ['meter', 'foot', 'inch', 'yard', 'kilometer', 'mile'];
  const weightUnits = ['kilogram', 'gram', 'pound', 'ounce'];
  const units = lengthUnits.includes(inputUnit) ? lengthUnits : weightUnits;

  const convert = () => {
    const value = parseFloat(inputValue) || 0;
    const conversion = conversions[inputUnit]?.[outputUnit];
    return conversion ? (value * conversion).toFixed(6) : '0';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Unit Converter</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">From</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent mb-2"
              placeholder="0"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">To</label>
            <select
              value={outputUnit}
              onChange={(e) => setOutputUnit(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Result</h3>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-lg">{inputValue} {inputUnit}</span>
          <span className="text-foreground">=</span>
          <span className="text-xl font-bold text-accent">{convert()} {outputUnit}</span>
        </div>
      </Card>
    </div>
  );
}
