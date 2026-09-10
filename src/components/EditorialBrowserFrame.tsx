import React, { useState } from 'react';
import { Lock, ArrowUpRight, Monitor, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';
import { WatercolorStain } from './WatercolorStain';
import { ProjectInterfaceSpecimen } from './ProjectInterfaceSpecimen';

interface EditorialBrowserFrameProps {
  project: Project;
  aspectRatio?: string;
  isHovered?: boolean;
  priority?: boolean;
  showOverlayAction?: boolean;
  className?: string;
  defaultMode?: 'interface' | 'screenshot';
}

export const EditorialBrowserFrame: React.FC<EditorialBrowserFrameProps> = ({
  project,
  aspectRatio = 'aspect-[16/10]',
  isHovered = false,
  priority = false,
  showOverlayAction = true,
  className = '',
  defaultMode = 'interface',
}) => {
  const [viewMode, setViewMode] = useState<'interface' | 'screenshot'>(defaultMode);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative group/browser select-none ${className}`}>
      {/* 1. LAYER 2 — PHYSICAL: Computational Watercolor Bleed behind browser frame */}
      <div
        className={`absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-48 sm:w-64 h-40 sm:h-52 pointer-events-none transition-all duration-700 ease-out z-0 ${
          isHovered
            ? 'opacity-90 translate-x-1.5 -translate-y-1 scale-105'
            : 'opacity-70 translate-x-0 translate-y-0 scale-100'
        }`}
        aria-hidden="true"
      >
        <WatercolorStain
          variant="accent-wash"
          palette={project.pigmentAccent}
          opacity={0.8}
        />
      </div>

      {/* 2. LAYER 3 — DIGITAL: Art-directed Minimal Editorial Browser Chrome */}
      <div
        className={`relative z-10 bg-[#FAF9F5] border border-[#E2DFD2] rounded-xs overflow-hidden transition-all duration-500 ease-out shadow-[0_4px_24px_rgba(23,23,23,0.03)] ${
          isHovered
            ? 'border-[#B8B2A2] shadow-[0_12px_36px_rgba(23,23,23,0.08)]'
            : 'border-[#E2DFD2]'
        }`}
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[#ECEADE]/90 border-b border-[#E2DFD2] text-[11px] font-mono">
          {/* Subtle Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/15" />
          </div>

          {/* Minimal Editorial Address Bar */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 max-w-[240px] sm:max-w-xs truncate bg-[#F5F4ED] border border-[#E2DFD2]/90 rounded-xs text-[10px] sm:text-[11px] text-[#67645C] shadow-2xs">
            <Lock className="w-2.5 h-2.5 text-[#9E9A90] shrink-0" />
            <span className="truncate tracking-tight font-mono">{project.previewUrl}</span>
          </div>

          {/* Project Type Badge & View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-[#DFDCCE] p-0.5 rounded-xs text-[9px]">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('interface');
                }}
                className={`px-1.5 py-0.5 rounded-xs transition-colors flex items-center gap-1 ${
                  viewMode === 'interface'
                    ? 'bg-[#171717] text-[#FAF9F5]'
                    : 'text-[#67645C] hover:text-[#171717]'
                }`}
                title="View live UI specimen"
              >
                <Monitor className="w-2.5 h-2.5" />
                <span>UI</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('screenshot');
                }}
                className={`px-1.5 py-0.5 rounded-xs transition-colors flex items-center gap-1 ${
                  viewMode === 'screenshot'
                    ? 'bg-[#171717] text-[#FAF9F5]'
                    : 'text-[#67645C] hover:text-[#171717]'
                }`}
                title="View high-res capture"
              >
                <ImageIcon className="w-2.5 h-2.5" />
                <span>IMG</span>
              </button>
            </div>

            <span className="font-mono text-[10px] text-[#6F87AA] font-semibold">
              #{project.number}
            </span>
          </div>
        </div>

        {/* Browser Screen / Canvas Container */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#ECEADE]`}>
          {viewMode === 'interface' ? (
            /* Authentic Live Digital Product Interface */
            <div className="w-full h-full">
              <ProjectInterfaceSpecimen project={project} interactive={true} />
            </div>
          ) : (
            /* Photographic Capture Fallback */
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#ECEADE] animate-pulse" />
              )}
              <img
                src={project.cover}
                alt={`${project.number} — ${project.previewUrl} interface preview`}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                  isHovered ? 'scale-[1.025] filter-none' : 'scale-100 contrast-[1.02]'
                } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-[#F5F4ED]/6 mix-blend-multiply pointer-events-none" />
            </>
          )}

          {/* Tactile Paper Grain Overlay */}
          <div className="absolute inset-0 bg-[#F5F4ED]/4 mix-blend-multiply pointer-events-none" />

          {/* Live Status Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-[#F5F4ED]/92 backdrop-blur-xs border border-[#E2DFD2] text-[10px] font-mono uppercase tracking-wider text-[#171717] pointer-events-none z-20">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'Live'
                  ? 'bg-emerald-600 animate-pulse'
                  : project.status === 'Beta'
                  ? 'bg-amber-600'
                  : 'bg-[#6F87AA]'
              }`}
            />
            <span>{project.status}</span>
          </div>

          {/* Floating Subtle "View Project" prompt on hover */}
          {showOverlayAction && (
            <div
              className={`absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-[#171717] text-[#F5F4ED] text-[11px] uppercase tracking-[0.14em] font-sans border border-[#171717] transition-all duration-300 pointer-events-none z-20 ${
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              }`}
            >
              <span>explore project</span>
              <ArrowUpRight className="w-3 h-3 text-[#6F87AA]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
