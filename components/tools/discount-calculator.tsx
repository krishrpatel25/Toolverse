'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('100');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [discountAmount, setDiscountAmount] = useState('20');
  const [usePercent, setUsePercent] = useState(true);

  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    let discount = 0;
    
    if (usePercent) {
      discount = (price * (parseFloat(discountPercent) || 0)) / 100;
    } else {
      discount = parseFloat(discountAmount) || 0;
    }
    
    return { discount, finalPrice: price - discount };
  };

  const { discount, finalPrice } = calculate();
  const actualPercent = originalPrice ? ((discount / parseFloat(originalPrice)) * 100).toFixed(2) : 0;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalPrice.toFixed(2));
    toast.success('Final price copied!');
  };

  const reset = () => {
    setOriginalPrice('100');
    setDiscountPercent('20');
    setDiscountAmount('20');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Discount Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Original Price ($)
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
            />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => {
                  setDiscountPercent(e.target.value);
                  setUsePercent(true);
                }}
                disabled={!usePercent}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Discount ($)
              </label>
              <input
                type="number"
                value={discountAmount}
                onChange={(e) => {
                  setDiscountAmount(e.target.value);
                  setUsePercent(false);
                }}
                disabled={usePercent}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Original Price:</span>
            <span className="font-medium text-foreground">${parseFloat(originalPrice || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount Amount:</span>
            <span className="font-medium text-foreground">${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount Percent:</span>
            <span className="font-medium text-foreground">{actualPercent}%</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-lg font-semibold text-foreground">Final Price:</span>
            <span className="text-lg font-bold text-accent">${finalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">You Save:</span>
            <span className="font-medium text-green-500">${discount.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={copyToClipboard} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy Price
        </Button>
        <Button onClick={reset} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
