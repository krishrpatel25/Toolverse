"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, RotateCcw } from "lucide-react";

export function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(1);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    a.download = "cropped-image.png";
    a.click();
  };

  const clearImage = () => {
    setImage(null);
    setCrop(undefined);
  };

  const resetCrop = () => {
    if (!imgRef.current) return;

    const { width, height } = imgRef.current;

    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload UI */}

      {!image && (
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

      {/* Crop UI */}

      {image && (
        <Card className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-center items-center h-auto overflow-hidden">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    src={image}
                    onLoad={onImageLoad}
                    className="max-h-auto max-w-full object-contain"
                  />
                </ReactCrop>
              </div>
            </div>
          </div>

          {/* Ratio Buttons */}

          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => changeRatio(1)}>1:1</Button>
            <Button onClick={() => changeRatio(4 / 3)}>4:3</Button>
            <Button onClick={() => changeRatio(16 / 9)}>16:9</Button>
            <Button onClick={() => changeRatio(3 / 2)}>3:2</Button>
            <Button onClick={() => changeRatio(9 / 16)}>9:16</Button>
            <Button onClick={() => changeRatio(undefined)}>Free</Button>
          </div>

          {/* Controls */}

          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={downloadCrop}>
              <Download size={16} />
              Download
            </Button>

            <Button variant="secondary" onClick={resetCrop}>
              <RotateCcw size={16} />
              Reset
            </Button>

            <Button variant="destructive" onClick={clearImage}>
              <Trash2 size={16} />
              Clear
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
