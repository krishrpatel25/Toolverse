"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, RotateCcw, CheckCircle, AlertCircle, FileJson, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function JSONFormatter() {
  const [input, setInput] = useState('{"name": "ToolVerse", "type": "premium", "features": ["fast", "beautiful", "reliable"]}');
  const [indent, setIndent] = useState("2");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indent));

      setOutput(formatted);
      setIsValid(true);
      setError("");
    } catch (err) {
      setOutput(input);
      setIsValid(false);
      setError((err as Error).message);
    }
  }, [input, indent]);

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      toast.success("Copied to clipboard");
    } else {
      toast.error("Failed to copy");
    }
  };

  const handleMinify = async () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      const success = await copyToClipboard(minified);
      if (success) {
        toast.success("Minified & copied");
      } else {
        toast.error("Failed to copy minified JSON");
      }
    } catch {
      toast.error("Invalid JSON");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(true);
  };

  return (
    <div className="space-y-6 w-full">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <FileJson className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">JSON Formatter</h2>
              <p className="text-sm text-neutral-400">Beautify or minify your JSON data</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Input Raw JSON</label>
              {!isValid && <span className="text-[10px] text-red-400 font-bold uppercase animate-pulse">Invalid Format</span>}
            </div>
            <Textarea
              placeholder='{"example": "json"}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[350px] bg-white/[0.03] border-white/10 rounded-2xl p-6 font-mono text-sm focus:border-emerald-500/50 transition-colors resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Formatted Output</label>
              {isValid && input && <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1"><CheckCircle size={10} /> Validated</span>}
            </div>
            <div className="relative group">
               <Textarea
                readOnly
                className="min-h-[350px] bg-black/40 border-emerald-500/20 rounded-2xl p-6 font-mono text-sm text-emerald-500/90 resize-none"
                value={output || "Formatted JSON will appear here..."}
              />
              {output && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" onClick={handleCopy} className="bg-emerald-500 hover:bg-emerald-600 text-black rounded-xl">
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
           <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mr-2">Indentation:</span>
             <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-1">
               {["2", "4", "8"].map((spaces) => (
                 <button
                   key={spaces}
                   onClick={() => setIndent(spaces)}
                   className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                     indent === spaces ? 'bg-emerald-500 text-black' : 'text-neutral-400 hover:text-white'
                   }`}
                 >
                   {spaces} Spaces
                 </button>
               ))}
             </div>
           </div>

           <div className="flex gap-3">
             <Button variant="outline" onClick={handleReset} className="rounded-xl border-white/10 hover:bg-white/5 h-11 text-neutral-400">
                <RotateCcw size={16} className="mr-2" />
                Reset
             </Button>
             <Button onClick={handleMinify} disabled={!isValid || !input} className="rounded-xl border-white/10 hover:bg-emerald-500/10 text-emerald-400 variant-outline h-11">
                Minify & Copy
             </Button>
             <Button onClick={handleCopy} disabled={!output} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-6 rounded-xl h-11">
                <Copy size={16} className="mr-2" />
                Copy Formatted
             </Button>
           </div>
        </div>
      </Card>

      <AnimatePresence>
        {!isValid && error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4 bg-red-500/5 border-red-500/20 text-red-400 text-sm font-mono rounded-2xl">
              <div className="flex gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <p className="break-all">{error}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
