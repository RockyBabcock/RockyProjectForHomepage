import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { MagneticLink } from '../MagneticLink';
import { WatercolorStain } from '../WatercolorStain';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const description = localizeText(project.description);

  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative pt-16 sm:pt-24 pb-24 sm:pb-36 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Structural Watercolor Wash bleeding underneath the media boundary */}
      <div className="absolute -bottom-12 right-[5%] w-[550px] lg:w-[800px] h-[380px] lg:h-[480px] pointer-events-none opacity-40 z-0">
        <WatercolorStain
          variant="pool-deep"
          palette={isDark ? 'violet' : 'warm'}
          intensity="medium"
          seed={3}
          opacity={isDark ? 0.22 : 0.45}
        />
      </div>

      <div className="relative z-10 space-y-12 sm:space-y-16">
        {/* Top Asymmetric Composition: Huge Numeral + Monumental Title + Curatorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
          {/* Colossal Numeral */}
          <div className="lg:col-span-2">
            <span className="font-serif text-7xl sm:text-9xl lg:text-[9.5rem] font-light opacity-25 leading-none block select-none">
              {project.number}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-45 block mt-2">
              Primary Specimen
            </span>
          </div>

          {/* Title & Thesis Quote */}
          <div className="lg:col-span-7 space-y-4">
            <Link to={`/projects/${project.slug}`} className="group inline-block">
              <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light tracking-[-0.04em] leading-[0.9] lowercase transition-colors group-hover:opacity-75">
                {title}
              </h3>
            </Link>
            <p className="font-serif italic text-xl sm:text-2xl lg:text-[28px] opacity-80 font-light leading-snug max-w-2xl">
              "{summary}"
            </p>
          </div>

          {/* Metadata Block (High Scale Contrast: 11px vs 85px) */}
          <div className="lg:col-span-3 lg:text-right font-mono text-[11px] space-y-2 opacity-65">
            <div className="uppercase tracking-[0.22em] font-medium text-current">
              {project.year} // {project.type}
            </div>
            <div className="opacity-50">Status: {project.status}</div>
            <div className="opacity-50">Ref: {project.slug}</div>
          </div>
        </div>

        {/* Oversized Media Presentation as an Art Object (Floating & Translucent framing) */}
        <div
          className={`relative p-2 sm:p-3 lg:p-4 rounded-sm transition-all duration-700 ease-out ${
            isHovered ? 'scale-[1.01] -translate-y-1' : ''
          } ${
            isDark
              ? 'bg-violet-950/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] border border-violet-800/20'
              : 'bg-white/50 shadow-[0_30px_60px_-20px_rgba(30,20,50,0.12)] border border-[#E2DFD2]'
          }`}
        >
          <div className="relative overflow-hidden">
            <ProjectMediaFrame
              project={project}
              aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
              isHovered={isHovered}
              priority={true}
              showCaption={false}
            />
          </div>
        </div>

        {/* Asymmetrical Lower Row: Narrative Spine & Magnetic Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-2">
          <div className="lg:col-span-2 hidden lg:block" />

          {/* Description & Tools */}
          <div className="lg:col-span-6 space-y-5">
            <p className="text-[15px] sm:text-[16px] opacity-75 font-sans leading-relaxed font-light">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono opacity-65 pt-1">
              <span className="opacity-40 uppercase tracking-widest text-[10px]">Stack:</span>
              <span>{project.tools.slice(0, 6).join(' · ')}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-6 opacity-75">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Site</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source</span>
                </a>
              )}
            </div>

            <MagneticLink strength={3}>
              <Link
                to={`/projects/${project.slug}`}
                className={`inline-flex items-center gap-3 px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-mono font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-violet-600 text-[#030014] hover:bg-violet-400'
                    : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                }`}
              >
                <span>View Full Plate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticLink>
          </div>
        </div>
      </div>
    </article>
  );
};
