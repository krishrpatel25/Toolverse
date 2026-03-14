"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw, Image as ImageIcon, ArrowRight, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormatKey = "jpg" | "png" | "webp" | "bmp" | "gif";

interface ConversionRoute {
  from: FormatKey;
  to: FormatKey;
  label: string;
  mime: string;
  quality?: number;
}

const FORMAT_MIME: Record<FormatKey, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  bmp: "image/bmp",
  gif: "image/gif",
};

const FORMAT_LABEL: Record<FormatKey, string> = {
  jpg: "JPG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",
  gif: "GIF",
};

const FORMAT_COLOR: Record<FormatKey, string> = {
  jpg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  png: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  webp: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  bmp: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  gif: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

// ─── Core converter component ─────────────────────────────────────────────────
function convertOnCanvas(file: File, toFormat: FormatKey, quality = 0.92): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      // Fill white background for JPG/BMP (no transparency)
      if (toFormat === "jpg" || toFormat === "bmp") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const mime = FORMAT_MIME[toFormat];
      const dataUrl = canvas.toDataURL(mime, quality);
      resolve(dataUrl);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ onFile, fromFormat }: { onFile: (f: File) => void; fromFormat?: FormatKey }) {
  const [dragging, setDragging] = useState(false);

  const accept = fromFormat
    ? `image/${fromFormat === "jpg" ? "jpeg,image/jpg" : fromFormat}`
    : "image/*";

  const handle = (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file"); return; }
    onFile(file);
  };

  return (
    <label
      className={`flex flex-col items-center justify-center gap-4 min-h-[200px] rounded-2xl border-2 border-dashed cursor-pointer transition-all select-none
        ${dragging ? "border-emerald-500 bg-emerald-500/5" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
    >
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <Upload className="w-8 h-8 text-emerald-400" />
      </div>
      <div className="text-center px-4">
        <p className="text-sm font-semibold text-white mb-1">Drop image here or click to browse</p>
        <p className="text-xs text-neutral-500">PNG, JPG, WebP, BMP, GIF supported</p>
      </div>
      <input type="file" accept={accept} className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }} />
    </label>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface ImageFormatConverterProps {
  defaultFrom?: FormatKey;
  defaultTo?: FormatKey;
}

export function ImageFormatConverter({ defaultFrom, defaultTo }: ImageFormatConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fromFormat, setFromFormat] = useState<FormatKey>(defaultFrom ?? "png");
  const [toFormat, setToFormat] = useState<FormatKey>(defaultTo ?? "jpg");
  const [quality, setQuality] = useState(92);
  const [result, setResult] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    try {
      const dataUrl = await convertOnCanvas(file, toFormat, quality / 100);
      setResult(dataUrl);
      toast.success(`Converted to ${FORMAT_LABEL[toFormat]} successfully!`);
    } catch (e: any) {
      toast.error(e.message ?? "Conversion failed");
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null); setPreview(null); setResult(null);
  };

  const downloadName = file
    ? `${file.name.replace(/\.[^.]+$/, "")}.${toFormat}`
    : `converted.${toFormat}`;

  const allFormats: FormatKey[] = ["jpg", "png", "webp", "bmp", "gif"];

  return (
    <div className="space-y-6 w-full">
      {/* Format selector row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* From */}
        <div className="flex-1 w-full">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Convert From</p>
          <div className="flex flex-wrap gap-2">
            {allFormats.map((f) => (
              <button
                key={f}
                onClick={() => { setFromFormat(f); if (toFormat === f) setToFormat(allFormats.find(x => x !== f)!); setResult(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${fromFormat === f ? FORMAT_COLOR[f] : "border-white/10 text-neutral-500 hover:border-white/20"}`}
              >
                {FORMAT_LABEL[f]}
              </button>
            ))}
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-neutral-600 shrink-0 rotate-90 sm:rotate-0" />

        {/* To */}
        <div className="flex-1 w-full">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Convert To</p>
          <div className="flex flex-wrap gap-2">
            {allFormats.filter(f => f !== fromFormat).map((f) => (
              <button
                key={f}
                onClick={() => { setToFormat(f); setResult(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${toFormat === f ? FORMAT_COLOR[f] : "border-white/10 text-neutral-500 hover:border-white/20"}`}
              >
                {FORMAT_LABEL[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quality slider (for JPG/WebP output) */}
      {(toFormat === "jpg" || toFormat === "webp") && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Output Quality</p>
            <span className="text-sm font-bold text-white">{quality}%</span>
          </div>
          <input
            type="range" min={50} max={100} value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-600">
            <span>50% — Smallest</span><span>100% — Lossless</span>
          </div>
        </div>
      )}

      {/* Upload or preview */}
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UploadZone onFile={handleFile} />
          </motion.div>
        ) : (
          <motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Preview */}
            <div className="relative group rounded-2xl overflow-hidden bg-[url('/checkerboard.svg')] bg-repeat border border-white/10">
              <img
                src={preview!}
                className="max-h-[320px] w-full object-contain mx-auto"
                alt="Preview"
              />
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>

            {/* File info row */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate max-w-[180px] sm:max-w-xs">{file.name}</p>
                  <p className="text-xs text-neutral-500">{formatBytes(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${FORMAT_COLOR[fromFormat]}`}>{FORMAT_LABEL[fromFormat]}</span>
                <ArrowRight className="w-3 h-3 text-neutral-600" />
                <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${FORMAT_COLOR[toFormat]}`}>{FORMAT_LABEL[toFormat]}</span>
              </div>
            </div>

            {/* Convert button */}
            {!result ? (
              <Button
                onClick={handleConvert}
                disabled={converting}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl"
              >
                {converting ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Converting…</>
                ) : (
                  <><RefreshCw className="w-4 h-4 mr-2" /> Convert to {FORMAT_LABEL[toFormat]}</>
                )}
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-emerald-300 font-medium flex-1">Conversion complete!</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleConvert}
                      className="border-white/10 text-neutral-400 hover:bg-white/5"
                    >
                      <RefreshCw size={13} className="mr-1.5" /> Redo
                    </Button>
                    <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
                      <a href={result} download={downloadName}>
                        <Download size={13} className="mr-1.5" /> Download {FORMAT_LABEL[toFormat]}
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Side-by-side compare */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider text-center">Original ({FORMAT_LABEL[fromFormat]})</p>
                    <img src={preview!} className="w-full max-h-[150px] object-contain rounded-xl border border-white/10 bg-black/20" alt="Original" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider text-center">Converted ({FORMAT_LABEL[toFormat]})</p>
                    <img src={result} className="w-full max-h-[150px] object-contain rounded-xl border border-emerald-500/20 bg-black/20" alt="Converted" />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Named exports for each specific conversion ───────────────────────────────
export const PngToJpg  = () => <ImageFormatConverter defaultFrom="png" defaultTo="jpg"  />;
export const PngToWebp = () => <ImageFormatConverter defaultFrom="png" defaultTo="webp" />;
export const PngToBmp  = () => <ImageFormatConverter defaultFrom="png" defaultTo="bmp"  />;
export const JpgToPng  = () => <ImageFormatConverter defaultFrom="jpg" defaultTo="png"  />;
export const JpgToWebp = () => <ImageFormatConverter defaultFrom="jpg" defaultTo="webp" />;
export const JpgToBmp  = () => <ImageFormatConverter defaultFrom="jpg" defaultTo="bmp"  />;
export const WebpToJpg = () => <ImageFormatConverter defaultFrom="webp" defaultTo="jpg" />;
export const WebpToPng = () => <ImageFormatConverter defaultFrom="webp" defaultTo="png" />;
export const BmpToJpg  = () => <ImageFormatConverter defaultFrom="bmp" defaultTo="jpg"  />;
export const BmpToPng  = () => <ImageFormatConverter defaultFrom="bmp" defaultTo="png"  />;
export const GifToJpg  = () => <ImageFormatConverter defaultFrom="gif" defaultTo="jpg"  />;
export const GifToPng  = () => <ImageFormatConverter defaultFrom="gif" defaultTo="png"  />;
export const GifToWebp = () => <ImageFormatConverter defaultFrom="gif" defaultTo="webp" />;
