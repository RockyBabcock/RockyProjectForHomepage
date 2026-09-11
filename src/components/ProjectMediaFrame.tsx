import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, VolumeX, ExternalLink, Film, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectMediaItem } from '../types';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { WatercolorStain } from './WatercolorStain';

export interface ProjectMediaFrameProps {
  project: Project;
  mediaItem?: ProjectMediaItem;
  aspectRatio?: string;
  isHovered?: boolean;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
  allowZoom?: boolean;
}

export const ProjectMediaFrame: React.FC<ProjectMediaFrameProps> = ({
  project,
  mediaItem,
  aspectRatio = 'aspect-[16/10]',
  isHovered = false,
  priority = false,
  className = '',
  showCaption = false,
  allowZoom = true,
}) => {
  const { mode: surfaceMode } = useSurfaceMode();
  const isDark = surfaceMode === 'dark';

  // Determine active media item from prop or project fields
  const activeMedia: ProjectMediaItem | undefined =
    mediaItem ||
    project.heroMedia ||
    (project.media && project.media.length > 0 ? project.media[0] : undefined);

  const [hasMediaError, setHasMediaError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle video play/pause toggle
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const hasValidMedia = Boolean(activeMedia?.src && !hasMediaError);
  const isVideo = activeMedia?.type === 'video';

  const captionText = typeof activeMedia?.caption === 'string'
    ? activeMedia.caption
    : typeof activeMedia?.caption === 'object' && activeMedia.caption !== null
    ? (activeMedia.caption as any).en || ''
    : undefined;

  return (
    <div className={`relative group/media select-none ${className}`}>
      {/* 1. Subtle Pigment Underlay (subordinate to the media) */}
      <div
        className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-48 sm:w-64 h-40 sm:h-52 pointer-events-none transition-all duration-700 ease-out z-0 ${
          isHovered ? 'opacity-80 scale-105' : 'opacity-50 scale-100'
        }`}
        aria-hidden="true"
      >
        <WatercolorStain
          variant="corner-pool"
          palette={project.pigmentAccent}
          opacity={isDark ? 0.25 : 0.45}
        />
      </div>

      {/* 2. Main Media Frame — Pure Editorial Presentation without fake chrome */}
      <div
        className={`relative z-10 border rounded-xs overflow-hidden transition-all duration-500 ease-out ${
          isDark
            ? isHovered
              ? 'bg-[#0a0620] border-violet-600/50 shadow-[0_16px_48px_rgba(0,0,0,0.6)]'
              : 'bg-[#070417] border-violet-950/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
            : isHovered
              ? 'bg-[#FAF9F5] border-[#B8B2A2] shadow-[0_16px_48px_rgba(23,23,23,0.08)]'
              : 'bg-[#F2EFE9] border-[#E2DFD2] shadow-[0_4px_24px_rgba(23,23,23,0.03)]'
        }`}
      >
        {/* Viewport Area */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-[#110e1a]`}>
          {hasValidMedia ? (
            isVideo ? (
              /* REAL VIDEO / SCREEN RECORDING PRESENTATION */
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={activeMedia!.src}
                  poster={activeMedia!.poster || project.cover}
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop
                  playsInline
                  preload={priority ? 'auto' : 'metadata'}
                  onLoadedData={() => setIsLoaded(true)}
                  onError={() => setHasMediaError(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    allowZoom && isHovered ? 'scale-[1.015]' : 'scale-100'
                  } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Subtle Video Controls (Pause/Play & Mute Pill) */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded-xs bg-[#030014]/80 text-[#FAF9F5] hover:bg-[#8B5CF6] transition-colors backdrop-blur-xs border border-white/10"
                    title={isPlaying ? 'Pause playback' : 'Play video'}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <span className="px-2 py-1 rounded-xs bg-[#030014]/80 text-[#FAF9F5] text-[10px] font-mono tracking-wider backdrop-blur-xs border border-white/10 flex items-center gap-1">
                    <VolumeX className="w-2.5 h-2.5 opacity-60" />
                    <span>MUTED</span>
                  </span>
                </div>
              </div>
            ) : (
              /* REAL SCREENSHOT / CAPTURE IMAGE PRESENTATION */
              <div className="relative w-full h-full">
                <img
                  src={activeMedia!.src}
                  alt={activeMedia!.alt || `${project.number} — ${project.previewUrl} production capture`}
                  loading={priority ? 'eager' : 'lazy'}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasMediaError(true)}
                  className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                    allowZoom && isHovered ? 'scale-[1.02]' : 'scale-100'
                  } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            )
          ) : (
            /* DELIBERATE NEUTRAL PLACEHOLDER STATE — Authentic & Honest */
            <div
              className={`w-full h-full flex flex-col justify-between p-6 sm:p-8 relative ${
                isDark
                  ? 'bg-gradient-to-br from-[#0c0724] to-[#050212] text-[#E0DEF4]'
                  : 'bg-gradient-to-br from-[#FAF9F5] to-[#EEECE3] text-[#33302B]'
              }`}
            >
              {/* Corner Framing Reticle Brackets */}
              <div className="absolute top-3 left-3 text-xs font-mono opacity-35 select-none">⌜</div>
              <div className="absolute top-3 right-3 text-xs font-mono opacity-35 select-none">⌝</div>
              <div className="absolute bottom-3 left-3 text-xs font-mono opacity-35 select-none">⌞</div>
              <div className="absolute bottom-3 right-3 text-xs font-mono opacity-35 select-none">⌟</div>

              {/* Top Annotation Plate */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono opacity-60 tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>SPECIMEN CAPTURE ARCHIVE // REF_{project.number}</span>
                </div>
                <span>STATUS: AWAITING REAL MEDIA</span>
              </div>

              {/* Center Specimen Statement */}
              <div className="space-y-3 max-w-md py-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  {project.slug === 'rockyhomepage3D' ? (
                    <Film className="w-4 h-4 text-[#8B5CF6]" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-[#8B5CF6]" />
                  )}
                  <span className="uppercase tracking-widest font-semibold text-[11px]">
                    {project.slug === 'rockyhomepage3D'
                      ? 'Screen Recording Capture Expected'
                      : 'Production Capture Asset Pending'}
                  </span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-light leading-snug opacity-85">
                  Verified work in progress. This exhibit presents real recordings and screenshots
                  from the live deployment rather than simulated mockups.
                </p>
                <div className="text-[11px] font-mono opacity-60 space-y-0.5">
                  <p>Target format: 1920×1080 capture or 60fps MP4 recording</p>
                  <p className="truncate">Repo: {project.github?.replace('https://', '')}</p>
                </div>
              </div>

              {/* Bottom Quick-Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-3 border-t border-current/10">
                <span className="opacity-50 text-[10px] tracking-widest uppercase">
                  {project.type}
                </span>
                {project.demo && (
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold opacity-80 ${
                      isDark ? 'text-violet-300' : 'text-[#8B5CF6]'
                    }`}
                  >
                    <span>Live Deployment Active</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Archival Specimen Crosshairs at Bottom Corners (when real media is shown) */}
          {hasValidMedia && (
            <>
              <div className="absolute bottom-2 left-2.5 pointer-events-none z-20 font-mono text-[9px] text-white/60 tracking-wider hidden sm:block drop-shadow-xs">
                + CAPTURE_{project.number} // {project.type}
              </div>
              <div className="absolute bottom-2 right-2.5 pointer-events-none z-20 font-mono text-[9px] text-white/60 tracking-wider hidden sm:block drop-shadow-xs">
                {isVideo ? '60FPS RECORDING' : '1:1 SCREEN CAPTURE'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Optional Caption */}
      {showCaption && captionText && (
        <figcaption className="mt-2 text-xs font-mono opacity-70 flex items-center justify-between">
          <span>{captionText}</span>
          <span className="opacity-40">{project.number}</span>
        </figcaption>
      )}
    </div>
  );
};
