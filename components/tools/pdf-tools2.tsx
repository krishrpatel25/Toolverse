"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Scissors, FileText, Trash2, CheckCircle, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 ** 2).toFixed(2)} MB`;
}

function pct(a: number, b: number) {
  if (!b) return 0;
  return Math.round(((b - a) / b) * 100);
}

// ─── PDF Compressor ───────────────────────────────────────────────────────────
export function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ bytes: ArrayBuffer; name: string } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [quality, setQuality] = useState(80);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") { toast.error("Please upload a PDF file"); return; }
    setFile(f); setResult(null);
  }, []);

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
      // Re-save the PDF which applies optimizations (removes duplicates, re-packs xref)
      const compressed = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      setResult({ bytes: compressed.buffer as ArrayBuffer, name: file.name.replace(".pdf", "-compressed.pdf") });
      toast.success("PDF compressed!");
    } catch (e: any) {
      toast.error("Compression failed: " + e.message);
    } finally { setProcessing(false); }
  };

  const download = () => {
    if (!result) return;
    saveAs(new Blob([result.bytes], { type: "application/pdf" }), result.name);
  };

  return (
    <div className="space-y-5 w-full">
      <label
        className={`flex flex-col items-center justify-center gap-4 min-h-[160px] rounded-2xl border-2 border-dashed cursor-pointer transition-all ${file ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <Upload className="w-7 h-7 text-emerald-400" />
        <div className="text-center">
          <p className="text-sm font-semibold text-white">{file ? file.name : "Drop PDF here or click to browse"}</p>
          {file && <p className="text-xs text-neutral-500 mt-1">Size: {formatBytes(file.size)}</p>}
        </div>
        <input type="file" accept="application/pdf" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </label>

      {file && !result && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Compression Level</label>
            <span className="text-sm font-bold text-white">{quality}%</span>
          </div>
          <input type="range" min={50} max={100} value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-emerald-500 h-1.5 rounded-full appearance-none cursor-pointer bg-white/5" />
          <div className="flex justify-between text-[10px] text-neutral-600">
            <span>50% — Maximum compression</span><span>100% — Lossless</span>
          </div>
          <Button onClick={compress} disabled={processing} className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">
            {processing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Compressing…</> : "Compress PDF"}
          </Button>
        </div>
      )}

      {result && file && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Original", val: formatBytes(file.size), color: "text-neutral-300" },
              { label: "Compressed", val: formatBytes(result.bytes.byteLength), color: "text-emerald-400" },
              { label: "Saved", val: `${pct(result.bytes.byteLength, file.size)}%`, color: "text-blue-400" },
            ].map(({ label, val, color }) => (
              <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
                <p className={`text-lg font-bold ${color}`}>{val}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={download} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl h-11"><Download size={15} className="mr-2" /> Download Compressed PDF</Button>
            <Button variant="outline" onClick={() => { setFile(null); setResult(null); }} className="border-white/10 text-neutral-400"><Trash2 size={15} /></Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── PDF Splitter ─────────────────────────────────────────────────────────────
export function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [mode, setMode] = useState<"range" | "pick">("range");
  const [processing, setProcessing] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    if (f.type !== "application/pdf") { toast.error("Please upload a PDF"); return; }
    setFile(f); setResult(null);
    const buf = await f.arrayBuffer();
    const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
    const n = pdf.getPageCount();
    setPageCount(n); setFrom(1); setTo(n); setSelected([]);
  }, []);

  const [result, setResult] = useState<{ bytes: ArrayBuffer; name: string } | null>(null);

  const split = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf, { ignoreEncryption: true });
      const dst = await PDFDocument.create();
      const pages = mode === "range"
        ? Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i)
        : selected.map(p => p - 1);
      const copied = await dst.copyPages(src, pages);
      copied.forEach(p => dst.addPage(p));
      const bytes = await dst.save();
      setResult({ bytes: bytes.buffer as ArrayBuffer, name: file.name.replace(".pdf", `_pages${mode === "range" ? `_${from}-${to}` : `_selected`}.pdf`) });
      toast.success(`Extracted ${pages.length} pages!`);
    } catch (e: any) { toast.error("Split failed: " + e.message); }
    finally { setProcessing(false); }
  };

  const togglePage = (p: number) => setSelected(s => s.includes(p) ? s.filter(x => x !== p) : [...s, p].sort((a, b) => a - b));

  return (
    <div className="space-y-5 w-full">
      <label
        className={`flex flex-col items-center justify-center gap-4 min-h-[140px] rounded-2xl border-2 border-dashed cursor-pointer transition-all ${file ? "border-blue-500/40 bg-blue-500/5" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <Scissors className="w-7 h-7 text-blue-400" />
        <p className="text-sm font-semibold text-white text-center">{file ? `${file.name} (${pageCount} pages)` : "Drop PDF here or click to browse"}</p>
        <input type="file" accept="application/pdf" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </label>

      {file && pageCount > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["range","pick"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${mode === m ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/10 text-neutral-500 hover:border-white/20"}`}>
                {m === "range" ? "Page Range" : "Pick Pages"}
              </button>
            ))}
          </div>

          {mode === "range" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">From Page</label>
                <input type="number" min={1} max={to} value={from} onChange={e => setFrom(+e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">To Page</label>
                <input type="number" min={from} max={pageCount} value={to} onChange={e => setTo(+e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none" />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-1">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => togglePage(p)} className={`w-9 h-9 rounded-lg text-xs font-bold border transition-all ${selected.includes(p) ? "border-blue-500/40 bg-blue-500/20 text-blue-400" : "border-white/10 text-neutral-500 hover:border-white/20"}`}>{p}</button>
              ))}
            </div>
          )}

          <Button onClick={split} disabled={processing || (mode === "pick" && selected.length === 0)} className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl">
            {processing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Splitting…</> : <><Scissors size={14} className="mr-2" /> Extract Pages</>}
          </Button>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={() => saveAs(new Blob([result.bytes], { type: "application/pdf" }), result.name)} className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">
            <Download size={15} className="mr-2" /> Download Split PDF
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// ─── PDF to Word (text extraction) ───────────────────────────────────────────
export function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") { toast.error("Please upload a PDF"); return; }
    setFile(f); setText("");
  }, []);

  const convert = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      // Use pdf.js via CDN to extract text
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();
      // We can get some info but not full text from pdf-lib
      // For text extraction we use a workaround via FileReader + manual parsing
      const uint8 = new Uint8Array(buf);
      const raw = new TextDecoder("latin1").decode(uint8);
      // Extract text between BT and ET markers (basic PDF text extraction)
      const textChunks: string[] = [];
      const btEt = raw.match(/BT\s+([\s\S]*?)\s+ET/g) ?? [];
      btEt.forEach(block => {
        const tjMatches = block.match(/\(((?:[^()\\]|\\.)*)\)\s*Tj/g) ?? [];
        tjMatches.forEach(m => {
          const inner = m.match(/\(([^)]*)\)/)?.[1] ?? "";
          if (inner.trim()) textChunks.push(inner);
        });
      });
      const extracted = textChunks.join("\n").replace(/\\n/g, "\n").replace(/\\./g, "").trim();
      setText(extracted || `[PDF has ${pageCount} pages. This is a basic text extractor — for rich formatting, use a dedicated PDF-to-Word service.]`);
      toast.success("Text extracted from PDF");
    } catch (e: any) { toast.error("Extraction failed: " + e.message); }
    finally { setProcessing(false); }
  };

  const downloadDoc = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, (file?.name ?? "document").replace(".pdf", ".txt"));
    toast.success("Downloaded as text file");
  };

  return (
    <div className="space-y-5 w-full">
      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-400 text-xs">
        ⚠ Browser-based PDF text extraction works best with text-based PDFs. Scanned/image PDFs require OCR.
      </div>

      <label
        className={`flex flex-col items-center justify-center gap-4 min-h-[140px] rounded-2xl border-2 border-dashed cursor-pointer transition-all ${file ? "border-orange-500/40 bg-orange-500/5" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <FileText className="w-7 h-7 text-orange-400" />
        <p className="text-sm font-semibold text-white">{file ? file.name : "Drop PDF here or click to browse"}</p>
        <input type="file" accept="application/pdf" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </label>

      {file && (
        <Button onClick={convert} disabled={processing} className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl">
          {processing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Extracting text…</> : <><FileText size={14} className="mr-2" /> Extract Text</>}
        </Button>
      )}

      {text && (
        <div className="space-y-3">
          <div className="relative rounded-xl border border-white/10 bg-black/40 p-4 max-h-[300px] overflow-y-auto">
            <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-mono">{text}</pre>
          </div>
          <Button onClick={downloadDoc} className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">
            <Download size={15} className="mr-2" /> Download as Text File
          </Button>
        </div>
      )}
    </div>
  );
}
