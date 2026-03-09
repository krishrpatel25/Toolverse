'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function JSONValidator() {
  const [json, setJson] = useState('');
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const validate = () => {
    try {
      JSON.parse(json);
      setResult({ valid: true, message: 'Valid JSON!' });
    } catch (error: any) {
      setResult({ valid: false, message: error.message });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">JSON Input</label>
        <Textarea
          placeholder="Paste your JSON here..."
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="min-h-48 resize-none font-mono"
        />
      </div>

      {result && (
        <Card className={`border-2 p-4 ${
          result.valid
            ? 'border-accent bg-accent/10'
            : 'border-destructive bg-destructive/10'
        }`}>
          <p className={`font-medium ${result.valid ? 'text-accent' : 'text-destructive'}`}>
            {result.valid ? '✓ Valid JSON' : '✗ Invalid JSON'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setJson('')}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!json}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button onClick={validate}>
          Validate
        </Button>
      </div>
    </div>
  );
}
