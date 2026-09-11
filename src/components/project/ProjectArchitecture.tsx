import React from 'react';
import { Project } from '../../types';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectArchitectureDiagram } from '../ProjectArchitectureDiagram';

interface ProjectArchitectureProps {
  project: Project;
}

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({ project }) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">04</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">SYSTEM ARCHITECTURE</span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
            data flow & runtime topology<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h2>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
            Ingress resolution, processing pipeline & verified output protocols
          </p>
        </div>

        {/* Real Architectural Diagram Specimen */}
        <div className="pt-2">
          <ProjectArchitectureDiagram project={project} />
        </div>
      </div>
    </section>
  );
};
