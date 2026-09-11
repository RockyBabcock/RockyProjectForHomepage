import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { useProjectAtmosphere } from '../../context/ProjectAtmosphereContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';

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

  const stageRef = useRef<HTMLDivElement>(null);
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
    target: stageRef,
    offset: ['start start', 'end start'],
  });

  // Scale down and dim when Project 02 enters and stacks above
  const stackScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.94, 0.9]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.5, 0.25]);
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -30]);

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
      { threshold: 0.4 }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
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
      ref={stageRef}
      id={`project-${project.slug}`}
      className="relative min-h-[92vh] lg:min-h-screen py-8 sm:py-12"
    >
      {/* Sticky Pinned Scene Stage */}
      <motion.div
        style={{
          scale: stackScale,
          opacity: stackOpacity,
          y: stackY,
          zIndex: 10,
        }}
        className={`sticky top-16 sm:top-20 lg:top-24 w-full min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-between rounded-sm transition-colors duration-500 overflow-hidden ${
          isDark
            ? 'bg-[#060217]/95 border border-violet-900/40 shadow-[0_30px_100px_-20px_rgba(3,0,20,0.8)]'
            : 'bg-[#FAF9F5]/95 border border-[#E2DFD2] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.12)]'
        }`}
      >
        {/* =====================================================================
            PROJECT 01 BESPOKE ATMOSPHERE: SYSTEM / DATA / NETWORK (SVG Downloader)
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <svg className="w-full h-full absolute inset-0 opacity-25">
            <path
              d="M 0,160 C 280,160 380,260 760,260 S 1100,140 1600,140"
              fill="none"
              stroke={isDark ? '#38BDF8' : '#0284C7'}
              strokeWidth="1.2"
              strokeDasharray="5 7"
            />
            <circle cx="760" cy="260" r="4" fill={isDark ? '#38BDF8' : '#0284C7'} />
            <circle cx="380" cy="210" r="3" fill={isDark ? '#A78BFA' : '#7C3AED'} />
          </svg>
          <div
            className={`absolute -top-16 -right-16 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
              isDark ? 'bg-sky-900/15' : 'bg-sky-200/25'
            }`}
          />
        </div>

        {/* =====================================================================
            SPATIAL STAGING: FLOATING INFORMATION SURROUNDING REAL MEDIA
            ===================================================================== */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-between h-full">
          {/* Top Spatial Header: Number, Category, Direct External Links */}
          <div className="flex items-baseline justify-between font-mono text-xs opacity-75 pb-4 border-b border-current/10">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-light text-current opacity-70">
                01
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

          {/* Center Stage: Monumental Title + Oversized Real Media Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center my-auto py-6 sm:py-8">
            {/* Left Spatial Column: Giant Title & Narrative Thesis (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div
                onClick={handleNavigate}
                data-cursor="EXAMINE"
                className="cursor-pointer group/title inline-block"
              >
                <h2
                  className={`font-serif font-light text-[clamp(40px,5.5vw,88px)] tracking-[-0.04em] leading-[0.88] lowercase text-current transition-transform duration-500 ${
                    isHovered ? 'translate-x-2' : ''
                  }`}
                >
                  <span>{title}</span>
                  <span className={isDark ? 'text-violet-400' : 'text-[#7C3AED]'}>.</span>
                </h2>
              </div>

              <p className="text-[14px] sm:text-[16px] opacity-80 font-sans leading-relaxed font-light max-w-lg">
                {summary}
              </p>

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
                ref={mediaRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
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
                        priority={true}
                        showCaption={false}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.05] via-transparent to-transparent pointer-events-none opacity-40 group-hover/media:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  {/* Minimalist Telemetry Readout */}
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

          {/* Bottom Floating Bar: Technical Tools Tokens */}
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
              <span>SCENE 01 / 03</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
