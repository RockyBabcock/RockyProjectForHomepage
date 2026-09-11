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
      className={`relative pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-32 transition-colors duration-300 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Restrained Atmospheric Pigment Wash */}
      <div className="absolute top-[-20px] left-[15%] w-[600px] lg:w-[900px] h-[400px] lg:h-[520px] pointer-events-none opacity-40 z-0">
        <WatercolorStain
          variant="hero-bleed"
          palette={isDark ? 'grey' : 'cool'}
          intensity="medium"
          seed={1}
          opacity={isDark ? 0.2 : 0.45}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        {/* Editorial Sub-Header / Location & Role */}
        <div className="flex items-center justify-between gap-4 pb-12 text-xs font-mono opacity-50 uppercase tracking-[0.24em]">
          <span>San Francisco / Remote</span>
          <span>Creative Engineering & Systems</span>
        </div>

        {/* Hero Grid: Spacious Asymmetrical Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-end">
          {/* Left Column: Quiet, Monumental Typography */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] opacity-60 block mb-3">
                Rocky Babcock
              </span>

              <h1 className="font-serif text-[4rem] sm:text-[6.2rem] md:text-[7.8rem] lg:text-[8.8rem] xl:text-[10rem] font-light tracking-[-0.045em] leading-[0.88] select-none">
                <span className="block font-normal lowercase">selected</span>
                <span className="italic font-light pl-4 sm:pl-8 inline-block tracking-[-0.03em]">
                  projects<span className={isDark ? 'text-violet-400 not-italic' : 'text-[#8B5CF6] not-italic'}>.</span>
                </span>
              </h1>
            </div>

            {/* Position Statement */}
            <div className="max-w-xl space-y-4 pt-2">
              <p className="font-serif text-xl sm:text-2xl lg:text-[26px] font-light leading-snug opacity-90">
                Designer-minded engineer crafting autonomous AI agents, Web3 protocols, and tactile digital interfaces.
              </p>
              <p className="text-[15px] sm:text-[16px] opacity-60 font-sans leading-relaxed font-light">
                A focused collection of production software, experimental systems, and interactive architectures.
              </p>
            </div>

            {/* Navigation Link */}
            <div className="pt-2 flex items-center gap-8">
              <MagneticLink strength={3}>
                <button
                  onClick={onScrollToArchive}
                  className={`group inline-flex items-center gap-3 px-6 py-3.5 transition-all duration-300 cursor-pointer text-xs uppercase tracking-[0.2em] font-mono font-medium ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>Explore Work</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticLink>

              {onOpenStatement && (
                <button
                  onClick={onOpenStatement}
                  className="text-xs uppercase tracking-[0.2em] font-mono opacity-50 hover:opacity-100 transition-opacity cursor-pointer underline underline-offset-4"
                >
                  Read Studio Statement
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Featured Visual Field */}
          <div className="lg:col-span-5 pb-2">
            <div className="space-y-3">
              {/* Media Preview Frame with Calm Proportion */}
              <div className="relative overflow-hidden">
                <ProjectMediaFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={true}
                />
              </div>

              {/* Minimal Caption */}
              <div className="pt-2 flex items-baseline justify-between text-xs font-mono opacity-65">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-current">{featuredProject.number}</span>
                  <span className="opacity-40">/</span>
                  <span className="lowercase">{featuredProject.slug}</span>
                </div>
                <Link
                  to={`/projects/${featuredProject.slug}`}
                  className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
                >
                  <span>View</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
