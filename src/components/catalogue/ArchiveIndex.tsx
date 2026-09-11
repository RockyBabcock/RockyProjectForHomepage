import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ExternalLink, Github, Filter, Sparkles } from 'lucide-react';
import { Project, ProjectCategory, SortOption } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { CatalogueFilters } from './CatalogueFilters';

interface ArchiveIndexProps {
  projects: Project[];
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const title = localizeText(p.title).toLowerCase();
        const summary = localizeText(p.summary).toLowerCase();
        const tools = p.tools.join(' ').toLowerCase();
        const category = p.category.toLowerCase();
        return title.includes(q) || summary.includes(q) || tools.includes(q) || category.includes(q);
      });
    }

    if (sortBy === 'Newest') {
      result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    return result;
  }, [projects, selectedCategory, searchQuery, sortBy, localizeText]);

  return (
    <section
      id="archive-directory"
      className={`max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Index Header */}
      <div className="flex items-baseline justify-between pb-8 border-b border-current/10">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[-0.03em] lowercase">
            archive index<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
        </div>
        <span className="text-xs font-mono opacity-50 uppercase tracking-[0.2em]">
          All Works ({filteredProjects.length})
        </span>
      </div>

      {/* Interactive Filter Strip */}
      <div className="pt-8 pb-8">
        <CatalogueFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={projects.length}
          filteredCount={filteredProjects.length}
        />
      </div>

      {/* Directory Table / Rows */}
      <div className="border-t border-current/10 divide-y divide-current/10">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3 font-mono text-sm opacity-60">
            <p>No projects found matching current filter query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-wider underline cursor-pointer text-[#8B5CF6]"
            >
              Reset filter
            </button>
          </div>
        ) : (
          filteredProjects.map((p) => {
            const localizedTitle = localizeText(p.title);
            const localizedSummary = localizeText(p.summary);

            return (
              <div
                key={p.slug}
                className="group py-6 sm:py-7 transition-colors duration-200 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center hover:opacity-90"
              >
                {/* Plate Number & Year */}
                <div className="md:col-span-2 flex items-baseline gap-3 font-mono text-xs opacity-50">
                  <span className="text-sm font-normal">
                    {p.number}
                  </span>
                  <span>/</span>
                  <span>{p.year}</span>
                </div>

                {/* Title & One-line Summary */}
                <div className="md:col-span-5 space-y-1">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="font-serif text-xl sm:text-2xl lg:text-[26px] font-light lowercase transition-opacity block text-current group-hover:opacity-75"
                  >
                    {localizedTitle}
                  </Link>
                  <p className="text-xs sm:text-sm opacity-65 font-sans line-clamp-1 font-light">
                    {localizedSummary}
                  </p>
                </div>

                {/* Category & Tools */}
                <div className="md:col-span-3 font-mono text-xs opacity-60">
                  <div className="uppercase tracking-wider text-[11px] mb-0.5">
                    {p.category} · {p.type}
                  </div>
                  <div className="text-[11px] opacity-60 truncate">
                    {p.tools.slice(0, 3).join(' · ')}
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-4 font-mono text-xs">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="opacity-50 hover:opacity-100 transition-opacity"
                      title="Launch live deployment"
                      aria-label={`Launch ${localizedTitle}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="opacity-50 hover:opacity-100 transition-opacity"
                      title="View GitHub repository"
                      aria-label={`GitHub repo for ${localizedTitle}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity uppercase tracking-wider text-[11px] font-mono font-medium"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
