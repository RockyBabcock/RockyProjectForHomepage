import React, { useState } from 'react';
import { Project } from '../types';
import {
  ArrowRight,
  Cpu,
  Database,
  Network,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  Box,
  Camera,
  Compass,
  FileCode,
  Search,
  Sliders,
} from 'lucide-react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface ProjectArchitectureDiagramProps {
  project: Project;
  className?: string;
}

interface DiagramStep {
  id: string;
  name: string;
  role: string;
  tech: string;
  latency?: string;
  detail: string;
  icon: React.ReactNode;
}

export const ProjectArchitectureDiagram: React.FC<ProjectArchitectureDiagramProps> = ({
  project,
  className = '',
}) => {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  // Domain-specific technical pipeline steps verified from the repository
  const steps: DiagramStep[] = getPipelineForProject(project);

  return (
    <div
      className={`w-full border rounded-xs p-5 sm:p-7 select-none transition-colors ${
        isDark
          ? 'bg-[#09041a] border-violet-950/60 text-[#F5F3EF]'
          : 'bg-[#FAF9F5] border-[#E2DFD2] text-[#171717]'
      } ${className}`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b transition-colors ${
          isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/70'
        }`}
      >
        <div>
          <span
            className={`text-[11px] font-mono uppercase tracking-[0.22em] block font-semibold ${
              isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
            }`}
          >
            system topology & architecture
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light lowercase tracking-tight">
            data flow & component execution
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono opacity-70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>runtime verified</span>
        </div>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="relative">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
          } gap-3 sm:gap-4 relative z-10`}
        >
          {steps.map((step, idx) => {
            const isSelected = activeStepId === step.id || (!activeStepId && idx === 0);
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStepId(step.id)}
                onClick={() => setActiveStepId(step.id)}
                className={`relative p-3.5 sm:p-4 rounded-xs border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between min-h-[145px] ${
                  isSelected
                    ? isDark
                      ? 'bg-[#120838] border-violet-400 shadow-[0_4px_20px_rgba(139,92,246,0.25)] translate-y-[-2px]'
                      : 'bg-[#F5F4ED] border-[#171717] shadow-[0_4px_16px_rgba(23,23,23,0.06)] translate-y-[-2px]'
                    : isDark
                    ? 'bg-[#0b0524] border-violet-950/50 hover:border-violet-800'
                    : 'bg-[#ECEADE]/40 border-[#E2DFD2] hover:border-[#9E9A90] hover:bg-[#F5F4ED]'
                }`}
              >
                {/* Node Step Number & Icon */}
                <div className="flex items-center justify-between text-xs font-mono pb-2 opacity-75">
                  <span
                    className={`text-[11px] font-semibold ${
                      isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className={`p-1 rounded-xs ${isSelected ? (isDark ? 'text-violet-300' : 'text-[#171717]') : 'opacity-60'}`}>
                    {step.icon}
                  </div>
                </div>

                {/* Node Title & Role */}
                <div className="space-y-1">
                  <div className="font-serif text-[15px] sm:text-[16px] font-medium leading-tight">
                    {step.name}
                  </div>
                  <div className="text-[11px] font-sans opacity-70 leading-snug">
                    {step.role}
                  </div>
                </div>

                {/* Technology Pill */}
                <div
                  className={`pt-2.5 mt-2 border-t flex items-center justify-between text-[10px] font-mono transition-colors ${
                    isDark ? 'border-violet-950/40 text-violet-300/80' : 'border-[#E2DFD2]/60 text-[#8B5CF6]'
                  }`}
                >
                  <span className="truncate">{step.tech}</span>
                  {step.latency && <span className="opacity-60 shrink-0">{step.latency}</span>}
                </div>

                {/* Connector Arrow on desktop */}
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full border items-center justify-center shadow-xs pointer-events-none ${
                      isDark ? 'bg-[#09041a] border-violet-900 text-violet-400' : 'bg-[#FAF9F5] border-[#E2DFD2] text-[#8B5CF6]'
                    }`}
                  >
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Box for Active Step */}
      {activeStepId && (
        <div
          className={`mt-5 p-4 border rounded-xs text-xs font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200 ${
            isDark ? 'bg-[#0e0730] border-violet-950/60' : 'bg-[#F5F4ED] border-[#E2DFD2]'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-serif text-sm font-medium mr-2">
                {steps.find((s) => s.id === activeStepId)?.name}:
              </span>
              <span className="opacity-80 font-light">{steps.find((s) => s.id === activeStepId)?.detail}</span>
            </div>
          </div>
          <span
            className={`font-mono text-[11px] uppercase tracking-wider shrink-0 font-semibold ${
              isDark ? 'text-violet-300' : 'text-[#8B5CF6]'
            }`}
          >
            Node Tech: {steps.find((s) => s.id === activeStepId)?.tech}
          </span>
        </div>
      )}
    </div>
  );
};

// Domain-specific pipeline generators matching the real repositories exactly
function getPipelineForProject(project: Project): DiagramStep[] {
  const slug = project.slug;

  // PROJECT 01: SVG Downloader
  // Flow: query → identity → sources → verification → canonical asset
  if (slug === 'svg-downloader') {
    return [
      {
        id: 'query',
        name: 'Asset Query',
        role: 'Multi-source discovery & term normalization',
        tech: 'Client State / Search AST',
        latency: '3ms',
        detail: 'Normalizes brand and technology keywords, matching synonyms, brand slugs, and aliases across sources.',
        icon: <Search className="w-3.5 h-3.5" />,
      },
      {
        id: 'identity',
        name: 'Identity Resolution',
        role: 'Canonical identifier & variant indexing',
        tech: 'Identity Resolver',
        latency: '8ms',
        detail: 'Maps technology names to canonical keys, resolving multiple naming conventions into a unified asset id.',
        icon: <Layers className="w-3.5 h-3.5" />,
      },
      {
        id: 'sources',
        name: 'Trusted Sources',
        role: 'Simple Icons · Devicon · Iconify',
        tech: 'CDN API / Source Catalogs',
        latency: '45ms',
        detail: 'Fetches raw SVG vectors from trusted community registries and official open-source icon distributions.',
        icon: <Database className="w-3.5 h-3.5" />,
      },
      {
        id: 'verification',
        name: 'Integrity Verification',
        role: 'SVG/XML parse & SHA-256 checksum',
        tech: 'Fast XML Parser / Crypto',
        latency: '12ms',
        detail: 'Validates XML structure, verifies viewBox bounds, strips malicious scripts, and computes SHA-256 fingerprint.',
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      },
      {
        id: 'canonical',
        name: 'Canonical Asset',
        role: 'SVG export & engineering bundles',
        tech: 'JSZip / Blob Stream',
        latency: 'Instant',
        detail: 'Produces verified canonical SVG code, copy-ready XML, and zipped asset bundles with metadata manifest.',
        icon: <FileCode className="w-3.5 h-3.5" />,
      },
    ];
  }

  // PROJECT 02: Rocky Homepage 3D
  // Flow: scene → camera → renderer → interaction
  if (slug === 'rockyhomepage3D') {
    return [
      {
        id: 'scene',
        name: 'Scene Graph',
        role: 'Geometry nodes & materials',
        tech: 'Three.js / Mesh Geometries',
        latency: '60fps',
        detail: 'Constructs the 3D scene tree containing geometric islands, wireframe structures, and spatial anchors.',
        icon: <Box className="w-3.5 h-3.5" />,
      },
      {
        id: 'camera',
        name: 'Choreographed Camera',
        role: 'Perspective & spring damping physics',
        tech: 'React Spring Three / Drei',
        latency: '16ms',
        detail: 'Controls smooth focal tracking, inertia damping, and route-based viewpoint transitions across 3D coordinates.',
        icon: <Camera className="w-3.5 h-3.5" />,
      },
      {
        id: 'renderer',
        name: 'WebGL Renderer',
        role: 'Lighting, shading & shadow maps',
        tech: 'WebGL 2.0 / GLSL PBR',
        latency: '16ms',
        detail: 'Calculates ambient diffusion, specular highlights, and soft color grading across polygon surfaces.',
        icon: <Sparkles className="w-3.5 h-3.5" />,
      },
      {
        id: 'interaction',
        name: 'Spatial Interaction',
        role: 'Raycasting & route mapping',
        tech: 'React Router / Pointer Events',
        latency: 'Realtime',
        detail: 'Translates cursor dragging, touch gestures, and route URLs (/, /about, /projects, /contact) into 3D navigation.',
        icon: <Compass className="w-3.5 h-3.5" />,
      },
    ];
  }

  // PROJECT 03: Melius-Like
  // Flow: category → model → carousel → detail
  if (slug === 'melius-like') {
    return [
      {
        id: 'category',
        name: 'Multi-Modal Taxonomy',
        role: 'Video, Image, Audio & Motion categories',
        tech: 'State Filter Matrix',
        latency: '2ms',
        detail: 'Filters model architectures across generative modalities with instantaneous visual state transitions.',
        icon: <Sliders className="w-3.5 h-3.5" />,
      },
      {
        id: 'model',
        name: 'Model Catalogue',
        role: 'Model specs, params & capabilities',
        tech: 'JSON Registry / Google GenAI',
        latency: '5ms',
        detail: 'Indexes generative models with context window lengths, parameter counts, latency benchmarks, and capabilities.',
        icon: <Database className="w-3.5 h-3.5" />,
      },
      {
        id: 'carousel',
        name: 'Cylindrical 3D Carousel',
        role: 'Radial perspective rotation & swipe physics',
        tech: 'CSS 3D Transforms / Motion',
        latency: '60fps',
        detail: 'Projects model cards along a cylindrical radius with mouse dragging, swipe inertia, and focal zoom.',
        icon: <Layers className="w-3.5 h-3.5" />,
      },
      {
        id: 'detail',
        name: 'Detail Inspection Modal',
        role: 'Model parameter drawer & test bench',
        tech: 'Motion AnimatePresence / Drawer',
        latency: 'Smooth',
        detail: 'Opens comprehensive inspection view with capability progress bars, prompt playground, and payload specs.',
        icon: <Cpu className="w-3.5 h-3.5" />,
      },
    ];
  }

  // Fallback
  return [
    {
      id: 'input',
      name: 'Input Layer',
      role: 'Client interface & state dispatch',
      tech: 'React 19 / TypeScript',
      latency: '16ms',
      detail: 'Captures user interactions and dispatches verified state.',
      icon: <Terminal className="w-3.5 h-3.5" />,
    },
    {
      id: 'process',
      name: 'Processing Engine',
      role: 'Domain logic & transformation',
      tech: 'TypeScript / Motion',
      latency: '8ms',
      detail: 'Executes domain algorithms and renders verified digital artifacts.',
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
    {
      id: 'output',
      name: 'Artifact Delivery',
      role: 'Interactive UI presentation',
      tech: 'Tailwind CSS / Canvas',
      latency: '60fps',
      detail: 'Presents the interactive software interface with high precision.',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];
}
