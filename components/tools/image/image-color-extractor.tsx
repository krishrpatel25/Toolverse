"use client";

import { useState } from "react";
import ImageToolComponent from "./image-tool-ui";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export function ImageColorExtractor() {
  const [colors, setColors] = useState<string[]>([]);

  const extract = (file: File, setResult: any) => {
    setResult(URL.createObjectURL(file));

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const palette: string[] = [];

      for (let i = 0; i < 20; i++) {
        const index = Math.floor((Math.random() * data.length) / 4) * 4;

        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        palette.push(`rgb(${r}, ${g}, ${b})`);
      }

      setColors(palette);
    };
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied`);
  };

  return (
    <div className="space-y-6">
      <ImageToolComponent
        toolName="Image Color Extractor"
        onProcess={extract}
        allowDownload={false}
      />
      {colors.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {colors.map((c, i) => (
            <div
              key={i}
              onClick={() => copyColor(c)}
              className="group relative w-14 h-14 rounded-lg border cursor-pointer overflow-hidden"
              style={{ background: c }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                <Copy size={18} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
