"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, RotateCcw } from "lucide-react";

export function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setCompressedFile(null);
  };

  const compressImage = async () => {
    if (!image) return;

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
  };

  const downloadImage = () => {
    if (!compressedFile) return;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(compressedFile);
    a.download = "compressed-image.jpg";
    a.click();
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setCompressedFile(null);
  };

  const resetSettings = () => {
    setQuality(80);
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

          {/* Slider */}

          <div className="w-full max-w-md flex flex-col gap-2">
            <label className="text-sm font-medium">
              Compression Quality: {quality}%
            </label>

            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />

            <p className="text-xs text-muted-foreground">
              Lower value = smaller file size
            </p>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 flex-wrap justify-center">
            <Button onClick={compressImage}>Compress</Button>

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
