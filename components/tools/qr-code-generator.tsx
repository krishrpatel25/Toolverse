'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Download, RotateCcw, QrCode } from 'lucide-react';
import { toast } from 'sonner';

export function QRCodeGenerator() {
  const [text, setText] = useState('https://toolverse.app');
  const [size, setSize] = useState('300');
  const [errorLevel, setErrorLevel] = useState('M');

  const qrCodeUrl = useMemo(() => {
    if (!text) return '';
    const params = new URLSearchParams({
      data: text,
      size: `${size}x${size}`,
      ecc: errorLevel,
    });
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

  const handleDownload = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('QR code downloaded');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">QR Code Generator</h2>
            <p className="text-sm text-neutral-400 mt-1">Generate scanable QR codes for links and text</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <QrCode className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Text or URL</label>
            <Input
              type="text"
              placeholder="https://example.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium pr-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Resolution (px)</label>
              <Input
                type="number"
                min="100"
                max="1000"
                step="50"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Error Correction</label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {qrCodeUrl && text && (
        <Card className="p-8 bg-white/[0.02] border-white/5 rounded-[2rem] flex flex-col items-center justify-center group relative overflow-hidden transition-all hover:bg-white/[0.04]">
          <div className="relative p-6 bg-white rounded-[2rem] shadow-2xl transition-transform group-hover:scale-105">
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              className="w-full max-w-64 h-auto"
            />
          </div>
          
          <div className="mt-8 flex gap-3 flex-wrap justify-center">
             <Button 
               onClick={handleDownload}
               className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/10"
             >
               <Download className="w-5 h-5 mr-2" />
               Download PNG
             </Button>
             <Button 
               variant="outline"
               onClick={handleCopy}
               className="h-12 px-6 border-white/10 hover:bg-white/5 rounded-2xl text-neutral-400"
             >
               <Copy className="w-5 h-5 mr-2" />
               Copy Text
             </Button>
          </div>
        </Card>
      )}

      <div className="flex gap-2 justify-end">
        <Button 
          variant="outline" 
          onClick={() => setText('')}
          className="rounded-2xl border-white/10 hover:bg-white/5 h-12 text-neutral-500"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Input
        </Button>
      </div>
    </div>
  );
}
