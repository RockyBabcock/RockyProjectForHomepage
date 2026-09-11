import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CornerDownLeft } from 'lucide-react';
import { getProjectBySlug, getNextProject, getPreviousProject } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import { WatercolorStain } from '../components/WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

// Modular Project Detail Components
import { ProjectHero } from '../components/project/ProjectHero';
import { ProjectMetadata } from '../components/project/ProjectMetadata';
import { ProjectOverview } from '../components/project/ProjectOverview';
import { ProjectExperience } from '../components/project/ProjectExperience';
import { ProjectDesignDecisions } from '../components/project/ProjectDesignDecisions';
import { ProjectArchitecture } from '../components/project/ProjectArchitecture';
import { ProjectTechnical } from '../components/project/ProjectTechnical';
import { ProjectEvidence } from '../components/project/ProjectEvidence';
import { ProjectStack } from '../components/project/ProjectStack';
import { ProjectMetrics } from '../components/project/ProjectMetrics';
import { ProjectActions } from '../components/project/ProjectActions';
import { ProjectNext } from '../components/project/ProjectNext';
import { MediaLightbox } from '../components/MediaLightbox';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || '');
  const nextProject = project ? getNextProject(project.slug) : null;
  const prevProject = project ? getPreviousProject(project.slug) : null;
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false);

  const title = project ? localizeText(project.title) : '';
  const summary = project ? localizeText(project.summary) : '';

  usePageMeta({
    title: project ? `${title} — Rocky Babcock` : 'Project — Rocky Babcock',
    description: summary || 'Cinematic creative technology portfolio for Rocky Babcock.',
    ogTitle: project ? `${title} — Rocky Babcock` : 'Rocky Babcock',
    ogDescription: summary,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Keyboard navigation for exhibition browsing
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' && nextProject) {
        navigate(`/projects/${nextProject.slug}`);
      } else if (e.key === 'ArrowLeft' && prevProject) {
        navigate(`/projects/${prevProject.slug}`);
      } else if (e.key === 'Escape') {
        if (isHeroLightboxOpen) {
          setIsHeroLightboxOpen(false);
        } else {
          navigate('/');
        }
      }
    },
    [navigate, nextProject, prevProject, isHeroLightboxOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-28 text-center space-y-6">
        <h1 className="font-serif text-4xl lowercase">
          {t.project.projectNotFound}
        </h1>
        <p className="text-sm opacity-70 font-sans">
          {t.project.projectNotFoundDesc}
        </p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-2.5 font-mono transition-colors cursor-pointer ${
            isDark
              ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
              : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.project.returnToProjects}</span>
        </Link>
      </div>
    );
  }

  const heroMediaList = project.heroMedia ? [project.heroMedia] : [];

  return (
    <article
      className={`relative w-full pb-24 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Background Soft Pigment Wash */}
      <div className="absolute top-12 right-0 w-96 h-80 pointer-events-none opacity-40 z-0">
        <WatercolorStain
          variant="corner-pool"
          palette={project.pigmentAccent}
          opacity={isDark ? 0.3 : 0.6}
        />
      </div>

      {/* Top Breadcrumb Navigation & Keyboard Shortcuts */}
      <div
        className={`max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-6 border-b transition-colors ${
          isDark ? 'border-violet-950/30' : 'border-[#E2DFD2]/60'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono transition-colors ${
              isDark ? 'text-violet-300/80 hover:text-white' : 'text-[#67645C] hover:text-[#171717]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>back to work</span>
          </Link>

          {/* Keyboard hints */}
          <div className="hidden md:flex items-center gap-5 font-mono text-xs opacity-50">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/20 rounded text-[10px]">←</kbd>
              <span>prev</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/20 rounded text-[10px]">→</kbd>
              <span>next</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/20 rounded text-[10px]">esc</kbd>
              <span>return</span>
            </span>
            <span className="opacity-30">|</span>
            <span className="uppercase tracking-wider text-[11px]">
              {project.number} / {project.slug}
            </span>
          </div>
        </div>
      </div>

      {/* Main Exhibition Container */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-16 space-y-16 sm:space-y-24">
        {/* Project Hero (Cinematic Reveal + Dominating Artifact) */}
        <ProjectHero
          project={project}
          onOpenLightbox={() => setIsHeroLightboxOpen(true)}
        />

        {/* Curatorial Metadata Bar */}
        <ProjectMetadata project={project} />

        {/* 46rem Reading Spine for Focused Editorial Chapters */}
        <div className="max-w-[46rem] mx-auto space-y-20 sm:space-y-28">
          {/* Chapter 01: THE IDEA */}
          <ProjectOverview project={project} />

          {/* Chapter 02: THE EXPERIENCE */}
          <ProjectExperience project={project} />

          {/* Chapter 03: DESIGN DECISIONS */}
          <ProjectDesignDecisions project={project} />

          {/* Chapter 04: SYSTEM ARCHITECTURE */}
          <ProjectArchitecture project={project} />

          {/* Chapter 05: TECHNICAL APPROACH & ENGINEERING */}
          <ProjectTechnical project={project} />

          {/* Chapter 06: PRODUCTION EVIDENCE */}
          <ProjectEvidence project={project} />

          {/* Chapter 07: INSTRUMENTS & TECHNOLOGIES */}
          <ProjectStack project={project} />

          {/* Chapter 08: OUTCOME & VERIFIED BENCHMARKS */}
          <ProjectMetrics project={project} />

          {/* Chapter 09: LAUNCH & SOURCE REPOSITORIES */}
          <ProjectActions project={project} />

          {/* Chapter 10: NEXT SPECIMEN */}
          <ProjectNext nextProject={nextProject} />
        </div>
      </div>

      {/* Hero Lightbox Modal */}
      {isHeroLightboxOpen && heroMediaList.length > 0 && (
        <MediaLightbox
          isOpen={true}
          onClose={() => setIsHeroLightboxOpen(false)}
          items={heroMediaList}
          currentIndex={0}
          onSelectIndex={() => {}}
          projectNumber={project.number}
          projectSlug={project.slug}
          liveDemoUrl={project.demo}
        />
      )}
    </article>
  );
};
