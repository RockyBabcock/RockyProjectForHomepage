import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export type WatercolorPalette = 'cool' | 'warm' | 'spatial' | 'ai' | 'rainbow';

interface WatercolorPigmentFieldProps {
  variant?: WatercolorPalette;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  intensity?: 'subtle' | 'medium' | 'vibrant';
  blur?: 'soft' | 'deep' | 'diffuse';
}

export const WatercolorPigmentField: React.FC<WatercolorPigmentFieldProps> = ({
  variant = 'cool',
  className = '',
  size = 'md',
  intensity = 'medium',
  blur = 'deep',
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  // Sizing definitions
  const sizeClasses = {
    sm: 'w-[280px] h-[220px] sm:w-[380px] sm:h-[300px]',
    md: 'w-[420px] h-[340px] sm:w-[600px] sm:h-[480px]',
    lg: 'w-[640px] h-[520px] sm:w-[860px] sm:h-[680px]',
    hero: 'w-[750px] h-[600px] sm:w-[1100px] sm:h-[850px] lg:w-[1350px] lg:h-[950px]',
  }[size];

  // Blur strengths
  const blurClasses = {
    soft: 'blur-[60px] sm:blur-[80px]',
    deep: 'blur-[90px] sm:blur-[130px]',
    diffuse: 'blur-[120px] sm:blur-[170px]',
  }[blur];

  // Opacity calibrations for light and dark
  const opacity = {
    subtle: isDark ? 'opacity-20' : 'opacity-35',
    medium: isDark ? 'opacity-35' : 'opacity-55',
    vibrant: isDark ? 'opacity-50' : 'opacity-75',
  }[intensity];

  // Gradient configurations per chromatic mood
  // In light mode, watercolor bleeds onto cotton paper (#F5F4ED) using natural pigment tones
  // In dark mode, luminous organic blooms create cosmic depth
  return (
    <div
      className={`absolute pointer-events-none select-none -z-10 transition-all duration-700 ${sizeClasses} ${blurClasses} ${opacity} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full transform-gpu overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cool Variant: Cerulean blue, cobalt, and slate teal */}
          <linearGradient id={`grad-cool-${variant}`} x1="10%" y1="15%" x2="90%" y2="85%">
            <stop offset="0%" stopColor={isDark ? '#0284C7' : '#6F87AA'} stopOpacity={0.9} />
            <stop offset="45%" stopColor={isDark ? '#38BDF8' : '#88A4C4'} stopOpacity={0.7} />
            <stop offset="80%" stopColor={isDark ? '#6366F1' : '#B0C4DE'} stopOpacity={0.5} />
            <stop offset="100%" stopColor={isDark ? '#818CF8' : '#D1DFEE'} stopOpacity={0.2} />
          </linearGradient>

          {/* Warm Variant: Amber, burnt sienna, and warm gold */}
          <linearGradient id={`grad-warm-${variant}`} x1="15%" y1="20%" x2="85%" y2="80%">
            <stop offset="0%" stopColor={isDark ? '#D97706' : '#BC9A64'} stopOpacity={0.9} />
            <stop offset="40%" stopColor={isDark ? '#F59E0B' : '#CFB283'} stopOpacity={0.75} />
            <stop offset="75%" stopColor={isDark ? '#EA580C' : '#E4D3B4'} stopOpacity={0.45} />
            <stop offset="100%" stopColor={isDark ? '#B45309' : '#F2E8D5'} stopOpacity={0.2} />
          </linearGradient>

          {/* Spatial Variant: Cosmic violet, royal indigo, deep lavender */}
          <linearGradient id={`grad-spatial-${variant}`} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor={isDark ? '#7C3AED' : '#8B5CF6'} stopOpacity={0.85} />
            <stop offset="50%" stopColor={isDark ? '#4F46E5' : '#A78BFA'} stopOpacity={0.7} />
            <stop offset="85%" stopColor={isDark ? '#818CF8' : '#C4B5FD'} stopOpacity={0.4} />
            <stop offset="100%" stopColor={isDark ? '#3730A3' : '#E0E7FF'} stopOpacity={0.15} />
          </linearGradient>

          {/* AI / Rotational Variant: Crimson violet, magenta rose, soft coral */}
          <linearGradient id={`grad-ai-${variant}`} x1="10%" y1="20%" x2="90%" y2="80%">
            <stop offset="0%" stopColor={isDark ? '#DB2777' : '#D946EF'} stopOpacity={0.85} />
            <stop offset="45%" stopColor={isDark ? '#F472B6' : '#E879F9'} stopOpacity={0.65} />
            <stop offset="80%" stopColor={isDark ? '#8B5CF6' : '#F0ABFC'} stopOpacity={0.45} />
            <stop offset="100%" stopColor={isDark ? '#4C1D95' : '#FAE8FF'} stopOpacity={0.15} />
          </linearGradient>

          {/* Rainbow / Hero Spectrum: Multidimensional pigment diffusion */}
          <linearGradient id={`grad-rainbow-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#7C3AED' : '#8B5CF6'} stopOpacity={0.8} />
            <stop offset="28%" stopColor={isDark ? '#38BDF8' : '#6F87AA'} stopOpacity={0.7} />
            <stop offset="58%" stopColor={isDark ? '#10B981' : '#758269'} stopOpacity={0.5} />
            <stop offset="82%" stopColor={isDark ? '#F59E0B' : '#BC9A64'} stopOpacity={0.65} />
            <stop offset="100%" stopColor={isDark ? '#EC4899' : '#DB2777'} stopOpacity={0.4} />
          </linearGradient>
        </defs>

        {/* Organic Pigment Blob 1: Main Capillary Body with Fluid Asymmetry */}
        <path
          d="M 180,120 C 310,60 520,90 640,190 C 760,290 730,460 610,530 C 490,600 290,580 170,490 C 50,400 50,180 180,120 Z"
          fill={`url(#grad-${variant}-${variant})`}
          className="watercolor-micro-motion"
          style={{
            mixBlendMode: isDark ? 'screen' : 'multiply',
            transformOrigin: '400px 300px',
          }}
        />

        {/* Organic Pigment Blob 2: Satellite Bleed Bloom with Counter-Rotation */}
        <path
          d="M 420,160 C 560,110 680,210 690,340 C 700,470 570,540 440,510 C 310,480 260,370 290,260 C 320,150 280,210 420,160 Z"
          fill={`url(#grad-${variant}-${variant})`}
          opacity={0.7}
          className="watercolor-micro-motion"
          style={{
            mixBlendMode: isDark ? 'screen' : 'multiply',
            transformOrigin: '450px 320px',
            animationDirection: 'reverse',
          }}
        />
      </svg>
    </div>
  );
};
