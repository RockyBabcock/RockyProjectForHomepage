import React from 'react';
import { ArrowDown, ArrowUpRight, Activity } from 'lucide-react';
import { WatercolorStain } from './WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { Link } from 'react-router-dom';
import { MagneticLink } from './MagneticLink';
import { DigitalArtifactFrame } from './DigitalArtifactFrame';
import { projectsData } from '../data/projects';

interface EditorialHeroProps {
  onScrollToArchive: () => void;
  onOpenStatement: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onScrollToArchive,
  onOpenStatement,
}) => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <section
      className={`relative pt-8 sm:pt-12 pb-12 sm:pb-16 border-b transition-colors duration-300 overflow-hidden ${
        isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
      }`}
    >
      {/* Primary Atmospheric Watercolor / Pigment Wash */}
      <div className="absolute top-[-40px] left-[8%] sm:left-[20%] w-[480px] sm:w-[760px] h-[320px] sm:h-[440px] pointer-events-none opacity-70 z-0">
        <WatercolorStain
          variant="hero-bleed"
          palette={isDark ? 'grey' : 'cool'}
          intensity="medium"
          seed={1}
          opacity={isDark ? 0.4 : 0.75}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Studio Sub-Header: Rocky's Identity & Positioning */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 text-xs font-mono border-b transition-colors duration-300 ${
            isDark ? 'border-violet-950/40 text-violet-300/70' : 'border-[#E2DFD2]/70 text-[#67645C]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-base sm:text-lg font-normal text-current">
              Rocky Babcock
            </span>
            <span className="opacity-40">/</span>
            <span className="uppercase tracking-[0.2em] text-[11px] font-medium opacity-80">
              Creative Technologist & Engineer
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs tracking-wide">
            <span className="hidden sm:inline font-mono text-[11px] opacity-60">
              AI · AGENTS · WEB3 · EXPERIMENTAL SYSTEMS
            </span>
            <span className="hidden md:inline opacity-30">/</span>
            <button
              onClick={onOpenStatement}
              className={`hover:opacity-100 transition-opacity underline underline-offset-4 cursor-pointer text-xs font-mono uppercase tracking-wider ${
                isDark ? 'text-violet-300' : 'text-[#171717]'
              }`}
            >
              {t.nav.about}
            </button>
          </div>
        </div>

        {/* Hero Grid: Prominent Display Typography + Instant Real Digital Project Preview */}
        <div className="pt-8 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual Statement: "selected projects" */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] uppercase tracking-[0.24em] font-mono font-medium block ${
                    isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
                  }`}
                >
                  [ 01 / SELECTED WORK · 2024—2026 ]
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                    isDark
                      ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/60'
                      : 'text-emerald-800 bg-emerald-100/80 border-emerald-300/80'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEMS ONLINE
                </span>
              </div>

              <h1 className="font-serif text-[4.2rem] sm:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[9.4rem] font-light tracking-[-0.045em] leading-[0.86] select-none text-current">
                <span className="block font-normal lowercase">selected</span>
                <span className="italic font-light sm:pl-6 lg:pl-10 inline-block tracking-[-0.035em]">
                  projects<span className={isDark ? 'text-violet-400 not-italic' : 'text-[#8B5CF6] not-italic'}>.</span>
                </span>
              </h1>
            </div>

            {/* Authentic developer positioning */}
            <div className="sm:pl-6 lg:pl-10 space-y-3 pt-1">
              <p className="font-serif text-xl sm:text-2xl md:text-[25px] font-normal leading-snug max-w-xl text-current">
                Designer-minded engineer crafting autonomous AI agents, Web3 protocols, and tactile digital interfaces.
              </p>
              <p className="text-[15px] sm:text-[16px] opacity-75 font-sans leading-relaxed max-w-xl font-light">
                Every entry is a functional piece of software—combining paper-grade typographic restraint with production-ready execution. Explore the live interactive specimens directly in the archive.
              </p>
            </div>

            {/* Fast Action & System Telemetry */}
            <div className="sm:pl-6 lg:pl-10 pt-2 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.16em] font-mono">
              <MagneticLink strength={4}>
                <button
                  onClick={onScrollToArchive}
                  className={`group inline-flex items-center gap-2.5 px-5 py-3 transition-colors cursor-pointer text-[12px] uppercase tracking-[0.18em] font-medium shadow-xs ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>explore selected work ({projectsData.length})</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticLink>

              <span className={`font-['Caveat',cursive] text-xl sm:text-2xl select-none -rotate-1 ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}>
                ~ live interactive specimens
              </span>
            </div>
          </div>

          {/* Right Column: Featured Project Window */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Header Label for Featured Preview */}
              <div className="flex items-center justify-between pb-2.5 text-[11px] font-mono uppercase tracking-[0.18em] opacity-75">
                <span className="flex items-center gap-1.5 font-medium text-current">
                  <Activity className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`} />
                  <span>interactive live specimen</span>
                </span>
                <span className={`font-mono lowercase ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                  #{featuredProject.number} · {featuredProject.type}
                </span>
              </div>

              {/* Digital Artifact Frame wrapping the featured project */}
              <div className="relative shadow-lg">
                <DigitalArtifactFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={true}
                  showOverlayAction={false}
                />
              </div>

              {/* Caption Line with Direct Navigation */}
              <div className="pt-3 flex items-center justify-between text-xs font-mono opacity-80">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-current">
                    {featuredProject.slug}
                  </span>
                  <span className="opacity-50 text-[11px] hidden sm:inline">
                    {featuredProject.tools.slice(0, 3).join(' · ')}
                  </span>
                </div>
                <Link
                  to={`/projects/${featuredProject.slug}`}
                  className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors group font-mono font-medium ${
                    isDark ? 'text-violet-300 hover:text-violet-100' : 'text-[#171717] hover:text-[#8B5CF6]'
                  }`}
                >
                  <span>open folio</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
