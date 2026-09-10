import React, { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { EditorialHero } from '../components/EditorialHero';
import { TypographicMarquee } from '../components/TypographicMarquee';
import { StudioStatusSection } from '../components/StudioStatusSection';
import { CatalogueFilters } from '../components/CatalogueFilters';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectRail } from '../components/ProjectRail';
import { TechnicalIndex } from '../components/TechnicalIndex';
import { projectsData, getDynamicLayout } from '../data/projects';
import { ProjectCategory, SortOption, Project } from '../types';
import { WatercolorStain } from '../components/WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CataloguePageProps {
  onOpenStatement: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onOpenStatement }) => {
  const { t, localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const [searchParams, setSearchParams] = useSearchParams();

  usePageMeta({
    title: `Rocky Babcock — Creative Technology & Projects`,
    description: 'Cinematic creative technology portfolio for Rocky Babcock — AI agents, Web3 systems, developer tools, and experimental interfaces.',
  });

  const archiveRef = useRef<HTMLDivElement>(null);
  const selectedWorkRef = useRef<HTMLDivElement>(null);

  // URL-driven filter parameters
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');
  const qParam = searchParams.get('q') || searchParams.get('search') || '';

  const validCategories: ProjectCategory[] = ['All', 'AI', 'Web3', 'Open Source', 'Experiment', 'Design'];
  const selectedCategory: ProjectCategory = (categoryParam && validCategories.includes(categoryParam as ProjectCategory))
    ? (categoryParam as ProjectCategory)
    : 'All';

  const validSorts: Record<string, SortOption> = {
    featured: 'Featured',
    newest: 'Newest',
    oldest: 'Oldest',
  };
  const sortBy: SortOption = (sortParam && validSorts[sortParam.toLowerCase()])
    ? validSorts[sortParam.toLowerCase()]
    : 'Featured';

  const searchQuery = qParam;

  const handleSelectCategory = (cat: ProjectCategory) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (cat === 'All') {
        next.delete('category');
      } else {
        next.set('category', cat);
      }
      return next;
    }, { replace: false });
  };

  const handleSortChange = (sort: SortOption) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (sort === 'Featured') {
        next.delete('sort');
      } else {
        next.set('sort', sort.toLowerCase());
      }
      return next;
    }, { replace: false });
  };

  const handleSearchChange = (query: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!query.trim()) {
        next.delete('q');
        next.delete('search');
      } else {
        next.set('q', query);
      }
      return next;
    }, { replace: true });
  };

  const scrollToArchive = () => {
    selectedWorkRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Top 3–4 Flagship Projects for "Selected Work" section
  const selectedProjects = useMemo(() => {
    return projectsData.slice(0, 4);
  }, []);

  // Filter & Sort logic supporting multilingual fields
  const filteredProjects = useMemo(() => {
    let result = [...projectsData];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter (checks current language + English fallback + keywords)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const titleLoc = localizeText(p.title).toLowerCase();
        const summaryLoc = localizeText(p.summary).toLowerCase();
        const descLoc = localizeText(p.description).toLowerCase();
        const titleEn = typeof p.title === 'string' ? p.title.toLowerCase() : (p.title.en || '').toLowerCase();
        const cat = p.category.toLowerCase();
        const toolsMatch = p.tools.some((tool) => tool.toLowerCase().includes(q));
        const tagsMatch = p.tags.some((tag) => tag.toLowerCase().includes(q));

        return (
          titleLoc.includes(q) ||
          titleEn.includes(q) ||
          summaryLoc.includes(q) ||
          descLoc.includes(q) ||
          cat.includes(q) ||
          toolsMatch ||
          tagsMatch
        );
      });
    }

    // Sort logic
    if (sortBy === 'Featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, localizeText]);

  // Group Archive projects by year for time-aware structure (instruction 18)
  const groupedByYear = useMemo(() => {
    const groups: Record<string, Project[]> = {};
    filteredProjects.forEach((project) => {
      const yr = project.year || '2025';
      if (!groups[yr]) {
        groups[yr] = [];
      }
      groups[yr].push(project);
    });

    // Sort years descending
    const sortedYears = Object.keys(groups).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
    return sortedYears.map((year) => ({
      year,
      projects: groups[year],
    }));
  }, [filteredProjects]);

  return (
    <div className="w-full relative transition-colors duration-300">
      {/* 1. OPENING: Editorial Hero with Featured Project Window */}
      <EditorialHero
        onScrollToArchive={scrollToArchive}
        onOpenStatement={onOpenStatement}
      />

      {/* 2. SLOW TYPOGRAPHIC MARQUEE: Ambient motion connecting to homepage */}
      <TypographicMarquee />

      {/* Vertical Archival Timeline Navigator for Desktop */}
      <ProjectRail projects={projectsData} />

      {/* 3. SELECTED WORK: Expansive Exhibition Pieces (Mixed Cinema, 7/5 Asymmetry) */}
      <section
        id="selected-work"
        ref={selectedWorkRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 sm:pt-20 pb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 border-b border-current/10">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ 01 / SELECTED WORK ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              flagship systems<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
            Curated exhibition pieces with live interactive specimens & architectures
          </p>
        </div>

        {/* Selected Projects Exhibition Flow */}
        <div className="space-y-2 sm:space-y-4">
          {selectedProjects.map((project, idx) => {
            const layout = getDynamicLayout(project, idx, selectedProjects.length);
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={idx < 2}
                computedColSpan={layout.colSpanDesktop}
                computedOffset={layout.offsetMargin}
                computedAspectRatio={layout.aspectRatio}
              />
            );
          })}
        </div>
      </section>

      {/* 4. CURRENTLY BUILDING: Studio Pulse & Real Active Focus */}
      <StudioStatusSection />

      {/* 5. PROJECT ARCHIVE: Time-Aware Year-Grouped Architecture */}
      <section
        id="catalogue-archive"
        ref={archiveRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-6 border-b border-current/10">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ 03 / PROJECT ARCHIVE ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              complete index<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
            Chronological repository of software systems, tools, and creative code
          </p>
        </div>

        {/* Filter, Search & Sort Bar */}
        <CatalogueFilters
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalCount={projectsData.length}
          filteredCount={filteredProjects.length}
        />

        {/* Time-Aware Grouped Layout: Years as structural layout elements */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-16 pt-8">
            {groupedByYear.map(({ year, projects }) => (
              <div key={year} className="space-y-6">
                {/* Year Header Marker */}
                <div className="flex items-center gap-4 pt-4 border-b border-current/10">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light opacity-30 select-none">
                    {year}
                  </span>
                  <div className="h-px flex-1 bg-current/10" />
                  <span className="font-mono text-xs opacity-50 uppercase tracking-wider">
                    {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>

                {/* Grid for this year */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 sm:gap-y-16">
                  {projects.map((project, idx) => {
                    const layout = getDynamicLayout(project, idx, projects.length);
                    return (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        priority={false}
                        computedColSpan={layout.colSpanDesktop}
                        computedOffset={layout.offsetMargin}
                        computedAspectRatio={layout.aspectRatio}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-48 h-20 mx-auto opacity-50">
              <WatercolorStain variant="subtle-stain" palette={isDark ? 'grey' : 'cool'} />
            </div>
            <p className="font-serif text-2xl font-light lowercase">
              {t.filters.noProjectsFound}
            </p>
            <p className="text-sm opacity-70 font-sans leading-relaxed font-light">
              {t.filters.noProjectsDesc}
            </p>
            <button
              onClick={() => {
                handleSelectCategory('All');
                handleSearchChange('');
              }}
              className={`mt-4 px-4 py-2 text-xs uppercase tracking-widest font-mono transition-colors cursor-pointer ${
                isDark
                  ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                  : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
              }`}
            >
              {t.filters.resetFilters}
            </button>
          </div>
        )}
      </section>

      {/* 6. TECHNICAL INDEX: Frontend, AI, Web3, Creative Code */}
      <TechnicalIndex />
    </div>
  );
};
