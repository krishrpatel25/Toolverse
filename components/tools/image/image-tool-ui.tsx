"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";
import { ImageUploadCard } from "./image-upload-card";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    // Simulate slight delay for elite feel
    setTimeout(() => {
      onProcess(file, (url) => {
        setResult(url);
        setIsProcessing(false);
      });
    }, 600);
  };

  const reset = () => {
    setResult(null);
    setFileName("");
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ImageUploadCard
              onFileSelect={handleFile}
              title={toolName}
              description={isProcessing ? "Processing elite results..." : undefined}
            />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-white/10 bg-white/[0.02] p-2 sm:p-4">
              <div className="relative group rounded-2xl overflow-hidden bg-black/40">
                <img
                  src={result}
                  className="max-h-[500px] w-full object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  alt="Processed results"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <p className="text-xs font-medium text-white/60 tracking-wider uppercase">
                     {fileName}
                   </p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {allowDownload && (
                <Button 
                  asChild
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl h-12 px-8"
                >
                  <a href={result} download={`toolverse-${fileName || 'image'}`}>
                    <Download size={18} className="mr-2" />
                    Download Result
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                onClick={reset}
                className="w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 px-8"
              >
                <RotateCcw size={18} className="mr-2" />
                Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageToolComponent;
