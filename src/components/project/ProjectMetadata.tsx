import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectMetadataProps {
  project: Project;
}

export const ProjectMetadata: React.FC<ProjectMetadataProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const role = localizeText(project.role);
  const release = project.detailedContent.colophon?.release || 'v1.0.0-verified';
  const typography = project.detailedContent.colophon?.typography || 'Cormorant Garamond / JetBrains Mono';

  return (
    <div
      className={`py-6 sm:py-8 border-y font-mono text-xs transition-colors duration-300 ${
        isDark ? 'border-violet-950/40 bg-[#070417]/50' : 'border-[#E2DFD2] bg-[#FAF9F5]/60'
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1">role & execution</span>
          <span className="font-medium opacity-90 block">{role}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1">specimen classification</span>
          <span className="font-medium opacity-90 block">{project.category} · {project.type}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1">production release</span>
          <span className="font-medium opacity-90 block">{release} ({project.year})</span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider opacity-50 block mb-1">typographic identity</span>
          <span className="font-medium opacity-90 block truncate">{typography}</span>
        </div>
      </div>
    </div>
  );
};
