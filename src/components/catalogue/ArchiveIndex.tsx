import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { useProjectAtmosphere } from '../../context/ProjectAtmosphereContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';

interface ArchiveIndexProps {
  projects: Project[];
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

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

  const handleRowClick = (slug: string) => {
    setActiveSlug(slug);
    navigate(`/projects/${slug}`);
  };

  return (
    <section
      id="archive-directory"
      className={`relative pt-24 sm:pt-32 pb-28 sm:pb-36 transition-colors duration-500 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Reactive Background Bloom when hovering rows */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[160px] ${
                hoveredProject.slug.includes('svg')
                  ? isDark ? 'bg-sky-700/25' : 'bg-sky-300/35'
                  : hoveredProject.slug.includes('3d')
                  ? isDark ? 'bg-indigo-700/25' : 'bg-indigo-300/35'
                  : isDark ? 'bg-pink-700/20' : 'bg-pink-300/30'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 z-10 space-y-12">
        {/* Header: Title, Search, and Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-current/15">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] opacity-60 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>PROJECT ARCHIVE // INDEX</span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] lowercase">
              complete index
              <span className={isDark ? 'text-violet-400' : 'text-[#7C3AED]'}>.</span>
            </h2>
          </div>

          {/* Search & Category Filter */}
          <div className="space-y-4 w-full lg:max-w-md">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive..."
                className={`w-full pl-10 pr-4 py-2 text-xs font-mono bg-transparent border rounded-xs transition-colors outline-none ${
                  isDark
                    ? 'border-violet-900/50 focus:border-violet-400 placeholder:text-violet-300/30'
                    : 'border-[#D8D4C5] focus:border-neutral-800 placeholder:text-neutral-400'
                }`}
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer uppercase tracking-wider ${
                    selectedCategory === cat
                      ? isDark
                        ? 'bg-violet-600 text-white font-bold'
                        : 'bg-[#171717] text-[#FAF9F5] font-bold'
                      : isDark
                      ? 'bg-current/5 border border-current/10 text-violet-300/70 hover:border-violet-400'
                      : 'bg-black/5 border border-black/10 text-neutral-600 hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================================
            INTERACTIVE LIST (NO CARDS. NO TABLES.)
            Rows reduce opacity when another is hovered. Real image preview appears.
            ===================================================================== */}
        <div
          className="relative divide-y divide-current/10"
          onMouseLeave={() => setHoveredProject(null)}
        >
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center space-y-3 font-mono text-xs opacity-60">
              <p>NO PROJECTS FOUND MATCHING CRITERIA</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="uppercase tracking-wider underline cursor-pointer text-violet-400 font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredProjects.map((p) => {
              const localizedTitle = localizeText(p.title);
              const localizedSummary = localizeText(p.summary);
              const isHovered = hoveredProject?.slug === p.slug;
              const hasActiveHover = hoveredProject !== null;

              return (
                <div
                  key={p.slug}
                  onClick={() => handleRowClick(p.slug)}
                  onMouseEnter={() => setHoveredProject(p)}
                  data-cursor="EXAMINE"
                  className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                    isHovered
                      ? 'opacity-100 pl-3 sm:pl-6'
                      : hasActiveHover
                      ? 'opacity-25 hover:opacity-100'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Left: Number, Category, and Enlarging Monumental Title */}
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3 font-mono text-[11px] opacity-60">
                      <span className="font-semibold text-violet-400">{p.number}</span>
                      <span className="opacity-30">/</span>
                      <span className="uppercase tracking-wider">{p.category}</span>
                      <span className="opacity-30">·</span>
                      <span>{p.year}</span>
                    </div>

                    <div className="overflow-visible">
                      <h3
                        className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase transition-transform duration-300 origin-left ${
                          isHovered ? 'translate-x-2 sm:translate-x-4 scale-[1.02] text-violet-400' : ''
                        }`}
                      >
                        {localizedTitle}
                      </h3>
                    </div>

                    <p className="font-sans text-xs sm:text-sm opacity-70 font-light max-w-xl line-clamp-2 pt-1">
                      {localizedSummary}
                    </p>

                    {/* Tools badges */}
                    <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10px] opacity-60">
                      {p.tools.slice(0, 5).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded-xs bg-current/5 border border-current/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Floating Real Image Preview & Actions */}
                  <div className="flex items-center gap-6 shrink-0">
                    {/* Ethereal Real Media Thumbnail Preview on Hover */}
                    <div
                      className={`w-40 sm:w-56 overflow-hidden rounded-xs transition-all duration-500 shadow-xl ${
                        isHovered
                          ? 'opacity-100 scale-100 translate-y-0'
                          : 'opacity-0 scale-95 translate-y-2 pointer-events-none hidden sm:block'
                      }`}
                    >
                      <ProjectMediaFrame
                        project={p}
                        aspectRatio="aspect-[16/10]"
                        priority={false}
                        showCaption={false}
                      />
                    </div>

                    {/* Actions: Live, Code, and Details Arrow */}
                    <div className="flex items-center gap-4 font-mono text-xs opacity-75">
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          data-cursor="VISIT"
                          className="p-1 hover:text-violet-400 transition-colors"
                          title="Open live demonstration"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          data-cursor="CODE"
                          className="p-1 hover:text-violet-400 transition-colors"
                          title="Inspect GitHub repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      <div className="inline-flex items-center gap-1 text-violet-400 uppercase font-semibold text-[11px] group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
