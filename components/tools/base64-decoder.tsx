'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function Base64Decoder() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const decode = (() => {
    if (!input) return '';
    try {
      setError('');
      return atob(input);
    } catch (e) {
      setError('Invalid Base64 string');
      return '';
    }
  })();

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Base64 Input</label>
        <Textarea
          placeholder="Paste Base64 string here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-32 resize-none font-mono"
        />
      </div>

      {error && (
        <Card className="border-2 border-destructive bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Decoded Output</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono whitespace-pre-wrap break-words text-foreground">
          {decode || 'Decoded text will appear here...'}
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setInput('')}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={() => handleCopy(decode)} disabled={!decode}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Output
        </Button>
      </div>
    </div>
  );
}
