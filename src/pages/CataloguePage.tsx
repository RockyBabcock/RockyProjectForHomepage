import React, { useRef } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { CatalogueHero } from '../components/catalogue/CatalogueHero';
import { FeaturedProject } from '../components/catalogue/FeaturedProject';
import { ProjectGrid } from '../components/catalogue/ProjectGrid';
import { ArchiveIndex } from '../components/catalogue/ArchiveIndex';
import { TypographicMarquee } from '../components/TypographicMarquee';
import { ProjectRail } from '../components/ProjectRail';
import { TechnicalIndex } from '../components/TechnicalIndex';
import { projectsData } from '../data/projects';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CataloguePageProps {
  onOpenStatement: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onOpenStatement }) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  usePageMeta({
    title: `Rocky Babcock — Project Archive`,
    description: 'Cinematic creative technology portfolio and project archive for Rocky Babcock — AI agents, Web3, and experimental systems.',
  });

  const selectedWorkRef = useRef<HTMLDivElement>(null);

  const scrollToSelectedWork = () => {
    selectedWorkRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Flagship projects for Selected Work hierarchy
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const secondaryProjects = projectsData.filter((p) => p.slug !== featuredProject.slug);

  return (
    <div className="w-full relative transition-colors duration-300">
      {/* =========================================================================
          01. ENTRANCE: Catalogue Hero + Typographic Marquee
          ========================================================================= */}
      <CatalogueHero
        onScrollToArchive={scrollToSelectedWork}
        onOpenStatement={onOpenStatement}
      />

      <TypographicMarquee />

      {/* Persistent Exhibition Index Rail (Desktop: 01 / project, Mobile: 01 / 03) */}
      <ProjectRail projects={[featuredProject, ...secondaryProjects]} />

      {/* =========================================================================
          02. SELECTED WORK: Flagship & Secondary Projects
          ========================================================================= */}
      <section
        id="selected-work"
        ref={selectedWorkRef}
        className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-16"
      >
        {/* Section Header: Minimal & Confident */}
        <div className="flex items-baseline justify-between pb-8 border-b border-current/10">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] lowercase">
              selected work<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <span className="text-xs font-mono opacity-50 uppercase tracking-[0.2em]">
            01 — {String(projectsData.length).padStart(2, '0')}
          </span>
        </div>

        {/* 1. FEATURED PROJECT */}
        <FeaturedProject project={featuredProject} />

        {/* 2. SECONDARY PROJECTS (Spacious 2-Column Grid) */}
        <ProjectGrid projects={secondaryProjects} />
      </section>

      {/* =========================================================================
          03. COMPLETE DIRECTORY: Exhibition Catalogue Index with Search & Filters
          ========================================================================= */}
      <ArchiveIndex projects={projectsData} />

      {/* =========================================================================
          04. TECHNICAL INDEX: Frontend, 3D, AI, Tools Colophon
          ========================================================================= */}
      <TechnicalIndex />
    </div>
  );
};
