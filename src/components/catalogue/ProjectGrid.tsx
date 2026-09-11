import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { Spatial3DCanvas } from '../Spatial3DCanvas';
import { MagneticLink } from '../MagneticLink';

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Individual Art-Directed Project Scene Item
 * Supports pointer-following tilt (max 2–4 deg, 10–16px translation),
 * bespoke technical visual signatures, oversized media framing,
 * and smooth navigation.
 */
interface ProjectWallItemProps {
  project: Project;
  colSpanClass: string;
  offsetClass?: string;
  aspectRatio: string;
  is3DProject?: boolean;
  isAIProject?: boolean;
  isSvgProject?: boolean;
}

const ProjectWallItem: React.FC<ProjectWallItemProps> = ({
  project,
  colSpanClass,
  offsetClass = '',
  aspectRatio,
  is3DProject = false,
  isAIProject = false,
  isSvgProject = false,
}) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const targetCursor = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const title = localizeText(project.title);
  const summary = localizeText(project.summary);

  // Restrained cursor tracking with RAF interpolation
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    const loop = () => {
      setCursor((prev) => ({
        x: prev.x + (targetCursor.current.x - prev.x) * 0.1,
        y: prev.y + (targetCursor.current.y - prev.y) * 0.1,
      }));
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetCursor.current = { x: Math.max(-1, Math.min(1, xNorm)), y: Math.max(-1, Math.min(1, yNorm)) };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetCursor.current = { x: 0, y: 0 };
  };

  // Subtle 3D perspective calculations: Max 2–3.5 degrees, Max 10–14px translation
  const tiltX = -cursor.y * 3.2;
  const tiltY = cursor.x * 3.5;
  const transX = cursor.x * 12;
  const transY = cursor.y * 10;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${colSpanClass} ${offsetClass} group/scene select-none`}
    >
      {/* =====================================================================
          TECHNICAL ACCENT LAYER (Bespoke per project type)
          ===================================================================== */}
      <div className="absolute -inset-6 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {is3DProject && (
          <>
            {/* Real-time WebGL canvas depth accent */}
            <div
              className={`absolute -inset-10 transition-opacity duration-700 pointer-events-none ${
                isHovered ? 'opacity-70' : 'opacity-25'
              }`}
            >
              <Spatial3DCanvas isHovered={isHovered} />
            </div>

            {/* Perspective spatial coordinate ticks */}
            <svg className="w-full h-full absolute inset-0 opacity-20 group-hover/scene:opacity-45 transition-opacity duration-500">
              <line
                x1="0"
                y1="30%"
                x2="100%"
                y2="70%"
                stroke={isDark ? '#A78BFA' : '#7C3AED'}
                strokeWidth="0.75"
                strokeDasharray="4 6"
              />
              <circle
                cx="80%"
                cy="62%"
                r="4"
                fill={isDark ? '#C4B5FD' : '#8B5CF6'}
                className={isHovered ? 'animate-ping' : ''}
              />
            </svg>
          </>
        )}

        {isAIProject && (
          /* Melius-like: Circular & interface geometry accent */
          <svg className="w-full h-full absolute inset-0 opacity-20 group-hover/scene:opacity-50 transition-opacity duration-700">
            <g className="origin-[75%_45%]">
              <circle
                cx="75%"
                cy="45%"
                r="180"
                fill="none"
                stroke={isDark ? '#A78BFA' : '#7C3AED'}
                strokeWidth="0.8"
                strokeDasharray="3 7"
              />
              <circle
                cx="75%"
                cy="45%"
                r="240"
                fill="none"
                stroke={isDark ? '#C4B5FD' : '#8B5CF6'}
                strokeWidth="1.2"
                strokeDasharray="16 120"
                className="animate-[spin_55s_linear_infinite]"
              />
              {/* Radial cross ticks */}
              <line
                x1="75%"
                y1="15%"
                x2="75%"
                y2="75%"
                stroke={isDark ? '#8B5CF6' : '#7C3AED'}
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              <line
                x1="45%"
                y1="45%"
                x2="105%"
                y2="45%"
                stroke={isDark ? '#8B5CF6' : '#7C3AED'}
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            </g>
          </svg>
        )}

        {isSvgProject && (
          /* SVG Downloader: Data-line & network stream accent */
          <svg className="w-full h-full absolute inset-0 opacity-20 group-hover/scene:opacity-45 transition-opacity duration-500">
            <path
              d="M 0,60 C 150,60 250,140 450,140 S 650,80 900,80"
              fill="none"
              stroke={isDark ? '#A78BFA' : '#7C3AED'}
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            <circle cx="450" cy="140" r="3.5" fill={isDark ? '#C4B5FD' : '#7C3AED'} />
          </svg>
        )}
      </div>

      {/* =====================================================================
          MAIN CARD CONTAINER WITH PERSPECTIVE & TILT
          ===================================================================== */}
      <div className="relative z-10 space-y-5">
        {/* Top Minimal Index Header: Number & Category */}
        <div className="flex items-baseline justify-between font-mono text-xs opacity-60 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-light text-current opacity-75">
              {project.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="uppercase text-[10px] tracking-[0.24em] font-semibold text-violet-400">
              {project.category}
            </span>
          </div>

          <span className="text-[11px] opacity-75">{project.year}</span>
        </div>

        {/* Monumental Project Title with Fluid Scale & Hover Slide */}
        <div className="overflow-visible">
          <Link
            to={`/projects/${project.slug}`}
            data-cursor="EXAMINE"
            className="group/title inline-block focus:outline-none"
          >
            <h3
              className={`font-serif font-light text-[clamp(36px,4.2vw,64px)] tracking-[-0.04em] leading-[0.88] lowercase text-current transition-transform duration-500 ${
                isHovered ? 'translate-x-2' : ''
              }`}
            >
              <span>{title}</span>
              <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h3>
          </Link>
        </div>

        {/* Oversized Real Media Specimen Plate */}
        <div
          onClick={() => navigate(`/projects/${project.slug}`)}
          data-cursor="EXAMINE"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigate(`/projects/${project.slug}`);
          }}
          aria-label={`Inspect ${title}`}
          style={{
            transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${transX}px, ${transY}px, 0)`,
            transition: isHovered
              ? 'transform 0.12s ease-out'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative cursor-pointer will-change-transform mt-2 group/media"
        >
          {/* Glass Carrier Layer */}
          <div
            className={`relative p-2.5 sm:p-3.5 rounded-sm transition-all duration-500 ${
              isDark
                ? 'bg-[#09041d]/85 backdrop-blur-xl border border-violet-800/30 shadow-[0_25px_80px_-20px_rgba(124,58,237,0.35)] group-hover/media:border-violet-400/50 group-hover/media:shadow-[0_35px_100px_-20px_rgba(124,58,237,0.55)]'
                : 'bg-white/75 backdrop-blur-xl border border-[#E2DFD2] shadow-[0_25px_70px_-20px_rgba(30,20,50,0.12)] group-hover/media:border-neutral-500 group-hover/media:shadow-[0_35px_90px_-20px_rgba(30,20,50,0.18)]'
            }`}
          >
            {/* Subtle Corner Crosshairs */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-violet-400/80 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-violet-400/80 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-violet-400/80 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-violet-400/80 pointer-events-none z-20" />

            {/* Untouched Real Media Frame */}
            <div className="relative overflow-hidden rounded-xs">
              <div
                className={`transition-transform duration-700 ease-out ${
                  isHovered ? 'scale-[1.018]' : 'scale-100'
                }`}
              >
                <ProjectMediaFrame
                  project={project}
                  aspectRatio={aspectRatio}
                  isHovered={isHovered}
                  priority={false}
                  showCaption={false}
                />
              </div>

              {/* Ambient Sheen Glaze */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.05] via-transparent to-transparent pointer-events-none opacity-50 group-hover/media:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Subtle Interactive Action Indicator */}
            <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] sm:text-[11px] opacity-75">
              <span className="lowercase opacity-80">{project.slug}</span>
              <div className="flex items-center gap-1.5 text-violet-400 font-semibold uppercase tracking-wider text-[10px]">
                <span>Examine</span>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isHovered ? 'translate-x-1 -translate-y-1 text-violet-300' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Ambient Radiant Glow behind plate */}
          <div
            className={`absolute -inset-3 rounded-lg filter blur-2xl pointer-events-none -z-10 transition-opacity duration-700 ${
              isDark ? 'bg-violet-600/20' : 'bg-purple-400/15'
            } ${isHovered ? 'opacity-80' : 'opacity-20'}`}
          />
        </div>

        {/* Concentrated Narrative Summary (Readable, zero filler) */}
        <p className="text-[14px] sm:text-[15px] opacity-80 font-sans leading-relaxed font-light max-w-xl pt-1">
          {summary}
        </p>
      </div>
    </article>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  // Project A: Prefer 3D / Spatial (Col 1-5, Top: 0)
  const projectA =
    projects.find((p) => p.slug.includes('3d') || p.slug.includes('rockyhomepage3d')) || projects[0];

  // Project B: Prefer AI / Interface (Col 6-12, Top: 120-220px offset)
  const projectB =
    projects.find((p) => p.slug !== projectA?.slug) || projects[1] || projects[0];

  const isA3D = projectA.slug.includes('3d') || projectA.slug.includes('rockyhomepage');
  const isAAI = projectA.slug.includes('ai') || projectA.slug.includes('melius');
  const isASvg = projectA.slug.includes('svg') || projectA.slug.includes('asset');

  const isB3D = projectB.slug.includes('3d') || projectB.slug.includes('rockyhomepage');
  const isBAI = projectB.slug.includes('ai') || projectB.slug.includes('melius');
  const isBSvg = projectB.slug.includes('svg') || projectB.slug.includes('asset');

  return (
    <div className="pt-16 sm:pt-24 lg:pt-32 pb-16">
      {/* 12-Column Asymmetric Art-Directed Project Wall
          Project A: 5 columns, top: 0
          Project B: 7 columns, top: 120–220px offset (lg:pt-40 xl:pt-48) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
        {/* Project A: 5 Columns */}
        {projectA && (
          <ProjectWallItem
            project={projectA}
            colSpanClass="lg:col-span-5"
            offsetClass="lg:pt-0"
            aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
            is3DProject={isA3D}
            isAIProject={isAAI}
            isSvgProject={isASvg}
          />
        )}

        {/* Project B: 7 Columns with 120–220px Vertical Stagger */}
        {projectB && (
          <ProjectWallItem
            project={projectB}
            colSpanClass="lg:col-span-7"
            offsetClass="lg:pt-36 xl:pt-44"
            aspectRatio="aspect-[16/10] sm:aspect-[21/11]"
            is3DProject={isB3D}
            isAIProject={isBAI}
            isSvgProject={isBSvg}
          />
        )}
      </div>
    </div>
  );
};

