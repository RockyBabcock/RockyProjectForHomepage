import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ExternalLink } from 'lucide-react';
import { WatercolorStain } from '../WatercolorStain';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { MagneticLink } from '../MagneticLink';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { projectsData } from '../../data/projects';

interface CatalogueHeroProps {
  onScrollToArchive: () => void;
  onOpenStatement: () => void;
}

export const CatalogueHero: React.FC<CatalogueHeroProps> = ({
  onScrollToArchive,
  onOpenStatement,
}) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { localizeText } = useLanguage();
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  const heroRef = useRef<HTMLElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Plane Cursor Tracking & Interpolation (Max 5–20px restrained shift)
  // ---------------------------------------------------------------------------
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const targetCursor = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 across viewport
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
  // Scroll Parallax & Multi-Plane Scaling
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.88]);
  const titleY = useTransform(scrollYProgress, [0, 0.8], [0, 75]);
  const mediaY = useTransform(scrollYProgress, [0, 0.8], [0, -115]);
  const mediaRotate = useTransform(scrollYProgress, [0, 0.8], [-2.4, 0.8]);
  const bgY = useTransform(scrollYProgress, [0, 0.8], [0, 130]);
  const techOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.03]);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[94vh] flex flex-col justify-between pt-8 sm:pt-12 lg:pt-14 pb-14 sm:pb-20 transition-colors duration-500 overflow-hidden ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* =======================================================================
          PLANE 1: Large Atmospheric Background
          ======================================================================= */}
      <motion.div
        style={{
          y: bgY,
          x: cursor.x * -7,
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Massive Organic Pigment Wash Bleed */}
        <div className="absolute -top-[12%] -left-[6%] w-[920px] lg:w-[1450px] h-[600px] lg:h-[920px] opacity-75">
          <WatercolorStain
            variant="hero-bleed"
            palette={isDark ? 'violet' : 'cool'}
            intensity="deep"
            seed={1}
            opacity={isDark ? 0.42 : 0.72}
          />
        </div>

        {/* Counter-balanced soft radiant depth in lower right */}
        <div
          className={`absolute top-[30%] -right-[12%] w-[600px] lg:w-[960px] h-[600px] lg:h-[960px] rounded-full filter blur-[150px] transition-colors duration-1000 pointer-events-none ${
            isDark ? 'bg-violet-900/20' : 'bg-purple-300/25'
          }`}
        />
      </motion.div>

      {/* =======================================================================
          PLANE 2: Technical Line / Grid / Signal Graphics
          ======================================================================= */}
      <motion.div
        style={{
          opacity: techOpacity,
          x: cursor.x * -4,
          y: cursor.y * -4,
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Coordinate Grid with Intersect Crosshairs */}
            <pattern id="hero-tech-grid" width="76" height="76" patternUnits="userSpaceOnUse">
              <path
                d="M 38 0 L 38 76 M 0 38 L 76 38"
                stroke={isDark ? '#8B5CF6' : '#171717'}
                strokeWidth="0.5"
                strokeOpacity={isDark ? '0.08' : '0.05'}
              />
              <path
                d="M 35 38 h 6 M 38 35 v 6"
                stroke={isDark ? '#C4B5FD' : '#7C3AED'}
                strokeWidth="0.8"
                strokeOpacity={isDark ? '0.22' : '0.15'}
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hero-tech-grid)" />

          {/* Thin System Orbital Ellipse */}
          <g className="origin-[70%_35%]">
            <ellipse
              cx="70%"
              cy="34%"
              rx="420"
              ry="260"
              fill="none"
              stroke={isDark ? '#8B5CF6' : '#171717'}
              strokeWidth="0.75"
              strokeOpacity={isDark ? '0.18' : '0.12'}
              strokeDasharray="3 7"
            />
            <ellipse
              cx="70%"
              cy="34%"
              rx="510"
              ry="320"
              fill="none"
              stroke={isDark ? '#A78BFA' : '#7C3AED'}
              strokeWidth="1"
              strokeOpacity={isDark ? '0.14' : '0.08'}
              strokeDasharray="24 160"
              className="animate-[spin_90s_linear_infinite]"
            />
          </g>

          {/* Flowing System Vector Signal Path */}
          <path
            d="M -40,160 C 320,160 480,260 880,260 S 1320,150 1800,150"
            fill="none"
            stroke={isDark ? 'rgba(139, 92, 246, 0.16)' : 'rgba(0, 0, 0, 0.08)'}
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <path
            d="M -40,160 C 320,160 480,260 880,260 S 1320,150 1800,150"
            fill="none"
            stroke={isDark ? '#C4B5FD' : '#7C3AED'}
            strokeWidth="1.5"
            strokeDasharray="16 220"
            className="animate-[dash_12s_linear_infinite]"
          />

          {/* Engineering Coordinate Label */}
          <text
            x="6%"
            y="92%"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="0.25em"
            fill={isDark ? '#A78BFA' : '#171717'}
            fillOpacity={isDark ? '0.35' : '0.25'}
          >
            SYS_SPECIMEN::NODE_PIPE // DETERMINISTIC RUNTIME
          </text>
        </svg>
      </motion.div>

      {/* Main Container */}
      <div className="relative max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 w-full z-10 my-auto">
        {/* Top Minimalist Architectural Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.26em] pb-6 sm:pb-10 border-b border-current/10"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="font-semibold text-violet-400">ROCKY BABCOCK // STUDIO ARCHIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] opacity-70">
            <span>SAN FRANCISCO, CA</span>
            <span className="opacity-30">·</span>
            <span>2024—2026 EDITION</span>
          </div>
        </motion.div>

        {/* Hero Layered Stage: Typography + Overlapping Floating Media */}
        <div className="relative pt-4 sm:pt-6">
          {/* ===================================================================
              PLANE 3: Monumental Unstable Typography
              clamp(92px, 11vw, 180px) with Staggered Offsets & Grid Escape
              =================================================================== */}
          <motion.div
            style={{
              scale: titleScale,
              y: titleY,
              x: cursor.x * 9,
            }}
            className="relative z-10 select-none will-change-transform pointer-events-none"
          >
            <div className="overflow-visible">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-60 mb-2 pl-1"
              >
                EXHIBIT // SELECTED SPECIMENS
              </motion.div>

              <h1 className="font-serif font-light text-[clamp(92px,11vw,180px)] leading-[0.78] tracking-[-0.045em] text-current">
                {/* Line 1: 'selected' escapes to the left margin */}
                <motion.div
                  initial={{ opacity: 0, y: 55 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block -ml-2 sm:-ml-4 lg:-ml-6 font-normal lowercase tracking-[-0.04em] whitespace-nowrap"
                >
                  selected
                </motion.div>

                {/* Line 2: 'projects.' offset horizontally and pulled vertically */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic font-light pl-[14vw] sm:pl-[20vw] md:pl-[24vw] lg:pl-[28vw] -mt-3 sm:-mt-6 md:-mt-10 lg:-mt-14 tracking-[-0.035em] whitespace-nowrap"
                >
                  projects
                  <span className={isDark ? 'text-violet-400 not-italic' : 'text-[#8B5CF6] not-italic'}>
                    .
                  </span>
                </motion.div>
              </h1>
            </div>
          </motion.div>

          {/* ===================================================================
              PLANE 4: Real Project Media (Floating 3D Perspective Specimen)
              Controlled overlap with Title, dynamic parallax, and subtle cursor tilt
              =================================================================== */}
          <motion.div
            ref={mediaContainerRef}
            initial={{
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              y: mediaY,
              rotate: mediaRotate,
              x: cursor.x * 16,
              transform: `perspective(1200px) rotateX(${cursor.y * -6}deg) rotateY(${cursor.x * 6}deg)`,
            }}
            className="relative lg:absolute lg:right-[-1%] xl:right-[1%] lg:top-[12%] xl:top-[8%] lg:w-[60%] xl:w-[56%] max-w-[860px] z-20 mt-8 lg:mt-0 will-change-transform group pointer-events-auto"
          >
            {/* Multi-layered Glass Carrier Frame */}
            <div
              className={`relative p-3 sm:p-4 rounded-sm transition-all duration-500 ${
                isDark
                  ? 'bg-[#08031e]/85 backdrop-blur-2xl border border-violet-600/35 shadow-[0_40px_120px_-25px_rgba(124,58,237,0.45)] group-hover:border-violet-400/60'
                  : 'bg-white/80 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_40px_90px_-25px_rgba(30,20,50,0.18)] group-hover:border-neutral-500'
              }`}
            >
              {/* Corner Architectural Reticles */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-violet-400/80 pointer-events-none z-30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-violet-400/80 pointer-events-none z-30" />

              {/* Real Project Media Container (Authentic Evidence) */}
              <div className="relative overflow-hidden rounded-xs">
                <ProjectMediaFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10]"
                  priority={true}
                  showCaption={false}
                />

                {/* Subtle Scanline Overlay Accent on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Specimen HUD Annotation Bar Underneath Media */}
              <div className="pt-3.5 px-1 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] opacity-80">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-violet-400">SPECIMEN #{featuredProject.number}</span>
                  <span className="opacity-30">/</span>
                  <span className="lowercase font-semibold">{featuredProject.slug}</span>
                  <span className="hidden sm:inline opacity-30">/</span>
                  <span className="hidden sm:inline uppercase text-[9px] px-2 py-0.5 rounded-xs bg-current/5 border border-current/10">
                    {featuredProject.category} · {featuredProject.type}
                  </span>
                </div>

                <Link
                  to={`/projects/${featuredProject.slug}`}
                  data-cursor="SHOW"
                  className="inline-flex items-center gap-1.5 hover:opacity-100 transition-all uppercase tracking-wider text-[11px] font-semibold text-violet-400 hover:text-violet-300"
                >
                  <span>Examine Specimen</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Ambient Radial Depth Halo */}
            <div
              className={`absolute -inset-3 rounded-lg filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
                isDark
                  ? 'opacity-40 bg-violet-600/25 group-hover:opacity-65'
                  : 'opacity-25 bg-purple-400/20 group-hover:opacity-40'
              }`}
            />
          </motion.div>

          {/* Lower Narrative Staging & Primary Actions */}
          <div className="relative z-30 pt-12 sm:pt-16 lg:pt-24 max-w-2xl space-y-7">
            {/* Supporting Thesis Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.92, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-light leading-[1.18] opacity-90"
            >
              Designer-minded engineer crafting autonomous AI agent runtimes, Web3 protocols, and tactile digital interfaces.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] sm:text-[16px] opacity-70 font-sans leading-relaxed font-light max-w-xl"
            >
              Constructed with mathematical typography, production-hardened software architectures, and art-directed spatial depth.
            </motion.p>

            {/* Cinematic CTA Controls */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8"
            >
              <MagneticLink strength={4}>
                <button
                  onClick={onScrollToArchive}
                  className={`group relative inline-flex items-center gap-3.5 px-8 py-4 transition-all duration-300 cursor-pointer text-xs uppercase tracking-[0.22em] font-mono font-semibold rounded-xs shadow-lg ${
                    isDark
                      ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 shadow-violet-900/40 hover:shadow-violet-500/50'
                      : 'bg-[#171717] text-[#FAF9F5] hover:bg-[#8B5CF6] shadow-black/10'
                  }`}
                >
                  <span>Explore Index</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </MagneticLink>

              {onOpenStatement && (
                <button
                  onClick={onOpenStatement}
                  className="text-xs uppercase tracking-[0.22em] font-mono opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-b border-current/30 hover:border-current pb-0.5"
                >
                  Studio Statement
                </button>
              )}

              <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] opacity-45 pl-4 border-l border-current/20">
                <span>03 VERIFIED WORKS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

