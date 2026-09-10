import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Download,
  Copy,
  Check,
  RotateCcw,
  Box,
  Compass,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileCode,
  CheckCircle2,
  ShieldCheck,
  Database,
  ArrowUpRight,
  Sliders,
  Maximize2,
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

  switch (slug) {
    case 'svg-downloader':
      return <SvgDownloaderInterface interactive={interactive} />;
    case 'rockyhomepage3D':
      return <RockyHomepage3DInterface interactive={interactive} />;
    case 'melius-like':
      return <MeliusLikeInterface interactive={interactive} />;
    default:
      return <SvgDownloaderInterface interactive={interactive} />;
  }
};

/* =========================================================================
   PROJECT 01: SVG DOWNLOADER — Verified Multi-Source Asset Registry
   ========================================================================= */
interface SvgAsset {
  id: string;
  name: string;
  source: 'Simple Icons' | 'Devicon' | 'Iconify';
  category: string;
  sha256: string;
  color: string;
  viewBox: string;
  path: string;
}

const SVG_ASSETS: SvgAsset[] = [
  {
    id: 'react',
    name: 'React',
    source: 'Simple Icons',
    category: 'Frameworks',
    sha256: '9a7d3f4c6e8b2a1e5d7c9f3b8a4e2d6c1f5b7e9a3c8d2e4f6a7b8c9d0e1f2a3b',
    color: '#61DAFB',
    viewBox: '0 0 24 24',
    path: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm7.5 10c0 .7-.1 1.37-.28 2.02-.75-.41-1.78-.77-2.99-.97.28-.7.47-1.42.58-2.14.93.2 1.83.57 2.69 1.09ZM12 4c.9 0 1.76.12 2.58.33-.35.91-.85 1.94-1.48 3.03-.68-.07-1.39-.1-2.1-.1s-1.42.03-2.1.1c-.63-1.09-1.13-2.12-1.48-3.03.82-.21 1.68-.33 2.58-.33Zm-5.22 8.91c.11.72.3 1.44.58 2.14-1.21.2-2.24.56-2.99.97-.18-.65-.28-1.32-.28-2.02.86-.52 1.76-.89 2.69-1.09ZM12 20c-.9 0-1.76-.12-2.58-.33.35-.91.85-1.94 1.48-3.03.68.07 1.39.1 2.1.1s1.42-.03 2.1-.1c.63 1.09 1.13 2.12 1.48 3.03-.82.21-1.68.33-2.58.33Z',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    source: 'Devicon',
    category: 'Languages',
    sha256: '4f2a7b1c8e5d3a9f0b2c4e6a8d1f3b5c7e9a2d4f6b8c0e1a3d5f7b9c1e3a5d7f',
    color: '#3178C6',
    viewBox: '0 0 24 24',
    path: 'M2 3h20v18H2V3zm10.75 14.5c.98 0 1.82-.23 2.52-.7.7-.47 1.2-1.12 1.5-1.95l-1.9-.8c-.18.45-.45.8-.82 1.05-.37.25-.82.38-1.35.38-.63 0-1.14-.17-1.52-.5-.38-.33-.58-.78-.58-1.35 0-.58.2-1.04.6-1.37.4-.33.98-.6 1.75-.82l.9-.28c1.17-.35 2.05-.82 2.62-1.4.58-.58.88-1.38.88-2.38 0-1.12-.42-2.02-1.25-2.7-.83-.68-1.93-1.02-3.3-1.02-1.12 0-2.08.27-2.9.82-.82.55-1.35 1.32-1.6 2.3l1.88.75c.15-.55.42-.98.8-1.28.38-.3.9-.45 1.55-.45.62 0 1.1.14 1.45.42.35.28.52.68.52 1.2 0 .48-.18.88-.55 1.18-.37.3-.92.55-1.65.75l-.92.28c-1.18.35-2.07.82-2.65 1.4-.58.58-.88 1.38-.88 2.4 0 1.15.42 2.07 1.25 2.75.83.68 1.95 1.02 3.35 1.02zM6.5 8.75v1.85h2.25v6.9h2.25v-6.9h2.25V8.75H6.5z',
  },
  {
    id: 'vite',
    name: 'Vite',
    source: 'Iconify',
    category: 'Build Tools',
    sha256: 'b3c8e1d5a7f2049c6b8d1a3e5f7a9c2e4b6d8f0a2c4e6b8d0a2c4e6b8d0a2c4e',
    color: '#646CFF',
    viewBox: '0 0 24 24',
    path: 'M21.8 3.5 12.6 20.3a.8.8 0 0 1-1.4 0L2.2 3.5a.8.8 0 0 1 .9-1.2l9 1.8 8.8-1.8a.8.8 0 0 1 .9 1.2zM12 5.2 5.5 3.9 12 16.5l6.5-12.6L12 5.2z',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    source: 'Simple Icons',
    category: 'Styling',
    sha256: '7e9a2d4f6b8c0e1a3d5f7b9c1e3a5d7f4f2a7b1c8e5d3a9f0b2c4e6a8d1f3b5c',
    color: '#06B6D4',
    viewBox: '0 0 24 24',
    path: 'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z',
  },
  {
    id: 'python',
    name: 'Python',
    source: 'Devicon',
    category: 'Languages',
    sha256: '3a8c5e7b1d9f20486b8d1a3e5f7a9c2e4b6d8f0a2c4e6b8d0a2c4e6b8d0a2c4e',
    color: '#3776AB',
    viewBox: '0 0 24 24',
    path: 'M11.9 2c-3.4 0-5.7 1.5-5.7 4.4v2.3h5.7v.8H3.8C2.3 9.5 1 10.9 1 13.2c0 2.4 1.3 3.8 3.8 3.8h1.5v-2.3c0-2.2 1.8-4 4-4h5.6v-.8H10V7.6c0-1.8 1.5-3.3 3.3-3.3h3.5c1.4 0 2.2-1.2 2.2-2.3 0-1.4-1.2-2-3.4-2h-3.7zM10.2 4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm1.9 18c3.4 0 5.7-1.5 5.7-4.4v-2.3h-5.7v-.8h8.1c1.5 0 2.8-1.4 2.8-3.7 0-2.4-1.3-3.8-3.8-3.8h-1.5v2.3c0 2.2-1.8 4-4 4H8.1v.8h5.9v2.3c0 1.8-1.5 3.3-3.3 3.3H7.2c-1.4 0-2.2 1.2-2.2 2.3 0 1.4 1.2 2 3.4 2h3.7zm1.7-2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z',
  },
  {
    id: 'docker',
    name: 'Docker',
    source: 'Simple Icons',
    category: 'DevOps',
    sha256: 'c4e6b8d0a2c4e6b8d0a2c4e6b8d0a2c4e3a8c5e7b1d9f20486b8d1a3e5f7a9c2',
    color: '#2496ED',
    viewBox: '0 0 24 24',
    path: 'M13.9 8.2h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2H8.3zm-2.8 0h2.2v2.2H5.5zm8.4-2.8h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2H8.3zm8.4 5.6h2.2v2.2h-2.2zm-16.7 3.3c.4 3.7 3.6 6.7 8.3 6.7 5.8 0 9.7-4.1 10.3-8.8.8-.4 2.2-.6 3.2.3.4-.6.6-1.5.3-2.3-.9-.6-2.1-.5-2.7-.2-.6-1-1.6-1.7-2.8-1.8-.2.7-.7 1.3-1.3 1.8H2.1c-.2 1.4-.4 2.9-.1 4.3z',
  },
];

const SvgDownloaderInterface: React.FC<{ interactive: boolean }> = () => {
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<SvgAsset>(SVG_ASSETS[0]);
  const [colorMode, setColorMode] = useState<'original' | 'mono' | 'dark' | 'light'>('original');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const filteredAssets = SVG_ASSETS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesSource = selectedSource === 'All' || item.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  const rawSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${selectedAsset.viewBox}" fill="${
    colorMode === 'original'
      ? selectedAsset.color
      : colorMode === 'dark'
      ? '#0F0A20'
      : colorMode === 'light'
      ? '#FFFFFF'
      : 'currentColor'
  }">\n  <path d="${selectedAsset.path}" />\n</svg>`;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(rawSvgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const blob = new Blob([rawSvgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAsset.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#110e1a] text-[#FAF9F5] font-mono flex flex-col justify-between p-3 sm:p-4.5 select-none overflow-hidden text-xs">
      {/* Search & Source Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-3 border-b border-violet-950/70">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-violet-400/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verified SVG assets..."
            className="w-full bg-[#181328] border border-violet-950/80 rounded-xs pl-8 pr-3 py-1.5 text-[11px] text-[#FAF9F5] placeholder:text-violet-300/30 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#181328] p-0.5 rounded-xs border border-violet-950/80 text-[10px]">
          {['All', 'Simple Icons', 'Devicon', 'Iconify'].map((source) => (
            <button
              key={source}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSource(source);
              }}
              className={`px-2 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedSource === source
                  ? 'bg-violet-600 text-white font-medium'
                  : 'text-violet-300/60 hover:text-white'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Main Specimen Workspace: Asset Grid on Left, Verified Inspector on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 my-3 flex-1 overflow-hidden">
        {/* Left Column: Asset Catalog Grid */}
        <div className="md:col-span-6 flex flex-col gap-2 overflow-y-auto pr-1 max-h-[220px] sm:max-h-full">
          <div className="text-[10px] text-violet-400/70 uppercase tracking-widest flex items-center justify-between">
            <span>CATALOG [{filteredAssets.length} ASSETS]</span>
            <span>PROVENANCE VERIFIED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredAssets.map((asset) => {
              const isSelected = selectedAsset.id === asset.id;
              return (
                <button
                  key={asset.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedAsset(asset);
                  }}
                  className={`p-2.5 rounded-xs border text-left flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-950/60 border-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                      : 'bg-[#181328]/80 border-violet-950/60 hover:border-violet-700/60 hover:bg-[#201838]'
                  }`}
                >
                  <svg
                    viewBox={asset.viewBox}
                    className="w-7 h-7"
                    fill={asset.color}
                  >
                    <path d={asset.path} />
                  </svg>
                  <div className="w-full text-center">
                    <div className="text-[11px] font-medium text-white truncate">{asset.name}</div>
                    <div className="text-[9px] text-violet-300/50 truncate">{asset.source}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Specimen Inspection Bench */}
        <div className="md:col-span-6 bg-[#161026] border border-violet-950/80 rounded-xs p-3.5 flex flex-col justify-between overflow-hidden">
          {/* Top Inspector Header */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-violet-950/60 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">{selectedAsset.name} / CANONICAL</span>
              </div>
              <span className="text-violet-400/60 text-[9px]">{selectedAsset.category}</span>
            </div>

            {/* Live Render & Mode Palette */}
            <div className="flex items-center justify-between gap-3 bg-[#0d0a18] p-3 rounded-xs border border-violet-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1b1430] border border-violet-900/60 rounded-xs">
                  <svg
                    viewBox={selectedAsset.viewBox}
                    className="w-9 h-9"
                    fill={
                      colorMode === 'original'
                        ? selectedAsset.color
                        : colorMode === 'dark'
                        ? '#6d28d9'
                        : colorMode === 'light'
                        ? '#FAF9F5'
                        : 'currentColor'
                    }
                  >
                    <path d={selectedAsset.path} />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-white">{selectedAsset.name} Vector</div>
                  <div className="text-[9px] text-violet-400/60 font-mono">
                    VIEWBOX: {selectedAsset.viewBox}
                  </div>
                </div>
              </div>

              {/* Color Mode Switcher */}
              <div className="flex bg-[#161026] p-0.5 rounded-xs border border-violet-950/80 text-[9px]">
                {(['original', 'mono', 'light'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setColorMode(m);
                    }}
                    className={`px-1.5 py-0.5 rounded-xs uppercase cursor-pointer ${
                      colorMode === m
                        ? 'bg-violet-600 text-white font-semibold'
                        : 'text-violet-400/60 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Cryptographic SHA-256 Fingerprint */}
            <div className="mt-2.5 p-2 bg-[#0d0a18] border border-violet-950/60 rounded-xs flex items-center justify-between text-[9px] font-mono">
              <div className="flex items-center gap-1 text-emerald-400 truncate">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span className="truncate">SHA-256: {selectedAsset.sha256}</span>
              </div>
              <span className="text-emerald-400 text-[8px] uppercase tracking-wider px-1 bg-emerald-950/80 rounded-xs shrink-0 ml-1">
                VALIDATED
              </span>
            </div>
          </div>

          {/* Actions & Code Preview */}
          <div className="mt-2.5 pt-2 border-t border-violet-950/60 flex items-center justify-between gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-1.5 px-2 bg-[#251a44] hover:bg-[#32235c] text-violet-200 rounded-xs border border-violet-800/60 flex items-center justify-center gap-1.5 text-[10px] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied XML' : 'Copy Raw SVG'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-1.5 px-2 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xs flex items-center justify-center gap-1.5 text-[10px] transition-colors shadow-sm cursor-pointer"
            >
              {downloaded ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3" />}
              <span>{downloaded ? 'Downloaded' : 'Download .svg'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Provenance Strip */}
      <div className="pt-2 border-t border-violet-950/70 flex flex-col sm:flex-row items-center justify-between text-[9px] text-violet-400/60 font-mono gap-1">
        <span>SOURCE: Simple Icons / Devicon / Iconify</span>
        <span>VERIFY: SVG / XML / SHA-256</span>
        <span>EXPORT: SVG / ZIP / manifest</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PROJECT 02: ROCKY HOMEPAGE 3D — Spatial 3D Vector & Scene Canvas
   ========================================================================= */
const SpatialVectorCanvas: React.FC<{
  activeRoute: 'origin' | 'about' | 'projects' | 'contact';
  shockwaveCount: number;
}> = ({ activeRoute, shockwaveCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef<{ radius: number; maxRadius: number; opacity: number }[]>([]);
  const prevShockwaveCount = useRef(shockwaveCount);

  // Dispatch new shockwave pulse when count increments
  useEffect(() => {
    if (shockwaveCount > prevShockwaveCount.current) {
      shockwavesRef.current.push({
        radius: 35,
        maxRadius: 260,
        opacity: 0.95,
      });
      prevShockwaveCount.current = shockwaveCount;
    }
  }, [shockwaveCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();

    // Golden ratio for icosahedron polyhedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];

    // Normalize to radius 1.45
    const baseVertices = rawVertices.map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [(x / len) * 1.45, (y / len) * 1.45, (z / len) * 1.45] as [number, number, number];
    });

    // 20 triangular faces
    const faces: [number, number, number][] = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];

    // Route target camera coordinates & perspective zoom
    const routeTargets: Record<string, { x: number; y: number; zoom: number }> = {
      origin: { x: 0, y: 0, zoom: 1.0 },
      about: { x: -35, y: -20, zoom: 1.15 },
      projects: { x: 40, y: 15, zoom: 1.1 },
      contact: { x: 0, y: 28, zoom: 1.2 },
    };

    let camX = 0;
    let camY = 0;
    let camZoom = 1.0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.75;
      mouseRef.current.targetY = y * 0.55;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || canvas.clientWidth || 300;
      const height = rect.height || canvas.clientHeight || 200;
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const elapsed = (time - startTime) * 0.001;

      // Smooth pointer inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Smooth camera interpolation toward route target
      const target = routeTargets[activeRoute] || routeTargets.origin;
      camX += (target.x - camX) * 0.05;
      camY += (target.y - camY) * 0.05;
      camZoom += (target.zoom - camZoom) * 0.05;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Center with camera pan
      const centerX = w / 2 + camX;
      const centerY = h / 2 + camY;
      const baseScale = Math.min(w, h) * 0.28 * camZoom;

      // 3D Rotations
      const rotY = elapsed * 0.35 + mouseRef.current.x;
      const rotX = Math.sin(elapsed * 0.2) * 0.15 + mouseRef.current.y;
      const rotZ = Math.cos(elapsed * 0.15) * 0.05;

      const rotate = (x: number, y: number, z: number): [number, number, number] => {
        // Y-axis rotation
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // X-axis rotation
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Z-axis rotation
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        return [x3, y3, z2];
      };

      // 3D perspective projection helper
      const project = (
        x: number,
        y: number,
        z: number
      ): { px: number; py: number; depth: number } => {
        const [rx, ry, rz] = rotate(x, y, z);
        const dist = 4.2;
        const f = dist / (dist + rz);
        return {
          px: centerX + rx * baseScale * f,
          py: centerY - ry * baseScale * f,
          depth: rz,
        };
      };

      // 1. Draw Shockwave Rings
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 2.8;
        sw.opacity *= 0.95;
        if (sw.opacity < 0.02 || sw.radius > sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(centerX, centerY, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${sw.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 2. Draw Equatorial Pulsing Orbital Ring
      const ringSegments = 48;
      const ringRadius = 2.05 + Math.sin(elapsed * 2.2) * 0.08;
      ctx.beginPath();
      for (let s = 0; s <= ringSegments; s++) {
        const theta = (s / ringSegments) * Math.PI * 2;
        const rx = Math.cos(theta) * ringRadius;
        const rz = Math.sin(theta) * ringRadius;
        const pt = project(rx, 0, rz);
        if (s === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Project all icosahedron vertices
      const projVertices = baseVertices.map(([x, y, z]) => project(x, y, z));

      // 4. Sort and draw faces with lighting & backface culling
      const sortedFaces = faces
        .map((faceIndices) => {
          const [i0, i1, i2] = faceIndices;
          const p0 = projVertices[i0];
          const p1 = projVertices[i1];
          const p2 = projVertices[i2];
          const avgZ = (p0.depth + p1.depth + p2.depth) / 3;

          // Compute 2D signed area to cull back faces
          const area =
            (p1.px - p0.px) * (p2.py - p0.py) - (p2.px - p0.px) * (p1.py - p0.py);

          return {
            indices: faceIndices,
            avgZ,
            isFront: area > 0,
          };
        })
        .filter((f) => f.isFront)
        .sort((a, b) => a.avgZ - b.avgZ);

      // Virtual directional light vector
      const lx = 0.5;
      const ly = 0.7;
      const lz = 0.5;
      const lLen = Math.hypot(lx, ly, lz);

      sortedFaces.forEach(({ indices }) => {
        const [i0, i1, i2] = indices;
        const v0 = baseVertices[i0];
        const v1 = baseVertices[i1];
        const v2 = baseVertices[i2];

        // 3D face normal
        const ax = v1[0] - v0[0];
        const ay = v1[1] - v0[1];
        const az = v1[2] - v0[2];
        const bx = v2[0] - v0[0];
        const by = v2[1] - v0[1];
        const bz = v2[2] - v0[2];
        const nx = ay * bz - az * by;
        const ny = az * bx - ax * bz;
        const nz = ax * by - ay * bx;
        const nLen = Math.hypot(nx, ny, nz) || 1;

        // Rotate normal to world space
        const [rnx, rny, rnz] = rotate(nx / nLen, ny / nLen, nz / nLen);

        // Dot product with directional light
        const dot = Math.max(0, (rnx * lx + rny * ly + rnz * lz) / lLen);
        const brightness = 0.2 + dot * 0.8;

        const p0 = projVertices[i0];
        const p1 = projVertices[i1];
        const p2 = projVertices[i2];

        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.closePath();

        // Shading: deep rich violet with specular highlights
        const r = Math.round(26 + brightness * 42);
        const g = Math.round(18 + brightness * 32);
        const b = Math.round(52 + brightness * 105);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(139, 92, 246, ${0.35 + brightness * 0.45})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 5. Draw wireframe vertices
      projVertices.forEach((p) => {
        if (p.depth > -0.6) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = '#C4B5FD';
          ctx.fill();
        }
      });

      // 6. Orbiting Satellites (4 nodes)
      const satCount = 4;
      const satRadius = 2.2;
      for (let i = 0; i < satCount; i++) {
        const satAngle = -elapsed * 0.55 + (i * Math.PI * 2) / satCount;
        const sx = Math.cos(satAngle) * satRadius;
        const sy = Math.sin(satAngle * 2.5) * 0.35;
        const sz = Math.sin(satAngle) * satRadius;

        const satProj = project(sx, sy, sz);

        // Satellite body
        const satSize = Math.max(2.5, 4.5 * (4.2 / (4.2 + satProj.depth)));
        ctx.beginPath();
        ctx.arc(satProj.px, satProj.py, satSize, 0, Math.PI * 2);
        ctx.fillStyle = '#C4B5FD';
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Satellite label
        if (satProj.depth > 0) {
          ctx.fillStyle = 'rgba(196, 181, 253, 0.7)';
          ctx.font = '8px monospace';
          ctx.fillText(`N${i + 1}`, satProj.px + satSize + 3, satProj.py + 3);
        }
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeRoute]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block" />;
};

const RockyHomepage3DInterface: React.FC<{ interactive: boolean }> = () => {
  const [activeRoute, setActiveRoute] = useState<'origin' | 'about' | 'projects' | 'contact'>('origin');
  const [shockwaveCount, setShockwaveCount] = useState(0);

  const triggerShockwave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShockwaveCount((c) => c + 1);
  };

  return (
    <div
      onClick={triggerShockwave}
      className="relative w-full h-full bg-[#080415] text-[#FAF9F5] font-mono flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* 3D Vector & Scene Canvas */}
      <SpatialVectorCanvas activeRoute={activeRoute} shockwaveCount={shockwaveCount} />

      {/* Top HUD Overlay */}
      <div className="relative z-10 flex items-center justify-between p-3.5 border-b border-violet-950/60 bg-[#080415]/70 backdrop-blur-xs text-[10px]">
        <div className="flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-semibold text-white">SPATIAL SCENE GRAPH // 3D VECTOR ENGINE</span>
          <span className="text-violet-400/50 hidden sm:inline">| ROTATION INERTIA ON</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-[9px] px-1.5 py-0.5 bg-emerald-950/70 border border-emerald-800/60 rounded-xs">
            FPS: 60.0
          </span>
          <span className="text-violet-300 font-mono text-[9px]">FOV: 45°</span>
        </div>
      </div>

      {/* Center Interactive Helper */}
      <div className="relative z-10 pointer-events-none text-center self-center my-auto">
        <div className="text-[10px] text-violet-300/40 tracking-widest uppercase">
          [ POINTER DRIVEN ORBIT · CLICK TO PULSE ]
        </div>
        {shockwaveCount > 0 && (
          <div className="text-[9px] text-violet-400 animate-ping mt-1 font-semibold">
            + SPATIAL BEACON DISPATCHED
          </div>
        )}
      </div>

      {/* Bottom Spatial Route Controller */}
      <div className="relative z-10 p-3.5 border-t border-violet-950/60 bg-[#080415]/80 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-violet-400/60 mr-1">SPATIAL ROUTES:</span>
          {(['origin', 'about', 'projects', 'contact'] as const).map((route) => (
            <button
              key={route}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveRoute(route);
              }}
              className={`px-2 py-0.5 rounded-xs uppercase tracking-wider text-[9px] transition-colors cursor-pointer ${
                activeRoute === route
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-violet-950/40 text-violet-300/60 hover:text-white'
              }`}
            >
              /{route === 'origin' ? '' : route}
            </button>
          ))}
        </div>

        <div className="text-[9px] text-violet-400/60 font-mono">
          NODES: 4 · FACES: 20 · SHOCKWAVES: {shockwaveCount}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PROJECT 03: MELIUS-LIKE — Generative AI Product Canvas & Cylindrical Carousel
   ========================================================================= */
interface AiModel {
  id: string;
  name: string;
  developer: string;
  category: 'Video' | 'Image' | 'Audio' | 'Motion';
  tag: string;
  specs: string;
  context: string;
  fidelityScore: number;
  promptExample: string;
  color: string;
}

const AI_MODELS: AiModel[] = [
  {
    id: 'sora-2',
    name: 'Sora Video v2.1',
    developer: 'OpenAI',
    category: 'Video',
    tag: 'Diffusion Transformer',
    specs: '1080p 60fps · Spatio-temporal Latent',
    context: '120s duration',
    fidelityScore: 98,
    promptExample: 'Cinematic drone shot over mist-covered ancient Kyoto temple at dusk.',
    color: '#8B5CF6',
  },
  {
    id: 'flux-pro',
    name: 'Flux.1 Pro High-Res',
    developer: 'Black Forest Labs',
    category: 'Image',
    tag: 'Flow Matching 12B',
    specs: '2048x2048 Native · Typography Coherent',
    context: 'Dense Text Guidance',
    fidelityScore: 96,
    promptExample: 'Letterpress exhibition poster with crisp Cormorant Garamond typography on cotton paper.',
    color: '#3B82F6',
  },
  {
    id: 'eleven-v3',
    name: 'ElevenLabs Voice v3',
    developer: 'ElevenLabs',
    category: 'Audio',
    tag: 'Latent Speech Engine',
    specs: '48kHz Ultra-HD · Emotional Inflection',
    context: 'Zero-shot timbre',
    fidelityScore: 94,
    promptExample: 'Whispered scholarly commentary on manuscript preservation and tactile ink.',
    color: '#F59E0B',
  },
  {
    id: 'kling-motion',
    name: 'Kling 1.5 Motion',
    developer: 'Kuaishou',
    category: 'Motion',
    tag: 'Trajectory Warp',
    specs: '3D Camera Orbit · Fluid Dynamics',
    context: '4K Multi-Shot',
    fidelityScore: 92,
    promptExample: 'Spiral camera tracking around floating crystalline polyhedron with light refractions.',
    color: '#10B981',
  },
  {
    id: 'luma-dream',
    name: 'Luma Dream Machine',
    developer: 'Luma AI',
    category: 'Video',
    tag: 'Continuous Motion',
    specs: 'Temporal Consistency · Action Velocity',
    context: 'Realistic Physics',
    fidelityScore: 91,
    promptExample: 'A single unbroken shot through architectural archways revealing open ocean.',
    color: '#EC4899',
  },
  {
    id: 'midjourney-6',
    name: 'Midjourney v6.1',
    developer: 'Midjourney',
    category: 'Image',
    tag: 'Aesthetic Engine',
    specs: 'Photorealism & Organic Texture Synthesis',
    context: 'High Coherence',
    fidelityScore: 95,
    promptExample: 'Archival gelatin silver print of mid-century industrial typography and drafting tools.',
    color: '#6366F1',
  },
];

const MeliusLikeInterface: React.FC<{ interactive: boolean }> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedModel, setSelectedModel] = useState<AiModel | null>(null);

  const filteredModels = AI_MODELS.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRotationAngle((prev) => prev + 360 / Math.max(filteredModels.length, 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRotationAngle((prev) => prev - 360 / Math.max(filteredModels.length, 1));
  };

  return (
    <div className="relative w-full h-full bg-[#0c0915] text-[#FAF9F5] font-mono flex flex-col justify-between p-3.5 sm:p-4.5 select-none overflow-hidden text-xs">
      {/* Top Bar: Category Filtering & Studio Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-3 border-b border-amber-950/60 z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white text-[11px]">AI MODEL CATALOGUE</span>
          <span className="text-amber-300/40 text-[10px] hidden sm:inline">
            // CYLINDRICAL 3D PERSPECTIVE
          </span>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1 bg-[#171226] p-0.5 rounded-xs border border-amber-950/60 text-[10px]">
          {['All', 'Video', 'Image', 'Audio', 'Motion'].map((cat) => (
            <button
              key={cat}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedCategory(cat);
              }}
              className={`px-2 py-1 rounded-xs transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white font-medium'
                  : 'text-amber-200/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Center 3D Cylindrical Carousel Viewport */}
      <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden [perspective:1000px]">
        {/* Rotation Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-30 p-2 bg-[#1b1430]/80 hover:bg-[#251a44] border border-amber-950/80 rounded-full text-amber-200 transition-colors cursor-pointer"
          aria-label="Rotate previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 z-30 p-2 bg-[#1b1430]/80 hover:bg-[#251a44] border border-amber-950/80 rounded-full text-amber-200 transition-colors cursor-pointer"
          aria-label="Rotate next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* 3D Cylinder Stage */}
        <div
          className="relative w-[180px] sm:w-[220px] h-[160px] sm:h-[180px] transition-transform duration-700 ease-out [transform-style:preserve-3d]"
          style={{
            transform: `rotateY(${rotationAngle}deg)`,
          }}
        >
          {filteredModels.map((model, idx) => {
            const count = filteredModels.length;
            const angleStep = 360 / count;
            const itemAngle = idx * angleStep;
            const radius = count > 3 ? 180 : 130;

            return (
              <div
                key={model.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedModel(model);
                }}
                className="absolute inset-0 bg-[#161128] border border-amber-900/60 rounded-xs p-3.5 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-amber-400 hover:scale-105 transition-all cursor-pointer select-none backface-visible"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-950/60 text-[9px]">
                    <span className="text-amber-400 font-semibold">{model.category}</span>
                    <span className="text-amber-200/50">{model.developer}</span>
                  </div>
                  <div className="text-[12px] font-medium text-white mt-1.5 leading-tight">
                    {model.name}
                  </div>
                  <div className="text-[9px] text-amber-300/60 mt-1">{model.tag}</div>
                </div>

                <div>
                  <div className="text-[9px] text-amber-200/40 truncate">{model.specs}</div>
                  <div className="mt-1.5 flex items-center justify-between text-[9px]">
                    <span className="text-amber-400">Score: {model.fidelityScore}%</span>
                    <span className="text-amber-200/50 hover:text-white flex items-center gap-0.5">
                      Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Detail Modal / Inspection Drawer */}
      {selectedModel && (
        <div className="absolute inset-0 bg-[#080511]/90 backdrop-blur-sm z-40 p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-950/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-white font-medium text-sm">{selectedModel.name}</span>
                <span className="text-amber-400/60 text-[10px]">by {selectedModel.developer}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedModel(null);
                }}
                className="p-1 rounded-xs hover:bg-[#1f1638] text-amber-300/60 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="p-2.5 bg-[#140e24] border border-amber-950/60 rounded-xs space-y-1">
                <div className="text-[9px] text-amber-400/60 uppercase">Architecture Spec</div>
                <div className="text-[11px] text-white font-medium">{selectedModel.tag}</div>
                <div className="text-[10px] text-amber-200/60">{selectedModel.specs}</div>
              </div>
              <div className="p-2.5 bg-[#140e24] border border-amber-950/60 rounded-xs space-y-1">
                <div className="text-[9px] text-amber-400/60 uppercase">Context Envelope</div>
                <div className="text-[11px] text-white font-medium">{selectedModel.context}</div>
                <div className="text-[10px] text-emerald-400">Benchmark: {selectedModel.fidelityScore}/100</div>
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-[#140e24] border border-amber-950/60 rounded-xs">
              <div className="text-[9px] text-amber-400/60 uppercase mb-1">Synthesized Prompt Specimen</div>
              <div className="text-[11px] text-amber-100 font-sans italic">
                "{selectedModel.promptExample}"
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-950/80 flex items-center justify-between text-[10px]">
            <span className="text-amber-300/60">STATUS: VERIFIED SPECIFICATION</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedModel(null);
              }}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-xs transition-colors cursor-pointer"
            >
              Close Specimen
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer HUD */}
      <div className="pt-2 border-t border-amber-950/60 flex items-center justify-between text-[9px] text-amber-300/50 font-mono z-20">
        <span>RADIAL ANGLE: {Math.round(rotationAngle)}°</span>
        <span>MODELS LOADED: {filteredModels.length}</span>
        <span>CLICK CARD FOR SPECIFICATION MODAL</span>
      </div>
    </div>
  );
};
