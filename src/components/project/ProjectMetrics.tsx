import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectMetricsProps {
  project: Project;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const metrics = project.metrics;
  const outcomeText = project.detailedContent.outcome ? localizeText(project.detailedContent.outcome) : null;
  const reflectionText = project.detailedContent.reflection ? localizeText(project.detailedContent.reflection) : null;

  if ((!metrics || metrics.length === 0) && !outcomeText && !reflectionText) {
    return null;
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">08</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">OUTCOME & VERIFIED BENCHMARKS</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
          engineering realities<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
        </h2>
        <p className="text-sm sm:text-base opacity-75 font-sans font-light max-w-2xl">
          Empirical constraints, verified runtime parameters, and architecture validation metrics.
        </p>
      </div>

      {/* Metrics Row */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-6 border rounded-xs transition-all duration-200 space-y-2 ${
                isDark
                  ? 'bg-[#08041c]/60 border-violet-950/60'
                  : 'bg-[#FAF9F5] border-[#E2DFD2]'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs opacity-50">
                <span className="uppercase tracking-widest text-[10px]">metric {String(idx + 1).padStart(2, '0')}</span>
                <Activity className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#8B5CF6]">
                {m.value}
              </div>
              <div className="font-sans text-xs sm:text-sm opacity-80 font-medium">
                {m.label}
              </div>
              {m.detail && (
                <div className="text-[11px] font-mono opacity-60 pt-1 border-t border-current/10">
                  {m.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Narrative Reflections if present */}
      {(outcomeText || reflectionText) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm sm:text-base opacity-85 font-sans leading-relaxed font-light">
          {outcomeText && (
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] block">
                [ PRODUCTION OUTCOME ]
              </span>
              <p>{outcomeText}</p>
            </div>
          )}
          {reflectionText && (
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest opacity-60 block">
                [ CRITICAL REFLECTION ]
              </span>
              <p>{reflectionText}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
