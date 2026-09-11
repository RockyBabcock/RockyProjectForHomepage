import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { useProjectAtmosphere } from '../../context/ProjectAtmosphereContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { Spatial3DCanvas } from '../Spatial3DCanvas';
import { WatercolorPigmentField } from '../WatercolorPigmentField';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * SCENE 03 — SPATIAL 3D SCENE (rockyhomepage3D)
 * Open spatial composition with Three.js WebGL canvas, floating depth geometry, and real media.
 */
interface SpatialSceneProps {
  project: Project;
}

const SpatialScene: React.FC<SpatialSceneProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);

  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

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

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and dim when Scene 04 scrolls over it
  const stackScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.94, 0.9]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.45, 0.2]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -40]);

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
      id={`scene-03-${project.slug}`}
      className="relative min-h-[160vh] w-full z-20"
    >
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
            SCENE 03 — LAYER 1: Deep Cosmic Violet Watercolor Pigment Field
            ===================================================================== */}
        <WatercolorPigmentField
          variant="spatial"
          size="hero"
          intensity="vibrant"
          blur="deep"
          className="top-[10%] right-[-10%]"
        />

        {/* =====================================================================
            SCENE 03 — LAYER 2: Three.js WebGL Spatial Field + Floating Geometry
            Live interactive 3D canvas spanning across the background
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
              isHovered ? 'opacity-70' : 'opacity-40'
            }`}
          >
            <Spatial3DCanvas isHovered={isHovered} />
          </div>

          {/* Perspective Horizon and Depth Guides */}
          <svg className="w-full h-full absolute inset-0 opacity-20">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={isDark ? '#818CF8' : '#6366F1'}
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />
            <circle cx="50%" cy="50%" r="300" fill="none" stroke={isDark ? '#818CF8' : '#6366F1'} strokeWidth="0.8" strokeDasharray="5 7" />
          </svg>

          {/* Telemetry Calipers */}
          <div className="absolute top-8 right-12 font-mono text-[10px] opacity-40 text-right">
            <div>SPATIAL_WEB // SCENE_03</div>
            <div>THREE.JS / R3F / DREI / SPATIAL_AUDIO</div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 03 — TOP SCENE HEADER: Number & Identity
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-xs opacity-80 pt-2 border-b border-current/10 pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-3xl sm:text-4xl font-light text-current">
              02
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="uppercase text-[11px] font-semibold tracking-[0.22em] text-violet-500 dark:text-violet-400">
              {project.category} // {project.type}
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="opacity-50 font-mono">{project.year}</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="text-violet-500 dark:text-violet-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Interactive WebGL Field
            </span>
          </div>
        </div>

        {/* =====================================================================
            SCENE 03 — MAIN CANVAS: Asymmetric Layout (Media Left / Typography Right)
            ===================================================================== */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
          {/* Left Anchor: Real Media Plate Floating with 3D Depth */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-start order-2 lg:order-1">
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
                    ? 'bg-[#08031e]/85 backdrop-blur-2xl border border-violet-500/30 shadow-[0_30px_90px_-20px_rgba(124,58,237,0.4)] group-hover/frame:border-violet-400/60'
                    : 'bg-white/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.16)] group-hover/frame:border-neutral-700'
                }`}
              >
                {/* Precision Reticles */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-violet-400/80 pointer-events-none z-30" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-violet-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-violet-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-violet-400/80 pointer-events-none z-30" />

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
                    r3f: camera_choreography_scene
                  </span>
                  <div className="flex items-center gap-1.5 text-violet-500 dark:text-violet-400 font-semibold uppercase tracking-wider">
                    <span>Inspect 3D Graph</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Radiant Ambient Glow */}
              <div
                className={`absolute -inset-4 rounded-xl filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
                  isDark ? 'bg-violet-600/25' : 'bg-purple-400/20'
                } ${isHovered ? 'opacity-80' : 'opacity-20'}`}
              />
            </motion.div>
          </div>

          {/* Right Anchor: Monumental Typography & Narrative */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 order-1 lg:order-2">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-50 block">
                Spatial Web & Three.js Canvas
              </span>
              <h2 className="font-serif font-light text-[clamp(44px,5.5vw,88px)] leading-[0.88] tracking-[-0.04em] text-current">
                rockyhomepage3d
                <span className="text-violet-500 dark:text-violet-400">.</span>
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
                      ? 'border-violet-500/20 bg-violet-950/20 text-violet-300'
                      : 'border-violet-300/40 bg-violet-50 text-violet-800'
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
                  className="flex items-center gap-2 text-violet-500 dark:text-violet-400 font-semibold hover:underline uppercase tracking-wider text-[11px]"
                >
                  <span>Launch 3D Web</span>
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
                className="flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-violet-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
              >
                <span>Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 03 — BOTTOM TELEMETRY STRIP
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] opacity-50 pb-2 border-t border-current/10 pt-3">
          <div className="flex items-center gap-4">
            <span>TOOLING: THREE.JS / REACT THREE FIBER / DREI / SPATIAL AUDIO</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">WEBGL SHADER PIPELINE</span>
          </div>
          <div>SCROLL FOR SCENE 04 (AI INTERFACE) ↓</div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * SCENE 04 — AI / SELECTION / ROTATION SCENE (melius-like)
 * Concentric rotating AI selection rings, multimodal reticles, and real media.
 */
interface AISceneProps {
  project: Project;
}

const AIScene: React.FC<AISceneProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);

  const trackRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

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

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  const stackScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.96, 0.92]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.6, 0.35]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -30]);

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
      id={`scene-04-${project.slug}`}
      className="relative min-h-[160vh] w-full z-30"
    >
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
            SCENE 04 — LAYER 1: Large AI Magenta / Ochre Watercolor Pigment Field
            ===================================================================== */}
        <WatercolorPigmentField
          variant="ai"
          size="hero"
          intensity="vibrant"
          blur="deep"
          className="top-[15%] left-[5%]"
        />

        {/* =====================================================================
            SCENE 04 — LAYER 2: Concentric Rotating AI Selection Rings & Dials
            Bespoke visual environment for Project 03 (melius-like)
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <svg className="w-full h-full absolute inset-0 opacity-25">
            {/* Center origin around middle-right */}
            <g className="origin-[75%_50%]">
              {/* Outer Rotating Dial */}
              <circle
                cx="75%"
                cy="50%"
                r="380"
                fill="none"
                stroke={isDark ? '#F472B6' : '#DB2777'}
                strokeWidth="1.2"
                strokeDasharray="6 10"
                className="animate-[spin_60s_linear_infinite]"
              />

              {/* Middle Dial with Cardinal Degree Marks */}
              <circle
                cx="75%"
                cy="50%"
                r="280"
                fill="none"
                stroke={isDark ? '#A78BFA' : '#7C3AED'}
                strokeWidth="1"
                strokeDasharray="4 8"
                className="animate-[spin_40s_linear_infinite_reverse]"
              />

              {/* Inner Selection Ring */}
              <circle
                cx="75%"
                cy="50%"
                r="180"
                fill="none"
                stroke={isDark ? '#F472B6' : '#DB2777'}
                strokeWidth="1.5"
                strokeDasharray="3 6"
              />

              {/* Radial Dial Spokes */}
              <line x1="75%" y1="10%" x2="75%" y2="90%" stroke={isDark ? '#F472B6' : '#DB2777'} strokeWidth="0.8" strokeDasharray="3 7" />
              <line x1="35%" y1="50%" x2="115%" y2="50%" stroke={isDark ? '#F472B6' : '#DB2777'} strokeWidth="0.8" strokeDasharray="3 7" />
            </g>

            {/* Multimodal Reticles */}
            <g className="text-[10px] font-mono" fill={isDark ? '#F472B6' : '#DB2777'}>
              <text x="60" y="320">[MODAL: VIDEO_GEN_4K]</text>
              <text x="60" y="340">[MODAL: AUDIO_KINETICS]</text>
              <text x="60" y="360">[MODAL: 3D_CYLINDRICAL_PERSPECTIVE]</text>
            </g>
          </svg>

          {/* Calipers */}
          <div className="absolute top-8 right-12 font-mono text-[10px] opacity-40 text-right">
            <div>AI_SELECTION // SCENE_04</div>
            <div>CYLINDRICAL_CAROUSEL_RESEARCH</div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 04 — TOP SCENE HEADER: Number & Identity
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-xs opacity-80 pt-2 border-b border-current/10 pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-3xl sm:text-4xl font-light text-current">
              03
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span className="uppercase text-[11px] font-semibold tracking-[0.22em] text-pink-500 dark:text-pink-400">
              {project.category} // {project.type}
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="opacity-50 font-mono">{project.year}</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="text-pink-500 dark:text-pink-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Multimodal AI Prototype
            </span>
          </div>
        </div>

        {/* =====================================================================
            SCENE 04 — MAIN CANVAS: Typography Left / Media Center-Right
            ===================================================================== */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
          {/* Left Anchor: Monumental Typography & Narrative */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-50 block">
                Generative AI Product Canvas & Carousel
              </span>
              <h2 className="font-serif font-light text-[clamp(44px,5.5vw,88px)] leading-[0.88] tracking-[-0.04em] text-current">
                melius-like
                <span className="text-pink-500 dark:text-pink-400">.</span>
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
                      ? 'border-pink-500/20 bg-pink-950/20 text-pink-300'
                      : 'border-pink-300/40 bg-pink-50 text-pink-800'
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
                  className="flex items-center gap-2 text-pink-500 dark:text-pink-400 font-semibold hover:underline uppercase tracking-wider text-[11px]"
                >
                  <span>Launch AI Canvas</span>
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
                className="flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-pink-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
              >
                <span>Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Anchor: Real Media Plate Floating with 3D Depth */}
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
                    ? 'bg-[#08031e]/85 backdrop-blur-2xl border border-pink-500/30 shadow-[0_30px_90px_-20px_rgba(219,39,119,0.35)] group-hover/frame:border-pink-400/60'
                    : 'bg-white/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.16)] group-hover/frame:border-neutral-700'
                }`}
              >
                {/* Precision Reticles */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-pink-400/80 pointer-events-none z-30" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-pink-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-pink-400/80 pointer-events-none z-30" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-pink-400/80 pointer-events-none z-30" />

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
                    carousel: 3d_cylindrical_perspective
                  </span>
                  <div className="flex items-center gap-1.5 text-pink-500 dark:text-pink-400 font-semibold uppercase tracking-wider">
                    <span>Inspect AI Models</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Radiant Ambient Glow */}
              <div
                className={`absolute -inset-4 rounded-xl filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
                  isDark ? 'bg-pink-600/20' : 'bg-pink-400/15'
                } ${isHovered ? 'opacity-80' : 'opacity-20'}`}
              />
            </motion.div>
          </div>
        </div>

        {/* =====================================================================
            SCENE 04 — BOTTOM TELEMETRY STRIP
            ===================================================================== */}
        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] opacity-50 pb-2 border-t border-current/10 pt-3">
          <div className="flex items-center gap-4">
            <span>TOOLING: REACT / MOTION / TAILWIND / GOOGLE GENAI</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">CYLINDRICAL 3D CAROUSEL</span>
          </div>
          <div>SCROLL FOR SCENE 05 (ARCHIVE INDEX) ↓</div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const spatialProject = projects.find(
    (p) => p.slug.includes('3d') || p.slug.includes('rockyhomepage')
  ) || projects[0];

  const aiProject = projects.find(
    (p) => p.slug.includes('ai') || p.slug.includes('melius')
  ) || projects[1] || projects[0];

  return (
    <div className="relative w-full">
      {spatialProject && <SpatialScene project={spatialProject} />}
      {aiProject && <AIScene project={aiProject} />}
    </div>
  );
};
