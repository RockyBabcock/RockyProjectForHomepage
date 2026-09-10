import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowRight, Cpu, Database, Network, ShieldCheck, Terminal, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

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

  // Generate domain-specific technical pipeline steps
  const steps: DiagramStep[] = getPipelineForProject(project);

  return (
    <div className={`w-full bg-[#FAF9F5] border border-[#E2DFD2] rounded-xs p-5 sm:p-7 select-none ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b border-[#E2DFD2]/70">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6F87AA] block font-medium">
            system topology & architecture
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171717] lowercase tracking-tight">
            data flow & component execution
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#67645C]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>runtime verified</span>
        </div>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepId === step.id || (!activeStepId && idx === 1);
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStepId(step.id)}
                onClick={() => setActiveStepId(step.id)}
                className={`relative p-3.5 sm:p-4 rounded-xs border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#F5F4ED] border-[#171717] shadow-[0_4px_16px_rgba(23,23,23,0.06)] translate-y-[-2px]'
                    : 'bg-[#ECEADE]/40 border-[#E2DFD2] hover:border-[#9E9A90] hover:bg-[#F5F4ED]'
                }`}
              >
                {/* Node Step Number & Icon */}
                <div className="flex items-center justify-between text-xs font-mono text-[#67645C] pb-2">
                  <span className="text-[11px] text-[#6F87AA] font-semibold">
                    0{idx + 1}
                  </span>
                  <div className={`p-1 rounded-xs ${isSelected ? 'text-[#171717]' : 'text-[#9E9A90]'}`}>
                    {step.icon}
                  </div>
                </div>

                {/* Node Title & Role */}
                <div className="space-y-1">
                  <div className="font-serif text-[15px] sm:text-[16px] text-[#171717] font-medium leading-tight">
                    {step.name}
                  </div>
                  <div className="text-[11px] font-sans text-[#67645C] leading-snug">
                    {step.role}
                  </div>
                </div>

                {/* Technology Pill */}
                <div className="pt-2.5 mt-2 border-t border-[#E2DFD2]/60 flex items-center justify-between text-[10px] font-mono text-[#6F87AA]">
                  <span className="truncate">{step.tech}</span>
                  {step.latency && <span className="text-[#9E9A90] shrink-0">{step.latency}</span>}
                </div>

                {/* Connector Arrow on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-[#FAF9F5] border border-[#E2DFD2] items-center justify-center text-[#9E9A90] shadow-2xs pointer-events-none">
                    <ArrowRight className="w-2.5 h-2.5 text-[#6F87AA]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Box for Active Step */}
      {activeStepId && (
        <div className="mt-5 p-4 bg-[#F5F4ED] border border-[#E2DFD2] rounded-xs text-xs font-sans text-[#67645C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-serif text-sm font-medium text-[#171717] mr-2">
                {steps.find((s) => s.id === activeStepId)?.name}:
              </span>
              <span>{steps.find((s) => s.id === activeStepId)?.detail}</span>
            </div>
          </div>
          <span className="font-mono text-[11px] text-[#6F87AA] uppercase tracking-wider shrink-0">
            Node Tech: {steps.find((s) => s.id === activeStepId)?.tech}
          </span>
        </div>
      )}
    </div>
  );
};

// Domain-specific pipeline generators
function getPipelineForProject(project: Project): DiagramStep[] {
  const slug = project.slug;

  if (slug === 'synapse-agent') {
    return [
      {
        id: 'input',
        name: 'Objective Parser',
        role: 'Natural language task extraction',
        tech: 'TypeScript AST',
        latency: '12ms',
        detail: 'Parses complex multi-paragraph instructions into structured goal criteria and constraints.',
        icon: <Terminal className="w-3.5 h-3.5" />,
      },
      {
        id: 'planner',
        name: 'DAG Decomposer',
        role: 'Topological dependency resolver',
        tech: 'Graphlib / WASM',
        latency: '34ms',
        detail: 'Builds directed acyclic task graph, scheduling independent sub-tasks in parallel concurrency pools.',
        icon: <Layers className="w-3.5 h-3.5" />,
      },
      {
        id: 'dispatcher',
        name: 'Skill Dispatcher',
        role: 'Dynamic tool sandboxing',
        tech: 'Node worker_threads',
        latency: '45ms',
        detail: 'Executes verified skills inside isolated sandboxes with strict memory and CPU quotas.',
        icon: <Cpu className="w-3.5 h-3.5" />,
      },
      {
        id: 'memory',
        name: 'Vector Ephemeral Cache',
        role: 'Context compression & retrieval',
        tech: 'HNSW / Quantized Index',
        latency: '8ms',
        detail: 'Stores intermediate tool observations and preserves context without context window exhaustion.',
        icon: <Database className="w-3.5 h-3.5" />,
      },
      {
        id: 'evaluator',
        name: 'Evaluator Rubric',
        role: 'Automated verification & output stream',
        tech: 'LLM-as-Judge / SSE',
        latency: '90ms',
        detail: 'Grades candidate outputs against verification schema and streams confirmed results to the UI.',
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      },
    ];
  }

  if (slug === 'solis-protocol') {
    return [
      {
        id: 'sat',
        name: 'Copernicus Telemetry',
        role: 'Atmospheric satellite radar',
        tech: 'Sentinel-2 API',
        latency: 'Hourly',
        detail: 'Captures multi-spectral precipitation anomalies, surface soil moisture, and drought indexes.',
        icon: <Sparkles className="w-3.5 h-3.5" />,
      },
      {
        id: 'oracle',
        name: 'Decentralized Oracle',
        role: 'Signed cryptographic attestations',
        tech: 'Chainlink DON',
        latency: '1 block',
        detail: 'Multi-node quorum validates precipitation anomalies against historical baseline bounds.',
        icon: <Network className="w-3.5 h-3.5" />,
      },
      {
        id: 'isobar',
        name: 'Isobaric Engine',
        role: 'Topological derivative math',
        tech: 'D3.js / WebGL',
        latency: '16ms',
        detail: 'Renders quiet topographic contour curves to visualize drought thresholds cleanly without casino noise.',
        icon: <Layers className="w-3.5 h-3.5" />,
      },
      {
        id: 'escrow',
        name: 'Automated Escrow',
        role: 'Non-custodial pool smart contracts',
        tech: 'Solidity / ERC-4626',
        latency: '0.8s',
        detail: 'Locks liquidity pools and evaluates programmatic payout conditions deterministically.',
        icon: <Database className="w-3.5 h-3.5" />,
      },
      {
        id: 'settlement',
        name: 'Payout Settlement',
        role: 'Automated on-chain distribution',
        tech: 'Ethers.js / L2 Rollup',
        latency: 'Instant',
        detail: 'Directly credits agricultural beneficiary addresses with verifiable cryptographic receipts.',
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      },
    ];
  }

  if (slug === 'mnemosyne-reader') {
    return [
      {
        id: 'corpus',
        name: 'Markdown Corpus',
        role: 'Document ingestion & tokenizer',
        tech: 'Remark / Unified',
        latency: '5ms',
        detail: 'Splits long-form treatises into semantic paragraphs preserving footnotes and citations.',
        icon: <Terminal className="w-3.5 h-3.5" />,
      },
      {
        id: 'embed',
        name: 'Embedding Pipeline',
        role: 'Dense semantic representations',
        tech: 'text-embedding-3',
        latency: '60ms',
        detail: 'Computes high-dimensional semantic vectors for cross-document conceptual linkage.',
        icon: <Cpu className="w-3.5 h-3.5" />,
      },
      {
        id: 'cosine',
        name: 'Similarity Graph',
        role: 'Spatial clustering & force layout',
        tech: 'D3 Force / Canvas',
        latency: '16ms',
        detail: 'Positions related concepts organically in a readable cluster network.',
        icon: <Network className="w-3.5 h-3.5" />,
      },
      {
        id: 'reader',
        name: 'Talmudic 3-Spine View',
        role: 'Central text & marginal commentaries',
        tech: 'React 19 / CSS Grid',
        latency: '60fps',
        detail: 'Presents primary thesis alongside historical commentary in responsive paper typography.',
        icon: <Layers className="w-3.5 h-3.5" />,
      },
      {
        id: 'export',
        name: 'Archival Print Engine',
        role: 'Pessimized paper CSS printing',
        tech: 'Paged.js / Print CSS',
        latency: 'Instant',
        detail: 'Generates ready-to-bind PDF signatures with real typographic folios.',
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      },
    ];
  }

  // Generic full-stack / creative technology pipeline
  return [
    {
      id: 'ui',
      name: 'Client Application',
      role: 'Tactile React & TypeScript interface',
      tech: 'React 19 / Tailwind',
      latency: '16ms',
      detail: 'Renders paper-grade typography with accessible keyboard navigation and fluid layouts.',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'state',
      name: 'State & Computation',
      role: 'Reactive data stores & workers',
      tech: 'Zustand / Web Workers',
      latency: '4ms',
      detail: 'Executes complex parsing and rendering math off the main browser thread.',
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
    {
      id: 'api',
      name: 'Protocol & API Layer',
      role: 'Secure typed communication',
      tech: 'tRPC / REST / WebSockets',
      latency: '24ms',
      detail: 'Connects client components with remote data providers and live telemetry sockets.',
      icon: <Network className="w-3.5 h-3.5" />,
    },
    {
      id: 'persistence',
      name: 'Storage & Models',
      role: 'Deterministic verification',
      tech: 'Postgres / IndexedDB',
      latency: '15ms',
      detail: 'Stores versioned data, cryptographic state roots, and user configuration.',
      icon: <Database className="w-3.5 h-3.5" />,
    },
    {
      id: 'render',
      name: 'Verified Delivery',
      role: 'Real-time output stream',
      tech: 'HTML5 / WebGL / SVG',
      latency: '60fps',
      detail: 'Renders verified digital artifacts on canvas with sub-pixel typography.',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];
}
