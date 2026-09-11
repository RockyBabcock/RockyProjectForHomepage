import React, { useState, useEffect } from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Initiate curtain exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 200);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[10000] flex flex-col justify-between p-6 sm:p-12 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] cursor-pointer select-none ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      } ${
        isDark
          ? 'bg-[#030014] text-[#F5F3EF]'
          : 'bg-[#F5F4ED] text-[#171717]'
      }`}
      aria-label="Portfolio Loading Screen — Click anywhere to skip"
    >
      {/* Background Matrix Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px)'
              : 'radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between font-mono text-xs opacity-60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>ROCKY BABCOCK // STUDIO</span>
        </div>
        <div className="hidden sm:block uppercase tracking-widest text-[10px]">
          [ CLICK ANYWHERE TO ENTER ]
        </div>
      </div>

      {/* Centerpiece: Monumental Typography & System Identity */}
      <div className="relative z-10 space-y-4 max-w-4xl">
        <div className="font-mono text-xs uppercase tracking-[0.28em] text-violet-400 font-semibold flex items-center gap-3">
          <span className="w-6 h-[1px] bg-violet-400" />
          <span>CREATIVE TECHNOLOGY & ARCHIVE</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.9] lowercase">
          spatial systems<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
        </h1>

        <p className="font-sans text-sm sm:text-base opacity-70 font-light max-w-lg">
          Synchronizing runtime telemetry, spatial WebGL projection, and deterministic pipelines.
        </p>
      </div>

      {/* Bottom Telemetry & Large Progress Counter */}
      <div className="relative z-10 flex items-end justify-between border-t border-current/15 pt-6 sm:pt-8 font-mono">
        <div className="space-y-1 text-xs opacity-60">
          <div>PIPELINE: HYDRATION RUNTIME</div>
          <div className="text-[10px] text-violet-400">STATUS: INITIALIZING SPECIMENS</div>
        </div>

        <div className="text-right">
          <span className="text-6xl sm:text-8xl lg:text-9xl font-light font-mono tracking-tighter leading-none block">
            {String(progress).padStart(3, '0')}
            <span className="text-2xl sm:text-4xl text-violet-400 font-light">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};
