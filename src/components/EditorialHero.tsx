import React from 'react';
import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';
import { WatercolorStain } from './WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { MagneticLink } from './MagneticLink';
import { EditorialBrowserFrame } from './EditorialBrowserFrame';
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
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <section className="relative pt-6 sm:pt-8 pb-10 sm:pb-14 border-b border-[#E2DFD2] overflow-hidden">
      {/* Primary Dusty Blue Watercolor Bleed interacting with the typography */}
      <div className="absolute top-[-30px] left-[12%] sm:left-[22%] w-[480px] sm:w-[720px] h-[300px] sm:h-[400px] pointer-events-none opacity-80 z-0">
        <WatercolorStain variant="hero-bleed" palette="cool" opacity={0.85} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        {/* Editorial Sub-Header: Rocky's Identity & Positioning */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 text-xs font-sans text-[#67645C] border-b border-[#E2DFD2]/70">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-base sm:text-lg text-[#171717]">
              Rocky Babcock
            </span>
            <span className="text-[#E2DFD2]">/</span>
            <span className="uppercase tracking-[0.18em] text-[11px] text-[#67645C] font-medium">
              Creative Technologist & Frontend Engineer
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-sans tracking-wide">
            <span className="hidden sm:inline text-[#9E9A90] font-mono text-[11px]">
              AI · AGENTS · WEB3 · EXPERIMENTS
            </span>
            <span className="hidden md:inline text-[#E2DFD2]">/</span>
            <button
              onClick={onOpenStatement}
              className="text-[#171717] hover:text-[#6F87AA] underline decoration-[#6F87AA]/60 underline-offset-4 cursor-pointer text-xs font-medium transition-colors"
            >
              {t.nav.about}
            </button>
          </div>
        </div>

        {/* Hero Grid: Prominent Display Typography + Instant Real Digital Project Preview */}
        <div className="pt-8 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Main Visual Statement: "selected projects" (Display 96–136px desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#6F87AA] font-mono font-medium block">
                [ project archive · 2024—2026 ]
              </span>
              <h1 className="font-serif text-[4rem] sm:text-[5.8rem] md:text-[7.2rem] lg:text-[8.2rem] xl:text-[9.2rem] font-light tracking-[-0.045em] leading-[0.86] text-[#171717] select-none">
                <span className="block font-normal lowercase">selected</span>
                <span className="italic font-light sm:pl-6 lg:pl-10 text-[#171717] inline-block tracking-[-0.035em]">
                  projects<span className="not-italic text-[#6F87AA]">.</span>
                </span>
              </h1>
            </div>

            {/* Clear, honest positioning copy */}
            <div className="sm:pl-6 lg:pl-10 space-y-3 pt-1">
              <p className="font-serif text-xl sm:text-2xl md:text-[25px] text-[#171717] font-normal leading-snug max-w-xl">
                Designer-minded developer presenting production AI agents, web applications, and experimental interfaces.
              </p>
              <p className="text-[16px] sm:text-[17px] text-[#67645C] font-sans leading-relaxed max-w-xl font-light">
                Every project reflects real digital engineering paired with tactile editorial restraint—combining paper-grade typography with interactive software.
              </p>
            </div>

            {/* Fast Action / Scroll to Work */}
            <div className="sm:pl-6 lg:pl-10 pt-2 flex items-center gap-6 text-xs uppercase tracking-[0.16em] font-sans">
              <MagneticLink strength={4}>
                <button
                  onClick={onScrollToArchive}
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] transition-colors cursor-pointer text-[12px] uppercase tracking-[0.16em] font-medium"
                >
                  <span>explore work ({projectsData.length})</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticLink>

              <span className="font-['Caveat',cursive] text-lg sm:text-xl text-[#6F87AA] select-none -rotate-1">
                ~ real digital systems
              </span>
            </div>
          </div>

          {/* Right Column: Instant Featured Real Project Preview in Browser Frame */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Header Label for Featured Preview */}
              <div className="flex items-center justify-between pb-2.5 text-[11px] text-[#67645C] font-sans uppercase tracking-[0.18em]">
                <span className="flex items-center gap-1.5 font-medium text-[#171717]">
                  <Terminal className="w-3.5 h-3.5 text-[#6F87AA]" />
                  <span>featured product preview</span>
                </span>
                <span className="font-mono text-[#6F87AA] lowercase">
                  #{featuredProject.number} · {featuredProject.type}
                </span>
              </div>

              {/* Minimal Editorial Browser Frame wrapping the featured project */}
              <Link
                to={`/projects/${featuredProject.slug}`}
                className="block group"
                aria-label={`View featured project: ${featuredProject.slug}`}
              >
                <EditorialBrowserFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={true}
                  showOverlayAction={true}
                />
              </Link>

              {/* Minimal caption line */}
              <div className="pt-3 flex items-center justify-between text-xs font-sans text-[#67645C]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#171717]">
                    {featuredProject.slug}
                  </span>
                  <span className="text-[#9E9A90] font-mono text-[11px]">
                    {featuredProject.tools.slice(0, 3).join(' · ')}
                  </span>
                </div>
                <Link
                  to={`/projects/${featuredProject.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#171717] hover:text-[#6F87AA] transition-colors"
                >
                  <span>details</span>
                  <ArrowUpRight className="w-3 h-3 text-[#6F87AA]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
