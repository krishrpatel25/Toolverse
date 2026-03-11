'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Copy, Sparkles, Map, Globe, Shield, Search, FileText, Download, RotateCcw, Layout, Share2, BarChart3, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

    copyToClipboard(meta);
    toast.success('Meta tags copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Search className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Meta Tag Generator</h2>
              <p className="text-sm text-neutral-400">Boost your SEO with perfect meta data</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Page Title</label>
               <span className={cn("text-[10px] font-bold", title.length > 55 ? "text-red-400" : "text-emerald-500")}>{title.length}/60</span>
            </div>
            <Input
              placeholder="My Awesome Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Meta Description</label>
               <span className={cn("text-[10px] font-bold", description.length > 150 ? "text-red-400" : "text-emerald-500")}>{description.length}/160</span>
            </div>
            <Textarea
              placeholder="Enter page description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={160}
              className="min-h-[120px] bg-white/[0.03] border-white/10 rounded-2xl p-4 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Keywords</label>
            <Input
              placeholder="SEO, tools, website, meta"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl px-4"
            />
          </div>

          <Button onClick={generateMeta} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/10 mt-4">
            <Sparkles className="w-5 h-5 mr-2" />
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
</urlset>`;
    setXml(output);
    toast.success('Sitemap generated successfully');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Map className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Sitemap XML Generator</h2>
              <p className="text-sm text-neutral-400">Create a search-engine friendly index</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Website URL</label>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg pr-4"
            />
          </div>
          <Button onClick={generate} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Sitemap
          </Button>

          <AnimatePresence>
            {xml && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 pt-6"
              >
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Generated XML Result</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(xml).then(() => toast.success('Copied!'))} className="text-emerald-400 hover:bg-emerald-500/10 rounded-xl">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <Textarea
                  readOnly
                  className="min-h-[200px] bg-black/40 border-emerald-500/20 rounded-2xl p-6 font-mono text-sm text-emerald-500/90 scrollbar-hide"
                  value={xml}
                />
              </motion.div>
            )}
          </AnimatePresence>
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Robots.txt Generator</h2>
              <p className="text-sm text-neutral-400">Control search engine crawler behavior</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
           {[
             { id: 'allowAll', label: 'Allow all standard bots', state: config.allowAll, set: (v: boolean) => setConfig({...config, allowAll: v}) },
             { id: 'blockGoogle', label: 'Block Googlebot crawler', state: config.blockGoogle, set: (v: boolean) => setConfig({...config, blockGoogle: v}) },
             { id: 'blockBing', label: 'Block Bingbot crawler', state: config.blockBing, set: (v: boolean) => setConfig({...config, blockBing: v}) },
           ].map((opt) => (
             <button
               key={opt.id}
               onClick={() => opt.set(!opt.state)}
               className={cn(
                 "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                 opt.state ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-white/[0.02] border-white/5 text-neutral-500 hover:border-white/10"
               )}
             >
               <span className="text-sm font-bold tracking-tight">{opt.label}</span>
               <div className={cn("w-2 h-2 rounded-full", opt.state ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-neutral-800")} />
             </button>
           ))}

          <Button onClick={generate} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl mt-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Robots.txt
          </Button>
        </div>

        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Final Configuration</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output).then(() => toast.success('Copied!'))} className="text-emerald-400 hover:bg-emerald-500/10 rounded-xl">
                  <Copy size={16} className="mr-2" /> Copy
                </Button>
              </div>
              <Textarea readOnly className="min-h-[120px] bg-black/40 border-emerald-500/20 rounded-2xl p-6 font-mono text-sm text-emerald-500/90 scrollbar-hide" value={output} />
            </motion.div>
          )}
        </AnimatePresence>
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
         <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Keyword Density</h2>
              <p className="text-sm text-neutral-400">Analyze your content for SEO keyword usage</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Paste your content here to analyze..."
            className="min-h-[200px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none mb-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={analyze} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl">
            Analyze Text
          </Button>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 border border-white/10 rounded-[2rem] overflow-hidden bg-black/20">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-neutral-500">Keyword</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-neutral-500">Count</th>
                      <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-neutral-500 text-right">Density</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.map((r, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{r.word}</td>
                        <td className="px-6 py-4 text-emerald-500/80 font-mono">{r.count}</td>
                        <td className="px-6 py-4 text-right text-emerald-400 font-bold">{r.density}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
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
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
         <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Eye className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">SERP Preview</h2>
              <p className="text-sm text-neutral-400">See how your page appears on Google</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">SEO Title</label>
               <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/[0.03] border-white/10 rounded-xl" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Meta Description</label>
               <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="min-h-[100px] bg-white/[0.03] border-white/10 rounded-xl resize-none" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">URL path</label>
               <Input value={url} onChange={(e) => setUrl(e.target.value)} className="bg-white/[0.03] border-white/10 rounded-xl" />
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-inner flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-neutral-200" />
                <div className="flex flex-col">
                   <span className="text-[14px] text-[#202124] leading-none mb-0.5">{url.split('/')[0]}</span>
                   <span className="text-[12px] text-[#4d5156] leading-none">https://{url}</span>
                </div>
             </div>
             <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer mb-1 line-clamp-1">
                {title || 'Page Title'}
             </div>
             <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-relaxed">
                {desc || 'Enter a description to see a preview of your snippet.'}
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

    copyToClipboard(og);
    toast.success('Open Graph tags copied!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
         <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Share2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Open Graph Generator</h2>
              <p className="text-sm text-neutral-400">Optimize how your link looks on social media</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Share Title</label>
            <Input
              placeholder="Post Title for Social Media"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Share Description</label>
            <Textarea
              placeholder="Short catchy description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-white/[0.03] border-white/10 rounded-2xl p-4 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 px-1">Page URL</label>
            <Input
              placeholder="https://example.com/post"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
            />
          </div>

          <Button onClick={generateOG} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg mt-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate OG Tags
          </Button>
        </div>
      </Card>
    </div>
  );
}
