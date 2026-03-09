'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const generateMeta = () => {
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    const meta = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${description ? `<meta name="description" content="${description}">` : ''}
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}`;

    navigator.clipboard.writeText(meta);
    toast.success('Meta tags copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Meta Tag Generator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Page Title</label>
            <Input
              placeholder="My Awesome Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">{title.length}/60 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Meta Description</label>
            <Textarea
              placeholder="Enter page description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">{description.length}/160 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Keywords (comma separated)</label>
            <Input
              placeholder="keyword1, keyword2, keyword3"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <Button onClick={generateMeta} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            Generate & Copy Meta Tags
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function OpenGraphGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const generateOG = () => {
    if (!title || !url) {
      toast.error('Please enter title and URL');
      return;
    }

    const og = `<meta property="og:title" content="${title}">
<meta property="og:description" content="${description || title}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">`;

    navigator.clipboard.writeText(og);
    toast.success('Open Graph tags copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Open Graph Generator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              placeholder="My Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              placeholder="Page description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">URL</label>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
            />
          </div>

          <Button onClick={generateOG} className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            Generate & Copy OG Tags
          </Button>
        </div>
      </Card>
    </div>
  );
}
