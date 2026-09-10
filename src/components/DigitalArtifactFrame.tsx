import React, { useState } from 'react';
import {
  Lock,
  ArrowUpRight,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  Maximize2,
  Image as ImageIcon,
  CheckCircle2,
  Compass,
  FileCode,
  Radio,
} from 'lucide-react';
import { Project, VisualArtifactMode } from '../types';
import { WatercolorStain } from './WatercolorStain';
import { ProjectInterfaceSpecimen } from './ProjectInterfaceSpecimen';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export interface DigitalArtifactFrameProps {
  project: Project;
  aspectRatio?: string;
  isHovered?: boolean;
  priority?: boolean;
  showOverlayAction?: boolean;
  className?: string;
  defaultMode?: 'interface' | 'screenshot';
}

export const DigitalArtifactFrame: React.FC<DigitalArtifactFrameProps> = ({
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

  // Visual Artifact mode configured per project (defaults according to project slug/type)
  const artifactMode: VisualArtifactMode =
    project.visualMode ||
    (project.slug === 'synapse-agent'
      ? 'agent-graph'
      : project.slug === 'solis-protocol'
      ? 'interface'
      : project.slug === 'mnemosyne-reader'
      ? 'workflow'
      : project.slug === 'alchemist-foundry'
      ? 'typographic'
      : project.slug === 'hyperion-dex'
      ? 'dashboard'
      : project.slug === 'botanica-shader'
      ? 'mixed'
      : project.slug === 'kinship-archive'
      ? 'image'
      : 'browser');

  const watercolorVariant = project.watercolorVariant || project.pigmentAccent || 'cool';
  const watercolorIntensity = project.watercolorIntensity || 'medium';
  const projectSeed = parseInt(project.number, 10) || 0;
  const { mode: surfaceMode } = useSurfaceMode();
  const isDark = surfaceMode === 'dark';

  return (
    <div className={`relative group/artifact select-none ${className}`}>
      {/* 1. LAYER: Computational Watercolor Bleed behind artifact frame */}
      <div
        className={`absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-52 sm:w-72 h-44 sm:h-56 pointer-events-none transition-all duration-700 ease-out z-0 ${
          isHovered
            ? 'opacity-95 translate-x-2 -translate-y-1 scale-105'
            : 'opacity-75 translate-x-0 translate-y-0 scale-100'
        }`}
        aria-hidden="true"
      >
        <WatercolorStain
          variant="specimen-underlay"
          palette={watercolorVariant}
          intensity={watercolorIntensity}
          seed={projectSeed}
          opacity={isDark ? 0.45 : 0.85}
        />
      </div>

      {/* 2. LAYER: Digital Artifact Surface with tailored chrome */}
      <div
        className={`relative z-10 border rounded-xs overflow-hidden transition-all duration-500 ease-out ${
          isDark
            ? isHovered
              ? 'bg-[#0f0a2e] border-violet-500/50 shadow-[0_12px_40px_rgba(139,92,246,0.18)]'
              : 'bg-[#0a0620] border-violet-950/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : isHovered
              ? 'bg-[#FAF9F5] border-[#B8B2A2] shadow-[0_12px_40px_rgba(23,23,23,0.08)]'
              : 'bg-[#FAF9F5] border-[#E2DFD2] shadow-[0_4px_24px_rgba(23,23,23,0.03)]'
        }`}
      >
        {/* Render Tailored Artifact Chrome based on authentic technical medium */}
        {renderArtifactHeader({
          mode: artifactMode,
          project,
          viewMode,
          setViewMode,
        })}

        {/* Artifact Screen / Interactive Canvas Viewport */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#ECEADE]`}>
          {viewMode === 'interface' ? (
            /* Authentic Live Interactive Digital Specimen */
            <div className="w-full h-full">
              <ProjectInterfaceSpecimen project={project} interactive={true} />
            </div>
          ) : (
            /* Photographic Archival Capture Fallback */
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#ECEADE] animate-pulse" />
              )}
              <img
                src={project.cover}
                alt={`${project.number} — ${project.previewUrl} interface capture`}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                  isHovered ? 'scale-[1.025] filter-none' : 'scale-100 contrast-[1.02]'
                } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-[#F5F4ED]/6 mix-blend-multiply pointer-events-none" />
            </>
          )}

          {/* Archival Registration Crosshairs at Bottom Corners */}
          <div className="absolute bottom-2 left-2.5 pointer-events-none z-20 font-mono text-[9px] text-[#8C887B]/70 tracking-wider hidden sm:block">
            + REF_{project.number} // {artifactMode.toUpperCase()}
          </div>
          <div className="absolute bottom-2 right-2.5 pointer-events-none z-20 font-mono text-[9px] text-[#8C887B]/70 tracking-wider hidden sm:block">
            SPEC_{project.year} // 1:1
          </div>
        </div>

        {/* Optional Overlay Action Button on Hover */}
        {showOverlayAction && (
          <div className="absolute top-2 right-2 z-30 opacity-0 group-hover/artifact:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#171717]/90 text-[#F5F4ED] text-[10px] uppercase font-mono tracking-widest rounded-xs shadow-md backdrop-blur-xs">
              <span>View Specimen</span>
              <ArrowUpRight className="w-3 h-3 text-[#BC9A64]" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   Artifact Header Renderers — Tailored for authentic technical mediums
   ========================================================================= */

interface HeaderProps {
  mode: VisualArtifactMode;
  project: Project;
  viewMode: 'interface' | 'screenshot';
  setViewMode: (m: 'interface' | 'screenshot') => void;
}

function renderArtifactHeader({ mode, project, viewMode, setViewMode }: HeaderProps) {
  // Shared Mode Switcher Component (SPECIMEN vs ARCHIVE)
  const renderModeSwitcher = () => (
    <div className="flex items-center bg-[#DFDCCE] p-0.5 rounded-xs text-[9px] font-mono">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setViewMode('interface');
        }}
        className={`px-1.5 py-0.5 rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
          viewMode === 'interface'
            ? 'bg-[#171717] text-[#FAF9F5]'
            : 'text-[#67645C] hover:text-[#171717]'
        }`}
        title="View live interactive specimen"
      >
        <Activity className="w-2.5 h-2.5" />
        <span className="tracking-tight">SPECIMEN</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setViewMode('screenshot');
        }}
        className={`px-1.5 py-0.5 rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
          viewMode === 'screenshot'
            ? 'bg-[#171717] text-[#FAF9F5]'
            : 'text-[#67645C] hover:text-[#171717]'
        }`}
        title="View photographic capture"
      >
        <ImageIcon className="w-2.5 h-2.5" />
        <span className="tracking-tight">ARCHIVE</span>
      </button>
    </div>
  );

  switch (mode) {
    /* -----------------------------------------------------------------------
       01: AGENT-GRAPH — Autonomous DAG reasoning topology chrome
       ----------------------------------------------------------------------- */
    case 'agent-graph':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1F2530] text-[#FAF9F5] border-b border-[#2D3B4E] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-[#E5EBF5]">
              DAG_ORCHESTRATOR
            </span>
            <span className="text-[#8899AC] hidden md:inline text-[10px]">
              [ intent → dag → tool_dispatch → eval ]
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[#8FA5C4] text-[10px] hidden sm:inline px-1.5 py-0.5 bg-[#171C24] rounded-xs border border-[#2D3B4E]">
              LATENCY: 32ms
            </span>
            {renderModeSwitcher()}
            <span className="text-[#8FA5C4] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       01: INTERFACE — Verified Multi-Source Brand & Technology SVG Asset Registry
       ----------------------------------------------------------------------- */
    case 'interface':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#171717] text-[#FAF9F5] border-b border-[#2E2D29] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-3 h-3 text-[#8B5CF6]" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-[#FAF9F5]">
              SVG_REGISTRY // VERIFIED MULTI-SOURCE
            </span>
            <span className="text-[#8C887B] hidden sm:inline text-[10px]">
              [ Simple Icons · Devicon · Iconify ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-xs border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SHA-256 VERIFIED
            </span>
            {renderModeSwitcher()}
            <span className="text-[#8B5CF6] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       02: 3D-SPATIAL — Spatial Web Portfolio & Interactive Three.js Scene
       ----------------------------------------------------------------------- */
    case '3d-spatial':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#0d0722] text-[#FAF9F5] border-b border-violet-950/80 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-violet-100">
              SPATIAL_3D // SCENE GRAPH
            </span>
            <span className="text-violet-400/60 hidden md:inline text-[10px]">
              [ 3D Orbit Camera · Perspective Projection · Vector Engine ]
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-violet-300 text-[10px] hidden sm:inline px-1.5 py-0.5 bg-violet-950/60 rounded-xs border border-violet-800/60">
              FPS: 60.0
            </span>
            {renderModeSwitcher()}
            <span className="text-violet-400 font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       03: AI-CAROUSEL — Generative AI Product Canvas & Cylindrical Model Explorer
       ----------------------------------------------------------------------- */
    case 'ai-carousel':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#120e0a] text-[#FAF9F5] border-b border-amber-950/70 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight text-amber-100">
              AI_CANVAS // CYLINDRICAL CAROUSEL
            </span>
            <span className="text-amber-300/60 hidden sm:inline text-[10px]">
              [ Video · Image · Audio · Motion ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-amber-300 px-1.5 py-0.5 bg-amber-950/60 rounded-xs border border-amber-800/60">
              3D PERSPECTIVE
            </span>
            {renderModeSwitcher()}
            <span className="text-amber-400 font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       03: WORKFLOW — 3-Spine Scholarly Reader Folio
       ----------------------------------------------------------------------- */
    case 'workflow':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#F0EFE8] border-b border-[#E2DFD2] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#637A95]" />
            <span className="text-[10px] sm:text-[11px] tracking-wider text-[#171717]">
              MNEMOSYNE // FOLIO 24
            </span>
            <span className="text-[#8C887B] hidden sm:inline text-[10px]">
              MEASURE: 46rem · 3-SPINE CANVAS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-[#637A95] px-1.5 py-0.5 bg-[#E2E6EC] rounded-xs border border-[#CBD3DE]">
              ANNOTATIONS: 12
            </span>
            {renderModeSwitcher()}
            <span className="text-[#637A95] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       04: TYPOGRAPHIC — Letterform Specimen Sheet & Wasm Rulers
       ----------------------------------------------------------------------- */
    case 'typographic':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#F4F3ED] border-b border-[#E2DFD2] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#6F87AA] font-bold text-xs">¶</span>
            <span className="text-[10px] sm:text-[11px] tracking-tight text-[#171717] font-medium">
              ALCHEMIST VARIABLE OTF
            </span>
            <span className="text-[#8C887B] hidden sm:inline text-[10px]">
              WGHT: 100..900 · OPSZ: 8..72pt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-[#6F87AA] px-1.5 py-0.5 bg-[#E8EEF5] rounded-xs border border-[#CCD8E5]">
              GLYPHS: 842
            </span>
            {renderModeSwitcher()}
            <span className="text-[#6F87AA] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       05: DASHBOARD — Institutional Financial Terminal Bar
       ----------------------------------------------------------------------- */
    case 'dashboard':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1C1B18] text-[#FAF9F5] border-b border-[#35332C] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-100">
              HYPERION // CLOB
            </span>
            <span className="text-[#9E9A90] hidden sm:inline text-[10px]">
              WS: 0.8ms · SOL/USDC $184.20 (+4.8%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-amber-400 px-1.5 py-0.5 bg-[#2B2922] rounded-xs border border-[#484436]">
              ORDERBOOK: LIVE
            </span>
            {renderModeSwitcher()}
            <span className="text-[#BC9A64] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       06: MIXED — Shader Workbench & Fluid Solver Canvas
       ----------------------------------------------------------------------- */
    case 'mixed':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#20251E] text-[#FAF9F5] border-b border-[#323D2E] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#E2EBE0]">
              BOTANICA_GLSL
            </span>
            <span className="text-[#8A9C83] hidden sm:inline text-[10px]">
              SOLVER: 60.0 FPS · DIFFUSION: 0.84
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-[#A6BA9E] px-1.5 py-0.5 bg-[#2A3327] rounded-xs border border-[#3C4A37]">
              WEBGL2
            </span>
            {renderModeSwitcher()}
            <span className="text-[#758269] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       07: IMAGE — Archival Folio & Cryptographic Audio Plate
       ----------------------------------------------------------------------- */
    case 'image':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#EDEAE2] border-b border-[#DDD8CD] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-[#637A95]" />
            <span className="text-[10px] sm:text-[11px] tracking-wider text-[#171717]">
              KINSHIP_PERMAWEB
            </span>
            <span className="text-[#8C887B] hidden sm:inline text-[10px]">
              ARWEAVE: ar://7x9K...mQ · 48kHz
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[9px] text-[#637A95] px-1.5 py-0.5 bg-[#DFE5EC] rounded-xs border border-[#C6D0DD]">
              PRESERVED
            </span>
            {renderModeSwitcher()}
            <span className="text-[#637A95] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       08: TERMINAL — CLI Compiler & Wasm Execution Shell
       ----------------------------------------------------------------------- */
    case 'terminal':
      return (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#171717] text-[#FAF9F5] border-b border-[#2C2B27] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-[#6F87AA]" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#FAF9F5]">
              sh // cargo build --release
            </span>
            <span className="text-[#8C887B] hidden sm:inline text-[10px]">
              target: wasm32-unknown-unknown
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-[10px] hidden sm:inline">exit: 0</span>
            {renderModeSwitcher()}
            <span className="text-[#6F87AA] font-semibold text-[10px]">#{project.number}</span>
          </div>
        </div>
      );

    /* -----------------------------------------------------------------------
       09: BROWSER (DEFAULT) — Editorial Browser Frame with URL & Window Dots
       ----------------------------------------------------------------------- */
    default:
      return (
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[#ECEADE]/90 border-b border-[#E2DFD2] text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171717]/15" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 max-w-[240px] sm:max-w-xs truncate bg-[#F5F4ED] border border-[#E2DFD2]/90 rounded-xs text-[10px] sm:text-[11px] text-[#67645C] shadow-2xs">
            <Lock className="w-2.5 h-2.5 text-[#9E9A90] shrink-0" />
            <span className="truncate tracking-tight font-mono">{project.previewUrl}</span>
          </div>

          <div className="flex items-center gap-2">
            {renderModeSwitcher()}
            <span className="font-mono text-[10px] text-[#6F87AA] font-semibold">
              #{project.number}
            </span>
          </div>
        </div>
      );
  }
}
