"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, RotateCcw } from "lucide-react";

export function ImageResizer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResizedImage(null);
  };

  const resizeImage = () => {
    if (!preview) return;

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

      toast.success(`Image resized to ${width} x ${height}`);
    };
  };

  const downloadImage = () => {
    if (!resizedImage) return;

    const a = document.createElement("a");
    a.href = resizedImage;
    a.download = "resized-image.jpg";
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
    <div className="space-y-6">
      {/* Upload UI */}

      {!preview && (
        <Card className="p-5 sm:p-8 lg:p-10 border border-zinc-800 bg-zinc-900/40">
          <div className="flex flex-col items-center gap-4 sm:gap-6 border-2 border-dashed border-zinc-700 hover:border-green-500 transition rounded-xl p-6 sm:p-10 lg:p-12 text-center">
            <div className="p-3 sm:p-4 bg-green-500/10 rounded-full">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>

            <div>
              <p className="text-base sm:text-lg font-semibold">
                Upload your image
              </p>

              <p className="text-xs sm:text-sm text-zinc-400">
                Click the button below to select an image
              </p>
            </div>

            <Button
              className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
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

          {/* Width / Height */}

          <div className="flex gap-4 flex-wrap justify-center">
            <div className="flex flex-col">
              <label className="text-sm">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="border rounded px-2 py-1 w-28"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="border rounded px-2 py-1 w-28"
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 flex-wrap justify-center">
            <Button onClick={resizeImage}>Resize</Button>

            <Button onClick={downloadImage}>
              <Download size={16} />
            </Button>

            <Button variant="secondary" onClick={resetSettings}>
              <RotateCcw size={16} />
            </Button>

            <Button variant="destructive" onClick={clearImage}>
              <Trash2 size={16} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
