import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
}

const SecondaryProjectCard: React.FC<SecondaryProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      className={`group/card flex flex-col justify-between py-12 sm:py-16 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* Top Header: Number & Category/Year */}
        <div className="flex items-baseline justify-between text-xs font-mono opacity-50">
          <span className="text-sm sm:text-base font-normal">{project.number}</span>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-wider">{project.category}</span>
            <span>/</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Visual Frame */}
        <div className="relative overflow-hidden">
          <Link to={`/projects/${project.slug}`} className="block">
            <ProjectMediaFrame
              project={project}
              aspectRatio="aspect-[16/10]"
              isHovered={isHovered}
              priority={false}
              showCaption={false}
            />
          </Link>
        </div>

        {/* Typography: Large Title & Clean Summary */}
        <div className="space-y-3 pt-1">
          <Link to={`/projects/${project.slug}`} className="group/title block">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2.6rem] font-light tracking-[-0.03em] leading-[1.05] lowercase transition-colors group-hover/title:opacity-75">
              <span>{title}</span>
            </h3>
          </Link>

          <p className="text-[15px] sm:text-[16px] opacity-70 font-sans leading-relaxed font-light line-clamp-3">
            {summary}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-6 mt-6 flex items-center justify-between gap-4 text-xs font-mono border-t border-current/10">
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
          className="inline-flex items-center gap-1.5 uppercase tracking-[0.18em] font-medium text-[11px] opacity-70 hover:opacity-100 transition-all group-hover/card:translate-x-0.5"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 pt-8 sm:pt-12">
      {projects.map((project) => (
        <SecondaryProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};
