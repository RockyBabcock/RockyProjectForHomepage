import React from 'react';
import { Cpu, Terminal, Layers, Sparkles, Activity } from 'lucide-react';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { useLanguage } from '../i18n/LanguageContext';

export const StudioStatusSection: React.FC = () => {
  const { mode } = useSurfaceMode();
  const { language } = useLanguage();
  const isDark = mode === 'dark';

  const buildingItems = [
    {
      num: '01',
      title: 'Autonomous AI Agents',
      desc: 'Tool-calling execution loops, multi-agent reasoning DAGs, and deterministic evaluation rubrics.',
      tag: 'AI / AGENTS',
      icon: Cpu,
    },
    {
      num: '02',
      title: 'Web3 Settlement Primitives',
      desc: 'Trust-minimized decentralized architectures, oracle feeds, and sub-millisecond execution interfaces.',
      tag: 'WEB3 / PROTOCOLS',
      icon: Terminal,
    },
    {
      num: '03',
      title: 'Tactile Interface Engines',
      desc: 'High-performance layout algorithms, Wasm font renderers, and zero-latency reactive canvases.',
      tag: 'CREATIVE CODE',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Experimental Audio & Shaders',
      desc: 'WebGL2 fragment solvers, procedural fluid motion, and Web Audio API synthesizer nodes.',
      tag: 'EXPERIMENT',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="studio-status"
      className={`relative py-14 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'border-violet-950/40 bg-[#060219]/70' : 'border-[#E2DFD2] bg-[#FAF8F0]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header with Live Studio Signal */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-current/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em]">
              <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>
                [ 02 / STUDIO STATUS ]
              </span>
              <span className="opacity-40">·</span>
              <span className="opacity-60">ACTIVE FOCUS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              currently building<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>

          {/* Live Studio Pulse Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-current/15 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]" />
            </span>
            <span className="tracking-wider uppercase text-[11px]">
              STUDIO ONLINE · BOSTON / REMOTE
            </span>
          </div>
        </div>

        {/* 4 Focus Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {buildingItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className={`relative p-5 sm:p-6 border rounded-xs transition-all duration-300 group hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-violet-950/50 bg-[#0c0727]/60 hover:border-violet-600/40 hover:bg-[#120b38]/80'
                    : 'border-[#E2DFD2]/80 bg-[#FAF9F5] hover:border-[#171717]/40 hover:bg-[#FFFFFF]'
                }`}
              >
                {/* Number & Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-current/10 text-xs font-mono">
                  <span className={`font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                    {item.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`} />
                    <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[14px] sm:text-[15px] opacity-75 leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
