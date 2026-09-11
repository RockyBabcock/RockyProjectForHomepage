import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectTechnicalProps {
  project: Project;
}

export const ProjectTechnical: React.FC<ProjectTechnicalProps> = ({ project }) => {
  const { localizeArray } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const technicalPoints = project.detailedContent.technicalApproach
    ? localizeArray(project.detailedContent.technicalApproach)
    : [];

  if (technicalPoints.length === 0) return null;

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">05</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">ENGINEERING & SPECIFICATIONS</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            technical execution & performance<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
            Validation pipelines, memory footprint, runtime boundaries & algorithmic rigor
          </p>
        </div>

        <div className="space-y-4">
          {technicalPoints.map((point, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className={`p-5 sm:p-6 border rounded-xs transition-colors duration-200 flex flex-col sm:flex-row sm:items-start gap-4 ${
                  isDark
                    ? 'border-violet-950/60 bg-[#070417]/50'
                    : 'border-[#E2DFD2] bg-[#FAF9F5]/70'
                }`}
              >
                <span className="font-mono text-xs font-bold text-[#8B5CF6] shrink-0 pt-0.5">
                  SPEC_{formattedIndex}
                </span>
                <p className="text-sm sm:text-base font-mono leading-relaxed font-light opacity-90">
                  {point}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
