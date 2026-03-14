'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw, Eye, Code } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { copyToClipboard } from '@/lib/utils';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Preview 🚀

## Features
- **Real-time preview** with live rendering
- **Sanitized output** for security
- **GitHub-flavored** Markdown support

### Code Example
\`\`\`javascript
function greet() {
  console.log('Hello, ToolVerse!');
}
\`\`\`

> "Good design is obvious. Great design is transparent."

---
`;

function markdownToHtml(markdown: string): string {
  let html = markdown;
  html = html.replace(/^### (.*?)$/gm, '<h3 style="margin-top:1.2em;margin-bottom:0.4em;font-size:1.15rem;font-weight:bold;color:white">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 style="margin-top:1.4em;margin-bottom:0.4em;font-size:1.4rem;font-weight:bold;color:white">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 style="margin-top:1.4em;margin-bottom:0.4em;font-size:1.8rem;font-weight:bold;color:white">$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em style="opacity:0.9">$1</em>');
  html = html.replace(/~~(.*?)~~/g, '<del style="opacity:0.5">$1</del>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.5);padding:1em;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.05);overflow-x:auto;font-family:monospace;font-size:0.85em;margin:0.75em 0"><code style="color:#10b981">$1</code></pre>');
  html = html.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.07);padding:0.15em 0.35em;border-radius:0.35rem;font-family:monospace;color:#10b981">$1</code>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#10b981;text-decoration:underline">$1</a>');
  html = html.replace(/^> (.*?)$/gm, '<blockquote style="border-left:3px solid #10b981;padding:0.4em 1em;background:rgba(16,185,129,0.05);border-radius:0 0.5rem 0.5rem 0;color:rgba(255,255,255,0.7);margin:1em 0">$1</blockquote>');
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:1.5em 0" />');
  html = html.replace(/^[\*\-] (.*?)$/gm, '<li style="margin-bottom:0.35em">$1</li>');
  html = html.replace(/^(\d+)\. (.*?)$/gm, '<li style="margin-bottom:0.35em">$2</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul style="list-style-type:disc;margin-left:1.5em;margin-bottom:0.75em">$1</ul>');
  html = html.replace(/\n/g, '<br />');
  return html;
}

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const handleCopy = async () => {
    if (await copyToClipboard(markdown)) toast.success('Markdown copied');
  };

  const htmlPreview = useMemo(() => {
    const rawHtml = markdownToHtml(markdown);
    return typeof window !== 'undefined' ? DOMPurify.sanitize(rawHtml) : rawHtml;
  }, [markdown]);

  return (
    <div className="space-y-4 w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-neutral-500 font-medium">Write Markdown on the left, preview on the right</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setMarkdown(DEFAULT_MARKDOWN)} className="border-white/10 text-neutral-400">
            <RotateCcw size={13} className="mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={handleCopy} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20">
            <Copy size={13} className="mr-1.5" /> Copy
          </Button>
        </div>
      </div>

      {/* Split editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-neutral-500">
            <Code size={12} />
            <label className="text-[10px] font-bold uppercase tracking-widest">Editor</label>
          </div>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="min-h-[380px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm focus:border-emerald-500/50 resize-none w-full"
            placeholder="Enter markdown here..."
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-500/60">
            <Eye size={12} />
            <label className="text-[10px] font-bold uppercase tracking-widest">Live Preview</label>
          </div>
          <div
            className="min-h-[380px] border border-white/10 bg-black/40 rounded-xl p-4 text-neutral-300 text-sm leading-relaxed overflow-hidden"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      </div>
    </div>
  );
}
