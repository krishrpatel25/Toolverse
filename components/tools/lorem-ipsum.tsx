'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const LOREM_WORDS = LOREM_TEXT.split(/\s+/);

export function LoremIpsum() {
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);

  const generateWords = (count: number) => {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
    }
    return words.join(' ');
  };

  const generateSentences = (count: number) => {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      const words = generateWords(Math.floor(Math.random() * 10) + 8);
      sentences.push(words.charAt(0).toUpperCase() + words.slice(1) + '.');
    }
    return sentences.join(' ');
  };

  const generateParagraphs = (count: number) => {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(generateSentences(Math.floor(Math.random() * 5) + 3));
    }
    return paragraphs.join('\n\n');
  };

  const result = (() => {
    switch (type) {
      case 'words':
        return generateWords(count);
      case 'sentences':
        return generateSentences(count);
      case 'paragraphs':
        return generateParagraphs(count);
    }
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Type</label>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { value: 'words', label: 'Words' },
              { value: 'sentences', label: 'Sentences' },
              { value: 'paragraphs', label: 'Paragraphs' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value as typeof type)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  type === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-secondary hover:border-accent/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Count: <span className="text-accent">{count}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Generated Text</label>
        <Card className="border border-border bg-secondary p-4 min-h-48 whitespace-pre-wrap break-words text-foreground text-sm leading-relaxed">
          {result}
        </Card>
      </div>

      <div className="flex gap-2 justify-end">
        <Button onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Text
        </Button>
      </div>
    </div>
  );
}
