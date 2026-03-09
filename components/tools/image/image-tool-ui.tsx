"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

type Props = {
  toolName: string;
  onProcess: (file: File, setResult: (url: string) => void) => void;
  allowDownload?: boolean;
};

export const ImageToolComponent = ({
  toolName,
  onProcess,
  allowDownload = true,
}: Props) => {
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image");
      return;
    }

    setFileName(file.name);
    onProcess(file, setResult);
  };

  const reset = () => {
    setResult(null);
    setFileName("");
  };

  return (
    <div className="space-y-6">
      {/* Upload Card */}

      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{toolName}</h2>

        <label className="cursor-pointer block border-2 border-dashed p-8 rounded-lg hover:border-green-500 transition">
          <Upload className="mx-auto mb-3" />

          <p>Upload Image</p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) {
                handleFile(e.target.files[0]);
              }
            }}
          />
        </label>
      </Card>

      {/* Result */}

      {result && (
        <Card className="p-6 text-center space-y-4">
          <img src={result} className="max-h-[400px] mx-auto object-contain" />

          <p className="text-sm text-muted-foreground">{fileName}</p>

          <div className="flex justify-center gap-4">
            {allowDownload && (
              <a href={result} download="processed-image">
                <Button>
                  <Download size={16} />
                </Button>
              </a>
            )}

            <Button variant="destructive" onClick={reset}>
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageToolComponent;
