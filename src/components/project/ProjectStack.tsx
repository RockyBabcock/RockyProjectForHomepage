import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectStackProps {
  project: Project;
}

export const ProjectStack: React.FC<ProjectStackProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const colophon = project.detailedContent.colophon;
  const materials = colophon?.materials ? localizeText(colophon.materials) : '';

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">07</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">INSTRUMENTS & TECHNOLOGIES</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            technical stack & colophon<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
            Libraries, runtime protocols, typography specifications & archival materials
          </p>
        </div>

        {/* Stack Badges Grid */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {project.tools.map((tool) => (
            <div
              key={tool}
              className={`px-3.5 py-1.5 border font-mono text-xs rounded-xs transition-colors ${
                isDark
                  ? 'border-violet-950/60 bg-[#070417] text-violet-300 hover:border-violet-600'
                  : 'border-[#E2DFD2] bg-[#FAF9F5] text-[#171717] hover:border-[#8B5CF6]'
              }`}
            >
              <span className="opacity-40 mr-1.5 font-sans">#</span>
              <span>{tool}</span>
            </div>
          ))}
        </div>

        {/* Colophon Card */}
        {colophon && (
          <div
            className={`mt-8 p-6 border rounded-xs font-mono text-xs space-y-4 transition-colors ${
              isDark ? 'border-violet-950/60 bg-[#070417]/50' : 'border-[#E2DFD2] bg-[#FAF9F5]/70'
            }`}
          >
            <div className="uppercase tracking-widest text-[11px] font-semibold text-[#8B5CF6] pb-2 border-b border-current/10">
              SPECIMEN COLOPHON
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] uppercase opacity-50 block mb-1">Typography</span>
                <span className="opacity-90">{colophon.typography}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase opacity-50 block mb-1">Release Version</span>
                <span className="opacity-90">{colophon.release}</span>
              </div>
              {materials && (
                <div>
                  <span className="text-[10px] uppercase opacity-50 block mb-1">Digital Material</span>
                  <span className="opacity-90">{materials}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
