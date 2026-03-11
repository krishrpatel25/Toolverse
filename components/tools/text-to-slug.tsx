'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function TextToSlug() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState('-');

  const result = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');

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
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Input
            placeholder="Enter text to convert to slug..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Separator</label>
          <div className="flex gap-2">
            {['-', '_', '.'].map((sep) => (
              <button
                key={sep}
                onClick={() => setSeparator(sep)}
                className={`px-4 py-2 rounded-lg border-2 transition-all font-mono ${
                  separator === sep
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary hover:border-accent/50'
                }`}
              >
                {sep === '-' ? 'Hyphen (-)' : sep === '_' ? 'Underscore (_)' : 'Dot (.)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Result</label>
        <Card className="border border-border bg-secondary p-4 min-h-20 flex items-center">
          <p className="font-mono text-lg break-all text-foreground">
            {result || 'Your slug will appear here...'}
          </p>
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button onClick={handleCopy} disabled={!result}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Slug
        </Button>
      </div>
    </div>
  );
}
