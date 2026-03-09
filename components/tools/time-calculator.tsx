'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function TimeCalculator() {
  const [hours1, setHours1] = useState('2');
  const [minutes1, setMinutes1] = useState('30');
  const [seconds1, setSeconds1] = useState('0');
  const [hours2, setHours2] = useState('1');
  const [minutes2, setMinutes2] = useState('15');
  const [seconds2, setSeconds2] = useState('30');

  const toSeconds = (h: string, m: string, s: string) => {
    return (parseInt(h) || 0) * 3600 + (parseInt(m) || 0) * 60 + (parseInt(s) || 0);
  };

  const fromSeconds = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const segs = secs % 60;
    return { hours, minutes: mins, seconds: segs };
  };

  const time1Seconds = toSeconds(hours1, minutes1, seconds1);
  const time2Seconds = toSeconds(hours2, minutes2, seconds2);
  const diffSeconds = Math.abs(time1Seconds - time2Seconds);
  const diff = fromSeconds(diffSeconds);
  const totalSeconds = time1Seconds + time2Seconds;
  const total = fromSeconds(totalSeconds);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  const reset = () => {
    setHours1('2');
    setMinutes1('30');
    setSeconds1('0');
    setHours2('1');
    setMinutes2('15');
    setSeconds2('30');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Time Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Time 1</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Hours</label>
                <input
                  type="number"
                  value={hours1}
                  onChange={(e) => setHours1(e.target.value)}
                  min="0"
                  max="23"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Minutes</label>
                <input
                  type="number"
                  value={minutes1}
                  onChange={(e) => setMinutes1(e.target.value)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Seconds</label>
                <input
                  type="number"
                  value={seconds1}
                  onChange={(e) => setSeconds1(e.target.value)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Time 2</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Hours</label>
                <input
                  type="number"
                  value={hours2}
                  onChange={(e) => setHours2(e.target.value)}
                  min="0"
                  max="23"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Minutes</label>
                <input
                  type="number"
                  value={minutes2}
                  onChange={(e) => setMinutes2(e.target.value)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Seconds</label>
                <input
                  type="number"
                  value={seconds2}
                  onChange={(e) => setSeconds2(e.target.value)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/10 border-accent">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Results</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Difference:</span>
            <span className="font-medium text-foreground">{diff.hours}h {diff.minutes}m {diff.seconds}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium text-foreground">{total.hours}h {total.minutes}m {total.seconds}s</span>
          </div>
          <div className="flex justify-between items-center border-t border-border pt-3">
            <span className="text-muted-foreground">Total Seconds:</span>
            <span className="font-bold text-accent">{totalSeconds}s</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => copyToClipboard(`${diff.hours}h ${diff.minutes}m ${diff.seconds}s`)} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          Copy Diff
        </Button>
        <Button onClick={reset} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
