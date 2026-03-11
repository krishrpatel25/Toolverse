'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function XMLFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formatXML = (xmlString: string): string => {
    try {
      setError('');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        throw new Error(parseError[0].textContent || 'Invalid XML');
      }
      
      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(xmlDoc);
      
      // Basic formatting
      formatted = formatted.replace(/></g, '>\n<');
      const lines = formatted.split('\n');
      let indent = 0;
      
      return lines.map(line => {
        if (line.match(/^<\/\w/)) indent = Math.max(0, indent - 1);
        const result = '  '.repeat(indent) + line.trim();
        if (line.match(/^<\w[^>]*[^/]>$/) && !line.match(/^</)) indent++;
        return result;
      }).filter(l => l.trim()).join('\n');
    } catch (err: any) {
      setError('Invalid XML: ' + err.message);
      return '';
    }
  };

  const result = formatXML(input);

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
        <label className="text-sm font-medium">XML Input</label>
        <Textarea
          placeholder="Paste your XML here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-48 resize-none font-mono"
        />
      </div>

      {error && (
        <Card className="border-2 border-destructive bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Formatted XML</label>
        <Card className="border border-border bg-secondary p-4 min-h-48 font-mono whitespace-pre-wrap break-words text-foreground">
          {result || 'Formatted XML will appear here...'}
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
