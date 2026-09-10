import React, { useEffect, useState } from 'react';
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

  if (projects.length === 0) return null;

  const totalCountFormatted = String(projects.length).padStart(2, '0');

  return (
    <aside
      aria-label="Project Archive Navigator"
      onMouseLeave={() => setHoveredProject(null)}
      className="hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-35 flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Editorial Progress Indicator: e.g. "02 / 08" */}
      <div
        className={`flex flex-col items-end pb-2 pr-1 border-b transition-colors duration-200 ${
          isDark ? 'border-violet-950/40 text-violet-300' : 'border-[#E2DFD2] text-[#171717]'
        }`}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.24em] opacity-50">
          timeline
        </span>
        <span className="font-mono text-[13px] font-semibold tracking-wider">
          <span className={isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]'}>{activeNumber}</span>{' '}
          <span className="opacity-40 font-normal">/ {totalCountFormatted}</span>
        </span>
      </div>

      {/* Nav List */}
      <nav
        className={`flex flex-col items-end gap-2 p-2.5 backdrop-blur-md border rounded-xs transition-all duration-300 ${
          isDark
            ? 'bg-[#0a0520]/85 border-violet-950/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-[#FAF9F5]/90 border-[#E2DFD2] shadow-[0_4px_20px_rgba(23,23,23,0.04)]'
        }`}
      >
        {projects.map((p) => {
          const isActive = activeNumber === p.number;
          const localizedTitle = localizeText(p.title);

          return (
            <div
              key={p.number}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredProject(p)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Rich Hover Preview Card */}
              {hoveredProject?.number === p.number && (
                <div
                  className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 w-56 p-2.5 border shadow-xl pointer-events-none z-50 text-left space-y-2 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark
                      ? 'bg-[#0f092e] border-violet-700/50 text-[#F5F3EF]'
                      : 'bg-[#FAF9F5] border-[#171717] text-[#171717]'
                  }`}
                  aria-hidden="true"
                >
                  {/* Miniature Preview */}
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

              {/* Number Pill / Indicator */}
              <button
                onClick={() => scrollToProject(p.number)}
                className={`group flex items-center gap-2 px-2 py-0.5 rounded-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'font-bold'
                    : 'opacity-50 hover:opacity-100'
                }`}
                title={`${p.number} — ${localizedTitle}`}
              >
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest hidden group-hover:inline-block max-w-[85px] truncate transition-colors ${
                    isDark ? 'text-violet-300' : 'text-[#67645C]'
                  }`}
                >
                  {p.slug}
                </span>

                <span
                  className={`font-mono text-[12px] transition-transform duration-200 ${
                    isActive
                      ? isDark
                        ? 'text-[#A78BFA] scale-110 font-bold'
                        : 'text-[#8B5CF6] scale-110 font-bold'
                      : 'text-current'
                  }`}
                >
                  {p.number}
                </span>

                {/* Minimal line indicator */}
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'w-4 bg-[#A78BFA]'
                        : 'w-4 bg-[#8B5CF6]'
                      : 'w-1.5 bg-current/25 group-hover:bg-current/60'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
