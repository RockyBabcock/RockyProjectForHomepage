import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github, ExternalLink, Activity, ShieldCheck, Sparkles } from 'lucide-react';
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
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const description = localizeText(project.description);
  const handwrittenNote = project.handwrittenNote ? localizeText(project.handwrittenNote) : '';

  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative pt-12 sm:pt-16 pb-16 sm:pb-24 border-b transition-all duration-300 ${
        isDark ? 'border-violet-950/40 text-[#F5F3EF]' : 'border-[#E2DFD2] text-[#171717]'
      }`}
    >
      {/* Delicate Museum Watermark Pigment Wash */}
      <div className="absolute top-8 right-0 w-[420px] h-[340px] pointer-events-none opacity-30 z-0">
        <WatercolorStain
          variant="corner-pool"
          palette={project.pigmentAccent || 'cool'}
          opacity={isDark ? 0.3 : 0.55}
        />
      </div>

      <div className="relative z-10 space-y-8 sm:space-y-10">
        {/* 1. Curatorial Archival Header Strip */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-3 border-b text-xs font-mono transition-colors duration-300 ${
            isDark ? 'border-violet-950/50' : 'border-[#E2DFD2]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-light opacity-30 select-none">
              {project.number}
            </span>
            <span
              className={`px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest font-semibold rounded-xs ${
                isDark ? 'bg-violet-600 text-[#030014]' : 'bg-[#171717] text-[#FAF9F5]'
              }`}
            >
              FEATURED EXHIBIT
            </span>
            <span className="opacity-40">·</span>
            <span
              className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              {project.type}
            </span>
            <span className="opacity-40">·</span>
            <span className="opacity-75">{project.year}</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="opacity-75 lowercase">{project.status}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {handwrittenNote && (
              <span
                className={`font-['Caveat',cursive] text-lg sm:text-xl hidden md:inline select-none ${
                  isDark ? 'text-violet-300' : 'text-[#8B5CF6]'
                }`}
              >
                ~ {handwrittenNote}
              </span>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-3 h-3 text-[#8B5CF6]" />
                <span>live site</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
              >
                <Github className="w-3 h-3" />
                <span>source</span>
              </a>
            )}
          </div>
        </div>

        {/* 2. Dominant Editorial Visual Artifact (Substantially More Visual Weight) */}
        <div className="relative group/artifact">
          <div
            className={`transition-all duration-400 ease-out ${
              isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.12)]' : ''
            }`}
          >
            <ProjectMediaFrame
              project={project}
              aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
              isHovered={isHovered}
              priority={true}
              showCaption={false}
            />
          </div>

          {/* Archival Corner Annotation Overlay */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#030014]/75 text-white/90 text-[10px] font-mono tracking-widest uppercase backdrop-blur-xs border border-white/10 rounded-xs">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>AUTHENTIC SPECIMEN ARCHIVE // #{project.number}</span>
          </div>

          {/* Hover Plate Action Badge */}
          <Link
            to={`/projects/${project.slug}`}
            className={`absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] font-medium transition-all duration-300 backdrop-blur-md rounded-xs border shadow-lg ${
              isDark
                ? 'bg-violet-600/90 hover:bg-violet-500 text-[#030014] border-violet-400/40'
                : 'bg-[#171717]/90 hover:bg-[#171717] text-[#FAF9F5] border-white/15'
            } ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'}`}
          >
            <span>OPEN ARCHIVE</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Link>
        </div>

        {/* 3. Editorial Thesis, Metadata & Primary Action Spine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          {/* Left Column: Thesis & Description */}
          <div className="lg:col-span-8 space-y-4">
            <Link to={`/projects/${project.slug}`} className="group/title block">
              <h3 className="font-serif text-3xl sm:text-5xl lg:text-[4.2rem] font-light tracking-tight lowercase leading-[0.96]">
                <span className="group-hover/title:italic transition-all duration-300">
                  {title}
                </span>
              </h3>
            </Link>

            <p className="font-serif italic text-lg sm:text-xl md:text-2xl opacity-85 leading-snug font-light text-current">
              "{summary}"
            </p>

            <p className="text-[15px] sm:text-base opacity-75 font-sans leading-relaxed font-light max-w-2xl">
              {description}
            </p>

            {/* Revealed on hover / active states */}
            <div
              className={`transition-all duration-400 pt-2 flex flex-wrap items-center gap-2 text-xs font-mono ${
                isHovered ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-50 block mr-2">stack instruments:</span>
              {project.tools.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-0.5 border rounded-xs ${
                    isDark ? 'border-violet-950/60 bg-violet-950/30 text-violet-300' : 'border-[#E2DFD2] bg-[#FAF9F5] text-[#171717]'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Metadata Plate & CTA */}
          <div className="lg:col-span-4 space-y-5 lg:text-right font-mono text-xs flex flex-col lg:items-end justify-between">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-0.5">category</span>
                <span className="font-medium text-sm text-current">{project.category} · {project.type}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-0.5">role</span>
                <span className="opacity-90">{localizeText(project.role)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-0.5">preview endpoint</span>
                <span className={`font-mono text-[11px] ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
                  {project.previewUrl}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <MagneticLink strength={4}>
                <Link
                  to={`/projects/${project.slug}`}
                  className={`inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-mono font-medium transition-all duration-300 shadow-sm rounded-xs ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  } ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
                >
                  <span>explore project</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
