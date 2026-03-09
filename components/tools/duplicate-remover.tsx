'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function DuplicateRemover() {
  const [text, setText] = useState('');

  const result = (() => {
    if (!text.trim()) return '';
    const lines = text.split('\n');
    const seen = new Set<string>();
    return lines.filter(line => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    }).join('\n');
  })();

  const duplicatesRemoved = text.split('\n').length - result.split('\n').length;

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
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border border-border bg-secondary p-4">
          <p className="text-sm text-muted-foreground">Input Lines</p>
          <p className="text-3xl font-bold text-foreground">{text ? text.split('\n').length : 0}</p>
        </Card>
        <Card className="border border-border bg-secondary p-4">
          <p className="text-sm text-muted-foreground">Output Lines</p>
          <p className="text-3xl font-bold text-foreground">{result ? result.split('\n').length : 0}</p>
        </Card>
        <Card className="border border-border bg-accent/10 p-4">
          <p className="text-sm text-muted-foreground">Duplicates Removed</p>
          <p className="text-3xl font-bold text-accent">{duplicatesRemoved}</p>
        </Card>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Paste your text here (one item per line)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Result</label>
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
