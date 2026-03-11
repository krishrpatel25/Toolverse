'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function URLDecoder() {
  const [text, setText] = useState('');

  const result = (() => {
    if (!text) return '';
    try {
      return decodeURIComponent(text);
    } catch {
      return '';
    }
  })();

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
        <label className="text-sm font-medium">URL Encoded Text</label>
        <Textarea
          placeholder="Paste your URL-encoded text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Decoded Result</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Decoded text will appear here...'}
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
