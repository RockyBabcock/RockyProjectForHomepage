import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { MagneticLink } from '../MagneticLink';

interface ProjectNextProps {
  nextProject: Project | null;
}

export const ProjectNext: React.FC<ProjectNextProps> = ({ nextProject }) => {
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  if (!nextProject) return null;

  const nextTitle = localizeText(nextProject.title);
  const nextSummary = localizeText(nextProject.summary);

  return (
    <nav
      aria-label="Next Exhibit Transition"
      className={`pt-16 sm:pt-20 border-t transition-colors ${
        isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Back to archive link */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors group ${
            isDark ? 'text-violet-300 hover:text-white' : 'text-[#67645C] hover:text-[#171717]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>return to complete archive</span>
        </Link>

        {/* Next Project Plate */}
        <div className="sm:text-right space-y-2">
          <div className="text-xs font-mono uppercase tracking-[0.2em] opacity-50">
            next exhibition plate // {nextProject.number}
          </div>

          <Link to={`/projects/${nextProject.slug}`} className="group block space-y-1">
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase group-hover:italic transition-all duration-300 flex items-center sm:justify-end gap-3 text-current">
              <span>{nextTitle}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#8B5CF6]" />
            </div>
            <p className="text-xs sm:text-sm font-sans opacity-70 max-w-md sm:ml-auto line-clamp-1 font-light">
              {nextSummary}
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
