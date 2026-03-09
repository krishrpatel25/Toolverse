"use client";

import ImageToolComponent from "./image-tool-ui";


export function BlackAndWhite() {
  const bw = (file: File, setResult: any) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = "grayscale(100%)";
      ctx.drawImage(img, 0, 0);

      setResult(canvas.toDataURL());
    };
  };

  return <ImageToolComponent toolName="Black & White" onProcess={bw} />;
}
