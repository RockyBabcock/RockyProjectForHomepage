import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

/**
 * Layered Atmospheric Background (5 Physical & Digital Layers)
 *
 * Layer 1: Base surface (Light: warm paper #F5F4ED / Dark: #030014 deep violet-black)
 * Layer 2: Cinematic fine grain (fractal noise procedural shader, calibrated for light and dark)
 * Layer 3: Subtle atmospheric tonal field (Light: gallery daylight + sky blue / Dark: cosmic violet & deep indigo)
 * Layer 4: Organic pigment / watercolor bleed at document margins
 * Layer 5: Subtle technical calibration texture (laboratory hairline grid ticks and coordinates)
 */
export const AtmosphericBackground: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Layer 1: Base Surface Tint (handled by body background #F5F4ED / #030014) */}

      {/* Layer 2: Cinematic Fine Grain (Procedural SVG Fractal Noise) */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isDark
            ? 'opacity-[0.048] mix-blend-screen'
            : 'opacity-[0.035] mix-blend-multiply'
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="cinematic-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          {isDark ? (
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.8   0 1 0 0 0.75   0 0 1 0 1.0   0 0 0 0.9 0"
            />
          ) : (
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.1   0 0 0 0 0.09   0 0 0 0 0.08   0 0 0 0.85 0"
            />
          )}
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>

      {/* Layer 3: Subtle Atmospheric Tonal Field */}
      {isDark ? (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(circle at 18% 12%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 82% 28%, rgba(59, 130, 246, 0.08) 0%, transparent 55%),
              radial-gradient(circle at 45% 85%, rgba(124, 58, 237, 0.09) 0%, transparent 65%),
              radial-gradient(circle at 90% 90%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)
            `,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 14% 10%, rgba(255, 253, 247, 0.8) 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 86% 22%, rgba(236, 234, 222, 0.5) 0%, transparent 75%),
              radial-gradient(ellipse 75% 60% at 50% 95%, rgba(240, 238, 228, 0.65) 0%, transparent 80%),
              radial-gradient(ellipse 45% 45% at 90% 75%, rgba(210, 224, 240, 0.28) 0%, transparent 70%)
            `,
          }}
        />
      )}

      {/* Layer 4: Organic Marginal Fluidity (Subtle Watercolor Bleeds) */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
          isDark ? 'bg-purple-950/20' : 'bg-[#6F87AA]/10'
        }`}
      />
      <div
        className={`absolute top-1/2 -right-32 w-80 h-80 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
          isDark ? 'bg-indigo-950/25' : 'bg-[#BC9A64]/10'
        }`}
      />

      {/* Layer 5: Extremely Subtle Technical Calibration Texture (Corner Tick Marks & Studio Coordinates) */}
      <div
        className={`absolute top-3 left-4 text-[10px] font-mono tracking-[0.22em] transition-colors duration-500 hidden sm:block ${
          isDark ? 'text-violet-400/25' : 'text-[#171717]/20'
        }`}
      >
        + 42.3601° N · 71.0589° W [ROCKY/LAB]
      </div>
      <div
        className={`absolute top-3 right-4 text-[10px] font-mono tracking-[0.22em] transition-colors duration-500 hidden sm:block ${
          isDark ? 'text-violet-400/25' : 'text-[#171717]/20'
        }`}
      >
        SYS.STATE: OPTIMAL +
      </div>

      {/* Hairline Boundary Rules */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent transition-colors duration-500 ${
          isDark ? 'text-purple-500/20' : 'text-[#E2DFD2]/70'
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent transition-colors duration-500 ${
          isDark ? 'text-purple-500/20' : 'text-[#E2DFD2]/50'
        }`}
      />
    </div>
  );
};

export const PaperMaterialBackground = AtmosphericBackground;
