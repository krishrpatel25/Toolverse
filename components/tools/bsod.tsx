'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Monitor, Maximize2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BSOD() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showExit, setShowExit] = useState(false);

  // Progress counter - slow and realistic
  useEffect(() => {
    if (!isFullscreen) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        // Mostly slow +1, occasional +2 jumps, rare bigger jump
        const r = Math.random();
        const step = r > 0.95 ? 3 : r > 0.7 ? 2 : 1;
        return Math.min(prev + step, 100);
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isFullscreen]);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch { }
    document.body.style.cursor = 'none';
    document.body.style.overflow = 'hidden';
    setShowExit(false);
    setIsFullscreen(true);
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch { }
    document.body.style.cursor = '';
    document.body.style.overflow = '';
    setShowExit(false);
    setIsFullscreen(false);
  };

  // Sync with browser's native ESC fullscreen exit
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        document.body.style.cursor = '';
        document.body.style.overflow = '';
        setShowExit(false);
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Show cursor + X when mouse near top edge (within 80px)
  useEffect(() => {
    if (!isFullscreen) return;
    const onMove = (e: MouseEvent) => {
      const nearTop = e.clientY < 80;
      document.body.style.cursor = nearTop ? 'default' : 'none';
      setShowExit(nearTop);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isFullscreen]);

  return (
    <div className="space-y-6">
      {/* Tool Card */}
      <Card className="p-8 border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem]">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Monitor className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              BSOD Prank Tool
            </h2>
            <p className="text-sm text-neutral-400">
              Authentic Windows 10 crash simulation
            </p>
          </div>
        </div>

        {/* Preview thumbnail */}
        <div
          className="group relative aspect-video bg-[#0078d7] rounded-2xl overflow-hidden cursor-pointer mb-6 select-none"
          onClick={enterFullscreen}
          style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}
        >
          {/* Thumbnail content - scaled down proportionally */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{ padding: "7% 8%" }}
          >
            <div
              className="text-white font-light leading-none mb-3"
              style={{ fontSize: "clamp(32px, 8vw, 80px)" }}
            >
              :(
            </div>
            <div
              className="text-white font-light leading-tight mb-2 max-w-[80%]"
              style={{ fontSize: "clamp(8px, 1.4vw, 14px)" }}
            >
              Your PC ran into a problem and needs to restart. We're just
              collecting some error info, and then we'll restart for you.
            </div>
            <div
              className="text-white font-light mb-4"
              style={{ fontSize: "clamp(7px, 1.2vw, 13px)" }}
            >
              {progress}% complete
            </div>
            <div className="flex items-start gap-3 mt-auto">
              <div
                className="bg-white shrink-0 p-[2px]"
                style={{
                  width: "clamp(28px, 4vw, 50px)",
                  height: "clamp(28px, 4vw, 50px)",
                }}
              >
                <img
                  src="/bsod-qr.png"
                  alt="QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className="text-white leading-snug"
                style={{ fontSize: "clamp(5px, 0.8vw, 9px)", opacity: 0.9 }}
              >
                <p className="mb-1">
                  For more information about this issue and possible fixes,
                  visit https://www.windows.com/stopcode
                </p>
                <p>If you call a support person, give them this info:</p>
                <p className="font-semibold">
                  Stop code: CRITICAL_PROCESS_DIED
                </p>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/15 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-2 text-white">
              <Maximize2 size={16} />
              <span className="font-bold text-sm uppercase tracking-wider">
                Click to Launch Fullscreen
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={enterFullscreen}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-base"
        >
          <Maximize2 className="w-5 h-5 mr-2" />
          Launch Full-Screen BSOD
        </Button>
      </Card>

      {/* Instructions */}
      <Card className="p-5 bg-emerald-500/5 border-emerald-500/20 rounded-2xl">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            Click the preview or button to launch. The screen will fill your
            entire display. To exit, press{" "}
            <kbd className="px-1.5 py-0.5 bg-emerald-500/20 rounded border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
              ESC
            </kbd>
            .
          </p>
        </div>
      </Card>

      {/* ─── FULL-SCREEN BSOD OVERLAY ─── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.12 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="fixed inset-0 z-[2147483647] select-none overflow-hidden"
            style={{
              backgroundColor: "#0078d7",
              fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
              cursor: "none",
            }}
          >
            {/* BSOD Content — matches real Windows 10 proportions */}
            <div
              className="absolute text-white"
              style={{
                top: "13vh",
                left: "10vw",
                right: "10vw",
              }}
            >
              {/* :( face — large, thin weight */}
              <div
                style={{
                  fontSize: "11vw",
                  fontWeight: 200,
                  lineHeight: 1,
                  marginBottom: "5vh",
                }}
              >
                :(
              </div>

              {/* Main message */}
              <div
                style={{
                  fontSize: "2.3vw",
                  fontWeight: 300,
                  lineHeight: 1.25,
                  marginBottom: "3.5vh",
                  maxWidth: "55vw",
                }}
              >
                Your PC ran into a problem and needs to restart. We're just
                collecting some error info, and then we'll restart for you.
              </div>

              {/* Progress */}
              <div
                style={{
                  fontSize: "2vw",
                  fontWeight: 300,
                  marginBottom: "7vh",
                }}
              >
                {progress}% complete
              </div>

              {/* QR + Info row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.8vw",
                }}
              >
                {/* QR code white box */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "4px",
                    flexShrink: 0,
                    width: "7.5vw",
                    height: "7.5vw",
                    minWidth: 75,
                    minHeight: 75,
                  }}
                >
                  <img
                    src="/bsod-qr.png"
                    alt="QR Code"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* Info text */}
                <div
                  style={{
                    fontSize: "1vw",
                    lineHeight: 1.7,
                    maxWidth: "42vw",
                    paddingTop: "0.3vw",
                  }}
                >
                  <p style={{ marginBottom: "0.8vh" }}>
                    For more information about this issue and possible fixes,
                    visit https://www.windows.com/stopcode
                  </p>
                  <p style={{ opacity: 0.8 }}>
                    if you call a support person, give them this info:
                  </p>
                  <p style={{ fontWeight: 600 }}>
                    Stop code: CRITICAL_PROCESS_DIED
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}