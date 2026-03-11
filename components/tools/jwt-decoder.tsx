'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';

export function JWTDecoder() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [decoded, setDecoded] = useState<{ header?: any; payload?: any } | null>(null);

  const decode = () => {
    try {
      setError('');
      setDecoded(null);
      
      if (!token.trim()) return;
      
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Must have 3 parts separated by dots.');
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      setDecoded({ header, payload });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopy = async (data: any) => {
    const success = await copyToClipboard(JSON.stringify(data, null, 2));
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">JWT Token</label>
        <Textarea
          placeholder="Paste your JWT token here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="min-h-32 resize-none font-mono text-xs"
        />
      </div>

      {error && (
        <Card className="border-2 border-destructive bg-destructive/10 p-4">
          <p className="text-sm text-destructive">Error: {error}</p>
        </Card>
      )}

      <div className="flex gap-2 justify-end mb-4">
        <Button variant="outline" onClick={() => setToken('')}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={decode}>
          Decode
        </Button>
      </div>

      {decoded && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Header</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(decoded.header)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Card className="border border-border bg-secondary p-4 font-mono text-xs whitespace-pre-wrap break-words text-foreground">
              {JSON.stringify(decoded.header, null, 2)}
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Payload</label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(decoded.payload)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Card className="border border-border bg-secondary p-4 font-mono text-xs whitespace-pre-wrap break-words text-foreground">
              {JSON.stringify(decoded.payload, null, 2)}
            </Card>
          </div>

          {decoded.payload?.exp && (
            <Card className="border border-accent bg-accent/10 p-4">
              <p className="text-sm">
                <span className="font-medium">Expires:</span> {new Date(decoded.payload.exp * 1000).toLocaleString()}
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
