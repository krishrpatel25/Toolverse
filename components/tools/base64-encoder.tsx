'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      const encoded = Buffer.from(input).toString('base64');
      setOutput(encoded);
      toast.success('Encoded successfully');
    } catch {
      toast.error('Encoding failed');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = Buffer.from(input, 'base64').toString('utf-8');
      setOutput(decoded);
      toast.success('Decoded successfully');
    } catch {
      toast.error('Decoding failed - invalid Base64');
    }
  };

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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea
            placeholder="Enter text or Base64..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-40 resize-none font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Output</label>
          <Card className="border border-border bg-secondary/30 p-4 min-h-40 overflow-auto">
            <div className="font-mono text-sm text-foreground break-all whitespace-pre-wrap">
              {output || 'Output will appear here...'}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={handleEncode}
          className="flex-1 sm:flex-none"
        >
          Encode to Base64
        </Button>
        <Button
          variant="outline"
          onClick={handleDecode}
          className="flex-1 sm:flex-none"
        >
          Decode from Base64
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setInput('');
            setOutput('');
          }}
          disabled={!input && !output}
          className="flex-1 sm:flex-none"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleCopy}
          disabled={!output}
          className="flex-1 sm:flex-none"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  );
}
