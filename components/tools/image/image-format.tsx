"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, FileType, Sparkles, Trash2 } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageConverter() {
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleUpload = (uploadedFile: File) => {
    setImageName(uploadedFile.name);
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const convertImage = (format: string) => {
    if (!file) return;
    setIsConverting(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let mime = "image/png";
      if (format === "jpg") mime = "image/jpeg";
      if (format === "webp") mime = "image/webp";

      const converted = canvas.toDataURL(mime);
      setResult(converted);
      setIsConverting(false);
      toast.success(`Elite conversion complete: ${format.toUpperCase()}`);
    };
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setImageName("");
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
              title="Image Converter"
              description="Transform your visuals into any elite format"
              showBadges={true}
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
                  className="max-h-[420px] w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                  alt="Preview"
                />
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileType className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Conversion Formats</h3>
              </div>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <Button 
                  onClick={() => convertImage("png")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                >
                  PNG
                </Button>

                <Button 
                  onClick={() => convertImage("jpg")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                >
                  JPG
                </Button>

                <Button 
                  onClick={() => convertImage("webp")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                >
                  WEBP
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={clearImage}
                  className="text-neutral-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl h-12 ml-auto"
                >
                  <Trash2 size={18} className="mr-2" />
                  Discard
                </Button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-4 border-t border-white/5"
                  >
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-1.5 rounded-full">
                           <Sparkles size={12} className="text-black" />
                        </div>
                        <span className="text-sm font-bold text-emerald-500">Elite result ready</span>
                      </div>
                      <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-10">
                         <a href={result} download={`converted-${imageName.split('.')[0] || 'image'}`}>
                            <Download size={16} className="mr-2" />
                            Download
                         </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
