'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TextSorter() {
  const [text, setText] = useState('');
  const [sortType, setSortType] = useState<'ascending' | 'descending' | 'length'>('ascending');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);

  const result = (() => {
    if (!text.trim()) return '';
    let lines = text.split('\n');
    
    const sortFn = (a: string, b: string) => {
      const aVal = isCaseSensitive ? a : a.toLowerCase();
      const bVal = isCaseSensitive ? b : b.toLowerCase();
      
      if (sortType === 'length') {
        return aVal.length - bVal.length;
      }
      
      const comparison = aVal.localeCompare(bVal);
      return sortType === 'descending' ? -comparison : comparison;
    };
    
    return lines.sort(sortFn).join('\n');
  })();

  const handleCopy = async () => {
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
          <label className="text-sm font-medium mb-2 block">Sort Type</label>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { value: 'ascending', label: 'A-Z' },
              { value: 'descending', label: 'Z-A' },
              { value: 'length', label: 'By Length' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortType(opt.value as typeof sortType)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  sortType === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary hover:border-accent/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-secondary">
          <input
            type="checkbox"
            id="caseSensitive"
            checked={isCaseSensitive}
            onChange={(e) => setIsCaseSensitive(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="caseSensitive" className="text-sm font-medium cursor-pointer flex-1">
            Case Sensitive
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text (one per line)</label>
        <Textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sorted Result</label>
        <Card className="border border-border bg-secondary p-4 min-h-40 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Your result will appear here...'}
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setText('')}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={handleCopy} disabled={!result}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Result
        </Button>
      </div>
    </div>
  );
}
