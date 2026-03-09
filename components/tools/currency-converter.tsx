'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.53 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86, JPY: 162.50, CAD: 1.48, AUD: 1.66 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1, JPY: 189, CAD: 1.72, AUD: 1.93 },
    JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, JPY: 1, CAD: 0.0091, AUD: 0.010 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110, CAD: 1, AUD: 1.13 },
    AUD: { USD: 0.65, EUR: 0.60, GBP: 0.52, JPY: 97.50, CAD: 0.88, AUD: 1 },
  };

  const convert = () => {
    const value = parseFloat(amount) || 0;
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    return (value * rate).toFixed(2);
  };

  const currencies = Object.keys(exchangeRates);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Currency Converter</h2>
        <p className="text-sm text-muted-foreground mb-4">Exchange rates are approximate and for reference only</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Result</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg text-muted-foreground">{amount} {fromCurrency}</span>
          <span className="text-foreground">=</span>
          <span className="text-2xl font-bold text-accent">{convert()} {toCurrency}</span>
        </div>
      </Card>
    </div>
  );
}
