import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ExternalLink, Github, Sparkles, Box, Terminal, Filter } from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { WatercolorStain } from '../WatercolorStain';
import { TechnicalField } from '../TechnicalGraphics';

interface ArchiveIndexProps {
  projects: Project[];
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<Project>(projects[0]);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
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

      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 z-10 space-y-16">
        {/* Transitional Header Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/15">
          <div className="space-y-2">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] opacity-60">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span>COLLECTION // CHRONOLOGICAL SPECIMENS</span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] lowercase">
              complete archive<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs opacity-65">
            <span>{filteredProjects.length} / {projects.length} SPECIMENS</span>
            <span className="opacity-30">·</span>
            <span>2024—2026 REPO</span>
          </div>
        </div>

        {/* Spatial Art-Directed Layout: Sticky Media Focus Deck + Monumental Interactive Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Persistent Preview Deck & Filters (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            {/* Live Hover Artifact Viewport */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                <span>SPECIMEN FOCUS: #{hoveredProject.number}</span>
                <span className="text-violet-400 font-semibold">{hoveredProject.category}</span>
              </div>

              <div
                className={`relative p-3 rounded-sm overflow-hidden transition-all duration-500 ${
                  isDark
                    ? 'bg-[#08031e]/90 border border-violet-800/40 shadow-[0_25px_60px_-15px_rgba(124,58,237,0.4)]'
                    : 'bg-white/80 border border-[#D8D4C5] shadow-[0_25px_50px_-15px_rgba(30,20,50,0.12)]'
                }`}
              >
                <ProjectMediaFrame
                  project={hoveredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={false}
                  showCaption={false}
                />

                {/* Focus Telemetry Readout */}
                <div className="pt-3 flex items-center justify-between font-mono text-[10px] opacity-75">
                  <span className="truncate max-w-[200px]">{localizeText(hoveredProject.summary)}</span>
                  <Link
                    to={`/projects/${hoveredProject.slug}`}
                    data-cursor="SHOW"
                    className="inline-flex items-center gap-1 text-violet-400 hover:underline uppercase text-[10px] font-semibold"
                  >
                    <span>OPEN SPECIMEN</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="space-y-4 pt-4 border-t border-current/10">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-45" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword, tech, or slug..."
                  className={`w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-transparent border rounded-xs transition-colors outline-none ${
                    isDark
                      ? 'border-violet-900/50 focus:border-violet-400 placeholder:text-violet-300/30'
                      : 'border-[#D8D4C5] focus:border-[#171717] placeholder:text-neutral-400'
                  }`}
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer uppercase tracking-wider text-[10px] ${
                      selectedCategory === cat
                        ? isDark
                          ? 'bg-violet-600 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.6)]'
                          : 'bg-[#171717] text-[#FAF9F5] font-bold'
                        : isDark
                        ? 'bg-violet-950/30 border border-violet-900/40 text-violet-300/70 hover:border-violet-500'
                        : 'bg-black/5 border border-black/10 text-neutral-600 hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Monumental Interactive Specimen Stream (7 Cols) */}
          <div
            className="lg:col-span-7 divide-y divide-current/10"
            onMouseLeave={() => setIsAnyHovered(false)}
          >
            {filteredProjects.length === 0 ? (
              <div className="py-24 text-center space-y-3 font-mono text-sm opacity-60">
                <p>NO SPECIMENS FOUND FOR CURRENT CRITERIA</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs uppercase tracking-wider underline cursor-pointer text-violet-400"
                >
                  RESET FILTER MATRIX
                </button>
              </div>
            ) : (
              filteredProjects.map((p) => {
                const localizedTitle = localizeText(p.title);
                const localizedSummary = localizeText(p.summary);
                const isCurrent = hoveredProject.slug === p.slug;

                return (
                  <div
                    key={p.slug}
                    onMouseEnter={() => {
                      setHoveredProject(p);
                      setIsAnyHovered(true);
                    }}
                    className={`group py-8 sm:py-10 transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'opacity-100 pl-4 sm:pl-6'
                        : isAnyHovered
                        ? 'opacity-35 hover:opacity-100'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-mono text-sm sm:text-base opacity-50 font-light">
                        {p.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 font-semibold">
                        / {p.category}
                      </span>
                      <span className="text-[10px] font-mono opacity-40">· {p.year}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                      <Link
                        to={`/projects/${p.slug}`}
                        data-cursor="SHOW"
                        className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase transition-transform group-hover:translate-x-2 block"
                      >
                        {localizedTitle}
                      </Link>

                      <div className="flex items-center gap-4 font-mono text-xs shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer noopener"
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
                            data-cursor="CODE"
                            className="p-1 hover:text-violet-400 transition-colors"
                            title="Inspect GitHub repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          to={`/projects/${p.slug}`}
                          data-cursor="SHOW"
                          className="inline-flex items-center gap-1 text-violet-400 uppercase font-semibold text-[11px]"
                        >
                          <span>VIEW</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm opacity-70 font-sans font-light mt-2 max-w-2xl line-clamp-2">
                      {localizedSummary}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3 text-[10px] font-mono opacity-55">
                      {p.tools.slice(0, 4).map((tool) => (
                        <span key={tool} className="px-2 py-0.5 rounded-xs bg-current/5 border border-current/10">
                          {tool}
                        </span>
                      ))}
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
