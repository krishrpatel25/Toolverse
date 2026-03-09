'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-8 text-foreground text-center">Stopwatch</h2>
        
        <div className="text-6xl font-mono font-bold text-accent text-center mb-8 bg-secondary/30 p-6 rounded-lg">
          {formatTime(time)}
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleLap} variant="outline" disabled={!isRunning}>
            Lap
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </Card>

      {laps.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Laps</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {laps.map((lap, index) => (
              <div key={index} className="flex justify-between text-sm p-2 bg-secondary/30 rounded">
                <span className="text-muted-foreground">Lap {index + 1}</span>
                <span className="font-mono font-medium text-foreground">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
