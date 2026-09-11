import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { MagneticLink } from '../MagneticLink';

interface ProjectGridProps {
  projects: Project[];
}

interface SecondaryProjectCardProps {
  project: Project;
}

const SecondaryProjectCard: React.FC<SecondaryProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const handwrittenNote = project.handwrittenNote ? localizeText(project.handwrittenNote) : '';

  return (
    <article
      id={`project-plate-${project.number}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/card relative flex flex-col justify-between pt-8 sm:pt-10 pb-12 sm:pb-14 border-b transition-all duration-300 ${
        isDark ? 'border-violet-950/40 text-[#F5F3EF]' : 'border-[#E2DFD2] text-[#171717]'
      } ${isHovered ? 'bg-current/[0.015]' : ''}`}
    >
      <div className="space-y-4">
        {/* Archival Specimen Header Strip */}
        <div
          className={`flex items-baseline justify-between pb-2.5 border-b text-xs font-mono transition-colors duration-300 ${
            isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
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
            <span className="opacity-75">{project.year}</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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

        {/* Media Preview Frame with Controlled Subtle Scale */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-300 ${
              isHovered ? 'shadow-[0_12px_32px_rgba(0,0,0,0.1)]' : ''
            }`}
          >
            <ProjectMediaFrame
              project={project}
              aspectRatio="aspect-[16/10]"
              isHovered={isHovered}
              priority={false}
              showCaption={false}
            />
          </div>

          {/* Hover Overlay: Reveal "OPEN ARCHIVE" Badge */}
          <Link
            to={`/projects/${project.slug}`}
            className={`absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] font-medium backdrop-blur-md rounded-xs border transition-all duration-300 ${
              isDark
                ? 'bg-violet-600 text-[#030014] border-violet-400/40'
                : 'bg-[#171717] text-[#FAF9F5] border-white/10'
            } ${
              isHovered
                ? 'opacity-100 translate-y-0 shadow-md'
                : 'opacity-0 translate-y-1.5 pointer-events-none'
            }`}
          >
            <span>OPEN ARCHIVE</span>
            <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Title & Short Thesis */}
        <div className="space-y-2 pt-1">
          <Link to={`/projects/${project.slug}`} className="group/title block">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-light tracking-tight lowercase leading-[1.08] transition-all duration-300">
              <span className="relative inline-block transition-transform duration-300 group-hover/title:translate-x-1 group-hover/title:italic">
                {title}
                <span
                  className={`absolute -bottom-0.5 left-0 w-0 group-hover/title:w-full h-[1.5px] transition-all duration-300 ${
                    isDark ? 'bg-violet-400' : 'bg-[#8B5CF6]'
                  }`}
                />
              </span>
            </h3>
          </Link>

          <p className="text-[15px] sm:text-[16px] opacity-75 font-sans leading-relaxed font-light">
            {summary}
          </p>

          {/* Additional Metadata Revealed on Hover */}
          <div
            className={`transition-all duration-300 text-xs font-mono pt-1 ${
              isHovered ? 'opacity-90' : 'opacity-60'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-0.5">instruments:</span>
            <span>{project.tools.slice(0, 4).join(' · ')}</span>
          </div>
        </div>
      </div>

      {/* Card Action Row */}
      <div
        className={`pt-5 mt-4 flex items-center justify-between gap-3 text-[12px] font-mono border-t transition-colors duration-300 ${
          isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
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
            className={`group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition-colors rounded-xs shadow-xs ${
              isDark
                ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
            }`}
          >
            <span>{t.project.viewProject}</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </MagneticLink>
      </div>
    </article>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
      {projects.map((project) => (
        <SecondaryProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};
