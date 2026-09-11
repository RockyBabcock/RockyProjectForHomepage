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
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-colors duration-700"
      aria-hidden="true"
    >
      {/* Layer 1: Procedural High-Density Film Grain */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isDark ? 'opacity-[0.06] mix-blend-screen' : 'opacity-[0.045] mix-blend-multiply'
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="cinematic-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          {isDark ? (
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.85   0 1 0 0 0.8   0 0 1 0 1.0   0 0 0 0.95 0"
            />
          ) : (
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.15   0 0 0 0 0.12   0 0 0 0 0.08   0 0 0 0.9 0"
            />
          )}
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>

      {/* Layer 2: Deep Atmospheric Tonal Fields & Soft Pigment Bloom */}
      {isDark ? (
        <>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `
                radial-gradient(circle 800px at 15% 15%, rgba(124, 58, 237, 0.16) 0%, transparent 70%),
                radial-gradient(circle 900px at 85% 35%, rgba(79, 70, 229, 0.11) 0%, transparent 75%),
                radial-gradient(circle 1000px at 50% 85%, rgba(139, 92, 246, 0.12) 0%, transparent 70%),
                radial-gradient(circle 600px at 90% 90%, rgba(16, 185, 129, 0.04) 0%, transparent 60%)
              `,
            }}
          />
          {/* Subtle perimeter vignette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 60%, rgba(3, 0, 20, 0.6) 100%)',
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `
                radial-gradient(circle 850px at 8% 12%, rgba(255, 252, 245, 0.85) 0%, transparent 65%),
                radial-gradient(circle 950px at 90% 20%, rgba(238, 235, 224, 0.6) 0%, transparent 70%),
                radial-gradient(circle 750px at 45% 45%, rgba(234, 230, 242, 0.45) 0%, transparent 65%),
                radial-gradient(circle 900px at 15% 85%, rgba(243, 240, 230, 0.7) 0%, transparent 75%),
                radial-gradient(circle 700px at 85% 85%, rgba(220, 228, 240, 0.35) 0%, transparent 60%)
              `,
            }}
          />
          {/* Subtle warm paper edge calibration */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 65%, rgba(215, 210, 195, 0.4) 100%)',
            }}
          />
        </>
      )}

      {/* Layer 3: Organic Large-Scale Pigment Washes */}
      <div
        className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-purple-900/15' : 'bg-[#E5E0F2]/50'
        }`}
      />
      <div
        className={`absolute top-[40%] -right-40 w-[550px] h-[550px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-indigo-900/15' : 'bg-[#EAE4D5]/60'
        }`}
      />
      <div
        className={`absolute -bottom-40 left-[20%] w-[650px] h-[650px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
          isDark ? 'bg-violet-900/15' : 'bg-[#DDDCEE]/40'
        }`}
      />
    </div>
  );
};

export const PaperMaterialBackground = AtmosphericBackground;
