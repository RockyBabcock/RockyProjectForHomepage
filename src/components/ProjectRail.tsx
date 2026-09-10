import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectRailProps {
  projects: Project[];
}

export const ProjectRail: React.FC<ProjectRailProps> = ({ projects }) => {
  const [activeNumber, setActiveNumber] = useState<string>(projects[0]?.number || '01');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isRailHovered, setIsRailHovered] = useState(false);
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
      onMouseEnter={() => setIsRailHovered(true)}
      onMouseLeave={() => {
        setIsRailHovered(false);
        setHoveredProject(null);
      }}
      className="hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-35 flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Editorial Progress Indicator: e.g. "02 / 08" */}
      <div className="flex flex-col items-end pb-2 pr-1 border-b border-[#E2DFD2] transition-colors duration-200">
        <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#9E9A90]">
          navigator
        </span>
        <span className="font-mono text-[12px] font-medium text-[#171717]">
          {activeNumber} <span className="text-[#9E9A90] font-normal">/ {totalCountFormatted}</span>
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col items-end gap-1.5 p-2 bg-[#F5F4ED]/80 backdrop-blur-xs border border-[#E2DFD2]/60 rounded-xs transition-all duration-300">
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
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-52 p-2.5 bg-[#FAF9F5] border border-[#171717] shadow-[0_8px_24px_rgba(23,23,23,0.12)] pointer-events-none z-50 text-left space-y-2 animate-in fade-in zoom-in-95 duration-150"
                  aria-hidden="true"
                >
                  {/* Miniature Browser Preview */}
                  <div className="relative w-full h-24 overflow-hidden border border-[#E2DFD2] bg-[#ECEADE]">
                    <img
                      src={p.cover}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#171717] text-[9px] font-mono text-[#F5F4ED] uppercase tracking-wider">
                      {p.type}
                    </div>
                  </div>

                  <div>
                    <div className="font-serif text-[13px] font-medium text-[#171717] line-clamp-1 leading-tight">
                      {localizedTitle}
                    </div>
                    <div className="text-[10px] font-mono text-[#6F87AA] truncate">
                      {p.slug} · {p.year}
                    </div>
                  </div>
                </div>
              )}

              {/* Number Trigger Button with Expandable Details */}
              <button
                onClick={() => scrollToProject(p.number)}
                className={`group flex items-center gap-2.5 py-1 px-1.5 rounded-xs transition-all duration-200 cursor-pointer text-right focus:outline-none ${
                  isActive ? 'bg-[#ECEADE]' : 'hover:bg-[#ECEADE]/60'
                }`}
                aria-label={`Jump to project ${p.number}: ${localizedTitle}`}
              >
                {/* Expanded text when rail is hovered */}
                {isRailHovered && (
                  <div className="flex items-center gap-2 pr-1 font-mono text-[11px] animate-in fade-in slide-in-from-right-2 duration-150">
                    <span className="text-[#171717] font-medium max-w-[110px] truncate">
                      {p.slug}
                    </span>
                    <span className="text-[9px] px-1 py-0.2 bg-[#171717]/10 text-[#67645C] uppercase">
                      {p.type}
                    </span>
                  </div>
                )}

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
                      ? 'w-4 bg-[#6F87AA]'
                      : 'w-2 bg-[#E2DFD2] group-hover:w-3 group-hover:bg-[#9E9A90]'
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
