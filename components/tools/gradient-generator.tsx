'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function GradientGenerator() {
  const [color1, setColor1] = useState('#22c55e');
  const [color2, setColor2] = useState('#3b82f6');
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<'linear' | 'radial'>('linear');

  const gradientCSS = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const copyToClipboard = () => {
    const css = `background: ${gradientCSS};`;
    navigator.clipboard.writeText(css);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Gradient Generator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Color 1</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer border border-input"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Color 2</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer border border-input"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'linear' | 'radial')}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>

            {type === 'linear' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Angle ({angle}°)</label>
                <input
                  type="range"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  min="0"
                  max="360"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 overflow-hidden">
        <div
          className="w-full h-48 rounded-lg mb-4 shadow-lg"
          style={{ background: gradientCSS }}
        />
        <Card className="p-4 bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-2 break-all font-mono">
            {gradientCSS}
          </p>
          <Button onClick={copyToClipboard} className="w-full" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
        </Card>
      </Card>
    </div>
  );
}
