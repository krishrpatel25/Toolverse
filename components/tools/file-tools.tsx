'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export function FileConverter() {
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast.success(`File ${file.name} loaded successfully`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">File Converter</h2>
        
        <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Click to upload your file</p>
          <p className="text-sm text-muted-foreground">{fileName || 'No file selected'}</p>
        </label>
      </Card>

      <Card className="p-6 bg-accent/5">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Supported Formats</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>Documents: PDF, DOCX, TXT, XLSX</li>
          <li>Images: PNG, JPG, GIF, WEBP</li>
          <li>Videos: MP4, WEBM, OGG</li>
          <li>Archives: ZIP, RAR, 7Z</li>
        </ul>
      </Card>
    </div>
  );
}

export function FileCompressor() {
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast.success(`File ready to compress`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">File Compressor</h2>
        
        <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Upload your file to compress</p>
          <p className="text-sm text-muted-foreground">{fileName || 'No file selected'}</p>
        </label>
      </Card>

      <Card className="p-6 bg-accent/5">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Benefits</h3>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>Reduce file size significantly</li>
          <li>Fast compression algorithm</li>
          <li>Secure - files processed locally</li>
          <li>Support multiple formats</li>
        </ul>
      </Card>
    </div>
  );
}

export function FileToBase64() {
  const [result, setResult] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setResult(reader.result as string);
        toast.success('File converted to Base64');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">File to Base64 Converter</h2>
        
        <label className="block border-2 border-dashed border-muted-foreground hover:border-accent rounded-lg p-8 text-center cursor-pointer transition mb-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Upload your file</p>
          <p className="text-sm text-muted-foreground">Any file type supported</p>
        </label>

        {result && (
          <Card className="p-4 bg-secondary/50 overflow-auto max-h-64">
            <p className="text-xs font-mono text-foreground break-all">{result}</p>
          </Card>
        )}
      </Card>
    </div>
  );
}
