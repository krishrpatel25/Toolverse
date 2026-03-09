'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function URLEncoder() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = (() => {
    if (!text) return '';
    try {
      return mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
    } catch {
      return '';
    }
  })();

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
      <div>
        <label className="text-sm font-medium mb-2 block">Mode</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { value: 'encode', label: 'Encode' },
            { value: 'decode', label: 'Decode' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value as typeof mode)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                mode === opt.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-secondary hover:border-accent/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Result</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Result will appear here...'}
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
