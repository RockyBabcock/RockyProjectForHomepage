import React, { useId } from 'react';

interface WatercolorStainProps {
  variant?: 'hero-bleed' | 'accent-wash' | 'subtle-stain' | 'divider-flow' | 'corner-pool';
  palette?: 'warm' | 'cool' | 'mixed' | 'ochre' | 'blue-grey' | 'muted-olive';
  className?: string;
  opacity?: number;
}

export const WatercolorStain: React.FC<WatercolorStainProps> = ({
  variant = 'accent-wash',
  palette = 'cool',
  className = '',
  opacity = 0.85,
}) => {
  const uniqueId = useId().replace(/:/g, '_');

  // Palette definitions
  const colors = {
    warm: {
      primary: '#BC9A64', // Warm muted ochre accent
      secondary: '#CEB284',
      deep: '#9A7844',
      faint: '#F2E8D7',
    },
    cool: {
      primary: '#6F87AA', // Cool dusty blue watercolor accent
      secondary: '#8FA5C4',
      deep: '#4C6788',
      faint: '#DCE4EE',
    },
    'blue-grey': {
      primary: '#637A95', // Blue-grey wash
      secondary: '#889EB8',
      deep: '#425870',
      faint: '#DFE5EC',
    },
    'muted-olive': {
      primary: '#758269', // Muted olive wash
      secondary: '#94A286',
      deep: '#525E48',
      faint: '#E4E8DF',
    },
    mixed: {
      primary: '#6F87AA',
      secondary: '#BC9A64',
      deep: '#587093',
      faint: '#E7E5DA',
    },
    ochre: {
      primary: '#BC9A64',
      secondary: '#CEB284',
      deep: '#8E6E38',
      faint: '#F2E8D7',
    },
  }[palette] || {
    primary: '#6F87AA',
    secondary: '#8FA5C4',
    deep: '#4C6788',
    faint: '#DCE4EE',
  };

  const filterId = `pigment_${uniqueId}`;

  if (variant === 'hero-bleed') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 900 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.02)]"
        >
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <g filter={`url(#${filterId})`}>
            {/* Base wet wash */}
            <path
              d="M80 180 C 140 90, 290 60, 480 80 C 670 100, 780 160, 820 250 C 850 320, 740 380, 560 390 C 370 400, 200 370, 110 320 C 40 270, 30 240, 80 180 Z"
              fill={colors.faint}
              opacity="0.7"
            />
            {/* Secondary pooled pigment */}
            <path
              d="M160 190 C 240 120, 380 110, 520 140 C 660 170, 730 220, 710 280 C 690 330, 590 350, 460 340 C 310 330, 190 300, 150 250 C 130 220, 120 220, 160 190 Z"
              fill={colors.secondary}
              opacity="0.38"
            />
            {/* Granulated core bleeding */}
            <path
              d="M260 210 C 340 160, 460 150, 560 180 C 640 210, 630 260, 580 290 C 510 320, 390 310, 310 290 C 240 270, 210 240, 260 210 Z"
              fill={colors.primary}
              opacity="0.32"
            />
            {/* Dense edge pooling */}
            <path
              d="M380 220 C 430 190, 500 190, 540 210 C 570 230, 550 260, 510 270 C 460 280, 400 270, 370 250 C 350 230, 360 230, 380 220 Z"
              fill={colors.deep}
              opacity="0.25"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'divider-flow') {
    return (
      <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 800 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <filter id={filterId} x="-10%" y="-30%" width="120%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <path
            filter={`url(#${filterId})`}
            d="M 20 30 Q 200 15, 400 32 T 780 28 Q 600 42, 400 36 T 20 30"
            fill={colors.primary}
            opacity="0.2"
          />
          <path
            filter={`url(#${filterId})`}
            d="M 120 31 Q 280 22, 460 30 T 680 29 Q 520 36, 320 33 T 120 31"
            fill={colors.deep}
            opacity="0.18"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'corner-pool') {
    return (
      <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" />
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <g filter={`url(#${filterId})`}>
            <path
              d="M 0 0 C 80 10, 180 40, 220 120 C 260 200, 240 280, 200 300 C 120 300, 0 300, 0 300 Z"
              fill={colors.faint}
              opacity="0.8"
            />
            <path
              d="M 0 0 C 60 10, 130 30, 160 90 C 190 150, 170 210, 140 220 C 80 220, 0 220, 0 220 Z"
              fill={colors.secondary}
              opacity="0.4"
            />
            <path
              d="M 0 0 C 40 5, 80 20, 100 60 C 120 100, 100 140, 80 150 C 40 150, 0 150, 0 150 Z"
              fill={colors.primary}
              opacity="0.3"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Default: accent-wash or subtle-stain
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ opacity }} aria-hidden="true">
      <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <g filter={`url(#${filterId})`}>
          <path
            d="M 40 100 C 90 40, 240 30, 320 70 C 370 100, 380 160, 330 200 C 270 230, 140 220, 80 190 C 30 160, 10 140, 40 100 Z"
            fill={colors.faint}
            opacity="0.75"
          />
          <path
            d="M 80 110 C 130 65, 230 60, 285 90 C 320 120, 315 160, 280 185 C 230 205, 140 195, 95 170 C 65 145, 55 130, 80 110 Z"
            fill={colors.secondary}
            opacity="0.4"
          />
          <path
            d="M 130 115 C 170 85, 220 85, 250 105 C 275 125, 260 155, 230 170 C 195 180, 145 175, 125 155 C 110 135, 110 125, 130 115 Z"
            fill={colors.primary}
            opacity="0.32"
          />
        </g>
      </svg>
    </div>
  );
};
