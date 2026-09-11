import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';

interface ProjectGridProps {
  projects: Project[];
}

interface SecondaryProjectCardProps {
  project: Project;
  aspectRatio: string;
  isOffset?: boolean;
}

const SecondaryProjectCard: React.FC<SecondaryProjectCardProps> = ({ project, aspectRatio, isOffset = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);

  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/card flex flex-col justify-between transition-colors duration-300 ${
        isOffset ? 'lg:pt-20 xl:pt-28' : ''
      } ${isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'}`}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Top Header: Asymmetrical Number & Tag */}
        <div className="flex items-baseline justify-between font-mono text-xs opacity-50">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-serif font-light opacity-60">{project.number}</span>
            <span className="text-[10px] tracking-widest uppercase opacity-40">/ SPECIMEN</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] tracking-widest uppercase">
            <span>{project.category}</span>
            <span className="opacity-30">·</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Visual Frame with Art-Directed Framing */}
        <div
          onClick={() => navigate(`/projects/${project.slug}`)}
          className={`relative p-2 sm:p-2.5 rounded-sm transition-all duration-700 ease-out cursor-pointer ${
            isHovered ? 'scale-[1.015] -translate-y-1' : ''
          } ${
            isDark
              ? 'bg-violet-950/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] border border-violet-800/20'
              : 'bg-white/50 shadow-[0_20px_45px_-15px_rgba(30,20,50,0.1)] border border-[#E2DFD2]'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(`/projects/${project.slug}`);
            }
          }}
          aria-label={`View ${title}`}
        >
          <div className="relative overflow-hidden">
            <ProjectMediaFrame
              project={project}
              aspectRatio={aspectRatio}
              isHovered={isHovered}
              priority={false}
              showCaption={false}
            />
          </div>
        </div>

        {/* Typography: Large Serif Title & Clean Summary */}
        <div className="space-y-3 pt-1">
          <Link to={`/projects/${project.slug}`} className="group/title block">
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[3.2rem] font-light tracking-[-0.035em] leading-[0.96] lowercase transition-colors group-hover/title:opacity-75">
              <span>{title}</span>
            </h3>
          </Link>

          <p className="text-[15px] sm:text-[16px] opacity-75 font-sans leading-relaxed font-light line-clamp-3">
            {summary}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-6 mt-8 flex items-center justify-between gap-4 text-xs font-mono border-t border-current/10">
        <div className="flex items-center gap-4 opacity-60">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
            >
              <span>Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px]"
            >
              <span>Source</span>
              <Github className="w-3 h-3" />
            </a>
          )}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 uppercase tracking-[0.2em] font-medium text-[11px] opacity-75 hover:opacity-100 transition-all group-hover/card:translate-x-1"
        >
          <span>View Plate</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <div className="pt-12 sm:pt-20">
      {/* Asymmetrical 2-Column Composition with Varied Scale and Stagger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
        {projects.map((project, idx) => {
          // Asymmetrical layout: Project 02 gets 5 cols (taller), Project 03 gets 7 cols (wider & offset)
          const isSecond = idx % 2 === 1;
          const colSpan = isSecond ? 'lg:col-span-7' : 'lg:col-span-5';
          const aspectRatio = isSecond ? 'aspect-[16/10]' : 'aspect-[4/3]';

          return (
            <div key={project.slug} className={colSpan}>
              <SecondaryProjectCard
                project={project}
                aspectRatio={aspectRatio}
                isOffset={isSecond}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
