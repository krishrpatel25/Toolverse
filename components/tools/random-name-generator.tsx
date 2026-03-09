'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function RandomNameGenerator() {
  const [type, setType] = useState<'male' | 'female' | 'surname'>('male');
  const [count, setCount] = useState(1);
  const [names, setNames] = useState<string[]>([]);

  const firstNamesMale = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Edward', 'Brian', 'Ronald', 'Paul'];
  const firstNamesFemale = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna'];
  const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];

  const generate = () => {
    const nameList = type === 'male' ? firstNamesMale : type === 'female' ? firstNamesFemale : surnames;
    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      generated.push(nameList[Math.floor(Math.random() * nameList.length)]);
    }
    setNames(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(names.join('\n'));
    toast.success('Copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Random Name Generator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="male">Male Names</option>
              <option value="female">Female Names</option>
              <option value="surname">Surnames</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">How Many?</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              min="1"
              max="50"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </Card>

      <Button onClick={generate} className="w-full">
        Generate Names
      </Button>

      {names.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Generated Names</h3>
          <div className="bg-secondary/30 rounded p-4 mb-4 max-h-60 overflow-y-auto">
            {names.map((name, idx) => (
              <div key={idx} className="text-foreground py-1 border-b border-border last:border-b-0">
                {idx + 1}. {name}
              </div>
            ))}
          </div>
          <Button onClick={copyToClipboard} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            Copy All
          </Button>
        </Card>
      )}
    </div>
  );
}
