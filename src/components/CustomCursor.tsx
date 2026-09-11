import React, { useEffect, useState, useRef } from 'react';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const CustomCursor: React.FC = () => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const requestRef = useRef<number | null>(null);

  // Check if device supports fine pointer (mouse/trackpad, not touch)
  useEffect(() => {
    const checkFine = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(checkFine);

    const mql = window.matchMedia('(pointer: fine)');
    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Smooth lerp animation loop
  useEffect(() => {
    if (!isFinePointer) return;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const animate = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.22),
        y: lerp(prev.y, targetPos.y, 0.22),
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos, isFinePointer]);

  // Global mouse tracking & contextual label inspection
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Contextual detection
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        setCursorLabel(cursorEl.getAttribute('data-cursor'));
        setIsHovered(true);
        return;
      }

      const isLink = target.closest('a, button, [role="button"]');
      if (isLink) {
        // Detect link type
        const href = isLink.getAttribute('href') || '';
        if (href.includes('github.com')) {
          setCursorLabel('CODE');
        } else if (isLink.getAttribute('target') === '_blank') {
          setCursorLabel('VISIT');
        } else {
          setCursorLabel(null);
        }
        setIsHovered(true);
      } else {
        setCursorLabel(null);
        setIsHovered(false);
      }
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

  const size = cursorLabel ? 76 : isHovered ? 48 : 28;
  const isText = Boolean(cursorLabel);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
      }}
    >
      {/* Outer Contextual Ring */}
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-300 ease-out border backdrop-blur-xs ${
          isDark
            ? isText
              ? 'bg-violet-950/85 border-violet-400 text-violet-200 shadow-[0_0_25px_rgba(139,92,246,0.6)]'
              : isHovered
              ? 'bg-violet-600/20 border-violet-400/80'
              : 'bg-transparent border-violet-400/50'
            : isText
            ? 'bg-[#171717]/90 border-[#171717] text-[#FAF9F5] shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
            : isHovered
            ? 'bg-black/10 border-black/70'
            : 'bg-transparent border-black/40'
        } ${isMouseDown ? 'scale-90' : 'scale-100'}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {isText ? (
          <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase select-none animate-fadeIn">
            {cursorLabel}
          </span>
        ) : (
          /* Central Focal Dot */
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              isDark ? 'bg-violet-300' : 'bg-[#171717]'
            } ${isHovered ? 'scale-150' : 'scale-100'}`}
          />
        )}
      </div>
    </div>
  );
};
