"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RotateCcw, ChevronRight, ChevronDown, Search, Globe, Shield, Clock, Hash } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

// ─── SQL Formatter ────────────────────────────────────────────────────────────
const SQL_KEYWORDS = ["SELECT","FROM","WHERE","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","ALTER","DROP","INDEX","JOIN","LEFT","RIGHT","INNER","OUTER","ON","AND","OR","NOT","IN","LIKE","BETWEEN","IS","NULL","ORDER","BY","GROUP","HAVING","LIMIT","OFFSET","DISTINCT","AS","UNION","ALL","EXISTS","CASE","WHEN","THEN","ELSE","END","PRIMARY","KEY","FOREIGN","REFERENCES","CONSTRAINT","DEFAULT","AUTO_INCREMENT","UNIQUE","COUNT","SUM","AVG","MIN","MAX","COALESCE","IFNULL","CONCAT","SUBSTRING","LENGTH","NOW","DATE","YEAR","MONTH","DAY","IF","BEGIN","COMMIT","ROLLBACK","TRANSACTION"];

function formatSQL(sql: string): string {
  let result = sql.trim();
  // Upper-case keywords
  SQL_KEYWORDS.forEach((kw) => {
    result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), kw);
  });
  // Break before major clauses
  const clauses = ["SELECT","FROM","WHERE","LEFT JOIN","RIGHT JOIN","INNER JOIN","JOIN","ON","AND","OR","ORDER BY","GROUP BY","HAVING","LIMIT","OFFSET","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","CREATE TABLE","ALTER TABLE","DROP TABLE"];
  clauses.forEach((clause) => {
    result = result.replace(new RegExp(`\\s+${clause}\\s+`, "gi"), `\n${clause} `);
  });
  // Indent continuation lines
  const lines = result.split("\n");
  return lines.map((line, i) => (i === 0 ? line : "  " + line.trim())).join("\n");
}

export function SQLFormatter() {
  const [input, setInput] = useState("select id, name, email from users where status = 'active' and created_at > '2024-01-01' order by name limit 100");
  const output = formatSQL(input);

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-neutral-500">Paste SQL to format and beautify</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setInput("")} className="border-white/10 text-neutral-400"><RotateCcw size={13} className="mr-1.5" /> Clear</Button>
          <Button size="sm" onClick={() => copyToClipboard(output).then(ok => ok && toast.success("Copied"))} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"><Copy size={13} className="mr-1.5" /> Copy</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Input SQL</label>
          <Textarea value={input} onChange={e => setInput(e.target.value)} className="min-h-[280px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm resize-none w-full focus:border-emerald-500/50" placeholder="SELECT * FROM users..." />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Formatted SQL</label>
          <Textarea readOnly value={output} className="min-h-[280px] bg-black/40 border-emerald-500/20 rounded-xl p-4 font-mono text-sm text-emerald-400 resize-none w-full" />
        </div>
      </div>
    </div>
  );
}

// ─── JSON Viewer ──────────────────────────────────────────────────────────────
function JSONNode({ data, depth = 0 }: { data: any; depth?: number }) {
  const [collapsed, setCollapsed] = useState(depth > 2);
  const indent = depth * 16;

  if (data === null) return <span className="text-neutral-500">null</span>;
  if (typeof data === "boolean") return <span className="text-purple-400">{String(data)}</span>;
  if (typeof data === "number") return <span className="text-emerald-500">{data}</span>;
  if (typeof data === "string") return <span className="text-emerald-400">"{data}"</span>;

  const isArray = Array.isArray(data);
  const keys = Object.keys(data);
  const braces = isArray ? ["[", "]"] : ["{", "}"];

  return (
    <span>
      <button onClick={() => setCollapsed(!collapsed)} className="text-neutral-400 hover:text-white mr-1">
        {collapsed ? <ChevronRight size={12} className="inline" /> : <ChevronDown size={12} className="inline" />}
      </button>
      <span className="text-neutral-300">{braces[0]}</span>
      {collapsed ? (
        <span className="text-neutral-500 cursor-pointer" onClick={() => setCollapsed(false)}> {isArray ? `${keys.length} items` : `${keys.length} keys`} </span>
      ) : (
        <div style={{ marginLeft: indent + 16 }}>
          {keys.map((k, i) => (
            <div key={k} className="leading-6">
              {!isArray && <span className="text-yellow-300">"{k}"</span>}
              {!isArray && <span className="text-neutral-400">: </span>}
              <JSONNode data={data[k]} depth={depth + 1} />
              {i < keys.length - 1 && <span className="text-neutral-600">,</span>}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginLeft: indent }} className="text-neutral-300">{braces[1]}</div>
    </span>
  );
}

export function JSONViewer() {
  const [input, setInput] = useState('{"name":"ToolVerse","version":"2.0","features":["SEO","Responsive","Fast"],"meta":{"tools":70,"categories":8}}');
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState("");

  const parse = () => {
    try { setParsed(JSON.parse(input)); setError(""); }
    catch (e: any) { setError(e.message); setParsed(null); }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" onClick={parse} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">Parse &amp; View</Button>
        <Button size="sm" variant="outline" onClick={() => { setInput(""); setParsed(null); setError(""); }} className="border-white/10 text-neutral-400"><RotateCcw size={13} className="mr-1.5" /> Clear</Button>
        {parsed && <Button size="sm" variant="outline" onClick={() => copyToClipboard(JSON.stringify(parsed, null, 2)).then(ok => ok && toast.success("Copied"))} className="border-white/10 text-neutral-400"><Copy size={13} className="mr-1.5" /> Copy Formatted</Button>}
      </div>
      <Textarea value={input} onChange={e => setInput(e.target.value)} className="min-h-[120px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm resize-none w-full focus:border-emerald-500/50" placeholder='{"key": "value"}' />
      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">{error}</div>}
      {parsed && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm overflow-auto max-h-[400px]">
          <JSONNode data={parsed} />
        </div>
      )}
    </div>
  );
}

// ─── Unix Timestamp Converter ─────────────────────────────────────────────────
export function UnixTimestampConverter() {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));

  const fromTs = () => {
    const n = parseInt(ts);
    if (isNaN(n)) { toast.error("Invalid timestamp"); return; }
    const d = new Date(n < 1e10 ? n * 1000 : n);
    setDateStr(d.toISOString().slice(0, 16));
  };

  const toTs = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) { toast.error("Invalid date"); return; }
    setTs(Math.floor(d.getTime() / 1000).toString());
  };

  const now = () => { const n = Math.floor(Date.now() / 1000); setTs(n.toString()); setDateStr(new Date(n * 1000).toISOString().slice(0, 16)); };
  const localDate = ts && !isNaN(parseInt(ts)) ? new Date(parseInt(ts) * 1000) : null;

  return (
    <div className="space-y-5 w-full">
      <Button size="sm" onClick={now} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"><Clock size={13} className="mr-1.5" /> Use Current Time</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Unix Timestamp</label>
          <div className="flex gap-2">
            <Input value={ts} onChange={e => setTs(e.target.value)} className="font-mono bg-white/[0.03] border-white/10 focus:border-emerald-500/50" placeholder="1704067200" />
            <Button size="sm" onClick={fromTs} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold shrink-0">→ Date</Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Date &amp; Time (Local)</label>
          <div className="flex gap-2">
            <input type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)} className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
            <Button size="sm" onClick={toTs} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold shrink-0">→ Unix</Button>
          </div>
        </div>
      </div>
      {localDate && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "UTC", val: localDate.toUTCString() },
            { label: "ISO 8601", val: localDate.toISOString() },
            { label: "Local", val: localDate.toLocaleString() },
            { label: "Relative", val: `${Math.round((Date.now() - localDate.getTime()) / 1000 / 60)} min ago` },
          ].map(({ label, val }) => (
            <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-white/20" onClick={() => copyToClipboard(val).then(ok => ok && toast.success("Copied"))}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
              <p className="text-xs text-white font-mono break-all">{val}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DNS Lookup ───────────────────────────────────────────────────────────────
const DNS_TYPES = ["A","AAAA","MX","CNAME","TXT","NS","SOA","PTR","SRV"];

export function DNSLookup() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    if (!domain.trim()) { toast.error("Enter a domain"); return; }
    setLoading(true); setError(""); setResults([]);
    try {
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain.trim())}&type=${type}`, { headers: { Accept: "application/dns-json" } });
      const data = await res.json();
      if (data.Answer) { setResults(data.Answer); }
      else { setError("No records found for this query."); }
    } catch { setError("DNS lookup failed. Check your domain and try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} placeholder="example.com" className="flex-1 bg-white/[0.03] border-white/10 focus:border-emerald-500/50" />
        <div className="flex gap-2">
          <select value={type} onChange={e => setType(e.target.value)} className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none">
            {DNS_TYPES.map(t => <option key={t} value={t} className="bg-neutral-900">{t}</option>)}
          </select>
          <Button onClick={lookup} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold shrink-0">
            {loading ? "Looking up…" : <><Search size={14} className="mr-1.5" /> Lookup</>}
          </Button>
        </div>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {results.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-neutral-400">
              <tr>{["Name","Type","TTL","Data"].map(h => <th key={h} className="px-4 py-2 text-left text-[10px] font-bold uppercase tracking-widest">{h}</th>)}</tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-2 font-mono text-xs text-white max-w-[120px] truncate">{r.name}</td>
                  <td className="px-4 py-2"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400">{DNS_TYPES[r.type - 1] ?? r.type}</span></td>
                  <td className="px-4 py-2 text-neutral-400 font-mono text-xs">{r.TTL}s</td>
                  <td className="px-4 py-2 font-mono text-xs text-white break-all">{r.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── IP Address Lookup ────────────────────────────────────────────────────────
export function IPLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async (target = ip) => {
    setLoading(true); setError(""); setData(null);
    try {
      const url = target.trim() ? `https://ipapi.co/${target.trim()}/json/` : "https://ipapi.co/json/";
      const res = await fetch(url);
      const json = await res.json();
      if (json.error) throw new Error(json.reason ?? "Not found");
      setData(json);
      if (!target.trim()) setIp(json.ip);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const fields = data ? [
    { label: "IP Address", val: data.ip }, { label: "Country", val: `${data.country_name} (${data.country_code})` },
    { label: "Region", val: data.region }, { label: "City", val: data.city },
    { label: "ISP / Org", val: data.org }, { label: "Timezone", val: data.timezone },
    { label: "Latitude", val: data.latitude }, { label: "Longitude", val: data.longitude },
    { label: "Postal Code", val: data.postal }, { label: "Currency", val: data.currency },
    { label: "Calling Code", val: data.country_calling_code }, { label: "Language", val: data.languages?.split(",")[0] },
  ] : [];

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input value={ip} onChange={e => setIp(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} placeholder="Leave blank to lookup your IP" className="flex-1 bg-white/[0.03] border-white/10 focus:border-emerald-500/50" />
        <div className="flex gap-2">
          <Button onClick={() => lookup()} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
            {loading ? "Looking up…" : <><Globe size={14} className="mr-1.5" /> Lookup</>}
          </Button>
          <Button variant="outline" onClick={() => { setIp(""); lookup(""); }} disabled={loading} className="border-white/10 text-neutral-400">My IP</Button>
        </div>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fields.map(({ label, val }) => val && (
            <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
              <p className="text-sm text-white font-medium">{String(val)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SSL Certificate Checker ──────────────────────────────────────────────────
export function SSLChecker() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = async () => {
    if (!domain.trim()) { toast.error("Enter a domain"); return; }
    setLoading(true); setError(""); setData(null);
    try {
      const clean = domain.trim().replace(/^https?:\/\//, "").split("/")[0];
      const res = await fetch(`/api/ssl-check?domain=${encodeURIComponent(clean)}`);
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Check failed");
      setData(json);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input value={domain} onChange={e => setDomain(e.target.value)} onKeyDown={e => e.key === "Enter" && check()} placeholder="example.com" className="flex-1 bg-white/[0.03] border-white/10 focus:border-emerald-500/50" />
        <Button onClick={check} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
          {loading ? "Checking…" : <><Shield size={14} className="mr-1.5" /> Check SSL</>}
        </Button>
      </div>
      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {data && (
        <div className="space-y-3">
          <div className={`flex items-center gap-3 p-4 rounded-xl border ${data.valid ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
            <Shield size={20} className={data.valid ? "text-emerald-400" : "text-red-400"} />
            <div>
              <p className={`text-base font-bold ${data.valid ? "text-emerald-400" : "text-red-400"}`}>{data.valid ? "SSL Certificate Valid" : "SSL Certificate Issue"}</p>
              <p className="text-xs text-neutral-400">{data.subject}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Issued To", val: data.subject }, { label: "Issued By", val: data.issuer },
              { label: "Valid From", val: data.validFrom }, { label: "Valid Until", val: data.validTo },
              { label: "Days Remaining", val: data.daysRemaining }, { label: "Protocol", val: data.protocol },
            ].map(({ label, val }) => (
              <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
                <p className="text-sm text-white">{String(val)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Markdown to HTML ─────────────────────────────────────────────────────────
function mdToHtml(md: string): string {
  let h = md;
  h = h.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  h = h.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  h = h.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  h = h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*(.+?)\*/g, "<em>$1</em>");
  h = h.replace(/`(.+?)`/g, "<code>$1</code>");
  h = h.replace(/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>");
  h = h.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  h = h.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  h = h.replace(/^---$/gm, "<hr>");
  h = h.replace(/^[\-\*] (.+)$/gm, "<li>$1</li>");
  h = h.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
  h = h.replace(/(<li>[\s\S]+?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
  h = h.replace(/\n\n/g, "</p><p>");
  return `<p>${h}</p>`;
}

export function MarkdownToHTML() {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)");
  const html = mdToHtml(md);

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => setMd("")} className="border-white/10 text-neutral-400"><RotateCcw size={13} className="mr-1.5" /> Clear</Button>
        <Button size="sm" onClick={() => copyToClipboard(html).then(ok => ok && toast.success("HTML copied"))} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"><Copy size={13} className="mr-1.5" /> Copy HTML</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Markdown Input</label>
          <Textarea value={md} onChange={e => setMd(e.target.value)} className="min-h-[280px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm resize-none w-full focus:border-emerald-500/50" placeholder="# Your markdown here..." />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">HTML Output</label>
          <Textarea readOnly value={html} className="min-h-[280px] bg-black/40 border-emerald-500/20 rounded-xl p-4 font-mono text-sm text-emerald-400 resize-none w-full" />
        </div>
      </div>
    </div>
  );
}

// ─── HTML to Markdown ─────────────────────────────────────────────────────────
function htmlToMd(html: string): string {
  let m = html;
  m = m.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1");
  m = m.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1");
  m = m.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1");
  m = m.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  m = m.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
  m = m.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
  m = m.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
  m = m.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
  m = m.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```");
  m = m.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
  m = m.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1");
  m = m.replace(/<ul[^>]*>|<\/ul>/gi, "");
  m = m.replace(/<ol[^>]*>|<\/ol>/gi, "");
  m = m.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
  m = m.replace(/<br\s*\/?>/gi, "\n");
  m = m.replace(/<hr\s*\/?>/gi, "\n---\n");
  m = m.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1");
  m = m.replace(/<[^>]+>/g, "");
  m = m.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return m.replace(/\n{3,}/g, "\n\n").trim();
}

export function HTMLToMarkdown() {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n<a href="https://example.com">Link</a>');
  const md = htmlToMd(html);

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => setHtml("")} className="border-white/10 text-neutral-400"><RotateCcw size={13} className="mr-1.5" /> Clear</Button>
        <Button size="sm" onClick={() => copyToClipboard(md).then(ok => ok && toast.success("Markdown copied"))} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"><Copy size={13} className="mr-1.5" /> Copy MD</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">HTML Input</label>
          <Textarea value={html} onChange={e => setHtml(e.target.value)} className="min-h-[280px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm resize-none w-full focus:border-emerald-500/50" placeholder="<h1>Your HTML</h1>" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Markdown Output</label>
          <Textarea readOnly value={md} className="min-h-[280px] bg-black/40 border-emerald-500/20 rounded-xl p-4 font-mono text-sm text-emerald-400 resize-none w-full" />
        </div>
      </div>
    </div>
  );
}

// ─── SHA-256 Hash Generator ───────────────────────────────────────────────────
export function SHA256Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) { toast.error("Enter text to hash"); return; }
    setLoading(true);
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(input));
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    setHash(hex);
    setLoading(false);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Input Text</label>
        <Textarea value={input} onChange={e => { setInput(e.target.value); setHash(""); }} className="min-h-[120px] bg-white/[0.03] border-white/10 rounded-xl p-4 text-sm resize-none w-full focus:border-emerald-500/50" placeholder="Enter text to hash..." />
      </div>
      <div className="flex gap-2">
        <Button onClick={generate} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"><Hash size={14} className="mr-1.5" /> Generate SHA-256</Button>
        <Button size="sm" variant="outline" onClick={() => { setInput(""); setHash(""); }} className="border-white/10 text-neutral-400"><RotateCcw size={13} className="mr-1.5" /> Clear</Button>
      </div>
      {hash && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">SHA-256 Hash</label>
          <div className="flex gap-2 items-center p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="font-mono text-sm text-emerald-400 break-all flex-1">{hash}</p>
            <Button size="icon" className="shrink-0 h-8 w-8 bg-white/10 hover:bg-emerald-500 hover:text-black" onClick={() => copyToClipboard(hash).then(ok => ok && toast.success("Hash copied"))}><Copy size={13} /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Bcrypt Hash Generator ────────────────────────────────────────────────────
export function BcryptGenerator() {
  const [input, setInput] = useState("");
  const [rounds, setRounds] = useState("10");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const generate = async () => {
    if (!input) { toast.error("Enter text to hash"); return; }
    setLoading(true); setHash("");
    try {
      const res = await fetch("/api/bcrypt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: input, rounds: parseInt(rounds) }) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Hashing failed");
      setHash(data.hash);
      toast.success("Hash generated");
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  const verify = async () => {
    if (!verifyInput || !hash) { toast.error("Enter both text and hash"); return; }
    try {
      const res = await fetch("/api/bcrypt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: verifyInput, hash }) });
      const data = await res.json();
      setVerifyResult(data.match);
    } catch { toast.error("Verification failed"); }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Text to Hash</label>
          <Input value={input} onChange={e => { setInput(e.target.value); setHash(""); }} type="password" className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50" placeholder="Enter password or text..." />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Cost Rounds</label>
          <select value={rounds} onChange={e => setRounds(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none h-10">
            {["8","10","12","14"].map(r => <option key={r} value={r} className="bg-neutral-900">{r} rounds ({r === "10" ? "recommended" : r === "8" ? "faster" : "slower/secure"})</option>)}
          </select>
        </div>
      </div>
      <Button onClick={generate} disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
        {loading ? "Hashing… (this takes a moment)" : <><Hash size={14} className="mr-1.5" /> Generate Bcrypt Hash</>}
      </Button>
      {hash && (
        <>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Bcrypt Hash</label>
            <div className="flex gap-2 items-start p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="font-mono text-sm text-emerald-400 break-all flex-1">{hash}</p>
              <Button size="icon" className="shrink-0 h-8 w-8 bg-white/10 hover:bg-emerald-500 hover:text-black" onClick={() => copyToClipboard(hash).then(ok => ok && toast.success("Copied"))}><Copy size={13} /></Button>
            </div>
          </div>
          <div className="space-y-2 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Verify Text Against Hash</label>
            <div className="flex gap-2">
              <Input value={verifyInput} onChange={e => { setVerifyInput(e.target.value); setVerifyResult(null); }} type="password" className="flex-1 bg-white/[0.03] border-white/10 focus:border-emerald-500/50" placeholder="Enter text to verify..." />
              <Button onClick={verify} variant="outline" className="shrink-0 border-white/10 text-neutral-300">Verify</Button>
            </div>
            {verifyResult !== null && (
              <p className={`text-sm font-bold ${verifyResult ? "text-emerald-400" : "text-red-400"}`}>
                {verifyResult ? "✓ Text matches the hash" : "✗ Text does NOT match the hash"}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
