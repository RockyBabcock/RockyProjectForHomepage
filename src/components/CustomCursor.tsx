import React, { useEffect, useState, useRef } from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export type CursorContextType = 'DEFAULT' | 'VIEW' | 'OPEN' | 'VISIT' | 'DRAG' | 'CODE';

export const CustomCursor: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  // State
  const [cursorState, setCursorState] = useState<CursorContextType>('DEFAULT');
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Position references for physics spring/lerp
  const targetPos = useRef({ x: -200, y: -200 });
  const pointPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const pointElRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Detect fine pointer (mouse/trackpad, exclude touch devices)
  useEffect(() => {
    const checkFine = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(checkFine);

    const mql = window.matchMedia('(pointer: fine)');
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Continuous physics animation loop
  useEffect(() => {
    if (!isFinePointer) return;

    let isActive = true;

    const loop = () => {
      if (!isActive) return;

      const targetX = targetPos.current.x;
      const targetY = targetPos.current.y;

      // Central point: very fast response (sharp physical contact)
      pointPos.current.x += (targetX - pointPos.current.x) * 0.45;
      pointPos.current.y += (targetY - pointPos.current.y) * 0.45;

      // Outer ring: lags behind slightly with spring-like elastic inertia
      ringPos.current.x += (targetX - ringPos.current.x) * 0.16;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.16;

      if (pointElRef.current) {
        pointElRef.current.style.transform = `translate3d(${pointPos.current.x}px, ${pointPos.current.y}px, 0)`;
      }

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      isActive = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer]);

  // Global mouse tracking & contextual element detection
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Make visible once inside window
      if (!isVisible) setIsVisible(true);

      // Contextual inspection
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Explicit data-cursor attributes
      const explicitCursor = target.closest('[data-cursor]') as HTMLElement | null;
      if (explicitCursor) {
        const val = (explicitCursor.getAttribute('data-cursor') || '').toUpperCase();
        if (['VIEW', 'OPEN', 'VISIT', 'DRAG', 'CODE'].includes(val)) {
          setCursorState(val as CursorContextType);
          setIsHovered(true);
          return;
        }
        // Map common synonyms to standardized instrument states
        if (val === 'EXAMINE' || val === 'SHOW') {
          setCursorState('VIEW');
          setIsHovered(true);
          return;
        }
        if (val === 'EXPLORE') {
          setCursorState('OPEN');
          setIsHovered(true);
          return;
        }
      }

      // 2. Project media frame or media interactive containers -> VIEW
      const isMedia = target.closest(
        '[data-project-media], .group\\/media, article [role="button"], [aria-label*="Inspect"], [aria-label*="View"]'
      );
      if (isMedia && !target.closest('a[href]')) {
        setCursorState('VIEW');
        setIsHovered(true);
        return;
      }

      // 3. Draggable areas or canvas elements -> DRAG
      const isDraggable = target.closest('[data-draggable], canvas, [role="slider"], input[type="range"]');
      if (isDraggable) {
        setCursorState('DRAG');
        setIsHovered(true);
        return;
      }

      // 4. Links & buttons contextual resolution
      const isLink = target.closest('a, button, [role="button"]');
      if (isLink) {
        const href = isLink.getAttribute('href') || '';
        const ariaLabel = (isLink.getAttribute('aria-label') || '').toLowerCase();
        const textContent = (isLink.textContent || '').toLowerCase();

        if (href.includes('github.com') || textContent.includes('source') || textContent.includes('github')) {
          setCursorState('CODE');
        } else if (
          isLink.getAttribute('target') === '_blank' ||
          href.startsWith('http') ||
          textContent.includes('demo') ||
          textContent.includes('launch') ||
          textContent.includes('visit')
        ) {
          setCursorState('VISIT');
        } else if (
          href.startsWith('/projects/') ||
          ariaLabel.includes('project') ||
          textContent.includes('view') ||
          textContent.includes('specimen')
        ) {
          setCursorState('OPEN');
        } else {
          // Standard clickable element
          setCursorState('DEFAULT');
        }
        setIsHovered(true);
        return;
      }

      // Default surface
      setCursorState('DEFAULT');
      setIsHovered(false);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, isFinePointer]);

  if (!isFinePointer || !isVisible) return null;

  const hasLabel = cursorState !== 'DEFAULT';
  const isView = cursorState === 'VIEW';

  // Ring dimension: default ~26px, hover clickable ~38px, media/label ~54-58px (1.8x–2.2x scale)
  const ringSize = isView ? 58 : hasLabel ? 54 : isHovered ? 38 : 26;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none" aria-hidden="true">
      {/* 1. Central Precision Focal Point (Immediate response) */}
      <div
        ref={pointElRef}
        className="fixed top-0 left-0 -ml-[2px] -mt-[2px] will-change-transform pointer-events-none"
      >
        <div
          className={`w-1 h-1 rounded-full transition-all duration-200 ${
            isDark ? 'bg-violet-200 shadow-[0_0_6px_#C4B5FD]' : 'bg-[#171717]'
          } ${hasLabel ? 'scale-0 opacity-0' : isHovered ? 'scale-125' : 'scale-100'}`}
        />
      </div>

      {/* 2. Outer Contextual Instrument Ring (Elastic spring lag) */}
      <div
        ref={ringElRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none flex items-center justify-center"
      >
        <div
          className={`relative rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
            isDark
              ? hasLabel
                ? 'bg-violet-950/80 border border-violet-400/90 text-violet-100 shadow-[0_0_30px_rgba(139,92,246,0.45)] backdrop-blur-xs'
                : isHovered
                ? 'bg-violet-600/15 border border-violet-400/70'
                : 'bg-transparent border border-violet-400/40'
              : hasLabel
              ? 'bg-[#171717]/92 border border-[#171717] text-[#FAF9F5] shadow-[0_4px_24px_rgba(0,0,0,0.22)] backdrop-blur-xs'
              : isHovered
              ? 'bg-black/8 border border-neutral-700/60'
              : 'bg-transparent border border-neutral-800/35'
          } ${isMouseDown ? 'scale-90' : 'scale-100'}`}
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            marginLeft: `-${ringSize / 2}px`,
            marginTop: `-${ringSize / 2}px`,
          }}
        >
          {/* Subtle 4-axis reticle marks on outer ring in default state */}
          {!hasLabel && !isHovered && (
            <>
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[2px] ${
                  isDark ? 'bg-violet-400/60' : 'bg-neutral-800/50'
                }`}
              />
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[2px] ${
                  isDark ? 'bg-violet-400/60' : 'bg-neutral-800/50'
                }`}
              />
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[1px] ${
                  isDark ? 'bg-violet-400/60' : 'bg-neutral-800/50'
                }`}
              />
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[1px] ${
                  isDark ? 'bg-violet-400/60' : 'bg-neutral-800/50'
                }`}
              />
            </>
          )}

          {/* Contextual Monospace Label */}
          <div
            className={`font-mono text-[9px] tracking-[0.24em] font-bold uppercase select-none transition-all duration-200 transform ${
              hasLabel ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
            }`}
          >
            {hasLabel ? cursorState : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

