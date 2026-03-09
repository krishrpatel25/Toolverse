"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, Download, Trash2, Upload } from "lucide-react";

export function ImageRotator() {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
    setRotation(0);
  };

  const rotateLeft = () => setRotation((prev) => prev - 90);
  const rotateRight = () => setRotation((prev) => prev + 90);

  const clearImage = () => {
    setImage(null);
    setRotation(0);
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
    a.download = "rotated-image.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload UI */}

      {!image && (
        <Card className="p-10 border border-zinc-800 bg-zinc-900/40">
          <div className="flex flex-col items-center gap-6 border-2 border-dashed border-zinc-700 hover:border-green-500 transition rounded-xl p-12 text-center">
            <div className="p-4 bg-green-500/10 rounded-full">
              <Upload className="w-8 h-8 text-green-500" />
            </div>

            <div>
              <p className="text-lg font-semibold">Upload your image</p>

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
                  handleFile(e.target.files[0]);
                }
              }}
            />
          </div>
        </Card>
      )}

      {/* Preview */}

      {image && (
        <Card className="p-6 flex flex-col items-center gap-6">
          <div className="w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[30vh] object-contain"
            />
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button size="icon" onClick={rotateLeft}>
              <RotateCcw size={18} />
            </Button>

            <Button size="icon" onClick={rotateRight}>
              <RotateCw size={18} />
            </Button>

            <Button size="icon" onClick={downloadImage}>
              <Download size={18} />
            </Button>

            <Button size="icon" variant="destructive" onClick={clearImage}>
              <Trash2 size={18} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
