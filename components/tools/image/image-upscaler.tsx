"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, RotateCcw, Maximize, Sparkles } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageUpscaler() {
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [isUpscaling, setIsUpscaling] = useState(false);

  const handleUpload = (file: File) => {
    setImageName(file.name);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setUpscaledImage(null);
  };

  const upscaleImage = () => {
    if (!preview) return;
    setIsUpscaling(true);

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const result = canvas.toDataURL("image/png");

      setPreview(result);
      setUpscaledImage(result);
      setIsUpscaling(false);

      toast.success(`Elite upscale complete: ${scale}x`);
    };
  };

  const downloadImage = () => {
    if (!upscaledImage) return;

    const a = document.createElement("a");
    a.href = upscaledImage;
    a.download = `upscaled-${imageName || 'image.png'}`;
    a.click();
  };

  const clearImage = () => {
    setPreview(null);
    setUpscaledImage(null);
    setImageName("");
  };

  const resetSettings = () => {
    setScale(2);
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
              title="Image Upscaler"
              description="Enhance resolution with elite clarity and precision"
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
                  <Maximize className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Upscale Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-neutral-400">Scale Factor</label>
                    <span className="text-emerald-500 font-black text-xl">{scale}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2">
                  <Button 
                    onClick={upscaleImage} 
                    disabled={isUpscaling}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-12"
                  >
                    {isUpscaling ? "Enhancing..." : "Scale Image"}
                    {!isUpscaling && <Sparkles size={16} className="ml-2" />}
                  </Button>

                  {upscaledImage && (
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
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}