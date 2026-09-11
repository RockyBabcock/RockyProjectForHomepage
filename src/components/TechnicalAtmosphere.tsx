import React, { useEffect, useRef, useState } from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const TechnicalAtmosphere: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      // Update displayed coordinates throttled
      if (Math.random() > 0.7) {
        setCoords({
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
        });
      }
    };

    const loop = () => {
      // Lerp mouse
      const dx = mouseRef.current.targetX - mouseRef.current.x;
      const dy = mouseRef.current.targetY - mouseRef.current.y;
      mouseRef.current.x += dx * 0.08;
      mouseRef.current.y += dy * 0.08;

      const cursorEl = document.getElementById('atmospheric-cursor-glow');
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${mouseRef.current.x - 300}px, ${mouseRef.current.y - 300}px, 0)`;
      }

      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Cursor Reactive Soft Violet Bloom (Follows Mouse smoothly) */}
      <div
        id="atmospheric-cursor-glow"
        className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 will-change-transform ${
          isDark
            ? 'bg-gradient-to-tr from-violet-600/18 via-purple-500/12 to-indigo-500/10 opacity-70'
            : 'bg-gradient-to-tr from-purple-300/25 via-violet-200/20 to-amber-100/15 opacity-60'
        }`}
        style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
      />

      {/* 2. Large Scale Atmospheric Orbit Rings (Mathematical Geometries) */}
      <div className="absolute -top-[15%] right-[-10%] w-[900px] lg:w-[1200px] h-[900px] lg:h-[1200px] pointer-events-none opacity-[0.14]">
        <svg
          viewBox="0 0 1000 1000"
          className={`w-full h-full ${reducedMotion ? '' : 'animate-[spin_120s_linear_infinite]'}`}
          fill="none"
          stroke={isDark ? '#C4B5FD' : '#4C1D95'}
          strokeWidth="0.8"
        >
          {/* Concentric telemetry rings */}
          <circle cx="500" cy="500" r="480" strokeDasharray="3 9" />
          <circle cx="500" cy="500" r="420" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="340" strokeDasharray="12 12" />
          <circle cx="500" cy="500" r="220" strokeWidth="0.7" />
          <circle cx="500" cy="500" r="90" strokeDasharray="2 6" />

          {/* Radial axis markers */}
          <line x1="500" y1="20" x2="500" y2="980" strokeDasharray="4 8" strokeOpacity="0.6" />
          <line x1="20" y1="500" x2="980" y2="500" strokeDasharray="4 8" strokeOpacity="0.6" />
          <line x1="160" y1="160" x2="840" y2="840" strokeDasharray="1 15" strokeOpacity="0.4" />
          <line x1="840" y1="160" x2="160" y2="840" strokeDasharray="1 15" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* 3. Lower Left Secondary Orbital Complex */}
      <div className="absolute bottom-[-10%] left-[-8%] w-[700px] lg:w-[950px] h-[700px] lg:h-[950px] pointer-events-none opacity-[0.11]">
        <svg
          viewBox="0 0 800 800"
          className={`w-full h-full ${reducedMotion ? '' : 'animate-[spin_160s_linear_infinite_reverse]'}`}
          fill="none"
          stroke={isDark ? '#A78BFA' : '#6B21A8'}
          strokeWidth="0.7"
        >
          <circle cx="400" cy="400" r="380" strokeDasharray="4 12" />
          <circle cx="400" cy="400" r="280" />
          <circle cx="400" cy="400" r="160" strokeDasharray="6 6" />
          <rect x="250" y="250" width="300" height="300" strokeWidth="0.5" strokeDasharray="2 8" />
        </svg>
      </div>

      {/* 4. Fine Technical Grid Matrix with Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.045]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(#FFFFFF 1px, transparent 1px)'
              : 'radial-gradient(#171717 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* 5. Precision Laboratory Corner Crosshairs & Coordinates Readout */}
      <div className="hidden xl:block fixed bottom-6 left-8 font-mono text-[9px] uppercase tracking-[0.24em] opacity-35 z-20">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 border border-current" />
          <span>GEO 37.7749° N · 122.4194° W</span>
          <span className="opacity-40">/</span>
          <span>PTR {coords.x},{coords.y}</span>
          <span className="opacity-40">/</span>
          <span>SYS V2.6 PRODUCTION</span>
        </div>
      </div>

      <div className="hidden xl:block fixed bottom-6 right-8 font-mono text-[9px] uppercase tracking-[0.24em] opacity-35 z-20">
        <div className="flex items-center gap-3">
          <span>FPS 60.0 VERIFIED</span>
          <span className="opacity-40">/</span>
          <span>LATENCY &lt; 8MS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
        </div>
      </div>
    </div>
  );
};
