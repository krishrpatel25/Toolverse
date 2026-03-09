"use client";

import { toast } from "sonner";
import ImageToolComponent from "./image-tool-ui";

export function InvertImageColors() {
  const invert = (file: File, setResult: any) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }

      ctx.putImageData(imageData, 0, 0);

      setResult(canvas.toDataURL());

      toast.success("Colors inverted");
    };
  };

  return (
    <ImageToolComponent toolName="Invert Image Colors" onProcess={invert} />
  );
}
