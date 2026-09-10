import React from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const TechnicalIndex: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const categories = [
    {
      category: 'FRONTEND',
      tools: [
        { name: 'React 19 / 18+', role: 'Component architecture, concurrent rendering, custom hooks' },
        { name: 'TypeScript', role: 'Strict typing, AST transformations, type safety' },
        { name: 'Vite / Rollup', role: 'High-speed bundling, ESM modules, asset pipelines' },
        { name: 'Tailwind CSS', role: 'Utility design systems, dynamic theme variables' },
        { name: 'Motion', role: 'Kinetics, layout animations, shared transitions' },
      ],
    },
    {
      category: '3D & SPATIAL',
      tools: [
        { name: 'Three.js & WebGL', role: 'Scene graph orchestration, geometry buffers, procedural materials' },
        { name: 'React Three Fiber', role: 'Declarative 3D components, spring camera physics, Drei helpers' },
        { name: 'Custom Vector Engine', role: '2D canvas 3D projection, 60fps fallback rendering without WebGL' },
        { name: 'Spatial Routing', role: 'Mapping URL routes to 3D camera viewpoints and focal coordinates' },
      ],
    },
    {
      category: 'AI & MULTI-MODAL',
      tools: [
        { name: 'Multi-Modal Pipelines', role: 'Video, image, audio, and motion generative model orchestration' },
        { name: 'Google GenAI SDK', role: 'Structured output, semantic categorization, embeddings' },
        { name: 'Cylindrical 3D Carousel', role: 'Radial perspective projection, model card inspection drawers' },
        { name: 'Tool Calling & Evaluation', role: 'Deterministic validation loops, sandboxed code execution' },
      ],
    },
    {
      category: 'TOOLS & RUNTIMES',
      tools: [
        { name: 'SVG / XML Validation', role: 'Fast XML parsing, SHA-256 integrity verification, asset registry' },
        { name: 'Node.js & Express', role: 'Server-side API routes, secure proxying, asset compression' },
        { name: 'JSZip & Archiving', role: 'In-browser engineering export bundles and manifest packaging' },
        { name: 'Git & Open Source', role: 'Clean commits, modular architectures, continuous deployment' },
      ],
    },
  ];

  return (
    <section
      id="technical-index"
      className={`py-16 sm:py-24 border-t transition-colors duration-300 ${
        isDark ? 'border-violet-950/40 bg-[#030014]' : 'border-[#E2DFD2] bg-[#FAF8F0]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 border-b border-current/10">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ TECHNICAL INDEX ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              technical index<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
            Editorial breakdown of active engineering disciplines & instruments
          </p>
        </div>

        {/* 4 Clean Editorial Category Blocks (NO progress bars, NO percentage bars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <div className="pb-2 border-b border-current/10 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold opacity-80">
                  {cat.category}
                </span>
                <span className="font-mono text-[10px] opacity-40">
                  0{idx + 1}
                </span>
              </div>

              <ul className="space-y-3.5">
                {cat.tools.map((t, tIdx) => (
                  <li key={tIdx} className="space-y-0.5">
                    <div className="font-mono text-[13px] font-medium tracking-tight">
                      {t.name}
                    </div>
                    <div className="text-[12px] opacity-65 font-sans leading-snug font-light">
                      {t.role}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
