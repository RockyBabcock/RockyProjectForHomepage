import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github, ExternalLink, Activity, Sparkles, Layers, FileCode } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { EditorialHero } from '../components/EditorialHero';
import { TypographicMarquee } from '../components/TypographicMarquee';
import { ProjectRail } from '../components/ProjectRail';
import { TechnicalIndex } from '../components/TechnicalIndex';
import { projectsData } from '../data/projects';
import { WatercolorStain } from '../components/WatercolorStain';
import { DigitalArtifactFrame } from '../components/DigitalArtifactFrame';
import { ProjectArchitectureDiagram } from '../components/ProjectArchitectureDiagram';
import { MagneticLink } from '../components/MagneticLink';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CataloguePageProps {
  onOpenStatement: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({ onOpenStatement }) => {
  const { localizeText, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  usePageMeta({
    title: `Rocky Babcock — Creative Technology & Selected Work`,
    description: 'Cinematic creative technology portfolio for Rocky Babcock — verified developer tools, spatial 3D web systems, and generative AI product canvases.',
  });

  const selectedWorkRef = useRef<HTMLDivElement>(null);

  const scrollToSelectedWork = () => {
    selectedWorkRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // The 3 Real Projects
  const p1 = projectsData.find((p) => p.slug === 'svg-downloader') || projectsData[0];
  const p2 = projectsData.find((p) => p.slug === 'rockyhomepage3D') || projectsData[1];
  const p3 = projectsData.find((p) => p.slug === 'melius-like') || projectsData[2];

  return (
    <div className="w-full relative transition-colors duration-300">
      {/* =========================================================================
          01. OPENING: Editorial Hero + Ambient Marquee + Desktop Timeline Rail
          ========================================================================= */}
      <EditorialHero
        onScrollToArchive={scrollToSelectedWork}
        onOpenStatement={onOpenStatement}
      />

      <TypographicMarquee />

      {/* Desktop Sticky Timeline Rail (tracks 01, 02, 03) */}
      <ProjectRail projects={[p1, p2, p3]} />

      {/* =========================================================================
          02. SELECTED WORK: Architectural Overview of the 3 Flagship Pillars
          ========================================================================= */}
      <section
        id="selected-work"
        ref={selectedWorkRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12 border-b border-current/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-8 border-b border-current/10">
          <div className="space-y-1">
            <span
              className={`text-[11px] font-mono uppercase tracking-[0.24em] ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ SELECTED WORK · 2024—2026 ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              three systems<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs sm:text-right">
            Verified developer tools, spatial 3D graphics & generative AI canvases
          </p>
        </div>

        {/* 3 Pillars Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {/* Pillar 01: SYSTEM */}
          <div
            onClick={() => scrollToSection('project-plate-01')}
            className={`group p-6 border rounded-xs transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-[#0a0620]/60 border-violet-950/60 hover:border-violet-600/60 hover:bg-[#0f0930]'
                : 'bg-[#FAF9F5]/70 border-[#E2DFD2] hover:border-[#8B5CF6]/60 hover:bg-[#FAF9F5]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 text-xs font-mono">
              <span className="font-serif text-2xl opacity-40 font-light">01</span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                SYSTEM
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="font-serif text-2xl font-light lowercase group-hover:italic transition-transform duration-200">
                {localizeText(p1.title)}
              </h3>
              <p className="text-xs opacity-75 font-sans leading-relaxed font-light line-clamp-3">
                {localizeText(p1.summary)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[11px] font-mono opacity-70">
              <span>{p1.tools.slice(0, 3).join(' · ')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8B5CF6]" />
            </div>
          </div>

          {/* Pillar 02: SPACE */}
          <div
            onClick={() => scrollToSection('project-plate-02')}
            className={`group p-6 border rounded-xs transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-[#0a0620]/60 border-violet-950/60 hover:border-violet-600/60 hover:bg-[#0f0930]'
                : 'bg-[#FAF9F5]/70 border-[#E2DFD2] hover:border-[#8B5CF6]/60 hover:bg-[#FAF9F5]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 text-xs font-mono">
              <span className="font-serif text-2xl opacity-40 font-light">02</span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                SPACE
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="font-serif text-2xl font-light lowercase group-hover:italic transition-transform duration-200">
                {localizeText(p2.title)}
              </h3>
              <p className="text-xs opacity-75 font-sans leading-relaxed font-light line-clamp-3">
                {localizeText(p2.summary)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[11px] font-mono opacity-70">
              <span>{p2.tools.slice(0, 3).join(' · ')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8B5CF6]" />
            </div>
          </div>

          {/* Pillar 03: INTELLIGENCE */}
          <div
            onClick={() => scrollToSection('project-plate-03')}
            className={`group p-6 border rounded-xs transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-[#0a0620]/60 border-violet-950/60 hover:border-violet-600/60 hover:bg-[#0f0930]'
                : 'bg-[#FAF9F5]/70 border-[#E2DFD2] hover:border-[#8B5CF6]/60 hover:bg-[#FAF9F5]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10 text-xs font-mono">
              <span className="font-serif text-2xl opacity-40 font-light">03</span>
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                INTELLIGENCE
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <h3 className="font-serif text-2xl font-light lowercase group-hover:italic transition-transform duration-200">
                {localizeText(p3.title)}
              </h3>
              <p className="text-xs opacity-75 font-sans leading-relaxed font-light line-clamp-3">
                {localizeText(p3.summary)}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-[11px] font-mono opacity-70">
              <span>{p3.tools.slice(0, 3).join(' · ')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8B5CF6]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. PROJECT 01 / SYSTEM: svg-downloader
          04. TECHNICAL SPECIMEN: Verification Pipeline + Interactive Registry
          ========================================================================= */}
      <section
        id="project-plate-01"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-20 border-b border-current/10 relative"
      >
        {/* Subtle Pigment Accent */}
        <div className="absolute top-12 right-0 w-80 h-72 pointer-events-none opacity-30 z-0">
          <WatercolorStain variant="corner-pool" palette="cool" opacity={isDark ? 0.3 : 0.6} />
        </div>

        {/* Project Header Annotation */}
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-current/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl sm:text-5xl font-light opacity-30 select-none">
                01
              </span>
              <span className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                SYSTEM · TECHNICAL SOFTWARE SPECIMEN
              </span>
              <span className="opacity-40">·</span>
              <span className="opacity-75">{p1.year}</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="opacity-70 lowercase">{p1.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {p1.demo && (
                <a
                  href={p1.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-3 h-3 text-[#8B5CF6]" />
                  <span>live</span>
                </a>
              )}
              {p1.github && (
                <a
                  href={p1.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <Github className="w-3 h-3" />
                  <span>source</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Title & Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline pt-2">
            <div className="lg:col-span-8 space-y-3">
              <Link to={`/projects/${p1.slug}`} className="group block">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase">
                  <span className="group-hover:italic transition-all duration-300">
                    {localizeText(p1.title)}
                  </span>
                </h3>
              </Link>
              <p className="text-base sm:text-lg opacity-85 font-sans leading-relaxed font-light max-w-2xl">
                {localizeText(p1.description)}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 lg:text-right font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider opacity-50 block">instruments & stack:</span>
              <p className="font-medium opacity-90 leading-relaxed">
                {p1.tools.join(' · ')}
              </p>
              <div className="pt-2">
                <Link
                  to={`/projects/${p1.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-widest font-mono font-medium transition-colors ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>view project documentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* TECHNICAL SPECIMEN: Architectural Data Flow Diagram */}
        <div className="pt-10 pb-6">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="uppercase tracking-widest">[ SPECIMEN 01 / DATA FLOW & PIPELINE ]</span>
            <span className="hidden sm:inline">QUERY → RESOLUTION → FAST XML → SHA-256</span>
          </div>
          <ProjectArchitectureDiagram project={p1} />
        </div>

        {/* TECHNICAL SPECIMEN: Live Interactive Software Specimen */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="uppercase tracking-widest">LIVE INTERACTIVE REGISTRY INTERFACE</span>
            </span>
            <span className="hidden sm:inline">Search, preview, toggle formats, copy raw code</span>
          </div>
          <DigitalArtifactFrame
            project={p1}
            aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            priority={true}
            showOverlayAction={false}
          />
        </div>
      </section>

      {/* =========================================================================
          05. PROJECT 02 / SPACE: rockyhomepage3D
          06. SPATIAL SPECIMEN: Scene Graph Pipeline + Interactive 3D Vector Engine
          ========================================================================= */}
      <section
        id="project-plate-02"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-20 border-b border-current/10 relative"
      >
        {/* Subtle Warm Pigment Accent */}
        <div className="absolute top-12 left-0 w-80 h-72 pointer-events-none opacity-30 z-0">
          <WatercolorStain variant="corner-pool" palette="warm" opacity={isDark ? 0.3 : 0.6} />
        </div>

        {/* Project Header Annotation */}
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-current/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl sm:text-5xl font-light opacity-30 select-none">
                02
              </span>
              <span className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                SPACE · SPATIAL 3D SPECIMEN
              </span>
              <span className="opacity-40">·</span>
              <span className="opacity-75">{p2.year}</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="opacity-70 lowercase">{p2.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {p2.demo && (
                <a
                  href={p2.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-3 h-3 text-[#8B5CF6]" />
                  <span>live</span>
                </a>
              )}
              {p2.github && (
                <a
                  href={p2.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <Github className="w-3 h-3" />
                  <span>source</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Title & Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline pt-2">
            <div className="lg:col-span-8 space-y-3">
              <Link to={`/projects/${p2.slug}`} className="group block">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase">
                  <span className="group-hover:italic transition-all duration-300">
                    {localizeText(p2.title)}
                  </span>
                </h3>
              </Link>
              <p className="text-base sm:text-lg opacity-85 font-sans leading-relaxed font-light max-w-2xl">
                {localizeText(p2.description)}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 lg:text-right font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider opacity-50 block">instruments & stack:</span>
              <p className="font-medium opacity-90 leading-relaxed">
                {p2.tools.join(' · ')}
              </p>
              <div className="pt-2">
                <Link
                  to={`/projects/${p2.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-widest font-mono font-medium transition-colors ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>view project documentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SPATIAL SPECIMEN: Architectural Pipeline Diagram */}
        <div className="pt-10 pb-6">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="uppercase tracking-widest">[ SPECIMEN 02 / SPATIAL PIPELINE ]</span>
            <span className="hidden sm:inline">SCENE GRAPH → CAMERA SPRING → 2D VECTOR SHADER → SPATIAL ROUTES</span>
          </div>
          <ProjectArchitectureDiagram project={p2} />
        </div>

        {/* SPATIAL SPECIMEN: Live Interactive 3D Vector Engine */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="uppercase tracking-widest">LIVE INTERACTIVE 3D VECTOR SPECIMEN</span>
            </span>
            <span className="hidden sm:inline">Pointer-driven orbit · 60fps canvas rasterization · route transitions</span>
          </div>
          <DigitalArtifactFrame
            project={p2}
            aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            priority={false}
            showOverlayAction={false}
          />
        </div>
      </section>

      {/* =========================================================================
          07. PROJECT 03 / INTELLIGENCE: melius-like
          08. AI SPECIMEN: Generative Taxonomy Pipeline + Cylindrical Model Carousel
          ========================================================================= */}
      <section
        id="project-plate-03"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-24 border-b border-current/10 relative"
      >
        {/* Subtle Ochre Pigment Accent */}
        <div className="absolute top-12 right-0 w-80 h-72 pointer-events-none opacity-30 z-0">
          <WatercolorStain variant="corner-pool" palette="ochre" opacity={isDark ? 0.3 : 0.6} />
        </div>

        {/* Project Header Annotation */}
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-current/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl sm:text-5xl font-light opacity-30 select-none">
                03
              </span>
              <span className={`text-[11px] uppercase font-mono tracking-wider font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                INTELLIGENCE · AI PRODUCT SPECIMEN
              </span>
              <span className="opacity-40">·</span>
              <span className="opacity-75">{p3.year}</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="opacity-70 lowercase">{p3.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {p3.github && (
                <a
                  href={p3.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
                >
                  <Github className="w-3 h-3" />
                  <span>source</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Title & Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline pt-2">
            <div className="lg:col-span-8 space-y-3">
              <Link to={`/projects/${p3.slug}`} className="group block">
                <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase">
                  <span className="group-hover:italic transition-all duration-300">
                    {localizeText(p3.title)}
                  </span>
                </h3>
              </Link>
              <p className="text-base sm:text-lg opacity-85 font-sans leading-relaxed font-light max-w-2xl">
                {localizeText(p3.description)}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 lg:text-right font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider opacity-50 block">instruments & stack:</span>
              <p className="font-medium opacity-90 leading-relaxed">
                {p3.tools.join(' · ')}
              </p>
              <div className="pt-2">
                <Link
                  to={`/projects/${p3.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-widest font-mono font-medium transition-colors ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6]'
                  }`}
                >
                  <span>view project documentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* AI SPECIMEN: Architectural Multi-Modal Pipeline Diagram */}
        <div className="pt-10 pb-6">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="uppercase tracking-widest">[ SPECIMEN 03 / MULTI-MODAL PIPELINE ]</span>
            <span className="hidden sm:inline">CATEGORY TAXONOMY → MODEL RUNTIME → CYLINDRICAL CAROUSEL → SPEC DRAWER</span>
          </div>
          <ProjectArchitectureDiagram project={p3} />
        </div>

        {/* AI SPECIMEN: Live Interactive 3D Cylindrical Model Carousel */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-3 text-xs font-mono opacity-70">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-widest">LIVE INTERACTIVE CYLINDRICAL CAROUSEL SPECIMEN</span>
            </span>
            <span className="hidden sm:inline">Radial 3D perspective · model category filters · interactive inspection drawer</span>
          </div>
          <DigitalArtifactFrame
            project={p3}
            aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
            priority={false}
            showOverlayAction={false}
          />
        </div>
      </section>

      {/* =========================================================================
          09. TECHNICAL INDEX: Frontend, 3D, AI, Tools (Dense, calm, no skill bars)
          ========================================================================= */}
      <TechnicalIndex />
    </div>
  );
};
