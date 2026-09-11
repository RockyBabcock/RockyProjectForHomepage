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
      className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Index Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-current/10">
        <div className="space-y-1">
          <span
            className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
              isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
            }`}
          >
            [ COMPLETE DIRECTORY · 2024—2026 ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            exhibition catalogue<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
        </div>
        <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
          Indexed inventory of verified software artifacts, 3D scenes & AI tools
        </p>
      </div>

      {/* Interactive Filter Strip */}
      <div className="pt-6 pb-8">
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

      {/* Directory Table / Specimen Cards */}
      <div className="border-t border-current/10 divide-y divide-current/10">
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono text-sm opacity-60">
            <p>No specimens found matching current filter query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-wider underline cursor-pointer text-[#8B5CF6]"
            >
              Reset filter criteria
            </button>
          </div>
        ) : (
          filteredProjects.map((p) => {
            const localizedTitle = localizeText(p.title);
            const localizedSummary = localizeText(p.summary);

            return (
              <div
                key={p.slug}
                className={`group py-6 transition-colors duration-200 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center ${
                  isDark ? 'hover:bg-[#0c0628]/40' : 'hover:bg-[#ECEADE]/40'
                }`}
              >
                {/* Plate Number & Status */}
                <div className="md:col-span-2 flex items-baseline gap-3 font-mono text-xs">
                  <span className="font-serif text-2xl opacity-40 font-light">
                    {p.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 opacity-80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] lowercase">{p.status}</span>
                  </span>
                </div>

                {/* Title & One-line Summary */}
                <div className="md:col-span-5 space-y-1">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="font-serif text-xl sm:text-2xl font-light lowercase group-hover:italic transition-all duration-200 block text-current"
                  >
                    {localizedTitle}
                  </Link>
                  <p className="text-xs opacity-70 font-sans line-clamp-1 font-light">
                    {localizedSummary}
                  </p>
                </div>

                {/* Category & Tools */}
                <div className="md:col-span-3 font-mono text-xs opacity-75">
                  <div className="text-[11px] uppercase tracking-wider text-[#8B5CF6] font-semibold mb-0.5">
                    {p.category} · {p.type}
                  </div>
                  <div className="text-[11px] opacity-65 truncate">
                    {p.tools.slice(0, 3).join(' · ')}
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 font-mono text-xs">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-1.5 hover:text-[#8B5CF6] transition-colors"
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
                      className="p-1.5 hover:text-[#8B5CF6] transition-colors"
                      title="View GitHub repository"
                      aria-label={`GitHub repo for ${localizedTitle}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.slug}`}
                    className={`inline-flex items-center gap-1 px-3 py-1 text-[11px] uppercase tracking-wider font-medium border rounded-xs transition-colors ${
                      isDark
                        ? 'border-violet-800 hover:bg-violet-600 hover:text-[#030014] text-violet-300'
                        : 'border-[#171717] hover:bg-[#171717] hover:text-[#FAF9F5] text-[#171717]'
                    }`}
                  >
                    <span>view</span>
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
