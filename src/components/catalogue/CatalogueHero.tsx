import React from 'react';
import { ArrowDown, ArrowUpRight, Activity, ShieldCheck } from 'lucide-react';
import { WatercolorStain } from '../WatercolorStain';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { Link } from 'react-router-dom';
import { MagneticLink } from '../MagneticLink';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { projectsData } from '../../data/projects';

interface CatalogueHeroProps {
  onScrollToArchive: () => void;
  onOpenStatement: () => void;
}

export const CatalogueHero: React.FC<CatalogueHeroProps> = ({
  onScrollToArchive,
  onOpenStatement,
}) => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <section
      className={`relative pt-8 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-36 transition-colors duration-300 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Structural Watercolor Wash behind Hero Composition */}
      <div className="absolute top-10 left-[8%] w-[680px] lg:w-[1020px] h-[480px] lg:h-[620px] pointer-events-none opacity-45 z-0">
        <WatercolorStain
          variant="hero-bleed"
          palette={isDark ? 'grey' : 'cool'}
          intensity="medium"
          seed={1}
          opacity={isDark ? 0.25 : 0.55}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        {/* Composition Top Metas: Asymmetrical distribution */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 sm:pb-12 text-[11px] font-mono tracking-[0.24em] uppercase opacity-45">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 inline-block" />
            <span>Rocky Babcock · San Francisco / Remote</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Engineering & Systems</span>
            <span className="opacity-30">/</span>
            <span>2024—2026 Archive</span>
          </div>
        </div>

        {/* Spatial Composition Layout */}
        <div className="relative">
          {/* Typographic Anchor */}
          <div className="relative z-20 pointer-events-auto">
            <h1 className="font-serif text-[4.2rem] sm:text-[6.8rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11.2rem] font-light tracking-[-0.045em] leading-[0.84] select-none">
              <span className="block font-normal lowercase">selected</span>
              <span className="block italic font-light pl-6 sm:pl-16 md:pl-24 tracking-[-0.03em] -mt-2 sm:-mt-4 lg:-mt-6">
                projects<span className={isDark ? 'text-violet-400 not-italic' : 'text-[#8B5CF6] not-italic'}>.</span>
              </span>
            </h1>
          </div>

          {/* Overlapping Visual Media Plate (Breaking Grid Tension) */}
          <div className="relative lg:absolute lg:right-0 lg:top-[18%] lg:w-[54%] xl:w-[50%] z-10 mt-8 lg:mt-0">
            {/* Subtle floating shadow layer */}
            <div
              className={`relative p-2 sm:p-3 transition-all duration-500 rounded-sm ${
                isDark
                  ? 'bg-violet-950/20 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] border border-violet-800/20'
                  : 'bg-white/40 shadow-[0_24px_50px_-15px_rgba(30,20,50,0.12)] border border-[#E2DFD2]/80'
              }`}
            >
              <div className="relative overflow-hidden group">
                <ProjectMediaFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={true}
                />
              </div>

              {/* Asymmetrical Specimen Annotation Bar */}
              <div className="pt-3 px-1 flex items-baseline justify-between font-mono text-[11px] opacity-70">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-current">PLATE #{featuredProject.number}</span>
                  <span className="opacity-30">/</span>
                  <span className="lowercase">{featuredProject.slug}</span>
                  <span className="hidden sm:inline opacity-30">/</span>
                  <span className="hidden sm:inline uppercase text-[10px] opacity-60">{featuredProject.type}</span>
                </div>
                <Link
                  to={`/projects/${featuredProject.slug}`}
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px] font-medium"
                >
                  <span>Open Specimen</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Foreground Spatial Lower Column (Position Statement & Explore Action) */}
          <div className="relative z-20 pt-8 sm:pt-14 lg:pt-16 max-w-xl space-y-6">
            <p className="font-serif text-xl sm:text-2xl lg:text-[25px] font-light leading-snug opacity-90">
              Creative engineer crafting autonomous AI agent runtimes, Web3 protocols, and tactile digital interfaces.
            </p>
            <p className="text-[14px] sm:text-[15px] opacity-60 font-sans leading-relaxed font-light">
              Built with mathematical typography, production durability, and art-directed spatial depth.
            </p>

            <div className="pt-4 flex items-center gap-8">
              <MagneticLink strength={3}>
                <button
                  onClick={onScrollToArchive}
                  className={`group inline-flex items-center gap-3 px-7 py-3.5 transition-all duration-300 cursor-pointer text-xs uppercase tracking-[0.2em] font-mono font-medium ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>Explore Index</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticLink>

              {onOpenStatement && (
                <button
                  onClick={onOpenStatement}
                  className="text-xs uppercase tracking-[0.2em] font-mono opacity-50 hover:opacity-100 transition-opacity cursor-pointer underline underline-offset-4"
                >
                  Studio Statement
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
