import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ArrowUpRight, ExternalLink, Github, Filter, Layers, Database } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project, ProjectCategory, SortOption, EntryType } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const ArchivePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  usePageMeta({
    title: 'Archive Directory — Rocky Babcock',
    description: 'Complete digital archive and inventory of verified software artifacts, 3D scenes, and AI tools.',
  });

  const entryTypes = ['ALL', 'FEATURED', 'PROJECT', 'LAB', 'ARCHIVE'];
  const categories: ProjectCategory[] = ['All', 'Tools', '3D', 'AI'];

  const filteredProjects = useMemo(() => {
    let result = [...projectsData];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedType !== 'ALL') {
      if (selectedType === 'FEATURED') {
        result = result.filter((p) => p.featured);
      } else if (selectedType === 'LAB') {
        result = result.filter((p) => p.status === 'Building' || p.status === 'Prototype');
      } else if (selectedType === 'ARCHIVE') {
        result = result.filter((p) => p.status === 'Archived');
      } else {
        result = result.filter((p) => p.status === 'Live');
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const title = localizeText(p.title).toLowerCase();
        const summary = localizeText(p.summary).toLowerCase();
        const tools = p.tools.join(' ').toLowerCase();
        const cat = p.category.toLowerCase();
        return title.includes(q) || summary.includes(q) || tools.includes(q) || cat.includes(q);
      });
    }

    if (sortBy === 'Newest') {
      result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    return result;
  }, [selectedCategory, selectedType, searchQuery, sortBy, localizeText]);

  return (
    <div
      className={`min-h-screen pb-24 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Top Breadcrumb Navigation */}
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 border-b transition-colors ${
          isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/60'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-mono transition-colors ${
              isDark ? 'text-violet-300 hover:text-white' : 'text-[#67645C] hover:text-[#171717]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>back to selected work</span>
          </Link>

          <span className="font-mono text-xs opacity-50 uppercase tracking-widest">
            complete archive // 2024—2026
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 sm:pt-16 space-y-12">
        {/* Archive Title & Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-current/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#8B5CF6] tracking-widest uppercase">
              <Database className="w-4 h-4" />
              <span>[ ROCKY BABCOCK DIGITAL ARCHIVE ]</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase">
              inventory & catalogue<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h1>
          </div>

          <div className="font-mono text-xs opacity-70 space-y-1 md:text-right">
            <div>TOTAL ARTIFACTS: <span className="font-semibold text-current">{projectsData.length} SPECIMENS</span></div>
            <div>RANGE: 2024 — 2026 // ALL SYSTEMS VERIFIED</div>
          </div>
        </div>

        {/* Filter Controls Strip */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="opacity-50 uppercase tracking-widest mr-1 text-[11px]">DISCIPLINE:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xs transition-all uppercase tracking-wider cursor-pointer ${
                    selectedCategory === cat
                      ? isDark
                        ? 'bg-violet-600 text-white font-medium'
                        : 'bg-[#171717] text-white font-medium'
                      : 'border border-current/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Type Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="opacity-50 uppercase tracking-widest mr-1 text-[11px]">TYPE:</span>
              {entryTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-xs transition-all uppercase tracking-wider cursor-pointer text-[11px] ${
                    selectedType === type
                      ? isDark
                        ? 'bg-violet-900/60 text-violet-200 border border-violet-700'
                        : 'bg-[#ECEADE] text-[#171717] border border-[#171717]'
                      : 'border border-current/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-current/10">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive catalogue by title, tool, or protocol..."
                className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-transparent border border-current/20 rounded-xs outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="opacity-50 uppercase">SORT:</span>
              {(['Featured', 'Newest', 'Oldest'] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`cursor-pointer transition-colors ${
                    sortBy === option ? 'text-[#8B5CF6] font-semibold underline' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Specimen Table */}
        <div className="border-t border-current/10 divide-y divide-current/10">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center font-mono text-sm opacity-50 space-y-2">
              <p>No specimens found matching the active query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('ALL');
                  setSearchQuery('');
                }}
                className="text-xs uppercase underline text-[#8B5CF6]"
              >
                Reset archive filters
              </button>
            </div>
          ) : (
            filteredProjects.map((p) => {
              const title = localizeText(p.title);
              const summary = localizeText(p.summary);

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
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span className="text-[11px] lowercase">{p.status}</span>
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="md:col-span-5 space-y-1">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="font-serif text-xl sm:text-2xl font-light lowercase group-hover:italic transition-all duration-200 block text-current"
                    >
                      {title}
                    </Link>
                    <p className="text-xs opacity-70 font-sans line-clamp-1 font-light">
                      {summary}
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
                        aria-label={`Launch ${title}`}
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
                        aria-label={`GitHub repo for ${title}`}
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
      </div>
    </div>
  );
};
