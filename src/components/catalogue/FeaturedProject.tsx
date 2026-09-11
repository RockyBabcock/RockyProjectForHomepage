import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, ChevronDown, ChevronUp, Cpu, Terminal, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { WatercolorStain } from '../WatercolorStain';
import { MagneticLink } from '../MagneticLink';
import { ProjectArchitectureDiagram } from '../ProjectArchitectureDiagram';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTopology, setShowTopology] = useState(false);
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const description = localizeText(project.description);

  // Section reference for sticky & scroll tracking
  const sceneRef = useRef<HTMLElement>(null);

  // ---------------------------------------------------------------------------
  // Smooth Interpolated Cursor Tracking (Subtle perspective & plane shifts)
  // ---------------------------------------------------------------------------
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const targetCursor = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = (e.clientY / window.innerHeight) * 2 - 1;
      targetCursor.current = { x: xNorm, y: yNorm };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const loop = () => {
      setCursor((prev) => ({
        x: prev.x + (targetCursor.current.x - prev.x) * 0.08,
        y: prev.y + (targetCursor.current.y - prev.y) * 0.08,
      }));
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Scroll Driven Choreography
  // When entering: media scale 0.90 -> 1.00, title translateY 60 -> 0, tech graphics draw in
  // When leaving: media scales down slightly (1.00 -> 0.96), title shifts upward, tech fades
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  // Entrance -> Center -> Exit phases across scroll
  // [0, 0.35] = Entrance to Center
  // [0.35, 0.65] = Stable Center Scene
  // [0.65, 1.0] = Exit
  const mediaScale = useTransform(scrollYProgress, [0, 0.38, 0.7, 1], [0.90, 1.00, 1.00, 0.96]);
  const mediaY = useTransform(scrollYProgress, [0, 0.38, 0.7, 1], [70, 0, 0, -50]);
  const titleY = useTransform(scrollYProgress, [0, 0.38, 0.7, 1], [60, 0, 0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.3]);
  const techOpacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0.1, 0.85, 0.85, 0.1]);
  const metaY = useTransform(scrollYProgress, [0.1, 0.4], [35, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // Determine Project Type / Visual Mode for bespoke technical overlay
  const isSvgRegistry = project.slug.includes('svg') || project.slug.includes('asset');
  const is3D = project.slug.includes('3d') || project.slug.includes('rockyhomepage');
  const isMelius = project.slug.includes('melius') || project.slug.includes('ai');

  return (
    <section
      id={`project-scene-${project.number}`}
      ref={sceneRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative min-h-[105vh] flex flex-col justify-center py-16 sm:py-24 lg:py-32 transition-colors duration-500 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* =======================================================================
          LAYER 1: BACKGROUND LAYER (Atmosphere, Watercolor wash & radiant glow)
          ======================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft Organic Wash Bleed */}
        <div className="absolute -bottom-24 -right-16 w-[750px] lg:w-[1100px] h-[550px] lg:h-[750px] opacity-60">
          <WatercolorStain
            variant="pool-deep"
            palette={isDark ? 'violet' : 'warm'}
            intensity="deep"
            seed={3}
            opacity={isDark ? 0.35 : 0.6}
          />
        </div>

        {/* Ambient Top Counter-Balance Halo */}
        <div
          className={`absolute -top-32 -left-20 w-[600px] lg:w-[900px] h-[600px] lg:h-[900px] rounded-full filter blur-[140px] pointer-events-none transition-opacity duration-700 ${
            isDark ? 'bg-violet-900/20' : 'bg-purple-300/20'
          } ${isHovered ? 'opacity-90' : 'opacity-40'}`}
        />
      </div>

      {/* =======================================================================
          LAYER 2: TECHNICAL OVERLAY LAYER
          Bespoke line art, network signals, perspective planes, or circular carousel geometry
          ======================================================================= */}
      <motion.div
        style={{
          opacity: techOpacity,
          x: cursor.x * -6,
          y: cursor.y * -6,
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Fine Technical Coordinate Crosshair Grid */}
            <pattern id="scene-tech-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 40 80 M 0 40 L 80 40"
                stroke={isDark ? '#8B5CF6' : '#171717'}
                strokeWidth="0.5"
                strokeOpacity={isDark ? '0.07' : '0.04'}
              />
              <path
                d="M 37 40 h 6 M 40 37 v 6"
                stroke={isDark ? '#A78BFA' : '#7C3AED'}
                strokeWidth="0.8"
                strokeOpacity={isDark ? (isHovered ? '0.35' : '0.18') : (isHovered ? '0.25' : '0.12')}
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#scene-tech-grid)" />

          {/* Bespoke Visual Geometries based on project slug */}
          {isSvgRegistry && (
            /* SVG Downloader: subtle data / network lines & extraction bus paths */
            <g>
              {/* Main signal spine vector */}
              <path
                d="M 0,220 C 350,220 520,380 960,380 S 1400,260 1920,260"
                fill="none"
                stroke={isDark ? 'rgba(139, 92, 246, 0.22)' : 'rgba(0, 0, 0, 0.1)'}
                strokeWidth="1.2"
                strokeDasharray="6 6"
              />
              <path
                d="M 0,220 C 350,220 520,380 960,380 S 1400,260 1920,260"
                fill="none"
                stroke={isDark ? '#C4B5FD' : '#7C3AED'}
                strokeWidth="1.8"
                strokeDasharray="18 200"
                className="animate-[dash_10s_linear_infinite]"
              />

              {/* Parallel cryptographic verification channel */}
              <path
                d="M 120,180 L 750,180 L 920,320 L 1600,320"
                fill="none"
                stroke={isDark ? 'rgba(167, 139, 250, 0.25)' : 'rgba(124, 58, 237, 0.15)'}
                strokeWidth="1"
                strokeDasharray="3 7"
              />

              {/* Data Node Indicators */}
              <circle cx="750" cy="180" r="3" fill={isDark ? '#C4B5FD' : '#7C3AED'} />
              <circle cx="920" cy="320" r="3.5" fill={isDark ? '#A78BFA' : '#8B5CF6'} />
              <circle cx="1600" cy="320" r="3" fill={isDark ? '#C4B5FD' : '#7C3AED'} />

              {/* Engineering Readout */}
              <text
                x="88%"
                y="18%"
                fontFamily="monospace"
                fontSize="9"
                letterSpacing="0.28em"
                fill={isDark ? '#A78BFA' : '#171717'}
                fillOpacity={isHovered ? '0.6' : '0.35'}
                textAnchor="end"
              >
                PIPE::DOM_SCAN // SHA256_INTEGRITY
              </text>
            </g>
          )}

          {is3D && (
            /* rockyhomepage3D: depth / perspective / orbital projection lines */
            <g>
              <line
                x1="10%" y1="90%" x2="90%" y2="10%"
                stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 0, 0, 0.08)'}
                strokeWidth="0.8"
                strokeDasharray="4 6"
              />
              <line
                x1="10%" y1="10%" x2="90%" y2="90%"
                stroke={isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 0, 0, 0.08)'}
                strokeWidth="0.8"
                strokeDasharray="4 6"
              />
              <ellipse
                cx="50%" cy="50%" rx="520" ry="240"
                fill="none"
                stroke={isDark ? '#A78BFA' : '#7C3AED'}
                strokeWidth="1"
                strokeDasharray="8 8"
                strokeOpacity={isHovered ? '0.4' : '0.2'}
                className="origin-center animate-[spin_80s_linear_infinite]"
              />
            </g>
          )}

          {isMelius && (
            /* melius-like: circular / cylindrical carousel-inspired geometry */
            <g>
              <circle
                cx="65%" cy="45%" r="380"
                fill="none"
                stroke={isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(0, 0, 0, 0.1)'}
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="65%" cy="45%" r="460"
                fill="none"
                stroke={isDark ? '#C4B5FD' : '#7C3AED'}
                strokeWidth="1.2"
                strokeDasharray="24 180"
                strokeOpacity={isHovered ? '0.5' : '0.25'}
                className="origin-center animate-[spin_60s_linear_infinite]"
              />
            </g>
          )}
        </svg>
      </motion.div>

      {/* =======================================================================
          CORE SCENE STAGE (Desktop 60–75vw Dominant Media with Layered Title)
          ======================================================================= */}
      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 z-10">
        {/* Top Minimal Scene Index Bar */}
        <motion.div
          style={{ y: metaY, opacity: metaOpacity }}
          className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] pb-6 sm:pb-8 border-b border-current/10"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="font-semibold text-violet-400">SPECIMEN // #{project.number}</span>
            <span className="opacity-30">/</span>
            <span className="opacity-70">{project.category} · {project.type}</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 opacity-60 text-[10px]">
            <span>{project.year} PRODUCTION</span>
            <span className="opacity-30">·</span>
            <span>AUTONOMOUS ENGINE</span>
          </div>
        </motion.div>

        {/* Spatial Composition Stage */}
        <div className="relative pt-6 sm:pt-10 lg:pt-12">
          {/* ===================================================================
              LAYER 3: MONUMENTAL TYPOGRAPHY LAYER
              clamp(44px, 6vw, 92px) positioned independently from media,
              interlocking in z-space (z-20) with graceful negative margins
              =================================================================== */}
          <motion.div
            style={{
              y: titleY,
              opacity: titleOpacity,
              x: cursor.x * 10,
            }}
            className="relative z-20 pointer-events-auto will-change-transform max-w-[92vw] lg:max-w-[70vw]"
          >
            {/* Colossal Title */}
            <Link
              to={`/projects/${project.slug}`}
              data-cursor="SHOW"
              className="group inline-block focus:outline-none"
            >
              <h3
                className={`font-serif font-light text-[clamp(44px,6.2vw,96px)] tracking-[-0.045em] leading-[0.85] lowercase transition-transform duration-500 select-none ${
                  isHovered ? 'translate-x-2' : ''
                }`}
              >
                <span>{title}</span>
                <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
              </h3>
            </Link>

            {/* Architectural Summary Sub-Lead floating across the lower title */}
            <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl opacity-85 font-light leading-snug mt-3 sm:mt-5 max-w-3xl">
              {summary}
            </p>
          </motion.div>

          {/* ===================================================================
              LAYER 4: REAL MEDIA LAYER (DOMINANT VISUAL 60–75vw)
              Extends beyond normal content boundaries with layered shadow & perspective
              =================================================================== */}
          <motion.div
            style={{
              scale: mediaScale,
              y: mediaY,
              x: cursor.x * -14,
              transform: `perspective(1400px) rotateX(${cursor.y * -4}deg) rotateY(${cursor.x * 4}deg)`,
            }}
            onClick={() => navigate(`/projects/${project.slug}`)}
            data-cursor="EXAMINE"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(`/projects/${project.slug}`);
            }}
            aria-label={`View specimen ${title}`}
            className="relative z-10 mt-6 sm:mt-8 lg:-mt-10 lg:ml-auto w-full lg:w-[72vw] max-w-[1380px] cursor-pointer will-change-transform group/media"
          >
            {/* Multi-layered Glass Carrier Frame */}
            <div
              className={`relative p-2.5 sm:p-4 rounded-sm transition-all duration-700 ease-out ${
                isDark
                  ? 'bg-[#08031d]/90 backdrop-blur-2xl border border-violet-700/35 shadow-[0_45px_130px_-30px_rgba(124,58,237,0.5)] group-hover/media:border-violet-400/60'
                  : 'bg-white/80 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_45px_100px_-30px_rgba(30,20,50,0.2)] group-hover/media:border-neutral-500'
              } ${isHovered ? 'shadow-[0_55px_150px_-25px_rgba(124,58,237,0.6)]' : ''}`}
            >
              {/* Corner Reticles */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-violet-400/80 pointer-events-none z-30" />

              {/* Real Project Media (Authentic Evidence — untouched ProjectMediaFrame) */}
              <div className="relative overflow-hidden rounded-xs">
                <div
                  className={`transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-[1.018]' : 'scale-100'
                  }`}
                >
                  <ProjectMediaFrame
                    project={project}
                    aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
                    isHovered={isHovered}
                    priority={true}
                    showCaption={false}
                  />
                </div>

                {/* Ambient Scanline & Sheen Glaze */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.06] via-transparent to-purple-400/[0.04] pointer-events-none opacity-60 group-hover/media:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Integrated Micro HUD Status Band */}
              <div className="pt-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] opacity-80">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-violet-400">SPECIMEN #{project.number}</span>
                  <span className="opacity-30">/</span>
                  <span className="lowercase font-semibold">{project.slug}</span>
                  <span className="hidden sm:inline opacity-30">/</span>
                  <span className="hidden sm:inline uppercase text-[9px] px-2 py-0.5 rounded-xs bg-current/5 border border-current/10">
                    {project.status || 'Verified Runtime'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden md:inline opacity-55">
                    {project.tools.slice(0, 4).join(' · ')}
                  </span>
                  <span className="text-violet-400 font-semibold flex items-center gap-1 group-hover/media:text-violet-300 transition-colors uppercase tracking-wider text-[10px]">
                    <span>Examine Specimen</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Glowing Depth Halo behind the Media Frame */}
            <div
              className={`absolute -inset-4 rounded-xl filter blur-3xl pointer-events-none -z-10 transition-opacity duration-700 ${
                isDark
                  ? 'bg-violet-600/25 group-hover/media:opacity-80'
                  : 'bg-purple-400/20 group-hover/media:opacity-60'
              } ${isHovered ? 'opacity-70' : 'opacity-30'}`}
            />
          </motion.div>

          {/* ===================================================================
              LAYER 5: METADATA & SYSTEM EXPLORATION LAYER
              Staggers into view gracefully; appears contextually on hover
              =================================================================== */}
          <motion.div
            style={{ y: metaY, opacity: metaOpacity }}
            className="relative z-20 pt-10 sm:pt-14 lg:pt-16 max-w-5xl space-y-8"
          >
            {/* Deep Technical Description */}
            <p className="text-[15px] sm:text-[17px] opacity-85 font-sans leading-relaxed font-light max-w-3xl">
              {description}
            </p>

            {/* Verified Tool Tokens */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-xs bg-current/5 border border-current/10"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Direct Action Controls & Architecture Drawer Trigger */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="VISIT"
                  className="py-3 px-6 rounded-xs bg-violet-600 text-white font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:bg-violet-500 transition-all uppercase tracking-wider"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="CODE"
                  className="py-3 px-6 rounded-xs border border-current/20 hover:border-violet-400 flex items-center gap-2 transition-colors uppercase tracking-wider"
                >
                  <span>Inspect Source</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}

              <MagneticLink strength={3}>
                <Link
                  to={`/projects/${project.slug}`}
                  data-cursor="SHOW"
                  className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 font-semibold uppercase tracking-wider text-[11px] transition-colors py-2"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticLink>

              {/* Topology Toggle Button */}
              <button
                onClick={() => setShowTopology(!showTopology)}
                className={`ml-auto py-2.5 px-4 rounded-xs border font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-violet-950/30 border-violet-800/40 hover:bg-violet-950/60 text-violet-200'
                    : 'bg-black/[0.04] border-black/10 hover:bg-black/[0.08] text-neutral-800'
                }`}
                aria-expanded={showTopology}
              >
                <Cpu className="w-3.5 h-3.5 text-violet-400" />
                <span>{showTopology ? 'Hide Architecture Topology' : 'Inspect Verified Architecture'}</span>
                {showTopology ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* Architecture Topology Drawer */}
            {showTopology && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4 overflow-hidden"
              >
                <ProjectArchitectureDiagram project={project} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

