import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { Terminal, Cpu, Layers, GitBranch, Sparkles } from 'lucide-react';

export const TechnicalIndex: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const categories = [
    {
      id: 'SYS-01',
      category: 'FRONTEND RUNTIMES',
      icon: Layers,
      highlight: 'React 19 / Vite / Tailwind',
      tools: [
        { name: 'React 19 / 18+', spec: 'AST transformations, concurrent hooks, concurrent rendering' },
        { name: 'TypeScript 5.x', spec: 'Strict typing, custom utility generics, zero any' },
        { name: 'Vite / Rollup', spec: 'ESM native pipeline, virtual modules, sub-second HMR' },
        { name: 'Tailwind CSS', spec: 'Mathematical scale ratios, dynamic theme variables' },
        { name: 'Motion kinetics', spec: 'Physics-based spring curves, shared layout keys' },
      ],
    },
    {
      id: 'SYS-02',
      category: '3D & SPATIAL SYSTEMS',
      icon: Cpu,
      highlight: 'Three.js / R3F / Canvas Engine',
      tools: [
        { name: 'Three.js & WebGL', spec: 'Scene graph orchestration, geometry buffers, procedural materials' },
        { name: 'React Three Fiber', spec: 'Declarative 3D nodes, spring camera damping, Drei helpers' },
        { name: 'Custom 2D Fallback', spec: 'Canvas 3D isometric projection, 60fps non-WebGL rendering' },
        { name: 'Spatial Coordinate Map', spec: 'URL route synchronization to camera focal targets' },
      ],
    },
    {
      id: 'SYS-03',
      category: 'AI & MULTI-MODAL RUNTIMES',
      icon: Sparkles,
      highlight: 'Gemini 2.5 / Function Calling / Agents',
      tools: [
        { name: 'Multi-Modal Pipelines', spec: 'Video, audio, vector, and prompt parallel orchestration' },
        { name: 'Google GenAI SDK', spec: 'Interactions API, structured JSON schemas, embeddings' },
        { name: 'Tool Calling Runtime', spec: 'Sandboxed code execution, deterministic state loops' },
        { name: '3D Carousel Visualizer', spec: 'Radial perspective projection for agent memory inspection' },
      ],
    },
    {
      id: 'SYS-04',
      category: 'SYSTEM TOOLS & PROTOCOLS',
      icon: GitBranch,
      highlight: 'Node / Express / SVG Validation',
      tools: [
        { name: 'SVG / XML Parser', spec: 'Strict XML sanitization, DOM serialization, SHA-256 caching' },
        { name: 'Node.js & Express', spec: 'Production API proxy, stream piping, gzip compression' },
        { name: 'JSZip & Storage', spec: 'Client-side archive compilation, blob stream export' },
        { name: 'Deterministic CI', spec: 'Modular package structure, strict type linting' },
      ],
    },
  ];

  return (
    <section
      id="technical-index"
      className={`relative py-24 sm:py-36 border-t transition-colors duration-500 overflow-hidden ${
        isDark
          ? 'border-violet-950/40 bg-[#02000A] text-[#F5F3EF]'
          : 'border-[#E2DFD2] bg-[#F7F5EE] text-[#171717]'
      }`}
    >
      {/* Background Matrix Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(139, 92, 246, 0.25) 1px, transparent 1px)'
              : 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 z-10 space-y-16">
        {/* Section Header: Experimental Matrix Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-current/15">
          <div className="space-y-2">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] opacity-45">
              <span className="w-2 h-2 border border-current" />
              <span>COLOPHON // ARCHITECTURE MATRIX</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.04em] lowercase">
              technical index<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="font-mono text-xs opacity-50 space-y-1 sm:text-right">
            <div>STATUS: PRODUCTION READY</div>
            <div>SPEC: TYPESCRIPT STRICT / ESM</div>
          </div>
        </div>

        {/* Conceptual Pipeline Architecture Diagram */}
        <div
          className={`p-6 sm:p-8 rounded-sm font-mono text-xs transition-colors border ${
            isDark
              ? 'bg-violet-950/15 border-violet-800/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white/60 border-[#E2DFD2] shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-current/10 opacity-60 text-[11px] uppercase tracking-wider">
            <span>[ SYSTEM EXECUTION PIPELINE ]</span>
            <span>DATA FLOW MODEL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 items-center">
            <div className="space-y-1">
              <span className="text-[10px] opacity-40 uppercase">Phase 01</span>
              <div className="font-semibold text-sm">Event Dispatch</div>
              <p className="text-[11px] opacity-60 font-sans">User gesture & reactive input subscription</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] opacity-40 uppercase">Phase 02</span>
              <div className="font-semibold text-sm">Agent Runtime</div>
              <p className="text-[11px] opacity-60 font-sans">Multimodal stream & tool-calling evaluation</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] opacity-40 uppercase">Phase 03</span>
              <div className="font-semibold text-sm">Spatial Canvas</div>
              <p className="text-[11px] opacity-60 font-sans">WebGL projection & camera spring damping</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] opacity-40 uppercase">Phase 04</span>
              <div className="font-semibold text-sm">Deterministic Output</div>
              <p className="text-[11px] opacity-60 font-sans">Sanitized SVG/DOM & immutable artifacts</p>
            </div>
          </div>
        </div>

        {/* 4-Column Typographic System Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pt-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="space-y-5">
                {/* Column Head */}
                <div className="pb-3 border-b border-current/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 opacity-60" />
                    <span className="font-mono text-xs uppercase tracking-[0.18em] font-semibold">
                      {cat.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] opacity-40">
                    {cat.id}
                  </span>
                </div>

                {/* Micro Highlight Tag */}
                <div className="font-mono text-[11px] px-2 py-1 bg-current/5 inline-block opacity-70">
                  {cat.highlight}
                </div>

                {/* List of Tools */}
                <ul className="space-y-4 pt-1">
                  {cat.tools.map((t, idx) => (
                    <li key={idx} className="space-y-1">
                      <div className="font-mono text-xs font-semibold tracking-tight">
                        {t.name}
                      </div>
                      <div className="text-[12px] opacity-65 font-sans leading-relaxed font-light">
                        {t.spec}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
