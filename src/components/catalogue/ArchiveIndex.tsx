import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { Project, ProjectCategory, SortOption } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { WatercolorStain } from '../WatercolorStain';

interface ArchiveIndexProps {
  projects: Project[];
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<Project>(projects[0]);
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const categories: ProjectCategory[] = ['All', 'Tools', '3D', 'AI', 'Web3'];

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

    return result;
  }, [projects, selectedCategory, searchQuery, localizeText]);

  return (
    <section
      id="archive-directory"
      className={`relative pt-24 sm:pt-36 pb-28 sm:pb-36 transition-colors duration-500 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Structural Watercolor Wash across transition */}
      <div className="absolute top-0 left-[-10%] w-[700px] h-[500px] pointer-events-none opacity-30 z-0">
        <WatercolorStain
          variant="corner-pool"
          palette={isDark ? 'violet' : 'cool'}
          intensity="medium"
          seed={4}
          opacity={isDark ? 0.25 : 0.4}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 z-10">
        {/* Transitional Header Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-current/10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-40 block mb-2">
              Chronological & Functional Index
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-[-0.04em] lowercase">
              complete archive<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs opacity-50">
            <span>{filteredProjects.length} / {projects.length} Works</span>
            <span className="opacity-30">|</span>
            <span>2024—2026 Production</span>
          </div>
        </div>

        {/* Spatial 2-Column Art-Directed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 pt-12 sm:pt-16 items-start">
          {/* Left Column: Persistent Preview Deck & Controls (4 Cols) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            {/* Live Hover Artifact Viewport */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 block">
                Specimen Focus: #{hoveredProject.number}
              </span>

              <div
                className={`relative p-2 rounded-sm overflow-hidden transition-all duration-500 ${
                  isDark
                    ? 'bg-violet-950/25 border border-violet-800/25 shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
                    : 'bg-white/60 border border-[#E2DFD2] shadow-[0_20px_35px_rgba(30,20,50,0.08)]'
                }`}
              >
                <ProjectMediaFrame
                  project={hoveredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={false}
                  showCaption={false}
                />
              </div>

              <div className="flex items-baseline justify-between font-mono text-[11px] opacity-70 pt-1">
                <span className="font-serif text-base lowercase font-normal">
                  {localizeText(hoveredProject.title)}
                </span>
                <Link
                  to={`/projects/${hoveredProject.slug}`}
                  className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity uppercase text-[10px] tracking-wider"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="space-y-4 pt-4 border-t border-current/10">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword, tech, or slug..."
                  className={`w-full pl-9 pr-4 py-2.5 text-xs font-mono bg-transparent border rounded-none transition-colors outline-none ${
                    isDark
                      ? 'border-violet-950/50 focus:border-violet-500/80 placeholder:text-violet-300/30'
                      : 'border-[#E2DFD2] focus:border-[#171717] placeholder:text-neutral-400'
                  }`}
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 transition-all cursor-pointer uppercase tracking-wider ${
                      selectedCategory === cat
                        ? isDark
                          ? 'bg-violet-600 text-[#030014] font-semibold'
                          : 'bg-[#171717] text-[#F5F4ED]'
                        : isDark
                        ? 'bg-violet-950/20 text-violet-300/60 hover:text-white'
                        : 'bg-black/5 text-[#171717]/60 hover:text-[#171717]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Stacked Project List (8 Cols) */}
          <div className="lg:col-span-8 divide-y divide-current/10">
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center space-y-3 font-mono text-sm opacity-60">
                <p>No specimens match the active query.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs uppercase tracking-wider underline cursor-pointer text-[#8B5CF6]"
                >
                  Reset Query
                </button>
              </div>
            ) : (
              filteredProjects.map((p) => {
                const localizedTitle = localizeText(p.title);
                const localizedSummary = localizeText(p.summary);
                const isCurrentHover = hoveredProject.slug === p.slug;

                return (
                  <div
                    key={p.slug}
                    onMouseEnter={() => setHoveredProject(p)}
                    className={`group py-7 sm:py-8 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline cursor-pointer ${
                      isCurrentHover ? 'opacity-100 pl-2 sm:pl-3' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Numeral + Year */}
                    <div className="md:col-span-2 flex items-baseline gap-3 font-mono text-xs opacity-50">
                      <span className="font-serif text-xl sm:text-2xl font-light opacity-80">{p.number}</span>
                      <span className="opacity-30">/</span>
                      <span>{p.year}</span>
                    </div>

                    {/* Title & Description */}
                    <div className="md:col-span-6 space-y-1.5">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light lowercase transition-opacity block text-current group-hover:opacity-75"
                      >
                        {localizedTitle}
                      </Link>
                      <p className="text-xs sm:text-[13px] opacity-65 font-sans line-clamp-1 font-light">
                        {localizedSummary}
                      </p>
                    </div>

                    {/* Metadata: Category & Stack */}
                    <div className="md:col-span-2 font-mono text-xs opacity-60">
                      <span className="block uppercase tracking-wider text-[11px] font-medium">
                        {p.category}
                      </span>
                      <span className="block text-[10px] opacity-50 truncate mt-0.5">
                        {p.tools.slice(0, 2).join(' · ')}
                      </span>
                    </div>

                    {/* Action Arrow */}
                    <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 font-mono text-xs">
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="opacity-50 hover:opacity-100 transition-opacity"
                          title="Open Live Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link
                        to={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-medium opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

