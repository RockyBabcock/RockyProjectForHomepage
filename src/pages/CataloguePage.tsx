import React, { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { EditorialHero } from '../components/EditorialHero';
import { CatalogueFilters } from '../components/CatalogueFilters';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectRail } from '../components/ProjectRail';
import { projectsData, getDynamicLayout } from '../data/projects';
import { ProjectCategory, SortOption } from '../types';
import { WatercolorStain } from '../components/WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';

interface CataloguePageProps {
  onOpenStatement: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onOpenStatement }) => {
  const { t, localizeText } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  usePageMeta({
    title: `${t.hero.name} — ${t.hero.eyebrow}`,
    description: t.hero.statement,
  });

  const archiveRef = useRef<HTMLDivElement>(null);

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
    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter & Sort logic supporting multilingual fields and scalable array lengths
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

  return (
    <div className="w-full relative">
      {/* 1. Asymmetric Editorial Hero with Physical Specimen Artifact */}
      <EditorialHero
        onScrollToArchive={scrollToArchive}
        onOpenStatement={onOpenStatement}
      />

      {/* Vertical Archival Progress Rail for Desktop */}
      <ProjectRail projects={filteredProjects} />

      {/* 2. Main Project Archive — Content Driven & Fully Scalable */}
      <main
        id="catalogue-archive"
        ref={archiveRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Quiet Filter, Search & Sort Bar */}
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

        {/* 3. Scalable Asymmetric Editorial Grid (supports 3, 6, 8, 12, 24+ projects dynamically) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 sm:gap-y-16 pt-6 pb-20">
            {filteredProjects.map((project, idx) => {
              const layout = getDynamicLayout(project, idx, filteredProjects.length);
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
        ) : (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-48 h-20 mx-auto opacity-50">
              <WatercolorStain variant="subtle-stain" palette="cool" />
            </div>
            <p className="font-serif text-2xl font-light text-[#171717] lowercase">
              {t.filters.noProjectsFound}
            </p>
            <p className="text-sm text-[#67645C] font-sans leading-relaxed">
              {t.filters.noProjectsDesc}
            </p>
            <button
              onClick={() => {
                handleSelectCategory('All');
                handleSearchChange('');
              }}
              className="mt-4 px-4 py-2 text-xs uppercase tracking-widest bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] transition-colors cursor-pointer"
            >
              {t.filters.resetFilters}
            </button>
          </div>
        )}

        {/* Quiet mid-section watercolor divider */}
        <div className="py-8 flex justify-center">
          <WatercolorStain
            variant="divider-flow"
            palette="cool"
            className="w-full max-w-xl"
            opacity={0.4}
          />
        </div>
      </main>
    </div>
  );
};
