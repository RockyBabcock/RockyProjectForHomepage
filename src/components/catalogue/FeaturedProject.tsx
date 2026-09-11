import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { MagneticLink } from '../MagneticLink';

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
      className={`relative pt-12 sm:pt-16 pb-20 sm:pb-28 border-b transition-colors duration-300 ${
        isDark ? 'border-violet-950/30 text-[#F5F3EF]' : 'border-[#E2DFD2]/60 text-[#171717]'
      }`}
    >
      <div className="space-y-8 sm:space-y-12">
        {/* Header Block: Number + Title + Thesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
          <div className="lg:col-span-1">
            <span className="font-mono text-sm sm:text-base opacity-40">
              {project.number}
            </span>
          </div>

          <div className="lg:col-span-7">
            <Link to={`/projects/${project.slug}`} className="group inline-block">
              <h3 className="font-serif text-3xl sm:text-5xl lg:text-[4rem] font-light tracking-[-0.035em] leading-[0.98] lowercase transition-colors group-hover:opacity-75">
                {title}
              </h3>
            </Link>
            <p className="font-serif italic text-lg sm:text-2xl opacity-80 font-light mt-3 leading-snug">
              "{summary}"
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end items-center gap-6 font-mono text-xs opacity-60">
            <span>{project.year}</span>
            <span>/</span>
            <span className="uppercase tracking-wider">{project.type}</span>
            <span>/</span>
            <span className="lowercase">{project.status}</span>
          </div>
        </div>

        {/* Large Media Presentation */}
        <div className="relative overflow-hidden transition-transform duration-500">
          <ProjectMediaFrame
            project={project}
            aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            isHovered={isHovered}
            priority={true}
            showCaption={false}
          />
        </div>

        {/* Footer Spine: Narrative & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          <div className="lg:col-span-1 hidden lg:block" />

          <div className="lg:col-span-7 space-y-4">
            <p className="text-[15px] sm:text-[16px] opacity-70 font-sans leading-relaxed font-light max-w-2xl">
              {description}
            </p>

            {/* Instruments / Stack (clean text) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono opacity-60 pt-2">
              <span className="opacity-40 uppercase tracking-wider text-[10px]">Stack:</span>
              <span>{project.tools.slice(0, 6).join(' · ')}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-5 font-mono text-xs">
            {/* Live & Source links */}
            <div className="flex items-center gap-5 opacity-70">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
                >
                  <ExternalLink className="w-3 h-3" />
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
                  <Github className="w-3 h-3" />
                  <span>Source</span>
                </a>
              )}
            </div>

            {/* Primary View Action */}
            <MagneticLink strength={3}>
              <Link
                to={`/projects/${project.slug}`}
                className={`inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-[0.2em] font-mono font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-violet-600 text-[#030014] hover:bg-violet-400'
                    : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                }`}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticLink>
          </div>
        </div>
      </div>
    </article>
  );
};
