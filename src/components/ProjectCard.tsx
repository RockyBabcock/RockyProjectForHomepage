import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { EditorialBrowserFrame } from './EditorialBrowserFrame';
import { MagneticLink } from './MagneticLink';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  computedColSpan?: string;
  computedOffset?: string;
  computedAspectRatio?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  priority = false,
  computedColSpan,
  computedOffset,
  computedAspectRatio,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { localizeText, t } = useLanguage();

  const variant = project.layoutVariant || 'standard-6';
  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const role = localizeText(project.role);
  const handwrittenNote = project.handwrittenNote ? localizeText(project.handwrittenNote) : undefined;

  // 1. Full-width Panoramic Cinema Spread (variant: 'cinema-12')
  if (variant === 'cinema-12') {
    return (
      <article
        id={`project-plate-${project.number}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#E2DFD2] ${
          computedColSpan || 'lg:col-span-12'
        } ${computedOffset || ''}`}
      >
        {/* Header: Project Number, Type Pill, Meta & Handwritten Note */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
            <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#171717]/25 tracking-tight select-none">
              {project.number}
            </span>
            <span className="px-2 py-0.5 bg-[#171717] text-[#F5F4ED] text-[10px] uppercase font-mono tracking-widest">
              {project.type}
            </span>
            <div className="flex items-center gap-2 text-[12px] font-sans text-[#67645C]">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#171717] font-medium">
                {project.category}
              </span>
              <span className="text-[#E2DFD2]">/</span>
              <span className="text-[#67645C] font-mono text-[12px]">{project.year}</span>
              <span className="text-[#E2DFD2]">/</span>
              <span
                className={`text-[11px] uppercase font-mono tracking-wider ${
                  project.status === 'Live' ? 'text-emerald-700 font-medium' : 'text-[#9E9A90]'
                }`}
              >
                ● {project.status}
              </span>
            </div>
          </div>

          {handwrittenNote && (
            <span className="font-['Caveat',cursive] text-lg sm:text-xl text-[#637A95] -rotate-1 select-none">
              ~ {handwrittenNote}
            </span>
          )}
        </div>

        {/* Master Cinema Visual in Minimal Editorial Browser Frame */}
        <Link
          to={`/projects/${project.slug}`}
          className="block mb-8 focus:outline-none"
          aria-label={`View project details for ${title}`}
        >
          <EditorialBrowserFrame
            project={project}
            aspectRatio={computedAspectRatio || 'aspect-[16/9] sm:aspect-[21/9]'}
            isHovered={isHovered}
            priority={priority}
          />
        </Link>

        {/* Spread Typography: Title, Description, Stack, and Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
          <div className="lg:col-span-6 space-y-3">
            <Link to={`/projects/${project.slug}`} className="group/title block">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[50px] font-light leading-[1.04] tracking-tight text-[#171717] lowercase transition-all duration-300">
                <span className="relative inline-block transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:italic">
                  {title}
                  <span className="absolute -bottom-1 left-0 w-0 group-hover/title:w-full h-[1.5px] bg-[#6F87AA] transition-all duration-300" />
                </span>
              </h2>
            </Link>

            <p className="text-[15px] sm:text-[16px] text-[#67645C] font-sans leading-relaxed">
              {summary}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Real Project Tech Stack & Role */}
            <div className="p-4 bg-[#ECEADE]/50 border border-[#E2DFD2] rounded-xs space-y-2 text-xs font-mono text-[#67645C]">
              <div className="flex items-start gap-2">
                <span className="text-[#9E9A90] uppercase tracking-wider text-[10px] w-20 shrink-0">
                  built with:
                </span>
                <span className="text-[#171717]">{project.tools.join(' · ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9E9A90] uppercase tracking-wider text-[10px] w-20 shrink-0">
                  role:
                </span>
                <span className="text-[#171717] font-sans text-xs">{role}</span>
              </div>
            </div>

            {/* Actions: View Project, Live Demo, GitHub */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-[12px] font-sans">
              <div className="flex items-center gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] uppercase font-mono tracking-wider text-[#67645C] hover:text-[#171717] transition-colors"
                  >
                    <span>live app</span>
                    <ArrowUpRight className="w-3 h-3 text-[#6F87AA]" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] uppercase font-mono tracking-wider text-[#67645C] hover:text-[#171717] transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>code</span>
                  </a>
                )}
              </div>

              <MagneticLink strength={3}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] text-[12px] uppercase tracking-[0.16em] transition-colors"
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

  // 2. Lead-7 & Standard-6 & Offset-5 Layouts
  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between pt-8 sm:pt-10 pb-12 sm:pb-16 border-b border-[#E2DFD2] ${
        computedColSpan || (variant === 'lead-7' ? 'lg:col-span-7' : variant === 'offset-5' ? 'lg:col-span-5' : 'lg:col-span-6')
      } ${computedOffset || (variant === 'offset-5' ? 'lg:mt-10' : '')}`}
    >
      {/* Top Header with Outside Project Number & Type */}
      <div className="flex items-baseline justify-between mb-4 text-[12px] font-sans text-[#67645C] border-b border-[#E2DFD2]/50 pb-2.5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif text-3xl sm:text-4xl font-light text-[#171717]/30 select-none">
            {project.number}
          </span>
          <span className="px-1.5 py-0.5 bg-[#171717] text-[#F5F4ED] text-[9px] uppercase font-mono tracking-wider">
            {project.type}
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#67645C] font-medium hidden sm:inline">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {handwrittenNote && (
            <span className="font-['Caveat',cursive] text-base text-[#6F87AA] hidden sm:inline select-none">
              ~ {handwrittenNote}
            </span>
          )}
          <span className="font-mono text-[11px] text-[#67645C]">{project.year}</span>
        </div>
      </div>

      {/* Browser Preview Frame */}
      <Link
        to={`/projects/${project.slug}`}
        className="block mb-6 focus:outline-none"
        aria-label={`View project details for ${title}`}
      >
        <EditorialBrowserFrame
          project={project}
          aspectRatio={
            computedAspectRatio ||
            (variant === 'lead-7' ? 'aspect-[16/11]' : variant === 'offset-5' ? 'aspect-[4/5]' : 'aspect-[4/3]')
          }
          isHovered={isHovered}
          priority={priority}
        />
      </Link>

      {/* Project Details */}
      <div className="space-y-3.5">
        <Link to={`/projects/${project.slug}`} className="group/title block">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-light leading-[1.08] tracking-tight text-[#171717] lowercase transition-all duration-300">
            <span className="relative inline-block transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:italic">
              {title}
              <span className="absolute -bottom-0.5 left-0 w-0 group-hover/title:w-full h-[1.5px] bg-[#6F87AA] transition-all duration-300" />
            </span>
          </h2>
        </Link>

        <p className="text-[15px] sm:text-[16px] text-[#67645C] font-sans leading-relaxed">
          {summary}
        </p>

        {/* Real Tech Stack & Role snippet */}
        <div className="py-2.5 px-3 bg-[#ECEADE]/40 border border-[#E2DFD2] rounded-xs text-[11px] font-mono text-[#67645C] space-y-1">
          <div className="truncate">
            <span className="text-[#9E9A90] uppercase tracking-wider text-[10px] mr-1.5">stack:</span>
            <span className="text-[#171717]">{project.tools.slice(0, 3).join(' · ')}</span>
          </div>
          <div className="truncate text-xs font-sans">
            <span className="text-[#9E9A90] uppercase tracking-wider font-mono text-[10px] mr-1.5">role:</span>
            <span>{role}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[12px] font-sans">
          <div className="flex items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[11px] uppercase font-mono tracking-wider text-[#67645C] hover:text-[#171717] transition-colors"
              >
                <span>live</span>
                <ArrowUpRight className="w-3 h-3 text-[#6F87AA]" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[11px] uppercase font-mono tracking-wider text-[#67645C] hover:text-[#171717] transition-colors"
              >
                <Github className="w-3 h-3" />
                <span>code</span>
              </a>
            )}
          </div>

          <MagneticLink strength={3}>
            <Link
              to={`/projects/${project.slug}`}
              className="group/link inline-flex items-center gap-1.5 px-3 py-1 bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] text-[11px] uppercase tracking-[0.14em] transition-colors"
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
