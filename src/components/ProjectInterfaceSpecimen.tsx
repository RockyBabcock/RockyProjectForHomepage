import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Volume2,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectInterfaceSpecimenProps {
  project: Project;
  interactive?: boolean;
}

export const ProjectInterfaceSpecimen: React.FC<ProjectInterfaceSpecimenProps> = ({
  project,
  interactive = true,
}) => {
  const slug = project.slug;

  // Render project-specific authentic digital interface
  switch (slug) {
    case 'synapse-agent':
      return <SynapseAgentInterface interactive={interactive} />;
    case 'solis-protocol':
      return <SolisProtocolInterface interactive={interactive} />;
    case 'mnemosyne-reader':
      return <MnemosyneReaderInterface interactive={interactive} />;
    case 'alchemist-foundry':
      return <AlchemistFoundryInterface interactive={interactive} />;
    case 'hyperion-dex':
      return <HyperionDexInterface interactive={interactive} />;
    case 'botanica-shader':
      return <BotanicaShaderInterface interactive={interactive} />;
    case 'kinship-archive':
      return <KinshipArchiveInterface interactive={interactive} />;
    case 'rocky-archive':
      return <RockyArchiveInterface interactive={interactive} />;
    default:
      return <DefaultInterface project={project} />;
  }
};

/* =========================================================================
   01: SYNAPSE AGENT — Multi-Agent DAG Reasoning Canvas & Telemetry Stream
   ========================================================================= */
const SynapseAgentInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [activeTab, setActiveTab] = useState<'dag' | 'logs'>('dag');
  const [selectedNode, setSelectedNode] = useState<number>(2);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { id: 0, title: 'Intent Decomposer', status: 'done', latency: '42ms', model: 'gpt-4o' },
    { id: 1, title: 'Satellite Telemetry Tool', status: 'done', latency: '124ms', model: 'tool/copernicus' },
    { id: 2, title: 'DAG Reasoning Dispatcher', status: 'active', latency: '28ms', model: 'claude-3-5-sonnet' },
    { id: 3, title: 'Evaluator Rubric', status: 'pending', latency: '—', model: 'judge-worker' },
  ];

  return (
    <div className="w-full h-full bg-[#171717] text-[#FAF9F5] font-mono flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Top Application Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2E2D29] text-[10px] sm:text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#FAF9F5] tracking-tight">synapse_engine.v3.2</span>
          <span className="text-[#8C887B] hidden sm:inline">| session: 0x9f...4a</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[#23221E] border border-[#3A3832] rounded-xs p-0.5 text-[9px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('dag');
              }}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                activeTab === 'dag' ? 'bg-[#3A3832] text-[#FAF9F5]' : 'text-[#8C887B] hover:text-[#FAF9F5]'
              }`}
            >
              DAG Graph
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('logs');
              }}
              className={`px-2 py-0.5 rounded-xs transition-colors ${
                activeTab === 'logs' ? 'bg-[#3A3832] text-[#FAF9F5]' : 'text-[#8C887B] hover:text-[#FAF9F5]'
              }`}
            >
              Trace Telemetry
            </button>
          </div>
          <span className="text-[#6F87AA] text-[9px] px-1.5 py-0.5 bg-[#1F2530] rounded-xs border border-[#2D3B4E]">
            Tokens: 4,821
          </span>
        </div>
      </div>

      {/* Center View: Dynamic DAG Canvas or Live Trace Terminal */}
      {activeTab === 'dag' ? (
        <div className="my-auto py-2">
          <div className="text-[10px] text-[#8C887B] mb-2 flex items-center justify-between">
            <span className="uppercase tracking-wider">Active Execution Pipeline</span>
            <span className="text-[#6F87AA]">{pulse ? '● streaming output' : '○ awaiting tool output'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {nodes.map((n) => {
              const isSelected = selectedNode === n.id;
              const isActive = n.status === 'active';
              return (
                <div
                  key={n.id}
                  onClick={(e) => {
                    if (!interactive) return;
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedNode(n.id);
                  }}
                  className={`p-2.5 rounded-xs border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#6F87AA] bg-[#1E2530]'
                      : isActive
                      ? 'border-emerald-500/50 bg-[#1A261E]'
                      : 'border-[#2E2D29] bg-[#1E1D19] hover:border-[#4A4740]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[9px]">
                    <span className="text-[#8C887B]">#0{n.id + 1}</span>
                    {n.status === 'done' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : isActive ? (
                      <Activity className="w-3 h-3 text-emerald-400 animate-spin" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#3A3832]" />
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-[#FAF9F5] truncate">
                    {n.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[8px] text-[#8C887B]">
                    <span className="truncate max-w-[70px]">{n.model}</span>
                    <span className="text-[#FAF9F5]">{n.latency}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Inspect Bar for Selected Node */}
          <div className="mt-3 p-2 bg-[#201F1B] border border-[#2E2D29] rounded-xs text-[9px] flex items-center justify-between text-[#8C887B]">
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3 h-3 text-[#6F87AA] shrink-0" />
              <span className="text-[#FAF9F5] font-semibold">{nodes[selectedNode].title}:</span>
              <span className="truncate text-[#B8B4A8]">
                {selectedNode === 0 && 'Objective decomposed into 3 sub-tasks with DAG constraints.'}
                {selectedNode === 1 && 'Sentinel-2 satellite NDVI imagery pulled over drought coordinates.'}
                {selectedNode === 2 && 'Synthesizing soil anomaly vector with sub-second latency.'}
                {selectedNode === 3 && 'Awaiting automated rubric validation pipeline.'}
              </span>
            </div>
            <span className="text-emerald-400 shrink-0 ml-2 font-mono">200 OK</span>
          </div>
        </div>
      ) : (
        <div className="my-auto py-1 bg-[#141414] border border-[#262521] p-2.5 rounded-xs text-[9px] leading-relaxed text-[#B8B4A8] font-mono space-y-1">
          <div className="text-[#8C887B]">&gt; synapse.agent_init(runtime=&quot;bun-wasm&quot;, topology=&quot;dag&quot;)</div>
          <div className="text-emerald-400">&gt; [OK] Connected to multi-model agent bus (latency: 18ms)</div>
          <div className="text-[#6F87AA]">&gt; [TRACE 0x4a] Dispatching query to satellite tool provider...</div>
          <div className="text-[#FAF9F5]">&gt; tool_call: copernicus_weather_grid([-14.28, 28.52], radius=50km)</div>
          <div className="text-amber-400">&gt; telemetry: Drought anomaly detected at -3.84σ threshold</div>
          <div className="text-emerald-400">&gt; [EVALUATOR] Confidence: 0.984 · Output verified</div>
        </div>
      )}

      {/* Bottom Telemetry Metrics Bar */}
      <div className="pt-2 border-t border-[#2E2D29] flex items-center justify-between text-[9px] text-[#8C887B]">
        <div className="flex items-center gap-3">
          <span>Latency: <strong className="text-[#FAF9F5] font-normal">38ms</strong></span>
          <span className="hidden sm:inline">Cost: <strong className="text-[#FAF9F5] font-normal">$0.0028</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>AUTONOMOUS_ONLINE</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   02: SOLIS PROTOCOL — Parametric Climate Insurance & Satellite Telemetry
   ========================================================================= */
const SolisProtocolInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [anomalyLevel, setAnomalyLevel] = useState<number>(3.84);
  const [settled, setSettled] = useState<boolean>(true);

  return (
    <div className="w-full h-full bg-[#FAF9F5] text-[#171717] font-sans flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Protocol Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2DFD2] text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="font-bold tracking-tight text-[#171717]">solis.protocol</span>
          <span className="px-1.5 py-0.2 bg-[#ECEADE] text-[#67645C] text-[9px] rounded-xs border border-[#D5D1C3]">
            Base Mainnet
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#67645C] hidden sm:inline">TVL:</span>
          <span className="font-semibold text-[#171717]">$2,840,000 USDC</span>
        </div>
      </div>

      {/* Main Climate Radar & Settlement Trigger */}
      <div className="my-auto py-2 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Left: Interactive SVG Anomaly Contour */}
        <div className="sm:col-span-7 bg-[#ECEADE]/70 border border-[#D5D1C3] p-2.5 rounded-xs space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#67645C]">
            <span className="uppercase tracking-wider">Copernicus Isobar Anomaly</span>
            <span className="text-amber-700 font-medium">-{anomalyLevel.toFixed(2)}σ Drought Level</span>
          </div>

          {/* SVG Isobar Radar Chart */}
          <div className="h-20 w-full relative flex items-center justify-center">
            <svg viewBox="0 0 240 70" className="w-full h-full">
              {/* Baseline reference */}
              <line x1="0" y1="25" x2="240" y2="25" stroke="#B8B2A2" strokeDasharray="3,3" strokeWidth="1" />
              <text x="5" y="20" fill="#8C887B" fontSize="7" fontFamily="monospace">Normal Threshold (0.0σ)</text>

              {/* Threshold trigger line */}
              <line x1="0" y1="52" x2="240" y2="52" stroke="#BC9A64" strokeDasharray="2,2" strokeWidth="1" />
              <text x="5" y="48" fill="#BC9A64" fontSize="7" fontFamily="monospace">Trigger Line (-3.5σ)</text>

              {/* Anomaly Trend Curve */}
              <path
                d="M 0 24 Q 40 28, 80 38 T 150 56 T 240 60"
                fill="none"
                stroke="#6F87AA"
                strokeWidth="2"
              />
              <circle cx="150" cy="56" r="3.5" fill="#171717" stroke="#FAF9F5" strokeWidth="1.5" />
              <circle cx="240" cy="60" r="4" fill="#C53030" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-[#8C887B]">
            <span>Day 01</span>
            <span>Day 07</span>
            <span>Day 14 (Threshold Breach)</span>
            <span className="text-rose-700 font-semibold">Current (Day 16)</span>
          </div>
        </div>

        {/* Right: Parametric Settlement Escrow Card */}
        <div className="sm:col-span-5 bg-[#FAF9F5] border border-[#E2DFD2] p-2.5 rounded-xs space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span className="text-[#8C887B]">Smart Contract:</span>
            <span className="text-emerald-700 font-medium">TRIGGERED</span>
          </div>

          <div className="space-y-1">
            <div className="text-[13px] font-serif font-light text-[#171717] leading-tight">
              142 Farmers Compensated
            </div>
            <div className="text-[10px] text-[#67645C] font-mono">
              $426,000 USDC disbursed
            </div>
          </div>

          <button
            onClick={(e) => {
              if (!interactive) return;
              e.preventDefault();
              e.stopPropagation();
              setSettled(!settled);
              setAnomalyLevel(settled ? 2.1 : 3.84);
            }}
            className="w-full py-1 text-[9px] uppercase font-mono tracking-wider bg-[#171717] text-[#FAF9F5] hover:bg-[#6F87AA] transition-colors rounded-xs flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>{settled ? 'Simulate Normal' : 'Simulate Drought'}</span>
          </button>
        </div>
      </div>

      {/* Protocol Telemetry Footer */}
      <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-[9px] font-mono text-[#67645C]">
        <div className="flex items-center gap-2 truncate">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span className="truncate">Escrow: 0x71C8...39B (Automated Payout Verified)</span>
        </div>
        <span className="text-[#6F87AA]">Oracle: Chainlink + Sentinel</span>
      </div>
    </div>
  );
};

/* =========================================================================
   03: MNEMOSYNE READER — 3-Column Spatial Reading & LLM Glosses
   ========================================================================= */
const MnemosyneReaderInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [activeGloss, setActiveGloss] = useState<number>(0);

  const glosses = [
    {
      author: 'Marcus Aurelius (AD 170)',
      source: 'Meditations, IV.43',
      text: 'Time is a river, a fierce torrent of things that come into being; no sooner has something appeared than it is swept past.',
    },
    {
      author: 'Gemini 1.5 Synthesis',
      source: 'Etymological Gloss',
      text: 'Mnemosyne in Greek mythology is mother of the nine Muses, linking memory directly to spatial spatialization.',
    },
  ];

  return (
    <div className="w-full h-full bg-[#F5F4ED] text-[#171717] flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Top Reading Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2DFD2] text-[10px] font-mono text-[#67645C]">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-xs text-[#171717]">Mnemosyne</span>
          <span>/</span>
          <span>Folio 14 · Spatial Reading Companion</span>
        </div>
        <div className="text-[9px] text-[#6F87AA] uppercase tracking-wider">
          Talmudic 3-Column Mode
        </div>
      </div>

      {/* 3-Column Talmudic Layout Specimen */}
      <div className="my-auto py-2 grid grid-cols-12 gap-2 sm:gap-3 text-left">
        {/* Left: Marginal Gloss (Historical Citations) */}
        <div className="col-span-3 border-r border-[#E2DFD2] pr-2 space-y-1.5">
          <span className="text-[8px] uppercase tracking-wider text-[#9E9A90] font-mono block">
            Marginal Citation
          </span>
          <div
            onClick={(e) => {
              if (!interactive) return;
              e.preventDefault();
              e.stopPropagation();
              setActiveGloss(0);
            }}
            className={`p-1.5 rounded-xs transition-colors cursor-pointer text-[9px] leading-snug font-serif ${
              activeGloss === 0 ? 'bg-[#ECEADE] text-[#171717]' : 'text-[#67645C]'
            }`}
          >
            <strong className="block text-[8px] font-sans text-[#6F87AA] uppercase">Marcus Aurelius</strong>
            &quot;Time is a river, a fierce torrent...&quot;
          </div>
        </div>

        {/* Center: Main Reading Spine */}
        <div className="col-span-6 px-1 sm:px-2 space-y-1.5">
          <span className="text-[8px] uppercase tracking-wider text-[#9E9A90] font-mono block text-center">
            Main Reading Spine (46rem)
          </span>
          <p className="font-serif text-[11px] sm:text-[13px] leading-relaxed text-[#171717]">
            &quot;Time is the substance from which I am made. Time is a river which carries me along,
            <span className="bg-[#6F87AA]/20 px-1 border-b border-[#6F87AA] text-[#171717]">
              {' '}but I am the river;{' '}
            </span>
            it is a tiger that devours me, but I am the tiger; it is a fire that consumes me, but I am the fire.&quot;
          </p>
          <span className="text-[8px] font-sans text-[#8C887B] block text-right">— Jorge Luis Borges</span>
        </div>

        {/* Right: AI Synthesis & LLM Gloss */}
        <div className="col-span-3 border-l border-[#E2DFD2] pl-2 space-y-1.5">
          <span className="text-[8px] uppercase tracking-wider text-[#6F87AA] font-mono block">
            LLM Synthesis
          </span>
          <div
            onClick={(e) => {
              if (!interactive) return;
              e.preventDefault();
              e.stopPropagation();
              setActiveGloss(1);
            }}
            className={`p-1.5 rounded-xs transition-colors cursor-pointer text-[9px] leading-snug font-sans ${
              activeGloss === 1 ? 'bg-[#ECEADE] text-[#171717]' : 'text-[#67645C]'
            }`}
          >
            <div className="flex items-center gap-1 text-[8px] font-mono text-[#6F87AA] mb-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Gemini 1.5</span>
            </div>
            <p className="text-[8px] text-[#4A4740] leading-tight">
              Borges collapses observer into observed substance, anticipating non-linear spatial hypertext.
            </p>
          </div>
        </div>
      </div>

      {/* Reading Bar Footer */}
      <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#67645C]">
        <span>Spatial Coordinate: p. 42 / col. 02</span>
        <span className="text-[#6F87AA]">Interactive Gloss Connection Active</span>
      </div>
    </div>
  );
};

/* =========================================================================
   04: ALCHEMIST FOUNDRY — Generative Variable Font & Bézier Spline Workbench
   ========================================================================= */
const AlchemistFoundryInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [weight, setWeight] = useState<number>(450);
  const [contrast, setContrast] = useState<number>(65);

  return (
    <div className="w-full h-full bg-[#1C1B18] text-[#FAF9F5] font-mono flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Workbench Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#33312B] text-[10px]">
        <div className="flex items-center gap-2">
          <Sliders className="w-3 h-3 text-[#BC9A64]" />
          <span className="font-semibold text-[#FAF9F5]">alchemist.foundry</span>
          <span className="text-[#8C887B] text-[9px] hidden sm:inline">Glyph: 0x0052 &apos;R&apos;</span>
        </div>
        <div className="text-[9px] text-[#BC9A64] px-1.5 py-0.2 bg-[#2B2923] border border-[#423F36] rounded-xs">
          Rust-Wasm 60 FPS
        </div>
      </div>

      {/* Main Coordinate Bézier Canvas & Live Letterform */}
      <div className="my-auto py-1 grid grid-cols-12 gap-3 items-center">
        {/* Center Letterform with Coordinate Grid */}
        <div className="col-span-7 h-28 sm:h-32 bg-[#141311] border border-[#2B2923] rounded-xs relative flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Guidelines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#24221D_1px,transparent_1px),linear-gradient(to_bottom,#24221D_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />
          <div className="absolute w-full h-[1px] bg-rose-500/40 top-[75%]" title="Baseline" />
          <div className="absolute w-full h-[1px] bg-[#6F87AA]/40 top-[30%]" title="Cap Height" />

          {/* Dynamic SVG Letterform with Real Tangent Control Points */}
          <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10">
            {/* The Glyphic Spline */}
            <text
              x="50"
              y="75"
              textAnchor="middle"
              fill="none"
              stroke="#FAF9F5"
              strokeWidth={Math.max(2, (weight / 500) * 8)}
              fontFamily="serif"
              fontSize="76"
              style={{ fontWeight: weight }}
            >
              R
            </text>
            {/* Bézier Anchor Handle Points */}
            <circle cx="28" cy="74" r="2" fill="#BC9A64" />
            <circle cx="28" cy="28" r="2" fill="#BC9A64" />
            <circle cx="68" cy="44" r="2" fill="#BC9A64" />
            <line x1="68" y1="44" x2="78" y2="36" stroke="#BC9A64" strokeWidth="0.8" strokeDasharray="1,1" />
            <circle cx="78" cy="36" r="1.5" fill="#FAF9F5" />
          </svg>

          <div className="absolute bottom-1 right-2 text-[8px] text-[#8C887B]">
            Nodes: 18 · Splines: 6
          </div>
        </div>

        {/* Right: Variable Sliders */}
        <div className="col-span-5 space-y-2.5 text-[9px]">
          <div className="space-y-1">
            <div className="flex justify-between text-[#8C887B]">
              <span>Weight [wght]</span>
              <span className="text-[#FAF9F5] font-semibold">{weight}</span>
            </div>
            <input
              type="range"
              min="100"
              max="900"
              value={weight}
              onChange={(e) => {
                if (!interactive) return;
                setWeight(Number(e.target.value));
              }}
              className="w-full accent-[#BC9A64] h-1 bg-[#2E2D29] rounded-xs cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[#8C887B]">
              <span>Contrast [cntr]</span>
              <span className="text-[#FAF9F5] font-semibold">{contrast}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={contrast}
              onChange={(e) => {
                if (!interactive) return;
                setContrast(Number(e.target.value));
              }}
              className="w-full accent-[#6F87AA] h-1 bg-[#2E2D29] rounded-xs cursor-pointer"
            />
          </div>

          <div className="pt-1 text-[8px] text-[#8C887B] flex justify-between">
            <span>Format: Variable OTF</span>
            <span className="text-emerald-400">Validated</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#33312B] flex items-center justify-between text-[8px] sm:text-[9px] text-[#8C887B]">
        <span>Export Target: WOFF2 / WebFont</span>
        <span className="text-[#BC9A64]">Bézier Engine Active</span>
      </div>
    </div>
  );
};

/* =========================================================================
   05: HYPERION DEX — Sub-Millisecond Orderbook Terminal & Depth Canvas
   ========================================================================= */
const HyperionDexInterface: React.FC<{ interactive: boolean }> = () => {
  const [ticks, setTicks] = useState<number>(3482.15);

  useEffect(() => {
    const timer = setInterval(() => {
      const delta = (Math.random() - 0.48) * 1.5;
      setTicks((t) => Number((t + delta).toFixed(2)));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#121417] text-[#FAF9F5] font-mono flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#23272E] text-[10px]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#FAF9F5]">HYPERION_DEX</span>
          <span className="text-emerald-400">ETH/USDC</span>
          <span className="text-xs font-semibold text-[#FAF9F5]">${ticks}</span>
        </div>
        <div className="flex items-center gap-2 text-[9px]">
          <span className="text-[#8C887B]">Lat:</span>
          <span className="text-emerald-400 font-semibold">0.38ms</span>
          <span className="px-1 py-0.2 bg-[#1B221E] text-emerald-400 border border-emerald-800 rounded-xs">
            Sub-ms
          </span>
        </div>
      </div>

      {/* Orderbook Depth Area Chart + Ladder */}
      <div className="my-auto py-1 grid grid-cols-12 gap-3 items-center">
        {/* Left: Interactive SVG Depth Chart */}
        <div className="col-span-7 h-24 sm:h-28 bg-[#0D0F12] border border-[#23272E] p-2 rounded-xs flex flex-col justify-between">
          <div className="flex justify-between text-[8px] text-[#8C887B]">
            <span className="text-emerald-400">Cumulative Bids ($14.2M)</span>
            <span className="text-rose-400">Asks ($12.8M)</span>
          </div>

          {/* SVG Depth Curves */}
          <svg viewBox="0 0 200 60" className="w-full h-full">
            {/* Bid side in emerald fill */}
            <path
              d="M 0 55 L 20 50 L 50 42 L 80 25 L 98 10 L 98 60 L 0 60 Z"
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            {/* Ask side in rose fill */}
            <path
              d="M 102 10 L 120 28 L 150 44 L 180 52 L 200 56 L 200 60 L 102 60 Z"
              fill="rgba(244, 63, 94, 0.25)"
              stroke="#F43F5E"
              strokeWidth="1.5"
            />
            {/* Center Mid-Price Line */}
            <line x1="100" y1="0" x2="100" y2="60" stroke="#FAF9F5" strokeWidth="1" strokeDasharray="2,2" />
          </svg>

          <div className="flex justify-between text-[8px] font-mono text-[#8C887B]">
            <span>$3,460</span>
            <span className="text-[#FAF9F5] font-semibold">${ticks}</span>
            <span>$3,510</span>
          </div>
        </div>

        {/* Right: Real-time Orderbook Ladder */}
        <div className="col-span-5 text-[9px] space-y-1">
          <div className="flex justify-between text-[#8C887B] text-[8px] pb-0.5 border-b border-[#23272E]">
            <span>Price</span>
            <span>Size</span>
          </div>
          <div className="flex justify-between text-rose-400">
            <span>3,483.20</span>
            <span>4.82 ETH</span>
          </div>
          <div className="flex justify-between text-rose-400">
            <span>3,482.70</span>
            <span>12.40 ETH</span>
          </div>
          <div className="py-0.5 px-1 bg-[#1A1E24] text-[#FAF9F5] flex justify-between font-bold text-[8px]">
            <span>SPREAD</span>
            <span className="text-[#6F87AA]">0.0012%</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span>3,481.80</span>
            <span>8.15 ETH</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span>3,481.20</span>
            <span>18.90 ETH</span>
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="pt-2 border-t border-[#23272E] flex items-center justify-between text-[8px] sm:text-[9px] text-[#8C887B]">
        <span>Engine: Rust Matching Core / WebGL</span>
        <span className="text-emerald-400">● 100,000 TPS Ready</span>
      </div>
    </div>
  );
};

/* =========================================================================
   06: BOTANICA SHADER — Procedural L-System & Capillary Pigment Simulation
   ========================================================================= */
const BotanicaShaderInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [recursion, setRecursion] = useState<number>(3);
  const [bleed, setBleed] = useState<number>(1.2);

  return (
    <div className="w-full h-full bg-[#FAF9F5] text-[#171717] font-sans flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Top Shader Controls */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2DFD2] text-[10px] font-mono text-[#67645C]">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-xs text-[#171717]">Botanica</span>
          <span>/</span>
          <span>L-System Shader Experiment</span>
        </div>
        <div className="text-[9px] text-[#6F87AA] uppercase tracking-wider">
          Capillary Pigment Dispersal
        </div>
      </div>

      {/* Center Procedural Growth Specimen */}
      <div className="my-auto py-1 grid grid-cols-12 gap-3 items-center">
        {/* Procedural L-System Canvas */}
        <div className="col-span-8 h-28 sm:h-32 bg-[#ECEADE]/70 border border-[#D5D1C3] rounded-xs relative flex items-center justify-center overflow-hidden">
          {/* Subtle Capillary Watercolor Pool Background */}
          <div
            className="absolute inset-4 rounded-full bg-[#6F87AA]/25 blur-md pointer-events-none transition-all duration-700"
            style={{ transform: `scale(${bleed})` }}
          />

          {/* Procedural Branching SVG */}
          <svg viewBox="0 0 100 80" className="w-32 h-28 relative z-10">
            {/* Trunk */}
            <line x1="50" y1="80" x2="50" y2="52" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
            {/* Primary Branches */}
            <line x1="50" y1="52" x2="35" y2="35" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="50" y1="52" x2="65" y2="35" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
            {/* Secondary Branches */}
            {recursion >= 2 && (
              <>
                <line x1="35" y1="35" x2="24" y2="22" stroke="#67645C" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="35" y1="35" x2="42" y2="20" stroke="#67645C" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="65" y1="35" x2="58" y2="20" stroke="#67645C" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="65" y1="35" x2="78" y2="24" stroke="#67645C" strokeWidth="1.2" strokeLinecap="round" />
              </>
            )}
            {/* Pigment Blooms */}
            {recursion >= 3 && (
              <>
                <circle cx="24" cy="22" r="3.5" fill="#6F87AA" opacity="0.8" />
                <circle cx="42" cy="20" r="3" fill="#BC9A64" opacity="0.8" />
                <circle cx="58" cy="20" r="3.2" fill="#6F87AA" opacity="0.8" />
                <circle cx="78" cy="24" r="4" fill="#BC9A64" opacity="0.8" />
              </>
            )}
          </svg>

          <span className="absolute bottom-1.5 left-2 text-[8px] font-mono text-[#8C887B]">
            u_viscosity: 0.82 · u_bleed: {bleed.toFixed(1)}
          </span>
        </div>

        {/* Sliders for Interactive Branching */}
        <div className="col-span-4 space-y-2 text-[9px] font-mono text-[#67645C]">
          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span>Depth</span>
              <span className="text-[#171717] font-semibold">{recursion}</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={recursion}
              onChange={(e) => {
                if (!interactive) return;
                setRecursion(Number(e.target.value));
              }}
              className="w-full accent-[#6F87AA] h-1 bg-[#D5D1C3] rounded-xs cursor-pointer"
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-between">
              <span>Capillary Bleed</span>
              <span className="text-[#171717] font-semibold">{bleed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={bleed}
              onChange={(e) => {
                if (!interactive) return;
                setBleed(Number(e.target.value));
              }}
              className="w-full accent-[#BC9A64] h-1 bg-[#D5D1C3] rounded-xs cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#67645C]">
        <span>Shader: GLSL Fragment Shader</span>
        <span className="text-[#6F87AA]">Capillary Diffusion Matrix</span>
      </div>
    </div>
  );
};

/* =========================================================================
   07: KINSHIP ARCHIVE — Permanent Oral History Registry on Arweave
   ========================================================================= */
const KinshipArchiveInterface: React.FC<{ interactive: boolean }> = ({ interactive }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="w-full h-full bg-[#FAF9F5] text-[#171717] font-sans flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Registry Top Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2DFD2] text-[10px] font-mono text-[#67645C]">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-xs text-[#171717]">Kinship</span>
          <span>/</span>
          <span>Permanent Sound Registry</span>
        </div>
        <div className="text-[9px] text-[#6F87AA] px-1.5 py-0.2 bg-[#ECEADE] rounded-xs border border-[#D5D1C3]">
          Arweave ar://9x...4F
        </div>
      </div>

      {/* Main Sound Waveform Visualizer & Letterpress Folio */}
      <div className="my-auto py-1 grid grid-cols-12 gap-3 items-center">
        {/* Waveform Player Box */}
        <div className="col-span-8 bg-[#ECEADE]/70 border border-[#D5D1C3] p-2.5 rounded-xs space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span className="text-[#67645C]">Tape #04 — Appalachian Oral Record</span>
            <span className="text-[#171717] font-semibold">{isPlaying ? '02:14 / 08:35' : '00:00 / 08:35'}</span>
          </div>

          {/* Interactive Simulated Waveform Bars */}
          <div className="h-12 flex items-center justify-between gap-1 px-1">
            {[4, 8, 14, 22, 18, 30, 24, 38, 16, 28, 32, 20, 12, 26, 36, 18, 10, 6, 14, 22, 15].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-[#171717]' : 'bg-[#9E9A90]'
                }`}
                style={{
                  height: isPlaying ? `${Math.min(42, height * (0.8 + Math.random() * 0.5))}px` : `${height}px`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={(e) => {
                if (!interactive) return;
                e.preventDefault();
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="px-2.5 py-1 bg-[#171717] text-[#FAF9F5] hover:bg-[#6F87AA] transition-colors rounded-xs text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              <span>{isPlaying ? 'Pause' : 'Play Sound'}</span>
            </button>
            <div className="flex items-center gap-1 text-[8px] font-mono text-[#8C887B]">
              <Volume2 className="w-3 h-3 text-[#6F87AA]" />
              <span>Whisper v3 Text Sync Active</span>
            </div>
          </div>
        </div>

        {/* Right: Cryptographic Provenance */}
        <div className="col-span-4 bg-[#FAF9F5] border border-[#E2DFD2] p-2 rounded-xs space-y-1 text-[9px] font-mono">
          <span className="text-[#8C887B] text-[8px] uppercase tracking-wider block">Decentralized Storage</span>
          <div className="text-[11px] font-serif font-light text-[#171717] leading-tight">
            Permanent Audio Block
          </div>
          <div className="text-[8px] text-[#67645C] truncate pt-0.5">
            Tx: 0x98f2...b41a
          </div>
          <div className="text-[8px] text-emerald-700 font-semibold pt-1">
            Immutable 200+ Years
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#67645C]">
        <span>Letterpress Binding: #04/50</span>
        <span className="text-[#6F87AA]">Permanent Archive Certified</span>
      </div>
    </div>
  );
};

/* =========================================================================
   08: ROCKY ARCHIVE — Responsive Publication System & Design System
   ========================================================================= */
const RockyArchiveInterface: React.FC<{ interactive: boolean }> = () => {
  return (
    <div className="w-full h-full bg-[#FAF9F5] text-[#171717] font-sans flex flex-col justify-between p-3.5 sm:p-5 select-none overflow-hidden">
      {/* Design System Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2DFD2] text-[10px] font-mono text-[#67645C]">
        <div className="flex items-center gap-2">
          <Layers className="w-3 h-3 text-[#6F87AA]" />
          <span className="font-serif italic text-xs text-[#171717]">rocky.archive</span>
          <span>/</span>
          <span>Editorial Publication System</span>
        </div>
        <div className="text-[9px] text-[#6F87AA]">Tokens &amp; Cadence Engine</div>
      </div>

      {/* Typographic Scale & Color Swatch Matrix */}
      <div className="my-auto py-1 grid grid-cols-12 gap-3 items-center">
        {/* Left: Typographic Ratio Matrix */}
        <div className="col-span-7 space-y-1 text-left">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-light text-[#171717]">Aa</span>
            <span className="text-[9px] font-mono text-[#67645C]">Fraunces Display (96px/0.88)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif italic text-lg text-[#171717]">Cormorant</span>
            <span className="text-[9px] font-mono text-[#67645C]">Literary Garamond Subhead</span>
          </div>
          <div className="text-[10px] font-sans text-[#67645C] leading-snug">
            Strict 46rem line measure for cognitive contemplation.
          </div>
        </div>

        {/* Right: Color Pigments */}
        <div className="col-span-5 bg-[#ECEADE]/70 border border-[#D5D1C3] p-2 rounded-xs space-y-1.5 font-mono text-[8px]">
          <span className="text-[#8C887B] uppercase tracking-wider block">Palette Calibration</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F5F4ED] border border-[#D5D1C3]" />
            <span className="text-[#171717]">#F5F4ED Cotton Paper</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#171717]" />
            <span className="text-[#171717]">#171717 Lamp Black</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6F87AA]" />
            <span className="text-[#171717]">#6F87AA Dusty Blue</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#E2DFD2] flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#67645C]">
        <span>Responsive Asymmetric Grid</span>
        <span className="text-[#6F87AA]">Fluid Cadence 12-col</span>
      </div>
    </div>
  );
};

/* =========================================================================
   Fallback Default Interface
   ========================================================================= */
const DefaultInterface: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="w-full h-full bg-[#171717] text-[#FAF9F5] p-6 flex flex-col justify-between font-mono">
      <div className="flex items-center justify-between text-xs text-[#8C887B]">
        <span>{project.previewUrl}</span>
        <span className="text-emerald-400">ONLINE</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-xl font-serif font-light text-[#FAF9F5]">{project.slug}</h4>
        <p className="text-xs text-[#B8B4A8] font-sans">{project.tools.join(' · ')}</p>
      </div>
      <div className="text-[10px] text-[#6F87AA]">
        Interactive digital specimen active
      </div>
    </div>
  );
};
