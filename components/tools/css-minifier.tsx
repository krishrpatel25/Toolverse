'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function CSSMinifier() {
  const [input, setInput] = useState('');

  const minifyCSS = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*([{};:,>])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
  };

  const result = minifyCSS(input);
  const savedBytes = input.length - result.length;
  const savedPercent = input.length ? Math.round((savedBytes / input.length) * 100) : 0;

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
      <div className="space-y-2">
        <label className="text-sm font-medium">CSS Input</label>
        <Textarea
          placeholder="Paste your CSS here..."
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
        <label className="text-sm font-medium">Minified CSS</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Minified CSS will appear here...'}
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
