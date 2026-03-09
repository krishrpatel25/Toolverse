'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

function generateUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function UUIDGenerator() {
  const [count, setCount] = useState('1');
  const [uuids, setUuids] = useState<string[]>([]);
  const [separator, setSeparator] = useState('none');

  const handleGenerate = () => {
    const num = Math.min(Math.max(parseInt(count) || 1, 1), 100);
    const generated = Array.from({ length: num }, () => generateUUIDv4());
    setUuids(generated);
    toast.success(`Generated ${num} UUIDs`);
  };

  const handleCopyAll = async () => {
    try {
      const text = separator === 'newline' 
        ? uuids.join('\n')
        : separator === 'comma'
        ? uuids.join(', ')
        : uuids.join('');
      
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleCopyOne = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of UUIDs</label>
          <Input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Separator</label>
          <div className="flex gap-2">
            {[
              { label: 'None', value: 'none' },
              { label: 'Newline', value: 'newline' },
              { label: 'Comma', value: 'comma' },
            ].map((opt) => (
              <Button
                key={opt.value}
                variant={separator === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSeparator(opt.value)}
                className="flex-1"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleGenerate} className="w-full">
        Generate UUIDs
      </Button>

      {/* Generated UUIDs */}
      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Generated UUIDs ({uuids.length})</h3>
            <Button
              size="sm"
              onClick={handleCopyAll}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy All
            </Button>
          </div>

          <Card className="border border-border bg-secondary/30 p-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded transition-colors group"
                >
                  <code className="font-mono text-sm text-foreground break-all">
                    {uuid}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyOne(uuid)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {uuids.length > 0 && (
        <Button
          variant="outline"
          onClick={() => {
            setUuids([]);
            setCount('1');
          }}
          className="w-full"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
