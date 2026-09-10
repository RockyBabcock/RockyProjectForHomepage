import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <footer
      className={`w-full border-t mt-24 sm:mt-32 py-16 sm:py-24 transition-colors duration-300 ${
        isDark
          ? 'border-violet-950/40 bg-[#060219]/80 text-[#F5F3EF]'
          : 'border-[#E2DFD2] bg-[#ECEADE]/60 text-[#171717]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Signature & Personal Positioning */}
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.24em] font-mono opacity-60">
                CREATIVE TECHNOLOGY ARCHIVE
              </span>
              <div className="font-['Caveat',cursive] text-4xl sm:text-5xl text-current select-none pt-1">
                Rocky Babcock
              </div>
            </div>
            <p className="text-sm opacity-75 max-w-md font-sans leading-relaxed font-light">
              Designer & frontend engineer exploring autonomous AI agents, Web3 settlement protocols, and tactile interfaces. Building software that bridges algorithmic depth with paper-grade typographic restraint.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono opacity-65">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>BOSTON / REMOTE · STUDIO ACTIVE</span>
            </div>
          </div>

          {/* Center Column: Rocky Ecosystem Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-mono opacity-60 block">
              ECOSYSTEM
            </span>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1 font-medium"
                >
                  <span>ROCKY / WORK</span>
                  <span className="text-[9px] text-[#8B5CF6]">●</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100 transition-opacity inline-flex items-center gap-1 group"
                >
                  <span>ROCKY / STUDIO</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8B5CF6]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rockybuildingaiweb3-boop/RockyBlogForHomePage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100 transition-opacity inline-flex items-center gap-1 group"
                >
                  <span>ROCKY / NOTES</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8B5CF6]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100 transition-opacity inline-flex items-center gap-1 group"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8B5CF6]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Colophon */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-mono opacity-60 block">
              COLOPHON
            </span>
            <div className="text-xs opacity-70 space-y-1.5 font-sans leading-relaxed font-light">
              <p>Fraunces & Cormorant Garamond display serif.</p>
              <p>Questrial, DM Sans & JetBrains Mono telemetry.</p>
              <p>Built with React 19, Vite, Tailwind & Motion.</p>
            </div>
            <div className="pt-2 font-mono text-[11px] opacity-40">
              © {new Date().getFullYear()} ROCKY BABCOCK. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>

        {/* Bottom Bar with Personal Quote */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 transition-colors ${
            isDark ? 'border-violet-950/40 text-violet-300/60' : 'border-[#E2DFD2] text-[#67645C]'
          }`}
        >
          <div className={`font-['Caveat',cursive] text-lg ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
            "Engineering is invisible scaffolding for art direction."
          </div>
          <div className="font-mono text-[11px] opacity-60 uppercase tracking-wider">
            CINEMATIC CREATIVE TECHNOLOGY
          </div>
        </div>
      </div>
    </footer>
  );
};
