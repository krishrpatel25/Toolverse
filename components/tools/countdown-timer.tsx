'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function CountdownTimer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((t) => {
          if (t <= 1) {
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
  };

  const setTimer = (mins: number) => {
    setTotalSeconds(mins * 60);
    setIsRunning(false);
  };

  const formatTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-8 text-foreground text-center">Countdown Timer</h2>
        
        <div className="text-6xl font-mono font-bold text-accent text-center mb-8 bg-secondary/30 p-6 rounded-lg">
          {formatTime}
        </div>

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {[1, 5, 10, 15, 30].map((min) => (
            <Button
              key={min}
              onClick={() => setTimer(min)}
              variant={totalSeconds === min * 60 ? 'default' : 'outline'}
              size="sm"
            >
              {min}m
            </Button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={handleStart} className="gap-2">
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-accent/10 border-accent">
        <p className="text-sm text-center text-muted-foreground">
          Custom time: Set minutes and seconds manually above
        </p>
      </Card>
    </div>
  );
}
