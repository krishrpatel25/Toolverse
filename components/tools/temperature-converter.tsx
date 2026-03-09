'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState('20');
  const [fahrenheit, setFahrenheit] = useState('68');
  const [kelvin, setKelvin] = useState('293.15');

  const handleCelsius = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value) || 0;
    setFahrenheit(((c * 9/5) + 32).toFixed(2));
    setKelvin((c + 273.15).toFixed(2));
  };

  const handleFahrenheit = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value) || 0;
    const c = (f - 32) * 5/9;
    setCelsius(c.toFixed(2));
    setKelvin((c + 273.15).toFixed(2));
  };

  const handleKelvin = (value: string) => {
    setKelvin(value);
    const k = parseFloat(value) || 0;
    const c = k - 273.15;
    setCelsius(c.toFixed(2));
    setFahrenheit(((c * 9/5) + 32).toFixed(2));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Temperature Converter</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={(e) => handleCelsius(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheit(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Kelvin (K)</label>
            <input
              type="number"
              value={kelvin}
              onChange={(e) => handleKelvin(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="273.15"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Reference</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Water Freezes:</span>
            <span className="font-medium text-foreground">0°C = 32°F = 273.15K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room Temperature:</span>
            <span className="font-medium text-foreground">20°C = 68°F = 293.15K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Water Boils:</span>
            <span className="font-medium text-foreground">100°C = 212°F = 373.15K</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
