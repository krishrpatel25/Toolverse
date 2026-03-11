'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, RotateCcw, FileText, View, Eye, Sparkles, Hash, Code } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Preview 🚀

## Premium Features
- **Real-time preview** with elite styling
- **Sanitized output** for maximum security
- **Lucide Icon** integration for a stunning UI

### Code Example
\`\`\`javascript
function ignite() {
  console.log('Premium UI Activated');
}
\`\`\`

> "Good design is obvious. Great design is transparent." — Joe Sparano

---
`;

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.25rem; font-weight: bold; color: white;">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 1.5rem; font-weight: bold; color: white;">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 style="margin-top: 1.5em; margin-bottom: 0.5em; font-size: 2rem; font-weight: bold; color: white;">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: white;">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em style="opacity: 0.9;">$1</em>');
  html = html.replace(/~~(.*?)~~/g, '<del style="text-decoration: line-through; opacity: 0.5;">$1</del>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background-color: rgba(0,0,0,0.4); padding: 1.5em; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto; font-family: monospace; font-size: 0.9em; margin: 1em 0;"><code style="color: #10b981;">$1</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code style="background-color: rgba(255,255,255,0.05); padding: 0.2em 0.4em; border-radius: 0.5rem; font-family: monospace; color: #10b981;">$1</code>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #10b981; text-decoration: underline; font-weight: bold;">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote style="border-left: 4px solid #10b981; padding: 0.5em 1.5em; background: rgba(16, 185, 129, 0.05); border-radius: 0 1rem 1rem 0; color: rgba(255,255,255,0.7); margin: 1.5em 0;">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2em 0;" />');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li style="margin-bottom: 0.5em;">$1</li>');
  html = html.replace(/^- (.*?)$/gm, '<li style="margin-bottom: 0.5em;">$1</li>');
  html = html.replace(/^\d+\. (.*?)$/gm, '<li style="margin-bottom: 0.5em;">$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul style="list-style-type: disc; margin-left: 1.5em; margin-bottom: 1em;">$1</ul>');

  // Line breaks
  html = html.replace(/\n/g, '<br />');

  return html;
}

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const handleCopy = async () => {
    const success = await copyToClipboard(markdown);
    if (success) {
      toast.success('Markdown copied');
    }
  };

  const htmlPreview = useMemo(() => {
    const rawHtml = markdownToHtml(markdown);
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(rawHtml);
    }
    return rawHtml;
  }, [markdown]);

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Markdown Preview</h2>
              <p className="text-sm text-neutral-400">Write markdown and see real-time results</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
               variant="outline" 
               onClick={() => setMarkdown(DEFAULT_MARKDOWN)}
               className="border-white/10 hover:bg-white/5 rounded-xl h-10 px-4 text-neutral-400"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
            <Button 
               onClick={handleCopy}
               className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl h-10"
            >
               <Copy size={16} className="mr-2" />
               Copy
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-neutral-500">
                 <label className="text-[10px] font-black uppercase tracking-widest">Editor</label>
                 <Code size={12} />
              </div>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[500px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none overflow-auto scrollbar-hide"
                placeholder="Enter markdown here..."
              />
           </div>

           <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-emerald-500/60">
                 <label className="text-[10px] font-black uppercase tracking-widest">Live Preview</label>
                 <Eye size={12} />
              </div>
              <Card className="min-h-[500px] border-white/10 bg-black/40 rounded-2xl p-8 overflow-auto scrollbar-hide prose prose-invert max-w-none shadow-inner border-dashed">
                <div
                  dangerouslySetInnerHTML={{ __html: htmlPreview }}
                  className="text-neutral-300 text-sm leading-relaxed"
                />
              </Card>
           </div>
        </div>
      </Card>

      <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <p className="text-sm text-neutral-400 flex items-center gap-2">
          <span className="p-1 bg-emerald-500/20 rounded-md"><Sparkles size={12} className="text-emerald-400" /></span>
          Secure & Sanitized. Preview updates instantly as you type.
        </p>
      </Card>
    </div>
  );
}
