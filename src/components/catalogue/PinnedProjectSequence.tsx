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

interface PinnedProjectSequenceProps {
  projects: Project[];
}

/**
 * Individual Pinned Project Scene with Bespoke Atmospheric Geometry,
 * Floating Information, 3D Pointer Tilt (max 3 deg), and Shared-Layout Media
 */
interface ProjectSceneProps {
  project: Project;
  index: number;
  total: number;
}

const ProjectScene: React.FC<ProjectSceneProps> = ({ project, index, total }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);

  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Pointer-Driven Perspective Tilt (Strict limit: Max 2.8 deg, 10–14px shift)
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
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and dim when the next scene scrolls over this scene
  const isLast = index === total - 1;
  const stackScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, isLast ? 1 : 0.93, isLast ? 1 : 0.9]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, isLast ? 1 : 0.45, isLast ? 1 : 0.3]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -20]);

  // Notify atmosphere context when this scene is prominently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(project.slug);
          }
        });
      },
      { threshold: 0.45 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => observer.disconnect();
  }, [project.slug, setActiveSlug]);

  const is3D = project.slug.includes('3d') || project.slug.includes('rockyhomepage');
  const isAI = project.slug.includes('ai') || project.slug.includes('melius');
  const isSvg = project.slug.includes('svg') || project.slug.includes('asset');

  // Precision tilt values
  const tiltX = -cursor.y * 2.8;
  const tiltY = cursor.x * 3.0;
  const transX = cursor.x * 14;
  const transY = cursor.y * 11;

  const handleNavigate = () => {
    setActiveSlug(project.slug);
    navigate(`/projects/${project.slug}`);
  };

  return (
    <div
      ref={sceneRef}
      id={`project-${project.slug}`}
      className="relative min-h-[92vh] lg:min-h-screen py-8 sm:py-12"
    >
      {/* Pinned Sticky Stage */}
      <motion.div
        style={{
          scale: stackScale,
          opacity: stackOpacity,
          y: stackY,
          zIndex: 10 + index,
        }}
        className={`sticky top-16 sm:top-20 lg:top-24 w-full min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-center rounded-sm transition-colors duration-500 overflow-hidden ${
          isDark
            ? 'bg-[#060217]/95 border border-violet-900/40 shadow-[0_30px_100px_-20px_rgba(3,0,20,0.8)]'
            : 'bg-[#FAF9F5]/95 border border-[#E2DFD2] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.12)]'
        }`}
      >
        {/* =====================================================================
            BESPOKE TECHNICAL ATMOSPHERE (Project-Specific Visual Language)
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          {/* Project 01: SYSTEM / DATA / NETWORK (SVG Downloader) */}
          {isSvg && (
            <>
              <svg className="w-full h-full absolute inset-0 opacity-25">
                <path
                  d="M 0,120 C 300,120 400,280 800,280 S 1200,160 1800,160"
                  fill="none"
                  stroke={isDark ? '#38BDF8' : '#0284C7'}
                  strokeWidth="1.2"
                  strokeDasharray="5 7"
                />
                <circle cx="800" cy="280" r="4" fill={isDark ? '#38BDF8' : '#0284C7'} />
                <circle cx="400" cy="200" r="3" fill={isDark ? '#A78BFA' : '#7C3AED'} />
              </svg>
              <div
                className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
                  isDark ? 'bg-sky-900/15' : 'bg-sky-200/30'
                }`}
              />
            </>
          )}

          {/* Project 02: SPACE / DEPTH / 3D (rockyhomepage3D) */}
          {is3D && (
            <>
              {/* Real-time WebGL 3D Canvas Depth Accent */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                  isHovered ? 'opacity-70' : 'opacity-35'
                }`}
              >
                <Spatial3DCanvas isHovered={isHovered} />
              </div>
              <div
                className={`absolute top-[20%] left-[10%] w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none ${
                  isDark ? 'bg-indigo-900/20' : 'bg-indigo-200/30'
                }`}
              />
            </>
          )}

          {/* Project 03: AI / SELECTION / ROTATION (melius-like) */}
          {isAI && (
            <>
              <svg className="w-full h-full absolute inset-0 opacity-25">
                <g className="origin-[80%_45%]">
                  <circle
                    cx="80%"
                    cy="45%"
                    r="260"
                    fill="none"
                    stroke={isDark ? '#F472B6' : '#DB2777'}
                    strokeWidth="0.8"
                    strokeDasharray="4 8"
                  />
                  <circle
                    cx="80%"
                    cy="45%"
                    r="340"
                    fill="none"
                    stroke={isDark ? '#C4B5FD' : '#8B5CF6'}
                    strokeWidth="1.2"
                    strokeDasharray="20 140"
                    className="animate-[spin_65s_linear_infinite]"
                  />
                  <line
                    x1="80%"
                    y1="10%"
                    x2="80%"
                    y2="80%"
                    stroke={isDark ? '#F472B6' : '#DB2777'}
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                  <line
                    x1="50%"
                    y1="45%"
                    x2="110%"
                    y2="45%"
                    stroke={isDark ? '#F472B6' : '#DB2777'}
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                </g>
              </svg>
              <div
                className={`absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
                  isDark ? 'bg-pink-900/15' : 'bg-pink-200/25'
                }`}
              />
            </>
          )}
        </div>

        {/* =====================================================================
            PROJECT SCENE STAGING: INFORMATION FLOATS AROUND REAL MEDIA
            ===================================================================== */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-between h-full"
        >
          {/* Top Spatial Bar: Number, Category, Year, Live Link */}
          <div className="flex items-baseline justify-between font-mono text-xs opacity-75 pb-4 border-b border-current/10">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-light text-current opacity-70">
                {project.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="uppercase text-[11px] font-semibold tracking-[0.24em] text-violet-400">
                {project.category} // {project.type}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="opacity-60">{project.year}</span>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="VISIT"
                  className="hidden sm:inline-flex items-center gap-1 text-violet-400 hover:underline uppercase text-[10px] font-semibold"
                  title="Open live demonstration"
                >
                  <span>Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="CODE"
                  className="hidden sm:inline-flex items-center gap-1 text-violet-400 hover:underline uppercase text-[10px] font-semibold"
                  title="Inspect GitHub repository"
                >
                  <span>Code</span>
                  <Github className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Centerpiece: Monumental Title + Oversized Real Media Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center my-auto py-6 sm:py-8">
            {/* Left Spatial Column: Giant Title & Narrative Thesis (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div
                onClick={handleNavigate}
                data-cursor="EXAMINE"
                className="cursor-pointer group/title inline-block"
              >
                <h3
                  className={`font-serif font-light text-[clamp(40px,5.5vw,88px)] tracking-[-0.04em] leading-[0.88] lowercase text-current transition-transform duration-500 ${
                    isHovered ? 'translate-x-2' : ''
                  }`}
                >
                  <span>{title}</span>
                  <span className={isDark ? 'text-violet-400' : 'text-[#7C3AED]'}>.</span>
                </h3>
              </div>

              {/* Refined Narrative Thesis */}
              <p className="text-[14px] sm:text-[16px] opacity-80 font-sans leading-relaxed font-light max-w-lg">
                {summary}
              </p>

              {/* Action Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleNavigate}
                  data-cursor="EXAMINE"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xs font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isDark
                      ? 'bg-violet-600/25 border border-violet-500/40 text-violet-200 hover:bg-violet-600 hover:text-white'
                      : 'bg-black/5 border border-black/15 text-neutral-800 hover:bg-black hover:text-white'
                  }`}
                >
                  <span>Examine Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Spatial Column: Oversized Real Media Specimen (7 Cols) */}
            <div className="lg:col-span-7">
              <div
                onClick={handleNavigate}
                data-cursor="EXAMINE"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleNavigate();
                }}
                aria-label={`Open ${title}`}
                style={{
                  transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${transX}px, ${transY}px, 0)`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out'
                    : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative cursor-pointer will-change-transform group/media"
              >
                {/* Multi-layered Glass Carrier Frame */}
                <div
                  className={`relative p-2.5 sm:p-4 rounded-sm transition-all duration-500 ${
                    isDark
                      ? 'bg-[#09041d]/90 backdrop-blur-2xl border border-violet-800/40 shadow-[0_30px_90px_-20px_rgba(124,58,237,0.4)] group-hover/media:border-violet-400/60 group-hover/media:shadow-[0_40px_120px_-20px_rgba(124,58,237,0.6)]'
                      : 'bg-white/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.14)] group-hover/media:border-neutral-700 group-hover/media:shadow-[0_40px_100px_-20px_rgba(30,20,50,0.2)]'
                  }`}
                >
                  {/* Corner Precision Crosshairs */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-violet-400/80 pointer-events-none z-30" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-violet-400/80 pointer-events-none z-30" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-violet-400/80 pointer-events-none z-30" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-violet-400/80 pointer-events-none z-30" />

                  {/* Shared Layout Media Container */}
                  <motion.div
                    layoutId={`project-media-frame-${project.slug}`}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-xs"
                  >
                    <div
                      className={`transition-transform duration-700 ease-out ${
                        isHovered ? 'scale-[1.02]' : 'scale-100'
                      }`}
                    >
                      <ProjectMediaFrame
                        project={project}
                        aspectRatio="aspect-[16/10] sm:aspect-[21/11]"
                        isHovered={isHovered}
                        priority={index === 0}
                        showCaption={false}
                      />
                    </div>

                    {/* Interactive Sheen Glaze */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.05] via-transparent to-transparent pointer-events-none opacity-40 group-hover/media:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Minimalist Telemetry Readout Under Media */}
                  <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] sm:text-[11px] opacity-75">
                    <span className="lowercase opacity-80 truncate max-w-[240px]">
                      {project.slug}
                    </span>
                    <div className="flex items-center gap-1 text-violet-400 font-semibold uppercase tracking-wider text-[10px]">
                      <span>View Details</span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isHovered ? 'translate-x-1 -translate-y-1 text-violet-300' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Radiant Backdrop Glow */}
                <div
                  className={`absolute -inset-4 rounded-xl filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
                    isDark ? 'bg-violet-600/25' : 'bg-purple-400/20'
                  } ${isHovered ? 'opacity-90' : 'opacity-25'}`}
                />
              </div>
            </div>
          </div>

          {/* Bottom Spatial Floating Bar: Tools Badges & Manifest Spec */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-current/10 font-mono text-[11px] opacity-70">
            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 6).map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-xs bg-current/5 border border-current/10 uppercase tracking-wider text-[10px]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-[10px] opacity-65">
              <span>{project.status.toUpperCase()} DEPLOYMENT</span>
              <span className="opacity-30">·</span>
              <span>SCENE {index + 1} / {total}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PinnedProjectSequence: React.FC<PinnedProjectSequenceProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="relative w-full space-y-12 sm:space-y-16">
      {projects.map((project, index) => (
        <ProjectScene
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}
    </div>
  );
};
