import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sun, Moon, Sparkles, Terminal, Box, Layers, ExternalLink, X, Compass, Cpu } from 'lucide-react';
import { projectsData } from '../data/projects';
import { experimentsData } from '../data/experiments';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { localizeText } = useLanguage();
  const { mode, toggleMode } = useSurfaceMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Build items list
  const filteredItems = React.useMemo(() => {
    const q = query.toLowerCase().trim();

    const projectItems = projectsData
      .filter((p) => {
        if (!q) return true;
        const title = localizeText(p.title).toLowerCase();
        const summary = localizeText(p.summary).toLowerCase();
        const tools = p.tools.join(' ').toLowerCase();
        return title.includes(q) || summary.includes(q) || tools.includes(q) || p.slug.includes(q);
      })
      .map((p) => ({
        id: `project-${p.slug}`,
        type: 'SPECIMEN' as const,
        badge: `PLATE #${p.number}`,
        title: localizeText(p.title),
        subtitle: `${p.category} · ${p.type} (${p.status})`,
        action: () => {
          navigate(`/projects/${p.slug}`);
          onClose();
        },
      }));

    const experimentItems = experimentsData
      .filter((exp) => {
        if (!q) return true;
        const title = localizeText(exp.title).toLowerCase();
        const desc = localizeText(exp.description).toLowerCase();
        const tags = exp.tags.join(' ').toLowerCase();
        return title.includes(q) || desc.includes(q) || tags.includes(q);
      })
      .map((exp) => ({
        id: `exp-${exp.id}`,
        type: 'LAB_EXPERIMENT' as const,
        badge: exp.category,
        title: localizeText(exp.title),
        subtitle: `${exp.discipline} · Interactive Prototype`,
        action: () => {
          navigate('/experiments');
          onClose();
        },
      }));

    const systemActions = [
      {
        id: 'nav-archive',
        type: 'COMMAND' as const,
        badge: 'DIRECTORY',
        title: 'Open Complete Archive Directory',
        subtitle: 'Index of all software specimens and artifacts',
        action: () => {
          navigate('/archive');
          onClose();
        },
      },
      {
        id: 'nav-experiments',
        type: 'COMMAND' as const,
        badge: 'SHADERS & LABS',
        title: 'Explore Creative Code & Labs',
        subtitle: 'Shaders, WebGL, AI prototypes & Web3 simulations',
        action: () => {
          navigate('/experiments');
          onClose();
        },
      },
      {
        id: 'action-theme',
        type: 'COMMAND' as const,
        badge: 'SURFACE MODE',
        title: isDark ? 'Switch to Paper Mode (Warm Light Canvas)' : 'Switch to Studio Mode (Cinematic Violet Lab)',
        subtitle: `Currently rendering in ${mode.toUpperCase()} surface`,
        action: () => {
          toggleMode();
          onClose();
        },
      },
    ].filter((item) => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
    });

    return [...projectItems, ...experimentItems, ...systemActions];
  }, [query, localizeText, navigate, onClose, isDark, mode, toggleMode]);

  // Handle keyboard arrow navigation & enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Archive Command Palette"
        className={`relative w-full max-w-3xl border shadow-[0_30px_100px_rgba(124,58,237,0.35)] rounded-sm overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#08031e]/95 border-violet-600/50 text-[#F5F3EF]'
            : 'bg-[#FAF9F5]/95 border-[#D1CEBF] text-[#171717]'
        }`}
      >
        {/* Glowing Decorative Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 via-purple-400 to-indigo-500" />

        {/* Search Header with Monumental Display Typography */}
        <div className="flex items-center gap-4 px-6 sm:px-8 py-6 border-b border-current/10">
          <Terminal className="w-6 h-6 text-violet-400 shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or shader protocol..."
            className="w-full bg-transparent outline-none font-serif text-2xl sm:text-3xl placeholder:opacity-30 font-light"
          />
          <button
            onClick={onClose}
            className="p-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[62vh] overflow-y-auto divide-y divide-current/5 py-3">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center font-mono text-sm opacity-60 space-y-2">
              <p>NO DIRECT SPECIMEN OR COMMAND FOUND</p>
              <p className="text-xs opacity-50">Try searching "SVG", "3D", "Agent", or "WebGL"</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-6 sm:px-8 py-4 cursor-pointer flex items-center justify-between gap-4 transition-all ${
                    isSelected
                      ? isDark
                        ? 'bg-violet-900/40 text-violet-200 pl-9'
                        : 'bg-[#ECEADE] text-[#171717] pl-9'
                      : 'hover:opacity-100 opacity-80'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-xs tracking-widest font-semibold ${
                          item.type === 'SPECIMEN'
                            ? 'bg-violet-500/25 text-violet-300 border border-violet-500/40'
                            : item.type === 'LAB_EXPERIMENT'
                            ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-light tracking-tight truncate lowercase">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs font-mono opacity-65 truncate pl-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 font-mono text-xs opacity-50 flex items-center gap-1.5">
                    {isSelected && <span className="text-[10px] tracking-widest uppercase text-violet-400 font-bold">EXECUTE</span>}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Footer HUD */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-current/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] opacity-70 bg-current/[0.02]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/30 rounded text-[10px]">↑↓</kbd> NAVIGATE
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/30 rounded text-[10px]">↵</kbd> SELECT
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 border border-current/30 rounded text-[10px]">ESC</kbd> CLOSE
            </span>
          </div>
          <span className="uppercase tracking-widest text-[10px] text-violet-400 font-bold">
            STUDIO TELEMETRY V2.6
          </span>
        </div>
      </div>
    </div>
  );
};
