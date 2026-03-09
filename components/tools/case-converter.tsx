'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type CaseType = 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase' | 'camelcase' | 'snakecase' | 'kebabcase';

export function CaseConverter() {
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('uppercase');

  const convertCase = (text: string, type: CaseType): string => {
    switch (type) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'titlecase':
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      case 'sentencecase':
        return text.toLowerCase().replace(/(^\s*\w|[\\.!?]\s*\w)/g, char => char.toUpperCase());
      case 'camelcase':
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      case 'snakecase':
        return text
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      case 'kebabcase':
        return text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
      default:
        return text;
    }
  };

  const output = convertCase(input, selectedCase);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const caseOptions: { label: string; value: CaseType }[] = [
    { label: 'UPPERCASE', value: 'uppercase' },
    { label: 'lowercase', value: 'lowercase' },
    { label: 'Title Case', value: 'titlecase' },
    { label: 'Sentence case', value: 'sentencecase' },
    { label: 'camelCase', value: 'camelcase' },
    { label: 'snake_case', value: 'snakecase' },
    { label: 'kebab-case', value: 'kebabcase' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input Text</label>
        <Textarea
          placeholder="Enter text to convert..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-32 resize-none"
        />
      </div>

      {/* Case Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Convert To</label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {caseOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedCase === option.value ? 'default' : 'outline'}
              onClick={() => setSelectedCase(option.value)}
              className="justify-start"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Output</label>
        <Card className="border border-border bg-secondary/30 p-4 min-h-32">
          <div className="font-mono text-sm text-foreground break-words whitespace-pre-wrap">
            {output || 'Your converted text will appear here...'}
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput('')}
          disabled={!input}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleCopy}
          disabled={!output}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Result
        </Button>
      </div>
    </div>
  );
}
