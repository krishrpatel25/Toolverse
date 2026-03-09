'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const stats = useMemo(() => {
    const same = text1 === text2;
    const similarity = text1.length === 0 && text2.length === 0 ? 100 : 
      (1 - Math.min(text1.length, text2.length) / Math.max(text1.length, text2.length, 1)) * 100;
    
    return { same, similarity: Math.round(similarity * 100) / 100 };
  }, [text1, text2]);

  const handleReset = () => {
    setText1('');
    setText2('');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text 1</label>
          <Textarea
            placeholder="Paste first text..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-40 resize-none font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text 2</label>
          <Textarea
            placeholder="Paste second text..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-40 resize-none font-mono"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className={`border-2 p-4 ${stats.same ? 'border-accent bg-accent/10' : 'border-destructive bg-destructive/10'}`}>
          <p className="text-sm text-muted-foreground mb-1">Status</p>
          <p className={`text-2xl font-bold ${stats.same ? 'text-accent' : 'text-destructive'}`}>
            {stats.same ? '✓ Identical' : '✗ Different'}
          </p>
        </Card>
        <Card className="border border-border bg-secondary p-4">
          <p className="text-sm text-muted-foreground mb-1">Similarity</p>
          <p className="text-2xl font-bold text-foreground">{stats.similarity}%</p>
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
