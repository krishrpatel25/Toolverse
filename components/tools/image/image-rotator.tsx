"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, Download, Trash2, RefreshCw, Sparkles } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageRotator() {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFile = (file: File) => {
    setImageName(file.name);
    const url = URL.createObjectURL(file);
    setImage(url);
    setRotation(0);
  };

  const rotateLeft = () => setRotation((prev) => prev - 90);
  const rotateRight = () => setRotation((prev) => prev + 90);

  const clearImage = () => {
    setImage(null);
    setRotation(0);
    setImageName("");
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const angle = rotation % 360;

      if (Math.abs(angle) === 90 || Math.abs(angle) === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    };
  }, [image, rotation]);

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = `rotated-${imageName || 'image.png'}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ImageUploadCard
              onFileSelect={handleFile}
              title="Image Rotator"
              description="Rotate and align your visuals with elite precision"
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
               <div className="relative group rounded-2xl overflow-hidden bg-black/40 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="max-h-[500px] max-w-full object-contain transition-transform duration-500"
                  />
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Rotation Controls</h3>
              </div>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <Button 
                  onClick={rotateLeft}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                >
                  <RotateCcw size={18} className="mr-2" />
                  -90°
                </Button>

                <Button 
                  onClick={rotateRight}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl h-12 px-6"
                >
                   <RotateCw size={18} className="mr-2" />
                  +90°
                </Button>

                <Button 
                  onClick={downloadImage}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-12"
                >
                  <Download size={18} className="mr-2" />
                  Download Result
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
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
