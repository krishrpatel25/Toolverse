'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [numSides, setNumSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const roll = () => {
    const newResults: number[] = [];
    for (let i = 0; i < numDice; i++) {
      newResults.push(Math.floor(Math.random() * numSides) + 1);
    }
    setResults(newResults);
    setTotal(newResults.reduce((a, b) => a + b, 0));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Dice Roller</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Number of Dice</label>
              <input
                type="number"
                value={numDice}
                onChange={(e) => setNumDice(parseInt(e.target.value) || 1)}
                min="1"
                max="20"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sides per Die</label>
              <select
                value={numSides}
                onChange={(e) => setNumSides(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="4">4 Sides (d4)</option>
                <option value="6">6 Sides (d6)</option>
                <option value="8">8 Sides (d8)</option>
                <option value="10">10 Sides (d10)</option>
                <option value="12">12 Sides (d12)</option>
                <option value="20">20 Sides (d20)</option>
                <option value="100">100 Sides (d100)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Button onClick={roll} className="w-full text-lg py-6">
        Roll {numDice}d{numSides}
      </Button>

      {results.length > 0 && (
        <Card className="p-6 bg-accent/10 border-accent">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg font-bold text-lg text-foreground"
              >
                {result}
              </div>
            ))}
          </div>
          <div className="text-2xl font-bold text-accent">
            Total: {total}
          </div>
        </Card>
      )}
    </div>
  );
}
