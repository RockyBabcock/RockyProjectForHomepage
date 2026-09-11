import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

// =========================================================================
// 1. TechnicalField: Ambient geometric coordinate grid with crosshairs
// =========================================================================
interface TechnicalFieldProps {
  className?: string;
  density?: 'sparse' | 'normal' | 'dense';
  opacity?: number;
}

export const TechnicalField: React.FC<TechnicalFieldProps> = ({
  className = '',
  density = 'normal',
  opacity = 0.25,
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const spacing = density === 'sparse' ? 64 : density === 'dense' ? 24 : 40;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`tech-grid-${spacing}`}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing / 2 - 3} ${spacing / 2} h 6 M ${spacing / 2} ${spacing / 2 - 3} v 6`}
              stroke={isDark ? '#8B5CF6' : '#171717'}
              strokeWidth="0.8"
              strokeOpacity="0.4"
              fill="none"
            />
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r="0.75"
              fill={isDark ? '#C4B5FD' : '#7C3AED'}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tech-grid-${spacing})`} />
      </svg>
    </div>
  );
};

// =========================================================================
// 2. SignalPath: Animated SVG vector path with flowing data packets
// =========================================================================
interface SignalPathProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  className?: string;
  dashed?: boolean;
}

export const SignalPath: React.FC<SignalPathProps> = ({
  startX = 0,
  startY = 0,
  endX = 200,
  endY = 100,
  className = '',
  dashed = true,
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const midX = (startX + endX) / 2;
  const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox={`0 0 ${Math.max(endX, 200)} ${Math.max(endY, 100)}`}
      aria-hidden="true"
    >
      {/* Base wire */}
      <path
        d={pathD}
        fill="none"
        stroke={isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(0, 0, 0, 0.12)'}
        strokeWidth="1.2"
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      {/* Flowing illuminated packet */}
      <path
        d={pathD}
        fill="none"
        stroke={isDark ? '#A78BFA' : '#7C3AED'}
        strokeWidth="2"
        strokeDasharray="12 120"
        strokeDashoffset="0"
        className="animate-[dash_3s_linear_infinite]"
      />
    </svg>
  );
};

// =========================================================================
// 3. OrbitGraphic: Precision concentric orbital rings with angular ticks
// =========================================================================
interface OrbitGraphicProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const OrbitGraphic: React.FC<OrbitGraphicProps> = ({
  size = 360,
  className = '',
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <div
      className={`relative pointer-events-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer Ring */}
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-transform duration-700 animate-[spin_60s_linear_infinite] ${
          isDark ? 'border-violet-500/30' : 'border-neutral-400/40'
        }`}
      />
      {/* Middle Concentric Ring */}
      <div
        className={`absolute inset-8 rounded-full border transition-transform duration-700 animate-[spin_40s_linear_infinite_reverse] ${
          isDark ? 'border-violet-400/25' : 'border-purple-600/20'
        }`}
      >
        {/* Orbiting Satellite Node */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
      </div>
      {/* Inner Ring */}
      <div
        className={`absolute inset-16 rounded-full border border-dotted ${
          isDark ? 'border-violet-600/35' : 'border-black/20'
        }`}
      />
      {/* Center Reticle */}
      <div
        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          isDark ? 'border-violet-300 text-violet-300' : 'border-black text-black'
        }`}
      >
        <div className="w-1 h-1 rounded-full bg-current" />
      </div>
    </div>
  );
};

// =========================================================================
// 4. NodeNetwork: Factual node-and-edge connection diagram
// =========================================================================
interface NodeNetworkProps {
  nodes: { id: string; label: string; x: number; y: number }[];
  connections: [string, string][];
  className?: string;
  activeId?: string;
  onNodeClick?: (id: string) => void;
}

export const NodeNetwork: React.FC<NodeNetworkProps> = ({
  nodes,
  connections,
  className = '',
  activeId,
  onNodeClick,
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg className="w-full h-full absolute inset-0 overflow-visible">
        {/* Connections */}
        {connections.map(([sourceId, targetId], idx) => {
          const source = nodes.find((n) => n.id === sourceId);
          const target = nodes.find((n) => n.id === targetId);
          if (!source || !target) return null;

          const isActive = activeId === sourceId || activeId === targetId;

          return (
            <line
              key={`conn-${idx}`}
              x1={`${source.x}%`}
              y1={`${source.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke={
                isActive
                  ? isDark
                    ? '#A78BFA'
                    : '#7C3AED'
                  : isDark
                  ? 'rgba(139, 92, 246, 0.25)'
                  : 'rgba(0, 0, 0, 0.15)'
              }
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={isActive ? '4 2' : undefined}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeId === node.id;
        return (
          <button
            key={node.id}
            onClick={() => onNodeClick?.(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xs font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              isActive
                ? isDark
                  ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110 z-10'
                  : 'bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] scale-110 z-10'
                : isDark
                ? 'bg-[#0a0520] border border-violet-800/40 text-violet-300/80 hover:border-violet-500'
                : 'bg-white/90 border border-neutral-300 text-neutral-700 hover:border-black'
            }`}
          >
            {node.label}
          </button>
        );
      })}
    </div>
  );
};

// =========================================================================
// 5. DataTrace: Animated horizontal scanning indicator with coordinates
// =========================================================================
interface DataTraceProps {
  label?: string;
  className?: string;
}

export const DataTrace: React.FC<DataTraceProps> = ({
  label = 'SYS_PIPE_ACTIVE',
  className = '',
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <div
      className={`relative w-full h-[1px] flex items-center overflow-hidden font-mono text-[9px] uppercase ${className}`}
    >
      <div
        className={`absolute inset-0 ${
          isDark ? 'bg-violet-900/30' : 'bg-neutral-300/60'
        }`}
      />
      {/* Scanning Laser / Pulse Beam */}
      <div
        className={`absolute top-0 bottom-0 w-32 animate-[scanning_4s_easeInOut_infinite] ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_8px_#A78BFA]'
            : 'bg-gradient-to-r from-transparent via-purple-600 to-transparent'
        }`}
      />
      <span className="relative z-10 ml-2 px-1.5 py-0.2 rounded-xs bg-current/5 opacity-50">
        {label}
      </span>
    </div>
  );
};

// =========================================================================
// 6. GridOverlay: Architectural 12-column & baseline grid for easter egg toggle
// =========================================================================
interface GridOverlayProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9000] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 12-Column Grid Guide Lines */}
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 h-full grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-x border-violet-500/15 bg-violet-500/[0.015] flex flex-col justify-between py-4"
          >
            <span className="font-mono text-[9px] text-violet-400/40 text-center">
              COL {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] text-violet-400/40 text-center">
              COL {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      {/* Floating Status Indicator for the Architect Grid */}
      <div className="fixed bottom-6 right-6 font-mono text-[10px] uppercase px-3 py-1.5 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 backdrop-blur-md">
        ARCHITECT GRID ACTIVE (PRESS G TO TOGGLE)
      </div>
    </div>
  );
};
