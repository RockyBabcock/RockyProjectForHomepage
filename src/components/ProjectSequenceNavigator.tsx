import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, Grid, Sun, Moon, Compass } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface ProjectSequenceNavigatorProps {
  onToggleGrid?: () => void;
  onOpenCommand?: () => void;
}

export const ProjectSequenceNavigator: React.FC<ProjectSequenceNavigatorProps> = ({
  onToggleGrid,
  onOpenCommand,
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { localizeText } = useLanguage();
  const { mode, toggleMode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  // Track active project based on URL or scroll position on homepage
  useEffect(() => {
    if (location.pathname.startsWith('/projects/')) {
      const slug = location.pathname.replace('/projects/', '');
      const idx = projectsData.findIndex((p) => p.slug === slug);
      if (idx !== -1) setActiveProjectIndex(idx);
    } else {
      // Observe sections on main catalogue
      const handleScroll = () => {
        const p1 = document.getElementById('project-plate-01');
        const p2 = document.getElementById('project-plate-02');
        const p3 = document.getElementById('project-plate-03');

        const scrollY = window.scrollY + window.innerHeight * 0.45;

        if (p3 && scrollY >= p3.offsetTop) {
          setActiveProjectIndex(2);
        } else if (p2 && scrollY >= p2.offsetTop) {
          setActiveProjectIndex(1);
        } else if (p1 && scrollY >= p1.offsetTop) {
          setActiveProjectIndex(0);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  const currentProject = projectsData[activeProjectIndex] || projectsData[0];
  const prevProject = projectsData[(activeProjectIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(activeProjectIndex + 1) % projectsData.length];

  const handleJump = (index: number) => {
    setActiveProjectIndex(index);
    const target = projectsData[index];
    if (location.pathname.startsWith('/projects/')) {
      navigate(`/projects/${target.slug}`);
    } else {
      const el = document.getElementById(`project-plate-${target.number}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/projects/${target.slug}`);
      }
    }
  };

  return (
    <aside
      aria-label="Project Sequence Navigator"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[94vw] transition-all duration-300 pointer-events-auto"
    >
      <div
        className={`px-4 sm:px-6 py-2.5 rounded-full border backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(124,58,237,0.3)] flex items-center gap-3 sm:gap-6 font-mono text-xs transition-colors ${
          isDark
            ? 'bg-[#08031e]/90 border-violet-600/40 text-[#F5F3EF]'
            : 'bg-[#FAF9F5]/90 border-[#D8D4C5] text-[#171717]'
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={() => handleJump((activeProjectIndex - 1 + projectsData.length) % projectsData.length)}
          className="p-1 opacity-60 hover:opacity-100 hover:text-violet-400 transition-all cursor-pointer"
          title={`Previous Specimen: ${localizeText(prevProject.title)}`}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Specimen Index Indicators (01, 02, 03) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {projectsData.map((p, idx) => {
            const isActive = idx === activeProjectIndex;
            return (
              <button
                key={p.slug}
                onClick={() => handleJump(idx)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all cursor-pointer text-[10px] tracking-wider ${
                  isActive
                    ? isDark
                      ? 'bg-violet-600 text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.8)]'
                      : 'bg-[#171717] text-white font-bold'
                    : 'opacity-45 hover:opacity-100'
                }`}
                title={localizeText(p.title)}
              >
                <span>{p.number}</span>
                <span className="hidden md:inline max-w-[80px] truncate text-[9px] font-sans font-normal opacity-90">
                  {localizeText(p.title)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleJump((activeProjectIndex + 1) % projectsData.length)}
          className="p-1 opacity-60 hover:opacity-100 hover:text-violet-400 transition-all cursor-pointer"
          title={`Next Specimen: ${localizeText(nextProject.title)}`}
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Shortcut Badges */}
        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-current/15 text-[10px] opacity-65">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="flex items-center gap-1 hover:opacity-100 hover:text-violet-400 cursor-pointer"
              title="Open Command Palette (⌘K)"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>
          )}

          {onToggleGrid && (
            <button
              onClick={onToggleGrid}
              className="flex items-center gap-1 hover:opacity-100 hover:text-violet-400 cursor-pointer"
              title="Toggle Architect Grid (G)"
            >
              <Grid className="w-3 h-3" />
              <span>G</span>
            </button>
          )}

          <button
            onClick={toggleMode}
            className="flex items-center gap-1 hover:opacity-100 hover:text-violet-400 cursor-pointer"
            title="Toggle Theme (T)"
          >
            {isDark ? <Moon className="w-3 h-3 text-violet-400" /> : <Sun className="w-3 h-3 text-[#8B5CF6]" />}
            <span>T</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
