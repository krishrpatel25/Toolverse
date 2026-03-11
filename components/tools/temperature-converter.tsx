'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ThermometerSun } from 'lucide-react';

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState('20');
  const [fahrenheit, setFahrenheit] = useState('68');
  const [kelvin, setKelvin] = useState('293.15');

  const handleCelsius = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (isNaN(c)) {
      setFahrenheit('');
      setKelvin('');
      return;
    }
    setFahrenheit(((c * 9/5) + 32).toFixed(2));
    setKelvin((c + 273.15).toFixed(2));
  };

  const handleFahrenheit = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (isNaN(f)) {
      setCelsius('');
      setKelvin('');
      return;
    }
    const c = (f - 32) * 5/9;
    setCelsius(c.toFixed(2));
    setKelvin((c + 273.15).toFixed(2));
  };

  const handleKelvin = (value: string) => {
    setKelvin(value);
    const k = parseFloat(value);
    if (isNaN(k)) {
      setCelsius('');
      setFahrenheit('');
      return;
    }
    const c = k - 273.15;
    setCelsius(c.toFixed(2));
    setFahrenheit(((c * 9/5) + 32).toFixed(2));
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Temperature Converter</h2>
            <p className="text-sm text-neutral-400 mt-1">Convert between Celsius, Fahrenheit and Kelvin</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <ThermometerSun className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Celsius (°C)</label>
            <div className="relative">
              <Input
                type="number"
                value={celsius}
                onChange={(e) => handleCelsius(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium pr-12"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">°C</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Fahrenheit (°F)</label>
            <div className="relative">
              <Input
                type="number"
                value={fahrenheit}
                onChange={(e) => handleFahrenheit(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium pr-12"
                placeholder="32"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">°F</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Kelvin (K)</label>
            <div className="relative">
              <Input
                type="number"
                value={kelvin}
                onChange={(e) => handleKelvin(e.target.value)}
                className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium pr-12"
                placeholder="273.15"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">K</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem]">
        <h3 className="text-xs font-bold text-emerald-500/60 uppercase tracking-widest mb-4">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Water Freezes</p>
            <p className="text-sm text-white font-mono">0°C = 32°F = 273.15K</p>
          </div>
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Room Temp</p>
            <p className="text-sm text-white font-mono">20°C = 68°F = 293.15K</p>
          </div>
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Water Boils</p>
            <p className="text-sm text-white font-mono">100°C = 212°F = 373.15K</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
