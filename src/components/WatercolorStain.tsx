import React, { useId } from 'react';
import { WatercolorVariant, WatercolorIntensity } from '../types';

export interface WatercolorStainProps {
  variant?:
    | 'accent-wash'
    | 'hero-bleed'
    | 'subtle-stain'
    | 'divider-flow'
    | 'corner-pool'
    | 'specimen-underlay'
    | 'chromatic-bleed';
  palette?: WatercolorVariant | 'warm' | 'cool' | 'mixed' | 'ochre' | 'blue-grey' | 'muted-olive';
  intensity?: WatercolorIntensity;
  className?: string;
  opacity?: number;
  seed?: number; // 0, 1, 2, 3 to produce distinct organic shapes
}

export const WatercolorStain: React.FC<WatercolorStainProps> = ({
  variant = 'accent-wash',
  palette = 'cool',
  intensity = 'medium',
  className = '',
  opacity,
  seed = 0,
}) => {
  const uniqueId = useId().replace(/:/g, '_');

  // Intensity scaling
  const intensityFactor = {
    subtle: 0.6,
    medium: 0.85,
    deep: 1.05,
  }[intensity];

  const finalOpacity = (opacity !== undefined ? opacity : 0.8) * intensityFactor;

  // Palettes with true pigment granulation and capillary pooling colors
  const colorMap = {
    cool: {
      primary: '#6F87AA', // Dusty Prussian blue
      secondary: '#8FA5C4',
      deep: '#476283',
      pooling: '#3D5472', // Darker capillary drying ring
      faint: '#DCE5EF',
      bleed: '#C5D3E4',
    },
    warm: {
      primary: '#BC9A64', // Raw ochre / golden earth
      secondary: '#D1B487',
      deep: '#94733F',
      pooling: '#7F5E2C',
      faint: '#F4ECE0',
      bleed: '#E8DCB8',
    },
    'blue-grey': {
      primary: '#637A95', // Indigo-grey wash
      secondary: '#869BB4',
      deep: '#455A72',
      pooling: '#37495E',
      faint: '#DFE5EC',
      bleed: '#CCD5DF',
    },
    'muted-olive': {
      primary: '#758269', // Sap green / botanical olive
      secondary: '#95A189',
      deep: '#56634B',
      pooling: '#45513A',
      faint: '#E5E9E1',
      bleed: '#D2D9CC',
    },
    ochre: {
      primary: '#BC9A64',
      secondary: '#CEB284',
      deep: '#8E6E38',
      pooling: '#7A5B26',
      faint: '#F2E8D7',
      bleed: '#E7DCB9',
    },
    mixed: {
      primary: '#6F87AA',
      secondary: '#BC9A64',
      deep: '#4F6889',
      pooling: '#3E5675',
      faint: '#E4DFD3',
      bleed: '#D8D4C5',
    },
  };

  const colors = colorMap[palette as keyof typeof colorMap] || colorMap.cool;
  const filterId = `pigment_disp_${uniqueId}`;
  const granFilterId = `granulation_${uniqueId}`;

  // Procedural organic paths parameterized by seed (0, 1, 2, 3) to prevent identical shapes
  const seedShape = Math.abs(seed) % 4;

  if (variant === 'hero-bleed') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden mix-blend-multiply ${className}`}
        style={{ opacity: finalOpacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 960 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.038"
                numOctaves="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="36"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="3.8" />
            </filter>
            <filter id={granFilterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="3"
                result="granNoise"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0.45 0"
              />
            </filter>
          </defs>

          <g filter={`url(#${filterId})`}>
            {/* 1. Large wet wash field */}
            <path
              d="M70 210 C 130 90, 310 50, 520 70 C 720 90, 830 150, 870 250 C 900 340, 770 410, 580 420 C 360 430, 170 390, 90 330 C 20 280, 20 250, 70 210 Z"
              fill={colors.faint}
              opacity="0.8"
            />
            {/* 2. Secondary pigment bleed wash */}
            <path
              d="M150 220 C 230 120, 390 100, 560 130 C 710 160, 780 230, 750 300 C 720 360, 600 370, 470 360 C 310 350, 180 310, 140 260 C 120 230, 120 230, 150 220 Z"
              fill={colors.bleed}
              opacity="0.5"
            />
            {/* 3. Concentrated mineral core */}
            <path
              d="M260 230 C 350 160, 480 150, 600 180 C 690 220, 670 280, 610 320 C 530 350, 380 340, 300 310 C 230 280, 210 250, 260 230 Z"
              fill={colors.primary}
              opacity="0.38"
            />
            {/* 4. Deep pigment puddle */}
            <path
              d="M380 230 C 450 190, 530 190, 590 220 C 620 250, 590 290, 540 300 C 470 310, 390 290, 360 270 C 340 250, 350 240, 380 230 Z"
              fill={colors.deep}
              opacity="0.3"
            />
            {/* 5. Capillary drying edge fringe (dark pooling perimeter) */}
            <path
              d="M85 215 C 145 98, 315 58, 515 78 C 710 98, 820 155, 860 250 C 890 335, 760 405, 575 412 C 365 422, 175 385, 98 325 Z"
              fill="none"
              stroke={colors.pooling}
              strokeWidth="2.5"
              opacity="0.45"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'divider-flow') {
    return (
      <div
        className={`pointer-events-none select-none mix-blend-multiply ${className}`}
        style={{ opacity: finalOpacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <filter id={filterId} x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.052"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" />
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
          <g filter={`url(#${filterId})`}>
            <path
              d="M 15 32 Q 210 14, 410 33 T 785 27 Q 590 44, 390 37 T 15 32"
              fill={colors.faint}
              opacity="0.6"
            />
            <path
              d="M 80 31 Q 260 19, 440 31 T 710 28 Q 540 38, 320 34 T 80 31"
              fill={colors.primary}
              opacity="0.25"
            />
            <path
              d="M 180 32 Q 320 23, 490 30 T 630 29 Q 480 35, 330 33 T 180 32"
              fill={colors.deep}
              opacity="0.22"
            />
            {/* Thin edge pooling line */}
            <path
              d="M 25 32 Q 210 15, 410 33 T 775 27"
              stroke={colors.pooling}
              strokeWidth="1.2"
              fill="none"
              opacity="0.35"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'corner-pool') {
    return (
      <div
        className={`pointer-events-none select-none mix-blend-multiply ${className}`}
        style={{ opacity: finalOpacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.055"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" />
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
          <g filter={`url(#${filterId})`}>
            <path
              d="M 0 0 C 90 10, 190 45, 235 130 C 275 215, 255 295, 210 315 C 125 315, 0 315, 0 315 Z"
              fill={colors.faint}
              opacity="0.85"
            />
            <path
              d="M 0 0 C 65 10, 140 32, 175 95 C 205 160, 185 225, 150 235 C 85 235, 0 235, 0 235 Z"
              fill={colors.secondary}
              opacity="0.45"
            />
            <path
              d="M 0 0 C 45 5, 85 22, 110 65 C 130 110, 110 150, 85 160 C 45 160, 0 160, 0 160 Z"
              fill={colors.primary}
              opacity="0.35"
            />
            <path
              d="M 0 0 C 85 12, 180 44, 225 125 C 265 205, 245 285, 200 305"
              fill="none"
              stroke={colors.pooling}
              strokeWidth="2"
              opacity="0.4"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Specimen Underlay & Accent Wash with Procedural Seed Variations
  const pathVariants = [
    // Seed 0: Organic diagonal spread
    {
      outer: 'M 35 110 C 85 45, 245 35, 335 75 C 385 105, 395 170, 340 215 C 275 245, 135 235, 75 200 C 25 165, 5 150, 35 110 Z',
      mid: 'M 75 118 C 125 70, 235 65, 295 98 C 330 128, 325 170, 288 195 C 235 215, 140 205, 92 178 C 60 150, 50 135, 75 118 Z',
      core: 'M 125 125 C 165 92, 220 90, 255 115 C 280 135, 268 165, 235 180 C 198 190, 145 185, 122 165 C 105 145, 105 135, 125 125 Z',
    },
    // Seed 1: Horizontal elongated wash
    {
      outer: 'M 25 90 C 70 30, 270 25, 360 65 C 395 110, 385 190, 315 220 C 240 235, 110 225, 55 185 C 15 150, 10 120, 25 90 Z',
      mid: 'M 65 100 C 115 55, 255 50, 315 85 C 345 120, 330 175, 275 195 C 210 210, 120 200, 75 165 C 45 135, 45 115, 65 100 Z',
      core: 'M 115 110 C 155 80, 240 75, 275 105 C 295 130, 280 160, 230 175 C 185 185, 130 175, 110 150 C 95 130, 95 120, 115 110 Z',
    },
    // Seed 2: Droplet / teardrop pigment accumulation
    {
      outer: 'M 60 80 C 130 40, 260 50, 340 100 C 390 145, 370 210, 300 230 C 210 245, 100 215, 50 170 C 15 130, 25 105, 60 80 Z',
      mid: 'M 90 95 C 145 65, 240 70, 295 115 C 330 150, 315 190, 260 205 C 190 215, 115 190, 80 155 C 55 125, 60 110, 90 95 Z',
      core: 'M 130 115 C 175 90, 230 95, 265 130 C 285 155, 265 180, 225 190 C 175 195, 130 175, 115 150 C 105 135, 110 125, 130 115 Z',
    },
    // Seed 3: Spreading fan wash
    {
      outer: 'M 40 130 C 70 60, 220 30, 320 55 C 380 85, 395 155, 350 205 C 295 240, 160 245, 90 210 C 40 180, 25 160, 40 130 Z',
      mid: 'M 75 135 C 105 85, 210 65, 280 85 C 325 110, 335 160, 295 190 C 250 215, 155 215, 105 190 C 65 165, 60 150, 75 135 Z',
      core: 'M 120 140 C 150 105, 215 95, 255 115 C 280 135, 275 165, 245 180 C 210 195, 150 190, 125 175 C 105 160, 105 150, 120 140 Z',
    },
  ];

  const currentShape = pathVariants[seedShape];

  return (
    <div
      className={`pointer-events-none select-none mix-blend-multiply ${className}`}
      style={{ opacity: finalOpacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.048"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" />
          <feGaussianBlur stdDeviation="2.4" />
        </filter>

        <g filter={`url(#${filterId})`}>
          {/* Base wet wash */}
          <path d={currentShape.outer} fill={colors.faint} opacity="0.8" />
          {/* Secondary pigment dispersion */}
          <path d={currentShape.mid} fill={colors.secondary} opacity="0.45" />
          {/* Mineral dense center */}
          <path d={currentShape.core} fill={colors.primary} opacity="0.38" />
          {/* Capillary drying outer fringe */}
          <path
            d={currentShape.outer}
            stroke={colors.pooling}
            strokeWidth="1.8"
            fill="none"
            opacity="0.38"
          />
        </g>
      </svg>
    </div>
  );
};
