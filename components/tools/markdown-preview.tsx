'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Preview

## Features
- Real-time preview
- Support for common markdown syntax
- Copy formatted text

### Code Example
\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

**Bold text** and *italic text* and ~~strikethrough~~

> This is a blockquote

[Link](https://example.com)

---
`;

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.25rem; font-weight: bold;">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.5rem; font-weight: bold;">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 2rem; font-weight: bold;">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/~~(.*?)~~/g, '<del style="text-decoration: line-through;">$1</del>');

  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre style="background-color: rgba(0,0,0,0.1); padding: 1em; border-radius: 0.5em; overflow-x: auto;"><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code style="background-color: rgba(0,0,0,0.1); padding: 0.2em 0.4em; border-radius: 0.25em;">$1</code>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #22c55e; text-decoration: underline;">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote style="border-left: 4px solid #22c55e; padding-left: 1em; color: rgba(255,255,255,0.7); margin: 0.5em 0;">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 2px solid #22c55e; margin: 1em 0;" />');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul style="margin-left: 1.5em;">$1</ul>');

  // Line breaks
  html = html.replace(/\n/g, '<br />');

  return html;
}

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const htmlPreview = markdownToHtml(markdown);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Markdown</label>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-96 resize-none font-mono"
            placeholder="Enter markdown here..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preview</label>
          <Card className="border border-border bg-secondary/30 p-4 min-h-96 overflow-auto prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
              className="text-foreground text-sm leading-relaxed space-y-3"
            />
          </Card>
        </div>
      </div>

      <div className="flex gap-2 justify-end flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMarkdown(DEFAULT_MARKDOWN)}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleCopy}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Markdown
        </Button>
      </div>
    </div>
  );
}
