"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

export function JSONFormatter() {
  const [input, setInput] = useState('{"name": "ToolVerse", "type": "premium", "features": ["fast", "beautiful", "reliable"]}');
  const [indent, setIndent] = useState("2");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!input.trim()) { setOutput(""); setIsValid(true); setError(""); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, parseInt(indent)));
      setIsValid(true); setError("");
    } catch (err) {
      setOutput(input); setIsValid(false); setError((err as Error).message);
    }
  }, [input, indent]);

  const handleCopy = async () => {
    if (await copyToClipboard(output)) toast.success("Copied to clipboard");
    else toast.error("Failed to copy");
  };

  const handleMinify = async () => {
    try {
      const minified = JSON.stringify(JSON.parse(input));
      if (await copyToClipboard(minified)) toast.success("Minified & copied");
    } catch { toast.error("Invalid JSON"); }
  };

  return (
    <div className="space-y-5 w-full">
      {/* Status bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Indentation:</span>
          <div className="flex bg-white/[0.03] border border-white/10 rounded-lg p-0.5">
            {["2", "4", "8"].map((s) => (
              <button
                key={s}
                onClick={() => setIndent(s)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${indent === s ? "bg-emerald-500 text-black" : "text-neutral-400 hover:text-white"}`}
              >
                {s}sp
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => { setInput(""); setOutput(""); setError(""); setIsValid(true); }} className="border-white/10 text-neutral-400">
            <RotateCcw size={14} className="mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={handleMinify} disabled={!isValid || !input} className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
            Minify &amp; Copy
          </Button>
          <Button size="sm" onClick={handleCopy} disabled={!output} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
            <Copy size={14} className="mr-1.5" /> Copy
          </Button>
        </div>
      </div>

      {/* Text areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Input JSON</label>
            {!isValid && <span className="text-[10px] text-red-400 font-bold uppercase animate-pulse">Invalid</span>}
          </div>
          <Textarea
            placeholder='{"example": "json"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] bg-white/[0.03] border-white/10 rounded-xl p-4 font-mono text-sm focus:border-emerald-500/50 resize-none w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Formatted Output</label>
            {isValid && input && <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1"><CheckCircle size={10} /> Valid</span>}
          </div>
          <div className="relative group">
            <Textarea
              readOnly
              className="min-h-[300px] bg-black/40 border-emerald-500/20 rounded-xl p-4 font-mono text-sm text-emerald-400 resize-none w-full"
              value={output || "Formatted JSON will appear here…"}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {!isValid && error && (
        <div className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-mono">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p className="break-all">{error}</p>
        </div>
      )}
    </div>
  );
}
