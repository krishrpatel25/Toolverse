"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// ─── helpers ──────────────────────────────────────────────────────────────────
function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 ** 2) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 ** 2).toFixed(2)} MB`;
}

// ─── Image Background Remover ─────────────────────────────────────────────────
// Tolerance-based flood-fill from all 4 corners, replacing matched pixels with transparency
function removeBackground(imageData: ImageData, tolerance: number): ImageData {
  const { width, height, data } = imageData;
  const visited = new Uint8Array(width * height);
  const result = new Uint8ClampedArray(data);
  let px0; // corner pixel colour

  const getPixel = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]] as [number, number, number, number];
  };

  const colorDiff = (c1: [number,number,number,number], c2: [number,number,number,number]) =>
    Math.abs(c1[0]-c2[0]) + Math.abs(c1[1]-c2[1]) + Math.abs(c1[2]-c2[2]);

  const fill = (sx: number, sy: number) => {
    const ref = getPixel(sx, sy);
    const queue: [number, number][] = [[sx, sy]];
    while (queue.length) {
      const [x, y] = queue.pop()!;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      const idx = y * width + x;
      if (visited[idx]) continue;
      visited[idx] = 1;
      if (colorDiff(getPixel(x, y), ref) > tolerance) continue;
      const ri = idx * 4;
      result[ri + 3] = 0; // transparent
      queue.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
  };

  fill(0, 0);
  fill(width - 1, 0);
  fill(0, height - 1);
  fill(width - 1, height - 1);

  return new ImageData(result, width, height);
}

export function ImageBackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(35);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Please upload an image"); return; }
    setFile(f); setPreview(URL.createObjectURL(f)); setResult(null);
  }, []);

  const remove = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const processed = removeBackground(imageData, tolerance);
          ctx.putImageData(processed, 0, 0);
          setResult(canvas.toDataURL("image/png"));
          resolve();
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
      toast.success("Background removed!");
    } catch { toast.error("Processing failed"); }
    finally { setProcessing(false); }
  };

  return (
    <div className="space-y-5 w-full">
      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs">
        💡 Works best with images that have a solid or uniform background colour. Adjust tolerance for best results.
      </div>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.label key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 min-h-[180px] rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:border-white/20 cursor-pointer transition-all"
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          >
            <ImageIcon className="w-8 h-8 text-emerald-400" />
            <div className="text-center"><p className="text-sm font-semibold text-white">Drop image here or click to browse</p><p className="text-xs text-neutral-500">PNG, JPG, WebP</p></div>
            <input type="file" accept="image/*" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </motion.label>
        ) : (
          <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-center">Original</p>
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
                  <img src={preview!} className="w-full max-h-[220px] object-contain" alt="Original" />
                  <button onClick={() => { setFile(null); setPreview(null); setResult(null); }} className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-center">Result (transparent)</p>
                <div className="rounded-xl overflow-hidden border border-white/10 max-h-[220px] flex items-center justify-center" style={{ background: "repeating-conic-gradient(#374151 0% 25%, #1f2937 0% 50%) 0 0 / 16px 16px" }}>
                  {result ? <img src={result} className="max-h-[220px] object-contain" alt="Result" /> : <p className="text-xs text-neutral-600 p-4 text-center">Process the image to see the result</p>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Colour Tolerance</label>
                <span className="text-sm font-bold text-white">{tolerance}</span>
              </div>
              <input type="range" min={5} max={120} value={tolerance} onChange={e => { setTolerance(+e.target.value); setResult(null); }} className="w-full accent-emerald-500 h-1.5 rounded-full appearance-none cursor-pointer bg-white/5" />
              <div className="flex justify-between text-[10px] text-neutral-600"><span>5 — Precise</span><span>120 — Aggressive</span></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={remove} disabled={processing} className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">
                {processing ? "Removing…" : "Remove Background"}
              </Button>
              {result && (
                <Button asChild className="h-11 bg-white/10 hover:bg-white/20 text-white rounded-xl px-4">
                  <a href={result} download={(file?.name ?? "image").replace(/\.[^.]+$/, "-nobg.png")}><Download size={15} /></a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Favicon Generator ────────────────────────────────────────────────────────
const FAVICON_SIZES = [16, 32, 48, 64, 128, 256];
const FAVICON_BG_PRESETS = ["#000000","#ffffff","#1f2937","#6366f1","#10b981","#f59e0b","#ef4444","#3b82f6"];

export function FaviconGenerator() {
  const [text, setText] = useState("T");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(60);
  const [shape, setShape] = useState<"square" | "circle" | "rounded">("rounded");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<"text" | "image">("text");
  const [selectedSize, setSelectedSize] = useState(32);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 256;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    // Shape clipping
    ctx.beginPath();
    if (shape === "circle") { ctx.arc(size/2, size/2, size/2, 0, Math.PI*2); }
    else if (shape === "rounded") {
      const r = size * 0.2;
      ctx.moveTo(r, 0); ctx.lineTo(size-r, 0); ctx.arcTo(size, 0, size, r, r);
      ctx.lineTo(size, size-r); ctx.arcTo(size, size, size-r, size, r);
      ctx.lineTo(r, size); ctx.arcTo(0, size, 0, size-r, r);
      ctx.lineTo(0, r); ctx.arcTo(0, 0, r, 0, r);
    } else { ctx.rect(0, 0, size, size); }
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.clip();

    if (mode === "text") {
      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(text.slice(0, 2), size/2, size/2);
    } else if (file && preview) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, size, size); setPreview(canvas.toDataURL("image/png")); };
      img.src = URL.createObjectURL(file);
      return;
    }
    setPreview(canvas.toDataURL("image/png"));
  }, [text, bgColor, textColor, fontSize, shape, mode, file]);

  useEffect(() => { generate(); }, [generate]);

  const download = (size: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const src = canvasRef.current!;
    ctx.drawImage(src, 0, 0, size, size);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `favicon-${size}x${size}.png`;
    a.click();
    toast.success(`Downloaded ${size}×${size} favicon`);
  };

  const downloadICO = () => {
    // Download the 32x32 PNG as favicon.ico (browsers accept PNG in .ico files)
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    canvas.getContext("2d")!.drawImage(canvasRef.current!, 0, 0, 32, 32);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "favicon.ico";
    a.click();
    toast.success("favicon.ico downloaded");
  };

  return (
    <div className="space-y-5 w-full">
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex gap-2 flex-wrap">
        {(["text","image"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${mode === m ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/10 text-neutral-500 hover:border-white/20"}`}>
            {m === "text" ? "Text / Letter" : "Upload Image"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Controls */}
        <div className="space-y-4">
          {mode === "text" ? (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Text (1–2 characters)</label>
                <Input value={text} onChange={e => setText(e.target.value.slice(0, 2))} className="bg-white/[0.03] border-white/10 focus:border-emerald-500/50 text-xl font-bold" maxLength={2} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Font Size</label>
                <input type="range" min={20} max={120} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-emerald-500 h-1.5 rounded-full appearance-none cursor-pointer bg-white/5" />
              </div>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 min-h-[100px] rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 cursor-pointer bg-white/[0.02] transition-all">
              <Upload className="w-6 h-6 text-emerald-400" />
              <p className="text-xs text-neutral-400">{file ? file.name : "Upload image"}</p>
              <input type="file" accept="image/*" className="sr-only" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); } }} />
            </label>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Shape</label>
            <div className="flex gap-2">
              {(["square","rounded","circle"] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${shape === s ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/10 text-neutral-500"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Background</label>
              <div className="flex flex-wrap gap-1.5">
                {FAVICON_BG_PRESETS.map(c => (
                  <button key={c} onClick={() => setBgColor(c)} title={c} className={`w-6 h-6 rounded-md border-2 transition-all ${bgColor === c ? "border-white scale-110" : "border-transparent"}`} style={{ background: c }} />
                ))}
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent" title="Custom" />
              </div>
            </div>
            {mode === "text" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Text Color</label>
                <div className="flex flex-wrap gap-1.5">
                  {["#ffffff","#000000","#10b981","#6366f1"].map(c => (
                    <button key={c} onClick={() => setTextColor(c)} className={`w-6 h-6 rounded-md border-2 transition-all ${textColor === c ? "border-white scale-110" : "border-transparent"}`} style={{ background: c }} />
                  ))}
                  <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview + Download */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 self-start">Preview</label>
            <div className="flex items-end gap-3">
              {[64, 32, 16].map(s => (
                <div key={s} className="text-center space-y-1">
                  {preview && <img src={preview} alt="favicon" width={s} height={s} className="rounded mx-auto border border-white/10" style={{ imageRendering: "pixelated" }} />}
                  <p className="text-[9px] text-neutral-600">{s}px</p>
                </div>
              ))}
              {preview && <img src={preview} alt="favicon" width={128} height={128} className="rounded-xl border border-white/10" />}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Download Sizes</label>
            <div className="flex flex-wrap gap-2">
              {FAVICON_SIZES.map(s => (
                <button key={s} onClick={() => download(s)} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-400 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all font-bold">
                  {s}×{s}
                </button>
              ))}
            </div>
            <Button onClick={downloadICO} className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">
              <Download size={14} className="mr-2" /> Download favicon.ico (32×32)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
