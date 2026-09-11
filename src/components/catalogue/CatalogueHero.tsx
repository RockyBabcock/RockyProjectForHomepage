import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { useProjectAtmosphere } from '../../context/ProjectAtmosphereContext';
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
  const { setActiveSlug } = useProjectAtmosphere();
  const navigate = useNavigate();

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Pointer-Driven Multi-Layer Parallax (Smooth RAF tracking)
  // ---------------------------------------------------------------------------
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const targetCursor = useRef({ x: 0, y: 0 });
  const [isMediaHovered, setIsMediaHovered] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    let animId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates: -1 to 1
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = (e.clientY / window.innerHeight) * 2 - 1;
      targetCursor.current = { x: xNorm, y: yNorm };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const tick = () => {
      setCursor((prev) => ({
        x: prev.x + (targetCursor.current.x - prev.x) * 0.08,
        y: prev.y + (targetCursor.current.y - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Scroll Parallax & Multi-Plane Scaling
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.88]);
  const titleY = useTransform(scrollYProgress, [0, 0.9], [0, 90]);
  const mediaScrollY = useTransform(scrollYProgress, [0, 0.9], [0, -140]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.9], [1, 1.06]);
  const bgY = useTransform(scrollYProgress, [0, 0.9], [0, 110]);

  // Subtle tilt for the floating media
  const tiltX = -cursor.y * 2.6;
  const tiltY = cursor.x * 2.8;
  const mediaShiftX = cursor.x * 20;
  const mediaShiftY = cursor.y * 16;

  const handleInspectFeatured = () => {
    setActiveSlug(featuredProject.slug);
    navigate(`/projects/${featuredProject.slug}`);
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-500 select-none ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* =======================================================================
          PLANE 1: Technical Atmosphere & Geometric Depth Lines
          ======================================================================= */}
      <motion.div
        style={{ y: bgY, x: cursor.x * -5 }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full absolute inset-0 opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-coordinate-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle
                cx="40"
                cy="40"
                r="1"
                fill={isDark ? '#A78BFA' : '#7C3AED'}
                fillOpacity={isDark ? 0.35 : 0.25}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-coordinate-grid)" />

          {/* Sweeping technical vector guide ray */}
          <path
            d="M -100,240 C 350,240 550,140 1050,140 S 1550,280 2050,280"
            fill="none"
            stroke={isDark ? 'rgba(167, 139, 250, 0.22)' : 'rgba(124, 58, 237, 0.16)'}
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Ambient atmospheric radiance behind typography & media */}
        <div
          className={`absolute top-[18%] left-[22%] w-[650px] lg:w-[900px] h-[550px] lg:h-[750px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${
            isDark ? 'bg-violet-900/20' : 'bg-purple-300/25'
          }`}
        />
        <div
          className={`absolute top-[35%] right-[5%] w-[550px] lg:w-[750px] h-[450px] lg:h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${
            isDark ? 'bg-indigo-900/20' : 'bg-blue-200/25'
          }`}
        />
      </motion.div>

      {/* =======================================================================
          TOP ARCHITECTURAL STATUS LINE (Minimalist & Unobtrusive)
          ======================================================================= */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-[1560px] mx-auto w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] opacity-60 pb-4 border-b border-current/10"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span className="font-semibold text-violet-400">Rocky Babcock</span>
          <span className="opacity-40">/</span>
          <span className="hidden sm:inline">Creative Technology</span>
        </div>

        <div className="flex items-center gap-6 text-[10px]">
          <span className="hidden md:inline">San Francisco, CA</span>
          <span className="hidden md:inline opacity-30">·</span>
          <span>Archive // 2024—2026</span>
        </div>
      </motion.header>

      {/* =======================================================================
          MAIN HERO CANVAS: HUGE TYPOGRAPHY + OVERLAPPING FLOATING MEDIA
          ======================================================================= */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative max-w-[1560px] mx-auto w-full flex-1 flex flex-col justify-center my-auto py-6 sm:py-10"
      >
        {/* HUGE SCULPTURAL DISPLAY TYPOGRAPHY (Partially escapes grid) */}
        <motion.div
          style={{
            scale: titleScale,
            y: titleY,
            x: cursor.x * 8,
          }}
          className="relative z-10 will-change-transform pointer-events-none"
        >
          <div className="overflow-visible">
            <h1 className="font-serif font-light text-[clamp(68px,15vw,220px)] leading-[0.8] tracking-[-0.05em] uppercase text-current">
              {/* Line 1: 'SELECTED' pulled slightly left */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="block -ml-1 sm:-ml-3 lg:-ml-5 font-light"
                >
                  Selected
                </motion.span>
              </div>

              {/* Line 2: 'PROJECTS.' pulled right with accent terminal dot */}
              <div className="overflow-hidden mt-1 sm:mt-2 lg:mt-3">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block pl-[10vw] sm:pl-[18vw] lg:pl-[24vw] italic font-light whitespace-nowrap"
                >
                  Projects
                  <span className={isDark ? 'text-violet-400 not-italic' : 'text-[#7C3AED] not-italic'}>
                    .
                  </span>
                </motion.span>
              </div>
            </h1>
          </div>
        </motion.div>

        {/* =====================================================================
            OVERLAPPING REAL PROJECT MEDIA (Floating with Depth & Perspective)
            Cross-cuts the typography on desktop, establishing immediate engineering proof.
            ===================================================================== */}
        <motion.div
          ref={mediaRef}
          initial={{
            clipPath: 'inset(100% 0% 0% 0%)',
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.0,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            y: mediaScrollY,
            scale: mediaScale,
            transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${mediaShiftX}px, ${mediaShiftY}px, 0)`,
          }}
          onMouseEnter={() => setIsMediaHovered(true)}
          onMouseLeave={() => setIsMediaHovered(false)}
          onClick={handleInspectFeatured}
          data-cursor="EXAMINE"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleInspectFeatured();
          }}
          aria-label={`Inspect ${localizeText(featuredProject.title)}`}
          className="relative lg:absolute lg:right-[4%] xl:right-[6%] lg:top-[30%] xl:top-[26%] lg:w-[54%] xl:w-[50%] max-w-[820px] z-20 mt-8 lg:mt-0 will-change-transform group/media cursor-pointer pointer-events-auto"
        >
          {/* Multi-layered Glass Carrier Frame */}
          <div
            className={`relative p-3 sm:p-4 rounded-sm transition-all duration-500 ${
              isDark
                ? 'bg-[#08031e]/85 backdrop-blur-2xl border border-violet-600/35 shadow-[0_30px_90px_-20px_rgba(124,58,237,0.45)] group-hover/media:border-violet-400/60 group-hover/media:shadow-[0_40px_120px_-20px_rgba(124,58,237,0.65)]'
                : 'bg-white/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_30px_80px_-20px_rgba(30,20,50,0.16)] group-hover/media:border-neutral-700 group-hover/media:shadow-[0_40px_100px_-20px_rgba(30,20,50,0.22)]'
            }`}
          >
            {/* Corner Precision Reticles */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-violet-400/80 pointer-events-none z-30" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-violet-400/80 pointer-events-none z-30" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-violet-400/80 pointer-events-none z-30" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-violet-400/80 pointer-events-none z-30" />

            {/* Shared layout container for instant continuous transition into detail page */}
            <motion.div
              layoutId={`project-media-frame-${featuredProject.slug}`}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-xs"
            >
              <div
                className={`transition-transform duration-700 ease-out ${
                  isMediaHovered ? 'scale-[1.02]' : 'scale-100'
                }`}
              >
                <ProjectMediaFrame
                  project={featuredProject}
                  aspectRatio="aspect-[16/10] sm:aspect-[21/11]"
                  isHovered={isMediaHovered}
                  priority={true}
                  showCaption={false}
                />
              </div>

              {/* Luminous sheen gradient across media plate */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.06] via-transparent to-transparent pointer-events-none opacity-40 group-hover/media:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Minimalist Floating Telemetry Bar */}
            <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] opacity-75">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-violet-400 uppercase tracking-wider text-[10px]">
                  01 // {featuredProject.category}
                </span>
                <span className="opacity-40">·</span>
                <span className="lowercase truncate max-w-[200px]">{featuredProject.slug}</span>
              </div>

              <div className="flex items-center gap-1.5 text-violet-400 font-semibold uppercase tracking-wider text-[10px]">
                <span>Explore</span>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isMediaHovered ? 'translate-x-1 -translate-y-1 text-violet-300' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Radiant depth glow behind media */}
          <div
            className={`absolute -inset-4 rounded-xl filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
              isDark ? 'bg-violet-600/25' : 'bg-purple-400/20'
            } ${isMediaHovered ? 'opacity-90' : 'opacity-30'}`}
          />
        </motion.div>
      </motion.div>

      {/* =======================================================================
          BOTTOM PERIPHERAL TELEMETRY & SCROLL INVITATION
          Enters last with high-contrast, scannable clarity
          ======================================================================= */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 max-w-[1560px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t border-current/10 font-mono text-xs"
      >
        {/* Left: Concise Curation Manifesto */}
        <div className="space-y-1 max-w-md">
          <p className="font-sans text-xs sm:text-[13px] opacity-70 leading-relaxed font-light">
            Interactive software, spatial web engines, and generative interface prototypes designed
            with mathematical structure and high-performance engineering.
          </p>
          <div className="flex items-center gap-4 text-[11px] pt-1">
            <button
              onClick={onOpenStatement}
              className="text-violet-400 hover:underline uppercase tracking-wider cursor-pointer font-semibold"
            >
              Curatorial Statement →
            </button>
          </div>
        </div>

        {/* Right: Scroll to Explore Indicator */}
        <button
          onClick={onScrollToArchive}
          data-cursor="SCROLL"
          className="flex items-center gap-3 opacity-65 hover:opacity-100 transition-opacity cursor-pointer group"
          aria-label="Scroll to selected work showcase"
        >
          <span className="uppercase tracking-[0.24em] text-[10px]">Scroll to Explore</span>
          <div className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center group-hover:border-violet-400 group-hover:text-violet-400 transition-colors">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </button>
      </motion.footer>
    </section>
  );
};
