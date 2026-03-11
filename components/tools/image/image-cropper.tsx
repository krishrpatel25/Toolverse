"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, RotateCcw, Crop as CropIcon, Sparkles } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

export function ImageCropper() {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 80,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  const handleUpload = (file: File) => {
    setImageName(file.name);
    setImage(URL.createObjectURL(file));
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const changeRatio = (ratio: number | undefined) => {
    setAspect(ratio);
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    if (ratio) {
      setCrop(centerAspectCrop(width, height, ratio));
    } else {
      setCrop({
        unit: "%",
        width: 50,
        height: 50,
        x: 25,
        y: 25,
      });
    }
  };

  const downloadCrop = () => {
    if (!imgRef.current || !crop) return;
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width! * scaleX;
    canvas.height = crop.height! * scaleY;

    ctx.drawImage(
      imgRef.current,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width! * scaleX,
      crop.height! * scaleY,
    );

    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = `cropped-${imageName || 'image.png'}`;
    a.click();
    setIsProcessing(false);
  };

  const clearImage = () => {
    setImage(null);
    setCrop(undefined);
    setImageName("");
  };

  const resetCrop = () => {
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
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
              onFileSelect={handleUpload}
              title="Image Cropper"
              description="Frame your elite visuals with surgical precision"
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
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={aspect}
                  className="max-h-[500px]"
                >
                  <img
                    ref={imgRef}
                    src={image}
                    onLoad={onImageLoad}
                    className="max-h-[500px] w-full object-contain mx-auto"
                    alt="Crop preview"
                  />
                </ReactCrop>
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <CropIcon className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Crop Controls</h3>
              </div>

              <div className="space-y-6">
                 <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <RatioButton label="1:1" active={aspect === 1} onClick={() => changeRatio(1)} />
                    <RatioButton label="4:3" active={aspect === 4/3} onClick={() => changeRatio(4/3)} />
                    <RatioButton label="16:9" active={aspect === 16/9} onClick={() => changeRatio(16/9)} />
                    <RatioButton label="3:2" active={aspect === 3/2} onClick={() => changeRatio(3/2)} />
                    <RatioButton label="9:16" active={aspect === 9/16} onClick={() => changeRatio(9/16)} />
                    <RatioButton label="Free" active={aspect === undefined} onClick={() => changeRatio(undefined)} />
                 </div>

                 <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2 border-t border-white/5 pt-6">
                    <Button 
                      onClick={downloadCrop}
                      disabled={isProcessing}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest px-8 rounded-xl h-12"
                    >
                      {isProcessing ? "Processing..." : "Download Crop"}
                      {!isProcessing && <Download size={16} className="ml-2" />}
                    </Button>

                    <Button 
                      variant="ghost" 
                      onClick={resetCrop}
                      className="text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl h-12"
                    >
                      <RotateCcw size={18} className="mr-2" />
                      Reset
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
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RatioButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-10 px-4 rounded-xl border transition-all",
        active 
          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold" 
          : "border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:border-white/10"
      )}
    >
      {label}
    </Button>
  );
}

import { cn } from "@/lib/utils";
