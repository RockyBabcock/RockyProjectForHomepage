import React, { useState } from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { CheckCircle2, Activity, Zap, Cpu, Layers, GitBranch, Sparkles } from 'lucide-react';
import { WatercolorPigmentField } from './WatercolorPigmentField';

interface TechNode {
  id: string;
  name: string;
  role: string;
  category: 'CORE' | 'SPATIAL' | 'AI' | 'SYSTEM';
  spec: string;
  status: string;
  connectedTo: string[];
}

export const TechnicalIndex: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const [selectedNodeId, setSelectedNodeId] = useState<string>('react');

  const nodes: TechNode[] = [
    {
      id: 'react',
      name: 'REACT 19',
      role: 'Declarative UI & Concurrent Fiber Architecture',
      category: 'CORE',
      spec: 'React 19.0.1 · Concurrent hooks, Action transitions, zero-waterfall UI pipelines',
      status: 'VERIFIED RUNTIME',
      connectedTo: ['typescript', 'motion', 'three', 'vite'],
    },
    {
      id: 'typescript',
      name: 'TYPESCRIPT 5.8',
      role: 'Strict Type Soundness & Generics',
      category: 'CORE',
      spec: 'Strict mode, zero any, AST inference, discriminating unions for state machines',
      status: 'COMPILED 100%',
      connectedTo: ['react', 'genai', 'three', 'svg-engine'],
    },
    {
      id: 'three',
      name: 'THREE.JS / WEBGL',
      role: '3D Spatial Scene Graph & Shaders',
      category: 'SPATIAL',
      spec: 'Three.js 0.186 · Perspective cameras, procedural buffers, PBR materials, 60fps lerp',
      status: 'GPU ACCELERATED',
      connectedTo: ['react', 'motion'],
    },
    {
      id: 'genai',
      name: 'GEMINI 2.5 PRO',
      role: 'Autonomous Agent & Multimodal Core',
      category: 'AI',
      spec: '@google/genai 2.4.0 · Interactions API, structured schema enforcement, tool sandbox',
      status: 'STREAM READY',
      connectedTo: ['react', 'typescript'],
    },
    {
      id: 'motion',
      name: 'MOTION KINETICS',
      role: 'Physics & Interpolated Transitions',
      category: 'CORE',
      spec: 'motion 12.23 · Spring dampening curves, shared layout IDs, GPU transform layer',
      status: '60 FPS NATIVE',
      connectedTo: ['react', 'three'],
    },
    {
      id: 'vite',
      name: 'VITE 6.2',
      role: 'ESM Bundler & Virtual Modules',
      category: 'SYSTEM',
      spec: 'Vite 6.2 · Native Rollup build pipeline, tree-shaking, sub-second dev server HMR',
      status: 'PRODUCTION BUILD',
      connectedTo: ['react', 'typescript'],
    },
    {
      id: 'svg-engine',
      name: 'SVG / XML PARSER',
      role: 'Deterministic Vector Serialization',
      category: 'SYSTEM',
      spec: 'Strict XMLSerializer namespace integrity, SHA-256 deduplication, in-memory JSZip',
      status: 'CLIENT-SIDE STREAM',
      connectedTo: ['typescript', 'react'],
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <section
      id="scene-06-technical-climax"
      className={`relative min-h-screen py-24 sm:py-36 border-t transition-colors duration-500 overflow-hidden select-none ${
        isDark
          ? 'border-violet-950/40 bg-[#02000A] text-[#F5F3EF]'
          : 'border-[#E2DFD2] bg-[#F7F5EE] text-[#171717]'
      }`}
    >
      {/* =======================================================================
          SCENE 06 — LAYER 1: Large Rainbow Watercolor Pigment Field
          Blooming behind the live circuit architecture
          ======================================================================= */}
      <WatercolorPigmentField
        variant="rainbow"
        size="hero"
        intensity="vibrant"
        blur="deep"
        className="top-[10%] left-[10%]"
      />

      {/* =======================================================================
          SCENE 06 — LAYER 2: Live Animated SVG Circuit Bus & Signal Nodes
          ======================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <svg className="w-full h-full absolute inset-0 opacity-30">
          <defs>
            <linearGradient id="bus-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* High-speed architectural bus lines */}
          <path
            d="M 0,220 C 400,220 500,420 960,420 S 1400,300 1920,300"
            fill="none"
            stroke="url(#bus-glow)"
            strokeWidth="1.5"
            strokeDasharray="8 10"
          />
          <path
            d="M 0,720 C 600,720 700,520 1100,520 S 1600,660 1920,660"
            fill="none"
            stroke={isDark ? '#A78BFA' : '#7C3AED'}
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />

          {/* Real-time moving signal particles */}
          <circle cx="960" cy="420" r="5" fill="#38BDF8" className="animate-ping" />
          <circle cx="1100" cy="520" r="4" fill="#10B981" />
        </svg>

        {/* Dynamic Coordinate Matrix */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(139, 92, 246, 0.35) 1px, transparent 1px)'
              : 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 z-10 space-y-16">
        {/* Architectural Climax Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-current/15">
          <div className="space-y-3">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] opacity-60">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
              <span>SCENE 06 // SYSTEM ARCHITECTURE & RUNTIME CLIMAX</span>
            </div>
            <h2 className="font-serif text-[clamp(48px,7vw,110px)] font-light leading-[0.88] tracking-[-0.04em] lowercase">
              system architecture
              <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>

          <div className="font-mono text-xs opacity-75 space-y-1 sm:text-right">
            <div className="flex items-center sm:justify-end gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SPECIFICATION: 100% PRODUCTION HARDENED</span>
            </div>
            <div className="opacity-50">ESM NATIVE // VITE 6 + TYPESCRIPT 5.8 + REACT 19</div>
          </div>
        </div>

        {/* Live Interactive Node Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Architecture Nodes (Col 1-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider opacity-60 pb-2">
              <span>CORE RUNTIME NODES (CLICK TO INSPECT CIRCUIT)</span>
              <span>7 SUBSYSTEMS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isConnected =
                  activeNode.connectedTo.includes(node.id) ||
                  node.connectedTo.includes(activeNode.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    data-cursor="EXAMINE"
                    className={`text-left p-4 sm:p-5 rounded-xs border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? isDark
                          ? 'bg-violet-950/70 border-violet-400 text-white shadow-[0_0_35px_rgba(139,92,246,0.4)] translate-y-[-2px]'
                          : 'bg-black/5 border-[#171717] text-[#171717] shadow-[0_4px_20px_rgba(0,0,0,0.08)] translate-y-[-2px]'
                        : isConnected
                        ? isDark
                          ? 'bg-violet-950/25 border-violet-800/60 text-violet-200'
                          : 'bg-neutral-100/60 border-neutral-300 text-neutral-800'
                        : isDark
                        ? 'bg-[#0b0520]/60 border-violet-950/40 text-violet-300/60 hover:border-violet-800/60'
                        : 'bg-white/40 border-black/10 text-neutral-600 hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-2">
                      <span className="uppercase tracking-widest">{node.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    </div>

                    <h4 className="font-mono text-base sm:text-lg font-bold tracking-tight mb-1">
                      {node.name}
                    </h4>

                    <p className="text-xs opacity-75 font-sans leading-snug">
                      {node.role}
                    </p>

                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pipeline Trace Indicator */}
            <div
              className={`p-4 rounded-xs border font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 ${
                isDark
                  ? 'bg-violet-950/20 border-violet-900/40'
                  : 'bg-black/[0.02] border-black/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider text-violet-400 font-bold">
                  PIPELINE BUS:
                </span>
                <span className="opacity-70 text-[11px]">
                  React 19 Concurrent Root → Motion Kinetics → WebGL Draw Pass → Verified Output
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] opacity-60">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>ACTIVE CLUSTER 100%</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Node Telemetry Inspector (Col 9-12) */}
          <div
            className={`lg:col-span-4 p-6 sm:p-7 rounded-sm border font-mono space-y-6 transition-all duration-300 ${
              isDark
                ? 'bg-[#0c0626]/90 border-violet-700/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
                : 'bg-white/80 border-[#E2DFD2] shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-current/15">
              <span className="text-[10px] uppercase tracking-[0.24em] text-violet-400 font-bold">
                NODE TELEMETRY
              </span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeNode.status}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-current">
                {activeNode.name}
              </h3>
              <p className="text-xs font-sans opacity-80 leading-relaxed">
                {activeNode.role}
              </p>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="text-[10px] uppercase tracking-widest opacity-50">
                ENGINEERING SPECIFICATION:
              </div>
              <div className="p-3 rounded-xs bg-current/5 border border-current/10 text-[11px] leading-relaxed opacity-90">
                {activeNode.spec}
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="text-[10px] uppercase tracking-widest opacity-50">
                ACTIVE GRAPH CONNECTIONS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.connectedTo.map((targetId) => {
                  const targetNode = nodes.find((n) => n.id === targetId);
                  return (
                    <button
                      key={targetId}
                      onClick={() => setSelectedNodeId(targetId)}
                      data-cursor="EXAMINE"
                      className="px-2.5 py-1 rounded-xs bg-violet-500/15 border border-violet-500/30 text-violet-400 hover:bg-violet-500/30 text-[10px] uppercase font-semibold cursor-pointer transition-colors"
                    >
                      → {targetNode?.name || targetId}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
