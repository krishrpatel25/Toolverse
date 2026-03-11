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

    const meta = `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${title}</title>\n${description ? `<meta name="description" content="${description}">\n` : ''}${keywords ? `<meta name="keywords" content="${keywords}">` : ''}`;

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

export function SitemapGenerator() {
  const [url, setUrl] = useState('');
  const [xml, setXml] = useState('');

  const generate = () => {
    if (!url) {
      toast.error('Please enter a website URL');
      return;
    }
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    const date = new Date().toISOString().split('T')[0];

    const output = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${cleanUrl}/about</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    setXml(output);
    toast.success('Sitemap generated successfully');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Sitemap XML Generator</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Website URL</label>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={generate}>Generate Sitemap</Button>

          {xml && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Generated XML</span>
                <Button size="sm" variant="ghost" onClick={() => {
                  navigator.clipboard.writeText(xml);
                  toast.success('Copied!');
                }}>
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
              <Textarea
                readOnly
                className="h-48 font-mono text-sm"
                value={xml}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function RobotsTxtGenerator() {
  const [config, setConfig] = useState({ allowAll: true, blockGoogle: false, blockBing: false });
  const [output, setOutput] = useState('');

  const generate = () => {
    let txt = '';
    if (config.allowAll) {
      txt += `User-agent: *\nDisallow:\n\n`;
    } else {
      txt += `User-agent: *\nDisallow: /\n\n`;
    }

    if (config.blockGoogle) {
      txt += `User-agent: Googlebot\nDisallow: /\n\n`;
    }

    if (config.blockBing) {
      txt += `User-agent: Bingbot\nDisallow: /\n\n`;
    }

    txt += `Sitemap: https://yourdomain.com/sitemap.xml`;
    setOutput(txt);
    toast.success('Robots.txt generated');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Robots.txt Generator</h2>
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="allowAll" checked={config.allowAll} onChange={(e) => setConfig({ ...config, allowAll: e.target.checked })} className="rounded bg-background" />
            <label htmlFor="allowAll" className="text-sm">Allow all standard bots by default</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="blockGoogle" checked={config.blockGoogle} onChange={(e) => setConfig({ ...config, blockGoogle: e.target.checked })} className="rounded bg-background" />
            <label htmlFor="blockGoogle" className="text-sm">Block Googlebot</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="blockBing" checked={config.blockBing} onChange={(e) => setConfig({ ...config, blockBing: e.target.checked })} className="rounded bg-background" />
            <label htmlFor="blockBing" className="text-sm">Block Bingbot</label>
          </div>
          <Button className="w-full mt-4" onClick={generate}>Generate Robots.txt</Button>
        </div>

        {output && (
          <div className="mt-4">
            <Textarea readOnly className="h-32 font-mono text-sm" value={output} />
          </div>
        )}
      </Card>
    </div>
  );
}

export function KeywordDensity() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{ word: string, count: number, density: string }[]>([]);

  const analyze = () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const totalWords = words.length;

    if (totalWords === 0) {
      toast.error('No valid words found');
      return;
    }

    const freq: Record<string, number> = {};
    words.forEach(w => {
      freq[w] = (freq[w] || 0) + 1;
    });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }));

    setResults(sorted);
    toast.success('Analysis complete');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Keyword Density Checker</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste your content here to analyze keyword usage..."
            className="h-32"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button className="w-full" onClick={analyze}>Analyze Text</Button>

          {results.length > 0 && (
            <div className="mt-6 border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Keyword</th>
                    <th className="px-4 py-3 font-medium">Count</th>
                    <th className="px-4 py-3 font-medium">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">{r.word}</td>
                      <td className="px-4 py-3">{r.count}</td>
                      <td className="px-4 py-3">{r.density}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function SerpPreview() {
  const [title, setTitle] = useState('My Awesome Page - Example Site');
  const [desc, setDesc] = useState('This is the perfect example of a meta description that will show up in Google search results and attract users to click.');
  const [url, setUrl] = useState('example.com/my-awesome-page');

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Google SERP Preview</h2>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium mb-1 block">SEO Title ({title.length}/60)</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Meta Description ({desc.length}/160)</label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="h-20" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">URL slug</label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
          <div className="bg-white p-4 rounded-md font-sans max-w-[600px] border">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-neutral-200 rounded-full w-4 h-4"></div>
              <div>
                <div className="text-[14px] text-[#202124] leading-tight">{url.split('/')[0]}</div>
                <div className="text-[12px] text-[#4d5156] leading-tight flex items-center">
                  https://{url} <span className="mx-1 text-[10px]">▼</span>
                </div>
              </div>
            </div>
            <div className="text-[20px] text-[#1a0dab] font-medium leading-[1.3] mb-1 hover:underline cursor-pointer truncaate">
              {title || 'Page Title'}
            </div>
            <div className="text-[14px] text-[#4d5156] leading-[1.58] line-clamp-2">
              {desc || 'Page description'}
            </div>
          </div>
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

    const og = `<meta property="og:title" content="${title}">\n<meta property="og:description" content="${description || title}">\n<meta property="og:url" content="${url}">\n<meta property="og:type" content="website">`;

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
