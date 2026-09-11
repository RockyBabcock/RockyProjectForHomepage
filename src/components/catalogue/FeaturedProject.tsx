import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, Terminal } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { useProjectAtmosphere } from '../../context/ProjectAtmosphereContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { WatercolorPigmentField } from '../WatercolorPigmentField';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);
  const description = localizeText(project.description);

  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Pointer-Driven Perspective Tilt (Strict limit: Max 2.8 deg, 8–14px shift)
  // ---------------------------------------------------------------------------
  const [isHovered, setIsHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const targetCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    let animId: number;
    const tick = () => {
      setCursor((prev) => ({
        x: prev.x + (targetCursor.current.x - prev.x) * 0.1,
        y: prev.y + (targetCursor.current.y - prev.y) * 0.1,
      }));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetCursor.current = {
      x: Math.max(-1, Math.min(1, xNorm)),
      y: Math.max(-1, Math.min(1, yNorm)),
    };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetCursor.current = { x: 0, y: 0 };
  };

  // Scroll Tracking for Stacking Transformation
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and dim as Scene 03 scrolls over it
  const stackScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.94, 0.9]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.45, 0.2]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Sync atmosphere context on view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(project.slug);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => observer.disconnect();
  }, [project.slug, setActiveSlug]);

  const tiltX = -cursor.y * 2.8;
  const tiltY = cursor.x * 3.0;
  const transX = cursor.x * 14;
  const transY = cursor.y * 10;

  const handleNavigate = () => {
    setActiveSlug(project.slug);
    navigate(`/projects/${project.slug}`);
  };

  return (
    <div
      ref={trackRef}
      id={`scene-02-${project.slug}`}
      className="relative min-h-[160vh] w-full z-10"
    >
      {/* Pinned Sticky Viewport Stage — Edge-to-Edge Scene (No Bounding Card Box) */}
      <motion.div
        style={{
          scale: stackScale,
          opacity: stackOpacity,
          y: stackY,
        }}
        className={`sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-18 xl:px-24 py-10 sm:py-14 lg:py-16 overflow-hidden select-none transition-colors duration-500 ${
          isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
        }`}
      >
        {/* =====================================================================
            SCENE 02 — LAYER 1: Large Cool Watercolor Pigment Wash
            Bleeding behind the network architecture
            ===================================================================== */}
        <WatercolorPigmentField
          variant="cool"
          size="hero"
          intensity="vibrant"
          blur="deep"
          className="top-[5%] -left-[10%]"
        />

        {/* =====================================================================
            SCENE 02 — LAYER 2: Live SVG Network Architecture Graph & Data Flow
            Bespoke visual environment for Project 01 (SVG Downloader)
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <svg className="w-full h-full absolute inset-0 opacity-30">
            {/* Horizontal Bus Lines */}
            <path
              d="M 0,180 L 1920,180"
              stroke={isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)'}
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <path
              d="M 0,640 L 1920,640"
              stroke={isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)'}
              strokeWidth="1"
              strokeDasharray="4 8"
            />

            {/* Branching Network Paths Connecting Virtual Registry Nodes */}
            <path
              d="M 120,180 C 340,180 380,360 680,360 S 980,240 1340,240 S 1680,480 1880,480"
              fill="none"
              stroke={isDark ? '#38BDF8' : '#0284C7'}
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M 280,640 C 440,640 520,460 760,460 S 1120,540 1480,540"
              fill="none"
              stroke={isDark ? '#818CF8' : '#6366F1'}
              strokeWidth="1.2"
              strokeDasharray="5 7"
            />

            {/* Signal Flow Pulse Particles */}
            <circle cx="680" cy="360" r="5" fill={isDark ? '#38BDF8' : '#0284C7'} className="animate-pulse" />
            <circle cx="1340" cy="240" r="4" fill={isDark ? '#A78BFA' : '#7C3AED'} />
            <circle cx="760" cy="460" r="4" fill={isDark ? '#38BDF8' : '#0284C7'} />

            {/* Architectural Node Badges */}
            <g className="text-[10px] font-mono" fill={isDark ? '#94A3B8' : '#64748B'}>
              <text x="140" y="170">NODE_01 // SIMPLE_ICONS_API</text>
              <text x="695" y="355">NODE_02 // SHA-256_INTEGRITY_ENGINE</text>
              <text x="1355" y="235">NODE_03 // XML_AST_VALIDATOR</text>
            </g>
          </svg>

          {/* Coordinate Calipers */}
          <div className="absolute top-8 right-12 font-mono text-[10px] opacity-40 text-right">
            <div>DATA_SYSTEM // SCENE_02</div>
            <div>VERIFIED_REGISTRY_V1.2</div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 02 — TOP SCENE HEADER: Number & Identity
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-xs opacity-80 pt-2 border-b border-current/10 pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-3xl sm:text-4xl font-light text-current">
              01
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="uppercase text-[11px] font-semibold tracking-[0.22em] text-sky-500 dark:text-sky-400">
              {project.category} // {project.type}
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="opacity-50 font-mono">{project.year}</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Verified Architecture
            </span>
          </div>
        </div>

        {/* =====================================================================
            SCENE 02 — MAIN CANVAS: MONUMENTAL TITLE + FLOATING MEDIA OVERLAY
            Open spatial composition. Typography cuts across the environment.
            ===================================================================== */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
          {/* Left / Upper Anchor: Monumental Typography & Narrative */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-50 block">
                Asset Registry & Verification Engine
              </span>
              <h2 className="font-serif font-light text-[clamp(44px,5.5vw,88px)] leading-[0.88] tracking-[-0.04em] text-current">
                svg-downloader
                <span className="text-sky-500 dark:text-sky-400">.</span>
              </h2>
            </div>

            <p className="font-sans text-base sm:text-lg lg:text-[19px] leading-relaxed opacity-85 max-w-xl font-light">
              {summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] opacity-70">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-xs border ${
                    isDark
                      ? 'border-sky-500/20 bg-sky-950/20 text-sky-300'
                      : 'border-sky-300/40 bg-sky-50 text-sky-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Direct Action Links */}
            <div className="pt-3 flex items-center gap-6 font-mono text-xs">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="VISIT"
                  className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-semibold hover:underline uppercase tracking-wider text-[11px]"
                >
                  <span>Launch Registry</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="CODE"
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:underline uppercase tracking-wider text-[11px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              <button
                onClick={handleNavigate}
                data-cursor="EXAMINE"
                className="flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-sky-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
              >
                <span>Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right / Center Anchor: Real Media Plate Floating with 3D Depth */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
            <motion.div
              ref={mediaRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleNavigate}
              data-cursor="EXAMINE"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleNavigate();
              }}
              style={{
                transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${transX}px, ${transY}px, 0)`,
              }}
              className="relative w-full max-w-[760px] cursor-pointer group/frame will-change-transform"
            >
              {/* Luminous Glass Carrier */}
              <div
                className={`relative p-3 sm:p-4 rounded-sm transition-all duration-500 ${
                  isDark
                    ? 'bg-[#08031e]/85 backdrop-blur-2xl border border-sky-500/30 shadow-[0_30px_90px_-20px_rgba(2,132,199,0.35)] group-hover/frame:border-sky-400/60'
                    : 'bg-white/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.16)] group-hover/frame:border-neutral-700'
                }`}
              >
                {/* Precision Reticles */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-sky-400/80 pointer-events-none z-30" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-sky-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-sky-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-sky-400/80 pointer-events-none z-30" />

                {/* Real Media Frame */}
                <motion.div
                  layoutId={`project-media-frame-${project.slug}`}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-xs"
                >
                  <ProjectMediaFrame
                    project={project}
                    aspectRatio="aspect-[16/10]"
                    isHovered={isHovered}
                    priority={false}
                    showCaption={false}
                  />
                </motion.div>

                {/* Sub-Media Telemetry Tag */}
                <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] opacity-75">
                  <span className="lowercase opacity-60 truncate max-w-[280px]">
                    sha256: verified_xml_registry
                  </span>
                  <div className="flex items-center gap-1.5 text-sky-500 dark:text-sky-400 font-semibold uppercase tracking-wider">
                    <span>Inspect Pipeline</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Radiant Ambient Glow */}
              <div
                className={`absolute -inset-4 rounded-xl filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
                  isDark ? 'bg-sky-600/20' : 'bg-sky-400/15'
                } ${isHovered ? 'opacity-80' : 'opacity-20'}`}
              />
            </motion.div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 02 — BOTTOM TELEMETRY STRIP
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] opacity-50 pb-2 border-t border-current/10 pt-3">
          <div className="flex items-center gap-4">
            <span>TOOLING: REACT 19 / TYPESCRIPT / VITE</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">XML VALIDATION & BUNDLE STREAM</span>
          </div>
          <div>SCROLL FOR SCENE 03 (SPATIAL WEB) ↓</div>
        </div>
      </motion.div>
    </div>
  );
};
