'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function RemoveSpaces() {
  const [text, setText] = useState('');
  const [option, setOption] = useState<'all' | 'extra' | 'leading' | 'trailing'>('extra');

  const processText = () => {
    switch (option) {
      case 'all':
        return text.replace(/\s+/g, '');
      case 'extra':
        return text.replace(/\s+/g, ' ').trim();
      case 'leading':
        return text.replace(/^\s+/, '');
      case 'trailing':
        return text.replace(/\s+$/, '');
      default:
        return text;
    }
  };

  const result = processText();

  const handleCopy = async () => {
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
          <label className="text-sm font-medium mb-2 block">Remove Option</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: 'extra', label: 'Extra Spaces' },
              { value: 'all', label: 'All Spaces' },
              { value: 'leading', label: 'Leading Spaces' },
              { value: 'trailing', label: 'Trailing Spaces' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOption(opt.value as typeof option)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  option === opt.value
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
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 resize-none font-mono"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium mb-2 block">Result</label>
        <Card className="border border-border bg-secondary p-4 min-h-32 font-mono break-words whitespace-pre-wrap text-foreground">
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
