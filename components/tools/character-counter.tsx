'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const bytes = new Blob([text]).size;
    
    return { characters, charactersNoSpaces, bytes };
  }, [text]);

  const handleCopy = async (stat: string, value: number) => {
    try {
      await navigator.clipboard.writeText(value.toString());
      toast.success(`Copied ${stat}: ${value}`);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Text</label>
        <Textarea
          placeholder="Paste your text here to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-48 resize-none font-mono"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={!text}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Characters', value: stats.characters },
          { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
          { label: 'Bytes', value: stats.bytes },
        ].map(({ label, value }) => (
          <Card
            key={label}
            className="border border-border bg-secondary p-4 cursor-pointer hover:border-accent transition-colors group"
            onClick={() => handleCopy(label, value)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold text-foreground">{value}</p>
              </div>
              <Copy className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="border border-border bg-secondary/30 p-4">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Click on any stat card to copy the value to your clipboard.
        </p>
      </Card>
    </div>
  );
}
