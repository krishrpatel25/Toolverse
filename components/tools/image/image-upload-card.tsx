"use client";

import { useState, useRef } from "react";
import { Upload, FileImage, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadCardProps {
  onFileSelect: (file: File) => void;
  title?: string;
  description?: string;
  accept?: string;
  showBadges?: boolean;
}

export function ImageUploadCard({
  onFileSelect,
  title = "Upload Image",
  description = "Drag and drop or click to upload your image",
  accept = "image/*",
  showBadges = false,
}: ImageUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-[1.01]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex h-full min-h-[300px] cursor-pointer flex-col items-center justify-center p-8 text-center"
      >
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <Upload className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0A0A0A] bg-emerald-500 text-black shadow-lg">
            <FileImage size={14} strokeWidth={2.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
            {title}
          </h3>
          <p className="text-sm font-medium text-neutral-400">
            {description}
          </p>
        </div>

        {showBadges && (
          <div className="mt-8 grid grid-cols-2 gap-3">
            <FormatBadge label="PNG" />
            <FormatBadge label="JPG" />
            <FormatBadge label="SVG" />
            <FormatBadge label="WEBP" />
          </div>
        )}
      </div>
    </div>
  );
}

function FormatBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-500">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
      {label}
    </div>
  );
}
