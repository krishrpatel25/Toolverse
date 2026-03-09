"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

export function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const convertImage = (format: string) => {
    if (!file) return;

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

      toast.success(`Converted to ${format.toUpperCase()}`);
    };
  };

  return (
    <div className="space-y-6">
      {/* Upload UI */}

      {!file && (
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
            className="max-w-full max-h-[420px] object-contain rounded-lg"
          />

          {/* Convert Buttons */}

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => convertImage("png")}>Convert to PNG</Button>

            <Button onClick={() => convertImage("jpg")}>Convert to JPG</Button>

            <Button onClick={() => convertImage("webp")}>
              Convert to WEBP
            </Button>
          </div>
        </Card>
      )}

      {/* Converted Result */}

      {result && (
        <Card className="p-6 flex flex-col items-center gap-4">
          <a href={result} download="converted-image">
            <Button>Download</Button>
          </a>
        </Card>
      )}
    </div>
  );
}
