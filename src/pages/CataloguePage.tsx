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
    title: `Rocky Babcock — Selected Projects & Systems Archive`,
    description:
      'Cinematic creative technology portfolio, spatial web engines, AI interface prototypes, and systems archive by Rocky Babcock.',
  });

  const sequenceRef = useRef<HTMLDivElement>(null);

  const scrollToSequence = () => {
    sequenceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Flagship projects for the Scene Sequence (01, 02, 03)
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const secondaryProjects = projectsData.filter((p) => p.slug !== featuredProject.slug);

  return (
    <div className="w-full relative transition-colors duration-300">
      {/* Floating Project Sequence Rail / Index Instrument */}
      <ProjectRail projects={[featuredProject, ...secondaryProjects]} />

      {/* =======================================================================
          SCENE 01 — INTRO HERO (Full-Screen Experience, Min 100vh)
          Huge display type, overlapping 3D media, technical geometry, watercolor
          ======================================================================= */}
      <CatalogueHero
        onScrollToArchive={scrollToSequence}
        onOpenStatement={onOpenStatement}
      />

      {/* =======================================================================
          SCENES 02, 03, 04 — PINNED STICKY PROJECT SEQUENCE
          Full-viewport scenes with depth stacking: Project 01 -> Project 02 -> Project 03
          No bounding card boxes. Edge-to-edge spatial environments.
          ======================================================================= */}
      <main ref={sequenceRef} id="project-sequence" className="relative w-full">
        {/* SCENE 02 — PROJECT 01: SVG Downloader (DATA / SYSTEM SCENE) */}
        <FeaturedProject project={featuredProject} />

        {/* SCENE 03 — PROJECT 02: rockyhomepage3D (SPATIAL 3D SCENE)
            SCENE 04 — PROJECT 03: melius-like (AI / SELECTION / ROTATION SCENE) */}
        <ProjectGrid projects={secondaryProjects} />
      </main>

      {/* Kinetic Typographic Divider: Bridging the flagship trilogy to the complete archive */}
      <div className="relative py-8 sm:py-12 overflow-hidden border-y border-current/10">
        <TypographicMarquee />
      </div>

      {/* =======================================================================
          SCENE 05 — ARCHIVE INDEX: Complete Directory with Typographic Scaling & Hover
          ======================================================================= */}
      <section id="scene-05-archive" className="relative w-full">
        <ArchiveIndex projects={projectsData} />
      </section>

      {/* =======================================================================
          SCENE 06 — TECHNICAL CLIMAX: Full Architectural Circuit & Subsystem Climax
          ======================================================================= */}
      <TechnicalIndex />
    </div>
  );
};
