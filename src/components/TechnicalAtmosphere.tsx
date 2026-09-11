import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const TechnicalAtmosphere: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const location = useLocation();

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Parallax & Cursor references (all animated via RAF without React re-renders)
  const mouseRef = useRef({ x: -500, y: -500, targetX: -500, targetY: -500 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const rafId = useRef<number | null>(null);

  // DOM Layer references for direct high-performance GPU transforms
  const lightFieldRef = useRef<HTMLDivElement>(null);
  const orbitLayerRef = useRef<HTMLDivElement>(null);
  const networkLayerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Determine contextual palette accent from current route or scroll section
  const path = location.pathname.toLowerCase();
  const isSvg = path.includes('svg');
  const is3D = path.includes('3d') || path.includes('rockyhomepage');
  const isAI = path.includes('ai') || path.includes('melius');

  const accentColor = isSvg
    ? isDark
      ? '#38BDF8'
      : '#0284C7' // Cool blue
    : isAI
    ? isDark
      ? '#F472B6'
      : '#DB2777' // Soft magenta
    : is3D
    ? isDark
      ? '#818CF8'
      : '#4F46E5' // Indigo
    : isDark
    ? '#A78BFA'
    : '#7C3AED'; // Default violet

  // Check prefers-reduced-motion & fine pointer
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionMql.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionMql.addEventListener('change', motionHandler);

    const pointerMql = window.matchMedia('(pointer: fine)');
    setIsFinePointer(pointerMql.matches);
    const pointerHandler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    pointerMql.addEventListener('change', pointerHandler);

    return () => {
      motionMql.removeEventListener('change', motionHandler);
      pointerMql.removeEventListener('change', pointerHandler);
    };
  }, []);

  // RAF Animation loop for smooth spatial parallax & cursor illumination
  useEffect(() => {
    let isActive = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden && rafId.current) {
        cancelAnimationFrame(rafId.current);
      } else if (!document.hidden && isActive) {
        rafId.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const loop = () => {
      if (!isActive) return;

      // Smooth lerp for mouse
      const mDx = mouseRef.current.targetX - mouseRef.current.x;
      const mDy = mouseRef.current.targetY - mouseRef.current.y;
      mouseRef.current.x += mDx * 0.07;
      mouseRef.current.y += mDy * 0.07;

      // Smooth lerp for scroll
      const sDy = scrollRef.current.targetY - scrollRef.current.y;
      scrollRef.current.y += sDy * 0.08;

      const halfW = window.innerWidth / 2 || 1;
      const halfH = window.innerHeight / 2 || 1;
      const normX = (mouseRef.current.x - halfW) / halfW;
      const normY = (mouseRef.current.y - halfH) / halfH;

      // 1. Layer 1: Ambient light field (slowest drift: 6px cursor, 0.03x scroll)
      if (lightFieldRef.current && !reducedMotion) {
        const lx = normX * 8;
        const ly = normY * 8 - scrollRef.current.y * 0.03;
        lightFieldRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      }

      // 2. Layer 2: Orbit geometries (medium drift: 12px cursor, 0.06x scroll)
      if (orbitLayerRef.current && !reducedMotion) {
        const ox = normX * 14;
        const oy = normY * 14 - scrollRef.current.y * 0.06;
        orbitLayerRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      }

      // 3. Layer 3: Technical network lines & signals (fastest: 22px cursor, 0.10x scroll)
      if (networkLayerRef.current && !reducedMotion) {
        const nx = normX * 22;
        const ny = normY * 22 - scrollRef.current.y * 0.1;
        networkLayerRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }

      // 4. Cursor localized soft illumination spotlight
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${mouseRef.current.x - 240}px, ${
          mouseRef.current.y - 240
        }px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden will-change-transform"
      aria-hidden="true"
    >
      {/* =========================================================================
          LAYER 1: Large Atmospheric Light Field (Deep radial gradient blooms)
          ========================================================================= */}
      <div ref={lightFieldRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <div
          className={`absolute -top-32 -left-32 w-[750px] h-[750px] rounded-full blur-[140px] transition-colors duration-1000 ${
            isDark ? 'opacity-30' : 'opacity-40'
          }`}
          style={{ backgroundColor: accentColor }}
        />
        <div
          className={`absolute top-[45%] -right-32 w-[650px] h-[650px] rounded-full blur-[150px] transition-colors duration-1000 ${
            isDark ? 'bg-indigo-700/20 opacity-35' : 'bg-[#EAE4D5]/70 opacity-45'
          }`}
        />
        <div
          className={`absolute -bottom-32 left-[30%] w-[700px] h-[700px] rounded-full blur-[160px] transition-colors duration-1000 ${
            isDark ? 'bg-violet-900/25 opacity-30' : 'bg-[#DDDCEE]/55 opacity-40'
          }`}
        />
      </div>

      {/* =========================================================================
          LAYER 2: Thin Concentric Orbital Geometry (Mathematical Radii & Ticks)
          ========================================================================= */}
      <div ref={orbitLayerRef} className="absolute inset-0 pointer-events-none will-change-transform">
        {/* Upper-Right Orbital Structure */}
        <div className="absolute -top-[12%] -right-[8%] w-[850px] lg:w-[1100px] h-[850px] lg:h-[1100px] opacity-[0.24] transition-opacity duration-700">
          <svg
            viewBox="0 0 1000 1000"
            className={`w-full h-full ${reducedMotion ? '' : 'animate-[spin_180s_linear_infinite]'}`}
            fill="none"
            stroke={isDark ? '#C4B5FD' : '#5B21B6'}
            strokeWidth="0.75"
          >
            {/* Concentric rings */}
            <circle cx="500" cy="500" r="480" strokeDasharray="3 9" strokeOpacity="0.7" />
            <circle cx="500" cy="500" r="420" strokeWidth="0.5" strokeOpacity="0.5" />
            <circle cx="500" cy="500" r="340" strokeDasharray="16 12" strokeOpacity="0.8" />
            <circle cx="500" cy="500" r="240" strokeWidth="0.6" />
            <circle cx="500" cy="500" r="140" strokeDasharray="4 8" strokeOpacity="0.6" />
            <circle cx="500" cy="500" r="40" strokeWidth="1" strokeOpacity="0.9" />

            {/* Radial Caliper Lines */}
            <line x1="500" y1="20" x2="500" y2="980" strokeDasharray="4 12" strokeOpacity="0.5" />
            <line x1="20" y1="500" x2="980" y2="500" strokeDasharray="4 12" strokeOpacity="0.5" />
            <line x1="160" y1="160" x2="840" y2="840" strokeDasharray="2 16" strokeOpacity="0.4" />
            <line x1="840" y1="160" x2="160" y2="840" strokeDasharray="2 16" strokeOpacity="0.4" />

            {/* Orbiting focal satellite */}
            <circle cx="500" cy="80" r="3.5" fill={accentColor} />
            <circle cx="840" cy="500" r="2.5" fill={isDark ? '#A78BFA' : '#7C3AED'} />
          </svg>
        </div>

        {/* Lower-Left Planetary Arc */}
        <div className="absolute -bottom-[15%] -left-[10%] w-[750px] lg:w-[950px] h-[750px] lg:h-[950px] opacity-[0.20] transition-opacity duration-700">
          <svg
            viewBox="0 0 800 800"
            className={`w-full h-full ${reducedMotion ? '' : 'animate-[spin_240s_linear_infinite_reverse]'}`}
            fill="none"
            stroke={isDark ? '#A78BFA' : '#4C1D95'}
            strokeWidth="0.75"
          >
            <circle cx="400" cy="400" r="380" strokeDasharray="5 15" />
            <circle cx="400" cy="400" r="290" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="190" strokeDasharray="8 8" />
            <line x1="400" y1="40" x2="400" y2="760" strokeDasharray="4 8" strokeOpacity="0.4" />
            <line x1="40" y1="400" x2="760" y2="400" strokeDasharray="4 8" strokeOpacity="0.4" />
            <circle cx="690" cy="400" r="3" fill={accentColor} />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: Technical Line Network & Live Travelling Signal Trajectories
          ========================================================================= */}
      <div ref={networkLayerRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <svg
          className="w-full h-full absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradient stroke for signal traveling pulse */}
            <linearGradient id="signal-pulse-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
              <stop offset="50%" stopColor={accentColor} stopOpacity="0.9" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>

            <linearGradient id="signal-pulse-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#C4B5FD' : '#6D28D9'} stopOpacity="0" />
              <stop offset="50%" stopColor={isDark ? '#C4B5FD' : '#6D28D9'} stopOpacity="0.85" />
              <stop offset="100%" stopColor={isDark ? '#C4B5FD' : '#6D28D9'} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Static Fine Architectural Vector Network */}
          <g
            stroke={isDark ? '#8B5CF6' : '#171717'}
            strokeWidth="0.6"
            strokeOpacity={isDark ? 0.22 : 0.14}
            fill="none"
          >
            {/* Long horizontal datum baselines */}
            <line x1="0" y1="18%" x2="100%" y2="18%" strokeDasharray="2 12" />
            <line x1="0" y1="52%" x2="100%" y2="52%" strokeDasharray="1 8" />
            <line x1="0" y1="84%" x2="100%" y2="84%" strokeDasharray="2 12" />

            {/* Vertical column alignment traces */}
            <line x1="16%" y1="0" x2="16%" y2="100%" strokeDasharray="1 10" />
            <line x1="84%" y1="0" x2="84%" y2="100%" strokeDasharray="1 10" />

            {/* Trajectory 1: Curved S-Spine across middle canvas */}
            <path d="M 0,260 C 350,260 550,540 950,540 S 1400,320 1920,320" strokeWidth="0.8" />

            {/* Trajectory 2: Ascending Diagonal Wave */}
            <path
              d="M 100,900 C 450,900 700,680 1100,680 S 1550,450 1920,450"
              strokeDasharray="4 8"
              strokeWidth="0.75"
            />
          </g>

          {/* ACTIVE LIVE SIGNALS (4-6 flowing points & pulses along trajectories) */}
          {!reducedMotion && (
            <g fill="none">
              {/* Signal 1: Traveling packet on Trajectory 1 */}
              <path
                d="M 0,260 C 350,260 550,540 950,540 S 1400,320 1920,320"
                stroke="url(#signal-pulse-1)"
                strokeWidth="2"
                strokeDasharray="90 1200"
                className="animate-[dash_8s_linear_infinite]"
              />

              {/* Signal 2: Reverse traveling pulse on Trajectory 2 */}
              <path
                d="M 100,900 C 450,900 700,680 1100,680 S 1550,450 1920,450"
                stroke="url(#signal-pulse-2)"
                strokeWidth="1.8"
                strokeDasharray="70 1400"
                className="animate-[dash_12s_linear_infinite_reverse]"
              />

              {/* Signal 3: Horizontal line packet across 18% line */}
              <line
                x1="0"
                y1="18%"
                x2="100%"
                y2="18%"
                stroke={accentColor}
                strokeWidth="1.5"
                strokeDasharray="40 900"
                className="animate-[dash_6s_linear_infinite]"
              />

              {/* Signal 4: Vertical packet down 84% trace */}
              <line
                x1="84%"
                y1="0"
                x2="84%"
                y2="100%"
                stroke={isDark ? '#C4B5FD' : '#7C3AED'}
                strokeWidth="1.5"
                strokeDasharray="30 800"
                className="animate-[dash_9s_linear_infinite]"
              />
            </g>
          )}

          {/* Architectural Intersection Crosshairs (Pure geometry, no fake labels) */}
          <g stroke={isDark ? '#A78BFA' : '#171717'} strokeWidth="0.8" strokeOpacity={isDark ? 0.35 : 0.22}>
            {/* Top-left datum */}
            <line x1="40" y1="46" x2="56" y2="46" />
            <line x1="48" y1="38" x2="48" y2="54" />

            {/* Top-right datum */}
            <line x1="94%" y1="46" x2="95.5%" y2="46" />
            <line x1="94.75%" y1="38" x2="94.75%" y2="54" />

            {/* Mid-screen intersections */}
            <circle cx="16%" cy="18%" r="2" fill={accentColor} fillOpacity="0.6" stroke="none" />
            <circle cx="84%" cy="52%" r="2" fill={accentColor} fillOpacity="0.6" stroke="none" />
            <circle cx="16%" cy="84%" r="2" fill={accentColor} fillOpacity="0.6" stroke="none" />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          LAYER 4: Localized Interactive Illumination Spotlight
          When cursor moves, this creates a restrained 480px focal glow that
          subtly illuminates the architectural lines beneath the pointer
          ========================================================================= */}
      {isFinePointer && (
        <div
          ref={cursorGlowRef}
          className={`absolute top-0 left-0 w-[480px] h-[480px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-300 will-change-transform ${
            isDark
              ? 'bg-gradient-to-tr from-violet-600/22 via-purple-500/15 to-transparent opacity-80'
              : 'bg-gradient-to-tr from-purple-300/28 via-violet-200/20 to-transparent opacity-75'
          }`}
          style={{ transform: 'translate3d(-500px, -500px, 0)' }}
        />
      )}

      {/* =========================================================================
          LAYER 5: Fine Architectural Grid Matrix (Subtle coordinate points)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.055]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(#FFFFFF 1px, transparent 1px)'
              : 'radial-gradient(#171717 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    </div>
  );
};

