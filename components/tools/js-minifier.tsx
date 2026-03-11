'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function JSMinifier() {
  const [input, setInput] = useState('');

  const minifyJS = (js: string): string => {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*([{}();:,=+\-*/<>?!&|^~])\s*/g, '$1')
      .replace(/\s+$/gm, '')
      .trim();
  };

  const result = minifyJS(input);
  const savedBytes = input.length - result.length;
  const savedPercent = input.length ? Math.round((savedBytes / input.length) * 100) : 0;

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyToClipboard(result);
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">JavaScript Input</label>
        <Textarea
          placeholder="Paste your JavaScript here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-48 resize-none font-mono"
        />
      </div>

      {input && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Original</p>
            <p className="text-2xl font-bold text-foreground">{input.length} B</p>
          </Card>
          <Card className="border border-border bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Minified</p>
            <p className="text-2xl font-bold text-foreground">{result.length} B</p>
          </Card>
          <Card className="border border-accent bg-accent/10 p-4">
            <p className="text-sm text-muted-foreground">Saved</p>
            <p className="text-2xl font-bold text-accent">{savedPercent}%</p>
          </Card>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Minified JavaScript</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono whitespace-pre-wrap break-words text-foreground overflow-x-auto">
          {result || 'Minified JavaScript will appear here...'}
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setInput('')}>
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
