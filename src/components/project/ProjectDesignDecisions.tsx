import React from 'react';
import { Lightbulb, Compass, ShieldCheck } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectDesignDecisionsProps {
  project: Project;
}

export const ProjectDesignDecisions: React.FC<ProjectDesignDecisionsProps> = ({ project }) => {
  const { localizeText, localizeArray } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const decisions = project.detailedContent.designDecisions;
  const approachItems = project.detailedContent.designApproach
    ? localizeArray(project.detailedContent.designApproach)
    : [];

  if ((!decisions || decisions.length === 0) && approachItems.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">03</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">DESIGN DECISIONS & RATIONALE</span>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
          intentional choices<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
        </h2>
        <p className="text-sm sm:text-base opacity-75 font-sans font-light max-w-2xl">
          Architectural and aesthetic principles chosen to eliminate unnecessary cognitive overhead, ensure cryptographic fidelity, and preserve focus on the artifact.
        </p>
      </div>

      {/* Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {decisions && decisions.length > 0
          ? decisions.map((item, idx) => {
              const num = item.number || String(idx + 1).padStart(2, '0');
              const title = localizeText(item.title);
              const rationale = localizeText(item.rationale);
              const impact = item.impact ? localizeText(item.impact) : null;

              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 border rounded-xs transition-all duration-200 space-y-3 ${
                    isDark
                      ? 'bg-[#08041c]/60 border-violet-950/60 hover:border-violet-800'
                      : 'bg-[#FAF9F5] border-[#E2DFD2] hover:border-[#171717]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#8B5CF6] font-semibold">{num}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      principle
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light lowercase text-current">
                    {title}
                  </h3>

                  <p className="text-sm font-sans opacity-80 leading-relaxed font-light">
                    {rationale}
                  </p>

                  {impact && (
                    <div className="pt-2 border-t border-current/10 flex items-start gap-2 text-xs font-mono opacity-70">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{impact}</span>
                    </div>
                  )}
                </div>
              );
            })
          : approachItems.map((approach, idx) => {
              const [heading, ...rest] = approach.split(':');
              return (
                <div
                  key={idx}
                  className={`p-6 border rounded-xs space-y-2.5 ${
                    isDark
                      ? 'bg-[#08041c]/60 border-violet-950/60'
                      : 'bg-[#FAF9F5] border-[#E2DFD2]'
                  }`}
                >
                  <div className="font-mono text-xs text-[#8B5CF6]">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-light lowercase">
                    {heading}
                  </h3>
                  {rest.length > 0 && (
                    <p className="text-sm font-sans opacity-80 leading-relaxed font-light">
                      {rest.join(':').trim()}
                    </p>
                  )}
                </div>
              );
            })}
      </div>
    </section>
  );
};
