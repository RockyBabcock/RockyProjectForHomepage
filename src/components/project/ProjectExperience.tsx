import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectExperienceProps {
  project: Project;
}

export const ProjectExperience: React.FC<ProjectExperienceProps> = ({ project }) => {
  const { localizeArray } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const interactionPoints = project.detailedContent.interactionExperience
    ? localizeArray(project.detailedContent.interactionExperience)
    : project.detailedContent.designApproach
    ? localizeArray(project.detailedContent.designApproach).slice(0, 3)
    : [];

  if (interactionPoints.length === 0) return null;

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">02</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">THE EXPERIENCE</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            spatial & interaction mechanics<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
            Tactile touchpoints, sensory dynamics & user journey choreography
          </p>
        </div>

        {/* Numbered Interaction Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {interactionPoints.map((point, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className={`p-6 border rounded-xs transition-colors duration-300 space-y-3 ${
                  isDark
                    ? 'border-violet-950/60 bg-[#070417]/60 hover:border-violet-700/60'
                    : 'border-[#E2DFD2] bg-[#FAF9F5]/70 hover:border-[#8B5CF6]/50'
                }`}
              >
                <div className="flex items-baseline justify-between font-mono text-xs opacity-60 pb-2 border-b border-current/10">
                  <span className="font-serif text-2xl font-light opacity-80 text-[#8B5CF6]">
                    {formattedIndex}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider">MECHANIC</span>
                </div>
                <p className="text-sm sm:text-base font-sans leading-relaxed font-light opacity-85">
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
