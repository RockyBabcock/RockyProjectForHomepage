import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Film, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { ProjectMediaItem } from '../types';

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProjectMediaItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  projectNumber?: string;
  projectSlug?: string;
  liveDemoUrl?: string;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
  projectNumber = '01',
  projectSlug = '',
  liveDemoUrl,
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && items.length > 1) {
        onSelectIndex((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft' && items.length > 1) {
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  const isVideo = currentItem?.type === 'video';
  const totalCount = String(items.length).padStart(2, '0');
  const activeCount = String(currentIndex + 1).padStart(2, '0');

  const captionText = typeof currentItem?.caption === 'string'
    ? currentItem.caption
    : typeof currentItem?.caption === 'object' && currentItem.caption !== null
    ? (currentItem.caption as any).en || ''
    : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media Exhibition Lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#04020a]/95 text-[#FAF9F5] backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      {/* 1. Lightbox Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#8B5CF6] font-semibold">●</span>
          <span className="uppercase tracking-widest text-[11px] opacity-80">
            SPECIMEN ARCHIVE // {projectSlug || `PLATE_${projectNumber}`}
          </span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden sm:inline opacity-60 text-[11px]">
            {isVideo ? '60FPS PRODUCTION RECORDING' : '1:1 HIGH-RES CAPTURE'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Media Counter */}
          <span className="px-2.5 py-1 rounded-xs bg-white/5 border border-white/10 text-[11px] tracking-widest">
            PLATE <span className="text-[#A78BFA] font-bold">{activeCount}</span> / {totalCount}
          </span>

          {/* Zoom Toggle */}
          {!isVideo && (
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-1.5 rounded-xs hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isZoomed ? 'Reset zoom' : '1:1 zoom view'}
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xs hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            title="Close viewer (Esc)"
            aria-label="Close lightbox"
          >
            <span className="text-[11px] uppercase tracking-widest hidden sm:inline opacity-70">close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Main Media Stage */}
      <main className="relative flex-1 flex items-center justify-center p-4 sm:p-10 overflow-hidden">
        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => onSelectIndex((currentIndex - 1 + items.length) % items.length)}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-xs bg-white/5 hover:bg-white/15 text-white/75 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Previous plate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSelectIndex((currentIndex + 1) % items.length)}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-xs bg-white/5 hover:bg-white/15 text-white/75 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Next plate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Media Frame Display */}
        <div className="relative max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center">
          {currentItem.src ? (
            isVideo ? (
              <video
                src={currentItem.src}
                poster={currentItem.poster}
                controls
                autoPlay
                className="max-w-full max-h-[72vh] rounded-xs border border-white/15 shadow-2xl"
              />
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.alt || captionText || 'Verified project capture'}
                className={`max-w-full max-h-[72vh] object-contain rounded-xs border border-white/15 shadow-2xl transition-transform duration-300 ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            )
          ) : (
            /* Neutral Specimen Plate in Lightbox */
            <div className="p-10 border border-white/15 bg-white/5 text-center space-y-4 max-w-lg rounded-xs">
              <div className="flex justify-center text-[#A78BFA]">
                {isVideo ? <Film className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
              </div>
              <h3 className="font-serif text-2xl font-light">
                Verified Production Capture Pending
              </h3>
              <p className="text-xs font-mono opacity-70 leading-relaxed">
                This museum plate is reserved for direct exports and screen recordings from the live deployment.
              </p>
              {liveDemoUrl && (
                <a
                  href={liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-mono uppercase tracking-wider transition-colors rounded-xs"
                >
                  <span>Launch Live Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 3. Lightbox Footer with Caption */}
      <footer className="px-6 sm:px-10 py-4 border-t border-white/10 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 opacity-80">
        <div className="flex items-center gap-2">
          <span className="text-[#A78BFA] font-bold">[ PLATE {activeCount} ]</span>
          <span className="opacity-90">{captionText || `Production evidence artifact #${projectNumber}`}</span>
        </div>
        <div className="text-[11px] opacity-50 tracking-wider">
          USE ESC OR CLOSE TO EXIT · ARROW KEYS TO NAVIGATE
        </div>
      </footer>
    </div>
  );
};
