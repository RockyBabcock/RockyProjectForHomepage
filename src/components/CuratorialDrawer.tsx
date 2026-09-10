import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { WatercolorStain } from './WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CuratorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorialDrawer: React.FC<CuratorialDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030014]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        className={`relative w-full max-w-2xl h-full shadow-2xl overflow-y-auto border-l z-10 flex flex-col justify-between transition-colors duration-300 ${
          isDark
            ? 'bg-[#08031d] border-violet-950/60 text-[#F5F3EF]'
            : 'bg-[#F5F4ED] border-[#E2DFD2] text-[#171717]'
        }`}
      >
        {/* Watercolor Bleed at Top of Statement */}
        <div className="absolute top-0 right-0 w-72 h-64 pointer-events-none opacity-40">
          <WatercolorStain variant="corner-pool" palette={isDark ? 'grey' : 'warm'} opacity={0.6} />
        </div>

        <div>
          {/* Header Bar */}
          <div
            className={`sticky top-0 px-8 py-6 border-b flex items-center justify-between z-20 backdrop-blur-md transition-colors ${
              isDark ? 'bg-[#08031d]/90 border-violet-950/60' : 'bg-[#F5F4ED]/95 border-[#E2DFD2]'
            }`}
          >
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono opacity-60 block">
                ABOUT ROCKY & STUDIO NOTES
              </span>
              <h3 className="font-serif text-2xl font-light lowercase">
                creative technologist & engineer
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 opacity-65 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Close studio notes"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content with Strict 46rem Reading Measure */}
          <div className="px-8 sm:px-12 py-10 space-y-8 max-w-[46rem] font-sans">
            {/* Marginal Quote */}
            <div className={`font-['Caveat',cursive] text-2xl -rotate-1 ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
              {t.drawer.marginalQuote}
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-3xl font-light tracking-tight lowercase">
                on craft, engineering & real digital products
              </h4>
              <p className="text-lg font-serif leading-relaxed italic opacity-90">
                {t.drawer.subheading}
              </p>
              <p className="text-[15px] opacity-75 leading-relaxed font-light">
                {t.drawer.body}
              </p>
            </div>

            <div
              className={`p-6 border-l-2 space-y-2 rounded-xs ${
                isDark
                  ? 'bg-[#100732]/70 border-[#A78BFA]'
                  : 'bg-[#ECEADE]/70 border-[#8B5CF6]'
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono block opacity-70">
                core philosophy
              </span>
              <p className="text-[15px] font-serif italic leading-relaxed">
                {t.drawer.philosophyQuote}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
                architecture & material layers
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className={`p-4 border rounded-xs space-y-1 ${isDark ? 'border-violet-950/60 bg-current/5' : 'border-[#E2DFD2] bg-[#FAF9F5]'}`}>
                  <span className="font-mono text-xs uppercase tracking-wider block font-semibold">
                    1. Autonomy
                  </span>
                  <p className="text-xs opacity-75 leading-relaxed font-light">
                    AI agents executing multi-step DAG loops, tool calling, and deterministic evaluations.
                  </p>
                </div>
                <div className={`p-4 border rounded-xs space-y-1 ${isDark ? 'border-violet-950/60 bg-current/5' : 'border-[#E2DFD2] bg-[#FAF9F5]'}`}>
                  <span className="font-mono text-xs uppercase tracking-wider block font-semibold">
                    2. Consensus
                  </span>
                  <p className="text-xs opacity-75 leading-relaxed font-light">
                    Web3 protocols, trust-minimized state transitions, and high-frequency orderbooks.
                  </p>
                </div>
                <div className={`p-4 border rounded-xs space-y-1 ${isDark ? 'border-violet-950/60 bg-current/5' : 'border-[#E2DFD2] bg-[#FAF9F5]'}`}>
                  <span className="font-mono text-xs uppercase tracking-wider block font-semibold">
                    3. Tactility
                  </span>
                  <p className="text-xs opacity-75 leading-relaxed font-light">
                    Fraunces typography, micro-kinetics, custom shader rasterizers, and responsive design.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider">
              <a
                href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#8B5CF6] transition-colors"
              >
                <span>STUDIO HOMEPAGE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/rockybuildingaiweb3-boop/RockyBlogForHomePage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#8B5CF6] transition-colors"
              >
                <span>NOTES ARCHIVE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer in Sheet */}
        <div
          className={`p-8 border-t flex items-center justify-between text-xs font-mono transition-colors ${
            isDark ? 'border-violet-950/60' : 'border-[#E2DFD2]'
          }`}
        >
          <span className="opacity-50">BOSTON / REMOTE</span>
          <button
            onClick={onClose}
            className={`px-4 py-2 uppercase tracking-widest text-[11px] font-medium transition-colors cursor-pointer ${
              isDark
                ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
            }`}
          >
            close notes
          </button>
        </div>
      </div>
    </div>
  );
};
