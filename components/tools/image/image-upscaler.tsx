"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, RotateCcw } from "lucide-react";

export function ImageUpscaler() {
  const [preview, setPreview] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(2);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setUpscaledImage(null);
  };

  const upscaleImage = () => {
    if (!preview) return;

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

      toast.success(`Image upscaled ${scale}x`);
    };
  };

  const downloadImage = () => {
    if (!upscaledImage) {
      toast.error("Upscale the image first");
      return;
    }

    const a = document.createElement("a");
    a.href = upscaledImage;
    a.download = "upscaled-image.png";
    a.click();
  };

  const clearImage = () => {
    setPreview(null);
    setUpscaledImage(null);
  };

  const resetSettings = () => {
    setScale(2);
    toast.success("Settings reset");
  };

  return (
    <div className="space-y-6">
      {/* Upload UI */}

      {!preview && (
        <Card className="p-6 border border-zinc-800 bg-zinc-900/40">
          <div className="flex flex-col items-center gap-6 border-2 border-dashed border-zinc-700 hover:border-green-500 transition rounded-xl p-10 text-center">
            
            <div className="p-4 bg-green-500/10 rounded-full">
              <Upload className="w-8 h-8 text-green-500" />
            </div>

            <div>
              <p className="text-lg font-semibold">
                Upload your image
              </p>

              <p className="text-sm text-zinc-400">
                Click the button below to select an image
              </p>
            </div>

            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleUpload(e.target.files[0]);
                }
              }}
            />

          </div>
        </Card>
      )}

      {/* Preview */}

      {preview && (
        <Card className="p-6 flex flex-col items-center gap-6">

          <img
            src={preview}
            className="max-w-full max-h-[60vh] object-contain"
          />

          {/* Upscale Slider */}

          <div className="flex flex-col gap-2 w-full max-w-md">

            <label className="text-sm font-medium">
              Upscale Factor: {scale}x
            </label>

            <input
              type="range"
              min="1"
              max="4"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />

            <p className="text-xs text-muted-foreground">
              Higher value = larger resolution
            </p>

          </div>

          {/* Buttons */}

          <div className="flex gap-3 flex-wrap justify-center">

            <Button onClick={upscaleImage}>
              Upscale
            </Button>

            <Button
              onClick={downloadImage}
              disabled={!upscaledImage}
            >
              <Download size={16} />
            </Button>

            <Button
              variant="secondary"
              onClick={resetSettings}
            >
              <RotateCcw size={16} />
            </Button>

            <Button
              variant="destructive"
              onClick={clearImage}
            >
              <Trash2 size={16} />
            </Button>

          </div>

        </Card>
      )}
    </div>
  );
}