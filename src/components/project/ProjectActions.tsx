import React from 'react';
import { ExternalLink, Github, CheckCircle2, Terminal } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { MagneticLink } from '../MagneticLink';

interface ProjectActionsProps {
  project: Project;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({ project }) => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">09</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">LAUNCH & DEPLOYMENT ACTIONS</span>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            execute specimen<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
            Direct production ingress, source repository inspection & verifiability
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.demo && (
            <MagneticLink strength={4}>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-2 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sm rounded-xs ${
                  isDark
                    ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                    : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                }`}
              >
                <span>launch live deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </MagneticLink>
          )}

          {project.github && (
            <MagneticLink strength={3}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className={`inline-flex items-center gap-2 px-6 py-3.5 border font-mono text-xs uppercase tracking-[0.18em] font-medium transition-colors rounded-xs ${
                  isDark
                    ? 'border-violet-800 hover:border-violet-400 text-violet-200'
                    : 'border-[#171717] hover:bg-[#171717] hover:text-[#FAF9F5] text-[#171717]'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>inspect source code</span>
              </a>
            </MagneticLink>
          )}
        </div>

        {/* Verification & Studio Provenance Badge */}
        <div
          className={`p-6 border rounded-xs font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
            isDark ? 'border-violet-950/60 bg-[#070417]/50' : 'border-[#E2DFD2] bg-[#FAF9F5]/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold text-current">
                AUTHENTIC PRODUCTION SPECIMEN VERIFIED
              </div>
              <div className="opacity-60 text-[11px]">
                Built by Rocky Babcock · Live production environment tested
              </div>
            </div>
          </div>

          <div className="text-[11px] opacity-60 font-mono tracking-wider">
            STATUS: ACTIVE // DEPLOYED
          </div>
        </div>
      </div>
    </section>
  );
};
