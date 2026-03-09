'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TextReverser() {
  const [input, setInput] = useState('');
  const [reverseWords, setReverseWords] = useState(false);

  const output = reverseWords
    ? input.split(' ').reverse().join(' ')
    : input.split('').reverse().join('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Enter text to reverse..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-32 resize-none"
        />
      </div>

      <div className="flex gap-4">
        <Button
          variant={!reverseWords ? 'default' : 'outline'}
          onClick={() => setReverseWords(false)}
          className="flex-1"
        >
          Reverse Characters
        </Button>
        <Button
          variant={reverseWords ? 'default' : 'outline'}
          onClick={() => setReverseWords(true)}
          className="flex-1"
        >
          Reverse Words
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Output</label>
        <Card className="border border-border bg-secondary/30 p-4 min-h-32">
          <div className="font-mono text-sm text-foreground break-words whitespace-pre-wrap">
            {output || 'Your reversed text will appear here...'}
          </div>
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput('')}
          disabled={!input}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleCopy}
          disabled={!output}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Result
        </Button>
      </div>
    </div>
  );
}
