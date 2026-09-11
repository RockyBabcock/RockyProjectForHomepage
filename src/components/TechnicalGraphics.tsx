import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
              strokeOpacity={isDark ? '0.35' : '0.22'}
              fill="none"
            />
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r="0.75"
              fill={isDark ? '#C4B5FD' : '#7C3AED'}
              fillOpacity={isDark ? 0.7 : 0.4}
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
      {/* Base architectural wire */}
      <path
        d={pathD}
        fill="none"
        stroke={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(0, 0, 0, 0.14)'}
        strokeWidth="1"
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      {/* Flowing illuminated packet */}
      <path
        d={pathD}
        fill="none"
        stroke={isDark ? '#C4B5FD' : '#7C3AED'}
        strokeWidth="1.75"
        strokeDasharray="14 120"
        strokeDashoffset="0"
        className="animate-[dash_3.5s_linear_infinite]"
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
        className={`absolute inset-0 rounded-full border border-dashed transition-transform duration-700 animate-[spin_80s_linear_infinite] ${
          isDark ? 'border-violet-500/25' : 'border-neutral-400/35'
        }`}
      />
      {/* Middle Concentric Ring */}
      <div
        className={`absolute inset-8 rounded-full border transition-transform duration-700 animate-[spin_50s_linear_infinite_reverse] ${
          isDark ? 'border-violet-400/20' : 'border-purple-600/18'
        }`}
      >
        {/* Orbiting Satellite Node */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
      </div>
      {/* Inner Ring */}
      <div
        className={`absolute inset-16 rounded-full border border-dotted ${
          isDark ? 'border-violet-600/30' : 'border-black/15'
        }`}
      />
      {/* Center Reticle */}
      <div
        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
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
              strokeWidth={isActive ? 1.5 : 0.75}
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
  label = 'SYS_ALIGN_OK',
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
          isDark ? 'bg-violet-900/25' : 'bg-neutral-300/50'
        }`}
      />
      {/* Scanning Laser / Pulse Beam */}
      <div
        className={`absolute top-0 bottom-0 w-28 animate-[scanning_4s_easeInOut_infinite] ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_6px_#A78BFA]'
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
// 6. GridOverlay: Architectural 12-column & rhythmic baseline drawing
// =========================================================================
interface GridOverlayProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ isVisible, onClose }) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-[9000] pointer-events-auto select-none cursor-crosshair overflow-hidden"
          aria-hidden="true"
        >
          {/* Tinted Architectural Blueprint Backdrop */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isDark ? 'bg-[#030014]/65 backdrop-blur-[2px]' : 'bg-[#F5F4ED]/65 backdrop-blur-[2px]'
            }`}
          />

          {/* Horizontal Rhythmic Baseline Grid Lines (Every 80px) */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden">
            {Array.from({ length: 14 }).map((_, rIdx) => (
              <motion.div
                key={`row-${rIdx}`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  delay: rIdx * 0.015,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`w-full flex items-center justify-between px-4 border-b ${
                  isDark ? 'border-violet-500/10' : 'border-neutral-900/10'
                }`}
                style={{ height: '7.14%' }}
              >
                <span
                  className={`font-mono text-[8px] tracking-widest ${
                    isDark ? 'text-violet-400/35' : 'text-neutral-500/40'
                  }`}
                >
                  {String(rIdx * 80).padStart(4, '0')}PX
                </span>
                <span
                  className={`font-mono text-[8px] tracking-widest ${
                    isDark ? 'text-violet-400/35' : 'text-neutral-500/40'
                  }`}
                >
                  MOD {String(rIdx + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>

          {/* 12-Column Architectural System with Top-to-Bottom Draw Animation */}
          <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 h-full grid grid-cols-12 gap-4 sm:gap-6 lg:gap-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`col-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 0.42,
                  delay: i * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: 'top' }}
                className={`h-full border-x flex flex-col justify-between py-6 ${
                  isDark
                    ? 'border-violet-500/20 bg-violet-600/[0.02]'
                    : 'border-neutral-800/15 bg-neutral-900/[0.015]'
                }`}
              >
                {/* Column Head Registration & Number */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2 h-[1px] ${isDark ? 'bg-violet-400/40' : 'bg-neutral-800/30'}`}
                  />
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] font-semibold ${
                      isDark ? 'text-violet-300/60' : 'text-neutral-800/60'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Column Foot Registration */}
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] font-semibold ${
                      isDark ? 'text-violet-300/60' : 'text-neutral-800/60'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`w-2 h-[1px] ${isDark ? 'bg-violet-400/40' : 'bg-neutral-800/30'}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architectural Registration Crosshairs in Corners */}
          <div className="absolute top-6 left-6 font-mono text-[10px] text-violet-400/50 pointer-events-none">
            +
          </div>
          <div className="absolute top-6 right-6 font-mono text-[10px] text-violet-400/50 pointer-events-none">
            +
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-violet-400/50 pointer-events-none">
            +
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-violet-400/50 pointer-events-none">
            +
          </div>

          {/* Architectural Design System Legend Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`fixed bottom-8 right-8 font-mono text-[9px] tracking-[0.22em] uppercase px-4 py-2 rounded-xs border backdrop-blur-md z-30 shadow-lg ${
              isDark
                ? 'bg-[#0b0522]/90 border-violet-500/40 text-violet-200'
                : 'bg-white/90 border-neutral-300 text-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>12-COL DESIGN SYSTEM // PRESS G TO DISMISS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

