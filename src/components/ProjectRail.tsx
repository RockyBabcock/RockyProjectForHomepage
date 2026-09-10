import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectRailProps {
  projects: Project[];
}

export const ProjectRail: React.FC<ProjectRailProps> = ({ projects }) => {
  const [activeNumber, setActiveNumber] = useState<string>(projects[0]?.number || '01');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { localizeText } = useLanguage();

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
      className="hidden xl:flex fixed right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-35 flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Editorial Progress Indicator: e.g. "02 / 08" */}
      <div className="flex flex-col items-end pb-2 pr-1 border-b border-[#E2DFD2]">
        <span className="text-[9px] uppercase font-mono tracking-[0.24em] text-[#9E9A90]">
          navigator
        </span>
        <span className="font-mono text-[12px] font-medium text-[#171717]">
          {activeNumber} <span className="text-[#9E9A90] font-normal">/ {totalCountFormatted}</span>
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col items-end gap-2">
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
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-48 p-2.5 bg-[#F5F4ED] border border-[#C4BFB0] shadow-[0_8px_24px_rgba(23,23,23,0.08)] pointer-events-none z-50 text-left space-y-1.5 animate-in fade-in zoom-in-95 duration-150"
                  aria-hidden="true"
                >
                  {/* Miniature Browser Preview */}
                  <div className="relative w-full h-24 overflow-hidden border border-[#E2DFD2] bg-[#ECEADE]">
                    <img
                      src={p.cover}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#171717]/85 text-[9px] font-mono text-[#F5F4ED] uppercase">
                      {p.type}
                    </div>
                  </div>

                  <div>
                    <div className="font-serif text-[13px] font-medium text-[#171717] line-clamp-1 leading-tight">
                      {localizedTitle}
                    </div>
                    <div className="text-[10px] font-mono text-[#67645C] truncate">
                      {p.previewUrl}
                    </div>
                  </div>
                </div>
              )}

              {/* Number Trigger Button */}
              <button
                onClick={() => scrollToProject(p.number)}
                className="group flex items-center gap-2 py-0.5 cursor-pointer text-right focus:outline-none"
                aria-label={`Jump to project ${p.number}: ${localizedTitle}`}
              >
                {/* Number indicator */}
                <span
                  className={`font-mono text-[11px] transition-colors duration-200 ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#9E9A90] group-hover:text-[#171717]'
                  }`}
                >
                  {p.number}
                </span>

                {/* Minimal tick indicator */}
                <span
                  className={`h-[1.5px] transition-all duration-300 ${
                    isActive
                      ? 'w-5 bg-[#6F87AA]'
                      : 'w-2 bg-[#E2DFD2] group-hover:w-3.5 group-hover:bg-[#9E9A90]'
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
