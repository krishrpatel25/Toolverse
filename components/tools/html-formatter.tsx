'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function HTMLFormatter() {
  const [input, setInput] = useState('');

  const formatHTML = (html: string): string => {
    let formatted = '';
    let indent = 0;
    
    const tags = html.match(/<[^>]+>|[^<]+/g) || [];
    
    tags.forEach(tag => {
      const trimmed = tag.trim();
      
      if (!trimmed) return;
      
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += '  '.repeat(indent) + trimmed + '\n';
      } else if (trimmed.startsWith('<') && !trimmed.endsWith('/>')) {
        formatted += '  '.repeat(indent) + trimmed + '\n';
        if (!trimmed.match(/<(br|hr|img|input|meta|link|area|base|col|embed|source|track|wbr)/i) && !trimmed.startsWith('<!')) {
          if (!trimmed.endsWith('>') || !trimmed.match(/\/>/)) {
            indent++;
          }
        }
      } else if (trimmed.startsWith('<') && trimmed.endsWith('/>')) {
        formatted += '  '.repeat(indent) + trimmed + '\n';
      } else if (trimmed.length > 0) {
        formatted += '  '.repeat(indent) + trimmed.trim() + '\n';
      }
    });
    
    return formatted.trim();
  };

  const result = formatHTML(input);

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
        <label className="text-sm font-medium">HTML Input</label>
        <Textarea
          placeholder="Paste your HTML here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-48 resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Formatted HTML</label>
        <Card className="border border-border bg-secondary p-4 min-h-48 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Formatted HTML will appear here...'}
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
