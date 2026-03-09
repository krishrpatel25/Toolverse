'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [error, setError] = useState('');

  const test = () => {
    try {
      setError('');
      setMatches([]);
      
      if (!pattern) return;
      
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpExecArray[] = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          allMatches.push([...match]);
        }
      } else {
        match = regex.exec(text);
        if (match) allMatches.push([...match]);
      }
      
      setMatches(allMatches);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Pattern</label>
          <Input
            placeholder="Enter your regex pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Flags</label>
          <div className="flex gap-2">
            {['g', 'i', 'm', 's'].map((flag) => (
              <button
                key={flag}
                onClick={() => {
                  if (flags.includes(flag)) {
                    setFlags(flags.replace(flag, ''));
                  } else {
                    setFlags(flags + flag);
                  }
                }}
                className={`px-3 py-1 rounded border-2 text-sm font-mono transition-all ${
                  flags.includes(flag)
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary hover:border-accent/50'
                }`}
                title={flag === 'g' ? 'Global' : flag === 'i' ? 'Ignore Case' : flag === 'm' ? 'Multiline' : 'Single Line'}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Text to Test</label>
          <Textarea
            placeholder="Paste text to test..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-32 resize-none font-mono"
          />
        </div>
      </div>

      {error && (
        <Card className="border-2 border-destructive bg-destructive/10 p-4">
          <p className="text-sm text-destructive">Error: {error}</p>
        </Card>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Matches: {matches.length}</label>
          <Button size="sm" onClick={test}>
            Test
          </Button>
        </div>
        
        {matches.length > 0 && (
          <div className="space-y-2">
            {matches.map((match, idx) => (
              <Card key={idx} className="border border-border bg-secondary p-3">
                <div className="flex items-start justify-between">
                  <div className="font-mono text-sm break-all">
                    <span className="text-accent font-bold">{match[0]}</span>
                    {match.length > 1 && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {match.slice(1).map((g, gi) => (
                          <div key={gi}>Group {gi + 1}: {g}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(match[0])}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
