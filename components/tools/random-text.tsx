'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function RandomText() {
  const [type, setType] = useState<'alphanumeric' | 'letters' | 'numbers' | 'hex' | 'slug'>('alphanumeric');
  const [length, setLength] = useState(32);
  const [result, setResult] = useState('');

  const generateRandom = () => {
    let chars = '';
    let generated = '';

    switch (type) {
      case 'alphanumeric':
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        break;
      case 'letters':
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        break;
      case 'numbers':
        chars = '0123456789';
        break;
      case 'hex':
        chars = '0123456789ABCDEF';
        break;
      case 'slug':
        chars = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
        break;
    }

    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setResult(generated);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Type</label>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { value: 'alphanumeric', label: 'Alphanumeric' },
              { value: 'letters', label: 'Letters Only' },
              { value: 'numbers', label: 'Numbers Only' },
              { value: 'hex', label: 'Hex (0-F)' },
              { value: 'slug', label: 'Slug' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value as typeof type)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  type === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary hover:border-accent/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Length: <span className="text-accent">{length}</span>
          </label>
          <input
            type="range"
            min="1"
            max="256"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Generated Text</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono break-all text-foreground">
          {result || 'Click generate to create random text...'}
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={generateRandom}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>
        <Button onClick={handleCopy} disabled={!result}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  );
}
