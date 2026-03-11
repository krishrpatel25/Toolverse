"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, RotateCcw, Settings2, Sparkles } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleUpload = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setCompressedFile(null);
  };

  const compressImage = async () => {
    if (!image) return;
    setIsCompressing(true);

    try {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        initialQuality: quality / 100,
        fileType: "image/jpeg",
      };

      const compressed = await imageCompression(image, options);

      setCompressedFile(compressed);
      setPreview(URL.createObjectURL(compressed));

      const originalMB = (image.size / 1024 / 1024).toFixed(2);
      const compressedMB = (compressed.size / 1024 / 1024).toFixed(2);

      toast.success(`${originalMB}MB → ${compressedMB}MB`);
    } catch {
      toast.error("Compression failed");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedFile) return;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(compressedFile);
    a.download = `compressed-${image?.name || 'image.jpg'}`;
    a.click();
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setCompressedFile(null);
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
              title="Image Compressor"
              description="Reduce image size while maintaining elite quality"
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
                  <Settings2 className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Compression Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-neutral-400">Quality</label>
                    <span className="text-emerald-500 font-black text-xl">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2">
                  <Button 
                    onClick={compressImage} 
                    disabled={isCompressing}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-12"
                  >
                    {isCompressing ? "Compressing..." : "Compress Image"}
                    {!isCompressing && <Sparkles size={16} className="ml-2" />}
                  </Button>

                  {compressedFile && (
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
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
