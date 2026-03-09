'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function QRCodeGenerator() {
  const [text, setText] = useState('https://toolverse.app');
  const [size, setSize] = useState('200');
  const [errorLevel, setErrorLevel] = useState('M');

  const qrCodeUrl = useMemo(() => {
    if (!text) return '';
    const params = new URLSearchParams({
      data: text,
      size: `${size}x${size}`,
      ecc: errorLevel,
    });
    // Using QR Server API for generating QR codes
    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }, [text, size, errorLevel]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('QR code downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text or URL</label>
        <Input
          type="text"
          placeholder="https://example.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="py-6 text-base"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <Input
            type="number"
            min="50"
            max="500"
            step="50"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Error Correction</label>
          <select
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>

      {qrCodeUrl && (
        <Card className="border border-border bg-secondary/30 p-8 flex flex-col items-center justify-center gap-4">
          <img
            src={qrCodeUrl}
            alt="Generated QR Code"
            className="w-full max-w-64 h-auto"
          />
        </Card>
      )}

      <div className="flex gap-2 flex-wrap justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setText('https://toolverse.app');
            setSize('200');
            setErrorLevel('M');
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!text}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button
          size="sm"
          onClick={handleDownload}
          disabled={!qrCodeUrl}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
