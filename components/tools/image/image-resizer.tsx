"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, RotateCcw, Maximize2, Sparkles } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleUpload = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResizedImage(null);
  };

  const resizeImage = () => {
    if (!preview) return;
    setIsResizing(true);

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const resized = canvas.toDataURL("image/jpeg");

      setPreview(resized);
      setResizedImage(resized);
      setIsResizing(false);

      toast.success(`Elite resize complete: ${width} x ${height}`);
    };
  };

  const downloadImage = () => {
    if (!resizedImage) return;

    const a = document.createElement("a");
    a.href = resizedImage;
    a.download = `resized-${image?.name || 'image.jpg'}`;
    a.click();
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setResizedImage(null);
  };

  const resetSettings = () => {
    setWidth(800);
    setHeight(600);
    toast.success("Settings reset");
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ImageUploadCard
              onFileSelect={handleUpload}
              title="Image Resizer"
              description="Adjust dimensions with precision and elite performance"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-white/10 bg-white/[0.02] p-2 sm:p-4">
               <div className="relative group rounded-2xl overflow-hidden bg-black/40">
                <img
                  src={preview}
                  className="max-h-[500px] w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                  alt="Preview"
                />
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Maximize2 className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Dimension Settings</h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2">
                <Button 
                  onClick={resizeImage} 
                  disabled={isResizing}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-12"
                >
                  {isResizing ? "Resizing..." : "Resize Elite"}
                  {!isResizing && <Sparkles size={16} className="ml-2" />}
                </Button>

                {resizedImage && (
                  <Button 
                    onClick={downloadImage}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                  >
                    <Download size={18} className="mr-2" />
                    Download
                  </Button>
                )}

                <Button 
                  variant="ghost" 
                  onClick={clearImage}
                  className="text-neutral-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl h-12"
                >
                  <Trash2 size={18} className="mr-2" />
                  Discard
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={resetSettings}
                  className="text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl h-12"
                >
                  <RotateCcw size={18} className="mr-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
