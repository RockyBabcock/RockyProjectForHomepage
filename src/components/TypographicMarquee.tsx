import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface TypographicMarqueeProps {
  className?: string;
}

export const TypographicMarquee: React.FC<TypographicMarqueeProps> = ({ className = '' }) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const items = [
    'AI AGENTS',
    'REASONING DAGS',
    'TOOL USE RUNTIMES',
    'WEB3 PROTOCOLS',
    'TACTILE INTERFACES',
    'OPEN SOURCE SOFTWARE',
    'WASM TYPE ENGINES',
    'CREATIVE TECHNOLOGY',
    'REACT & TYPESCRIPT',
    'VECTOR RAG PIPELINES',
    'DISTRIBUTED CONSENSUS',
    'EXPERIMENTAL CODE',
  ];

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-3.5 border-y pointer-events-none transition-colors duration-300 ${
        isDark
          ? 'border-violet-950/40 bg-[#030014]/60'
          : 'border-[#E2DFD2]/60 bg-[#ECEADE]/30'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="animate-slow-marquee flex items-center gap-8 whitespace-nowrap">
        {/* Repeating sequence for continuous smooth loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span
              className={`font-mono text-[11px] sm:text-[12px] tracking-[0.28em] uppercase transition-colors ${
                isDark ? 'text-violet-300/35' : 'text-[#171717]/35'
              }`}
            >
              {item}
            </span>
            <span
              className={`text-[9px] select-none transition-colors ${
                isDark ? 'text-[#8B5CF6]/50' : 'text-[#6F87AA]/60'
              }`}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
