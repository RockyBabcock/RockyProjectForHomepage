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
          02. SELECTED WORK: Hierarchy of Featured & Secondary Exhibition Plates
          ========================================================================= */}
      <section
        id="selected-work"
        ref={selectedWorkRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12 border-b border-current/10"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 border-b border-current/10">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ SELECTED WORK · 2024—2026 ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              exhibition plates<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
            Verified software artifacts, spatial 3D scenes & generative AI canvases
          </p>
        </div>

        {/* 1. FEATURED PROJECT (Substantially More Visual Weight) */}
        <FeaturedProject project={featuredProject} />

        {/* 2. SECONDARY PROJECTS (Balanced 2-Column Grid) */}
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
