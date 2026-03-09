'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function ColorPicker() {
  const [color, setColor] = useState('#22c55e');

  const rgbColor = useMemo(() => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }, [color]);

  const hslColor = useMemo(() => {
    const r = rgbColor.r / 255;
    const g = rgbColor.g / 255;
    const b = rgbColor.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, [rgbColor]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const formats = [
    { label: 'HEX', value: color },
    { label: 'RGB', value: `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})` },
    { label: 'HSL', value: `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)` },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Pick a Color</label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-16 p-1 cursor-pointer"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">HEX Value</label>
            <Input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <Card
        className="border-2 border-border bg-cover bg-center p-8 h-40 flex items-center justify-center cursor-pointer rounded-lg transition-all hover:scale-105"
        style={{ backgroundColor: color }}
        onClick={() => handleCopy(color)}
      >
        <div
          className="text-center font-bold text-lg"
          style={{ color: rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114 > 128 ? '#000' : '#fff' }}
        >
          Click to Copy
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground mb-3">Color Formats</h3>
        <div className="grid gap-2">
          {formats.map((fmt) => (
            <Card
              key={fmt.label}
              className="border border-border bg-secondary/30 p-3 cursor-pointer hover:border-accent transition-colors group flex items-center justify-between"
              onClick={() => handleCopy(fmt.value)}
            >
              <div>
                <p className="text-xs text-muted-foreground">{fmt.label}</p>
                <p className="font-mono text-sm text-foreground">{fmt.value}</p>
              </div>
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Card>
          ))}
        </div>
      </div>

      <Card className="border border-border bg-secondary/30 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Red</p>
            <p className="text-lg font-bold text-foreground">{rgbColor.r}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Green</p>
            <p className="text-lg font-bold text-foreground">{rgbColor.g}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Blue</p>
            <p className="text-lg font-bold text-foreground">{rgbColor.b}</p>
          </div>
        </div>
      </Card>

      <Card className="border border-border bg-secondary/30 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Hue</p>
            <p className="text-lg font-bold text-foreground">{hslColor.h}°</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Saturation</p>
            <p className="text-lg font-bold text-foreground">{hslColor.s}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Lightness</p>
            <p className="text-lg font-bold text-foreground">{hslColor.l}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
