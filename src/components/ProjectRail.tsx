import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface ProjectRailProps {
  projects: Project[];
}

export const ProjectRail: React.FC<ProjectRailProps> = ({ projects }) => {
  const [activeNumber, setActiveNumber] = useState<string>(projects[0]?.number || '01');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const match = targetId.match(/project-plate-(\d+)/);
          if (match && match[1]) {
            setActiveNumber(match[1]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0.1,
    });

    projects.forEach((p) => {
      const el = document.getElementById(`project-plate-${p.number}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  const scrollToProject = (num: string) => {
    const el = document.getElementById(`project-plate-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextProject = () => {
    const currentIndex = projects.findIndex((p) => p.number === activeNumber);
    const nextIndex = (currentIndex + 1) % projects.length;
    scrollToProject(projects[nextIndex].number);
  };

  if (projects.length === 0) return null;

  const totalCountFormatted = String(projects.length).padStart(2, '0');
  const currentProject = projects.find((p) => p.number === activeNumber) || projects[0];

  return (
    <>
      {/* 1. DESKTOP PERSISTENT EXHIBITION NAVIGATION RAIL */}
      <aside
        aria-label="Exhibition Index"
        onMouseLeave={() => setHoveredProject(null)}
        className="hidden xl:flex fixed right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-35 flex-col items-end gap-2.5 select-none pointer-events-auto"
      >
        {/* Exhibition Header Label */}
        <div
          className={`flex flex-col items-end pb-2 pr-1 border-b transition-colors duration-200 ${
            isDark ? 'border-violet-950/50 text-violet-300' : 'border-[#E2DFD2] text-[#171717]'
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.22em] opacity-50">
            exhibit index
          </span>
          <span className="font-mono text-[12px] font-semibold tracking-wider">
            <span className={isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]'}>{activeNumber}</span>{' '}
            <span className="opacity-40 font-normal">/ {totalCountFormatted}</span>
          </span>
        </div>

        {/* Exhibition Projects List: 01 / project, 02 / project, 03 / project */}
        <nav
          className={`flex flex-col items-start gap-1 p-2 backdrop-blur-md border rounded-xs transition-all duration-300 min-w-[170px] ${
            isDark
              ? 'bg-[#0a0520]/90 border-violet-950/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-[#FAF9F5]/90 border-[#E2DFD2] shadow-[0_4px_20px_rgba(23,23,23,0.04)]'
          }`}
        >
          {projects.map((p) => {
            const isActive = activeNumber === p.number;
            const localizedTitle = localizeText(p.title);

            return (
              <div
                key={p.number}
                className="relative w-full"
                onMouseEnter={() => setHoveredProject(p)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Hover Preview Tooltip Card */}
                {hoveredProject?.number === p.number && (
                  <div
                    className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 w-60 p-2.5 border shadow-xl pointer-events-none z-50 text-left space-y-2 animate-in fade-in zoom-in-95 duration-150 ${
                      isDark
                        ? 'bg-[#0f092e] border-violet-700/50 text-[#F5F3EF]'
                        : 'bg-[#FAF9F5] border-[#171717] text-[#171717]'
                    }`}
                    aria-hidden="true"
                  >
                    <div className="relative w-full h-24 overflow-hidden border border-current/15 bg-current/5">
                      <img
                        src={p.cover}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#8B5CF6] text-[9px] font-mono text-white uppercase tracking-wider">
                        {p.type}
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-[13px] font-medium line-clamp-1 leading-tight text-current">
                        {localizedTitle}
                      </div>
                      <div className="text-[10px] font-mono opacity-65 truncate">
                        {p.slug} · {p.year}
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct 01 / project row button */}
                <button
                  onClick={() => scrollToProject(p.number)}
                  className={`w-full flex items-center justify-between gap-3 px-2 py-1.5 rounded-xs transition-all duration-200 cursor-pointer font-mono text-xs ${
                    isActive
                      ? isDark
                        ? 'bg-violet-950/60 text-[#A78BFA] font-medium'
                        : 'bg-[#ECEADE]/80 text-[#8B5CF6] font-medium'
                      : 'opacity-65 hover:opacity-100 hover:bg-current/5 text-current'
                  }`}
                  title={`${p.number} — ${p.slug}`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-[11px]">{p.number}</span>
                    <span className="opacity-40">/</span>
                    <span className="truncate text-[11px]">{p.slug}</span>
                  </div>

                  {/* Active Indicator Pip */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? isDark
                          ? 'bg-[#A78BFA] scale-125'
                          : 'bg-[#8B5CF6] scale-125'
                        : 'bg-transparent'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* 2. MOBILE COMPACT PROGRESS INDICATOR: e.g. "01 / 03 · svg-downloader" */}
      <div className="xl:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={handleNextProject}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg backdrop-blur-md font-mono text-xs cursor-pointer transition-all duration-300 ${
            isDark
              ? 'bg-[#0a0520]/90 border-violet-800/60 text-violet-200 shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
              : 'bg-[#FAF9F5]/95 border-[#E2DFD2] text-[#171717] shadow-[0_4px_16px_rgba(23,23,23,0.1)]'
          }`}
          aria-label="Current exhibit indicator. Tap to jump to next project."
        >
          <span className="flex items-center gap-1 font-bold">
            <span className={isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]'}>{activeNumber}</span>
            <span className="opacity-40 font-normal">/ {totalCountFormatted}</span>
          </span>
          <span className="opacity-30">|</span>
          <span className="max-w-[100px] truncate text-[11px] opacity-80">
            {currentProject.slug}
          </span>
          <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
        </button>
      </div>
    </>
  );
};
