'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import crypto from 'crypto';

export function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = () => {
    const hashResults: Record<string, string> = {};
    
    hashResults.md5 = crypto.createHash('md5').update(input).digest('hex');
    hashResults.sha1 = crypto.createHash('sha1').update(input).digest('hex');
    hashResults.sha256 = crypto.createHash('sha256').update(input).digest('hex');
    hashResults.sha512 = crypto.createHash('sha512').update(input).digest('hex');
    
    setHashes(hashResults);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Hash Generator</h2>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Text Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent h-24"
            placeholder="Enter text to hash..."
          />
        </div>

        <Button onClick={generate} className="w-full mt-4">
          Generate Hashes
        </Button>
      </Card>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <Card key={algo} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{algo.toUpperCase()}</h3>
                  <p className="text-xs text-muted-foreground break-all font-mono bg-secondary/30 p-2 rounded">
                    {hash}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(hash)}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
