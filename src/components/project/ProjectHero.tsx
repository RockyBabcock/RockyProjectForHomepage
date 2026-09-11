import React from 'react';
import { ExternalLink, Github, ShieldCheck, Activity } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';

interface ProjectHeroProps {
  project: Project;
  onOpenLightbox?: () => void;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project, onOpenLightbox }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const handwrittenNote = project.handwrittenNote ? localizeText(project.handwrittenNote) : '';

  return (
    <header className="relative space-y-8 sm:space-y-12">
      {/* 1. Cinematic Restrained Archival Header Plate */}
      <div className="space-y-4">
        {/* Archival metadata line: Number, Type, Category, Status */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-4 border-b font-mono text-xs transition-colors duration-300 ${
            isDark ? 'border-violet-950/50 text-violet-300/80' : 'border-[#E2DFD2] text-[#67645C]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-light opacity-35 select-none">
              {project.number}
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest font-semibold rounded-xs ${
                isDark ? 'bg-violet-600 text-[#030014]' : 'bg-[#171717] text-[#FAF9F5]'
              }`}
            >
              EXHIBIT SPECIMEN
            </span>
            <span className="opacity-40">·</span>
            <span
              className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              {project.category} // {project.type}
            </span>
            <span className="opacity-40">·</span>
            <span className="opacity-75">{project.year}</span>
            <span className="opacity-40">·</span>
            <span className="inline-flex items-center gap-1.5 text-[11px]">
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
                <span>source code</span>
              </a>
            )}
          </div>
        </div>

        {/* Large Serif Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] font-light tracking-[-0.03em] lowercase leading-[0.92] text-current">
          {title}
        </h1>

        {/* Short Thesis */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl opacity-85 leading-snug font-light max-w-4xl text-current">
          "{summary}"
        </p>
      </div>

      {/* 2. Hero Artifact: Dominating First Viewport */}
      <div className="relative group/hero-artifact pt-2">
        <div
          onClick={onOpenLightbox}
          className={`cursor-pointer transition-all duration-500 ${
            onOpenLightbox ? 'hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]' : ''
          }`}
        >
          <ProjectMediaFrame
            project={project}
            aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            priority={true}
            allowZoom={true}
            showCaption={false}
          />
        </div>

        {/* Click to expand pill */}
        {onOpenLightbox && (
          <div className="pt-2 flex items-center justify-between text-xs font-mono opacity-60">
            <span className="hidden sm:inline text-[11px] tracking-wider uppercase">
              CLICK MEDIA FRAME TO VIEW FULLSCREEN LIGHTBOX
            </span>
            <span className="text-[11px] ml-auto">
              CAPTURED ARTIFACT // SPECIMEN #{project.number}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
