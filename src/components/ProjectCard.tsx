import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Project, ProjectStatus } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { DigitalArtifactFrame } from './DigitalArtifactFrame';
import { MagneticLink } from './MagneticLink';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  computedColSpan?: string;
  computedOffset?: string;
  computedAspectRatio?: string;
}

export const getStatusSymbol = (status?: ProjectStatus): string => {
  switch (status) {
    case 'Live':
      return '●';
    case 'Beta':
      return '◌';
    case 'Building':
      return '◐';
    case 'Archived':
      return '—';
    default:
      return '●';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priority = false,
  computedColSpan,
  computedOffset,
  computedAspectRatio,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const variant = project.layoutVariant || 'standard-6';
  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const handwrittenNote = project.handwrittenNote ? localizeText(project.handwrittenNote) : undefined;
  const statusSymbol = getStatusSymbol(project.status);

  // 1. Full-width Panoramic Cinema Spread (variant: 'cinema-12')
  if (variant === 'cinema-12') {
    return (
      <article
        id={`project-plate-${project.number}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col pt-10 sm:pt-14 pb-16 sm:pb-20 border-b transition-colors duration-300 ${
          isDark ? 'border-violet-950/40 text-[#F5F3EF]' : 'border-[#E2DFD2] text-[#171717]'
        } ${computedColSpan || 'lg:col-span-12'} ${computedOffset || ''}`}
      >
        {/* 1. Project Number & Top Annotation */}
        <div
          className={`flex items-baseline justify-between gap-4 mb-4 pb-2 border-b text-xs font-mono transition-colors ${
            isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/60'
          }`}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light opacity-25 tracking-tight select-none">
              {project.number}
            </span>
            <span
              className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              {project.type}
            </span>
            <span className="opacity-40">·</span>
            <span className="text-[12px] opacity-75 font-mono">{project.year}</span>
            <span className="opacity-40">·</span>
            {/* Status symbol indicator */}
            <span
              className="inline-flex items-center gap-1 font-mono text-[11px]"
              title={`Status: ${project.status}`}
            >
              <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>{statusSymbol}</span>
              <span className="opacity-70 lowercase">{project.status}</span>
            </span>
            <span className="opacity-40 hidden sm:inline">·</span>
            <span className="text-[11px] uppercase font-mono opacity-50 hidden sm:inline">
              MODE: {project.visualMode || 'INTERFACE'}
            </span>
          </div>

          {handwrittenNote && (
            <span
              className={`font-['Caveat',cursive] text-lg sm:text-xl -rotate-1 select-none hidden sm:inline ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              ~ {handwrittenNote}
            </span>
          )}
        </div>

        {/* 2. Dominant Digital Artifact Frame (Authentic Specimen) */}
        <div className="relative mb-7">
          <DigitalArtifactFrame
            project={project}
            aspectRatio={computedAspectRatio || 'aspect-[16/9] sm:aspect-[21/9]'}
            isHovered={isHovered}
            priority={priority}
          />
        </div>

        {/* 3. Project Title, Description & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
          <div className="lg:col-span-7 space-y-3">
            <Link to={`/projects/${project.slug}`} className="group/title block">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-light leading-[1.05] tracking-tight lowercase transition-all duration-300">
                <span className="relative inline-block transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:italic">
                  {title}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 group-hover/title:w-full h-[1.5px] transition-all duration-300 ${
                      isDark ? 'bg-violet-400' : 'bg-[#8B5CF6]'
                    }`}
                  />
                </span>
              </h2>
            </Link>

            <p className="text-[16px] sm:text-[17px] opacity-75 font-sans leading-relaxed max-w-2xl font-light">
              {summary}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4 lg:text-right flex flex-col lg:items-end justify-between h-full">
            {/* Tools Stack */}
            <div className="text-xs font-mono space-y-1">
              <span className="text-[10px] uppercase tracking-wider opacity-50 block">built with:</span>
              <span className="font-medium opacity-90">{project.tools.slice(0, 4).join(' · ')}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-[12px] font-mono">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <span>live</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
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
              <MagneticLink strength={3}>
                <Link
                  to={`/projects/${project.slug}`}
                  className={`group/link inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors shadow-xs ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>{t.project.viewProject}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </MagneticLink>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. Standard-6, Lead-7 & Offset-5 Grid Layouts
  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between pt-8 sm:pt-10 pb-12 sm:pb-16 border-b transition-colors duration-300 ${
        isDark ? 'border-violet-950/40 text-[#F5F3EF]' : 'border-[#E2DFD2] text-[#171717]'
      } ${
        computedColSpan ||
        (variant === 'lead-7' ? 'lg:col-span-7' : variant === 'offset-5' ? 'lg:col-span-5' : 'lg:col-span-6')
      } ${computedOffset || (variant === 'offset-5' ? 'lg:mt-8' : '')}`}
    >
      <div>
        {/* 1. Project Number & Subdued Annotation */}
        <div
          className={`flex items-baseline justify-between mb-4 pb-2 border-b text-[12px] font-mono transition-colors ${
            isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/60'
          }`}
        >
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-light opacity-30 select-none">
              {project.number}
            </span>
            <span
              className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              {project.type}
            </span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-[11px] opacity-75">{project.year}</span>
            <span className="opacity-40">·</span>
            {/* Status symbol indicator */}
            <span
              className="inline-flex items-center gap-1 font-mono text-[10px]"
              title={`Status: ${project.status}`}
            >
              <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>{statusSymbol}</span>
              <span className="opacity-70 lowercase">{project.status}</span>
            </span>
          </div>

          {handwrittenNote && (
            <span
              className={`font-['Caveat',cursive] text-base hidden sm:inline select-none ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              ~ {handwrittenNote}
            </span>
          )}
        </div>

        {/* 2. Dominant Digital Artifact Frame */}
        <div className="relative mb-5">
          <DigitalArtifactFrame
            project={project}
            aspectRatio={
              computedAspectRatio ||
              (variant === 'lead-7' ? 'aspect-[16/11]' : variant === 'offset-5' ? 'aspect-[4/5]' : 'aspect-[4/3]')
            }
            isHovered={isHovered}
            priority={priority}
          />
        </div>
      </div>

      {/* 3. Title, Summary, Tools & Small Action */}
      <div className="space-y-3 pt-1">
        <Link to={`/projects/${project.slug}`} className="group/title block">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-light leading-[1.08] tracking-tight lowercase transition-all duration-300">
            <span className="relative inline-block transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:italic">
              {title}
              <span
                className={`absolute -bottom-0.5 left-0 w-0 group-hover/title:w-full h-[1.5px] transition-all duration-300 ${
                  isDark ? 'bg-violet-400' : 'bg-[#8B5CF6]'
                }`}
              />
            </span>
          </h2>
        </Link>

        <p className="text-[15px] sm:text-[16px] opacity-75 font-sans leading-relaxed font-light">
          {summary}
        </p>

        {/* Tools Stack */}
        <div className="text-xs font-mono opacity-60">
          <span>{project.tools.slice(0, 3).join(' · ')}</span>
        </div>

        {/* Action Row */}
        <div
          className={`pt-2 flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono border-t transition-colors ${
            isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/40'
          }`}
        >
          <div className="flex items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
              >
                <span>live</span>
                <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
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
                <span>code</span>
              </a>
            )}
          </div>

          <MagneticLink strength={3}>
            <Link
              to={`/projects/${project.slug}`}
              className={`group/link inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors shadow-xs ${
                isDark
                  ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                  : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
              }`}
            >
              <span>{t.project.viewProject}</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </MagneticLink>
        </div>
      </div>
    </article>
  );
};
