import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sun, Moon, Sparkles, FolderArchive, Layers, ExternalLink, X, Compass } from 'lucide-react';
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
      setTimeout(() => inputRef.current?.focus(), 50);
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
        type: 'PROJECT' as const,
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
        type: 'EXPERIMENT' as const,
        title: localizeText(exp.title),
        subtitle: `${exp.discipline} · ${exp.category}`,
        action: () => {
          navigate('/experiments');
          onClose();
        },
      }));

    const systemActions = [
      {
        id: 'nav-archive',
        type: 'SYSTEM' as const,
        title: 'Open Complete Archive Directory',
        subtitle: 'Index of all software specimens and artifacts',
        action: () => {
          navigate('/archive');
          onClose();
        },
      },
      {
        id: 'nav-experiments',
        type: 'SYSTEM' as const,
        title: 'Explore Creative Code & Labs',
        subtitle: 'Shaders, WebGL, AI prototypes & Web3 simulations',
        action: () => {
          navigate('/experiments');
          onClose();
        },
      },
      {
        id: 'action-theme',
        type: 'ACTION' as const,
        title: isDark ? 'Switch to Paper Mode (Light Canvas)' : 'Switch to Studio Mode (Lab Dark)',
        subtitle: `Currently in ${mode.toUpperCase()} mode`,
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Archive Command Palette"
        className={`relative w-full max-w-2xl border shadow-2xl rounded-xs overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#08031e] border-violet-900/60 text-[#F5F3EF]'
            : 'bg-[#FAF9F5] border-[#D1CEBF] text-[#171717]'
        }`}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-current/10">
          <Search className="w-5 h-5 text-[#8B5CF6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, experiments, protocols, or commands..."
            className="w-full bg-transparent outline-none text-base sm:text-lg font-sans placeholder:opacity-40 font-light"
          />
          <button
            onClick={onClose}
            className="p-1 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-current/5 py-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center font-mono text-sm opacity-50 space-y-1">
              <p>No matching specimens or actions found.</p>
              <p className="text-xs">Try searching for "SVG", "3D", "AI", or "EVM"</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-5 py-3 cursor-pointer flex items-center justify-between gap-4 transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-violet-900/40 text-violet-200'
                        : 'bg-[#ECEADE] text-[#171717]'
                      : 'hover:opacity-100'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded tracking-widest ${
                          item.type === 'PROJECT'
                            ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]'
                            : item.type === 'EXPERIMENT'
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-emerald-500/20 text-emerald-500'
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="font-serif text-lg lowercase font-light truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs font-mono opacity-60 truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 font-mono text-xs opacity-40 flex items-center gap-1">
                    {isSelected && <span>SELECT</span>}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Footer */}
        <div className="px-5 py-2.5 border-t border-current/10 flex items-center justify-between font-mono text-[11px] opacity-60">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 border border-current/30 rounded text-[10px]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 border border-current/30 rounded text-[10px]">↵</kbd> select
            </span>
            <span>
              <kbd className="px-1 border border-current/30 rounded text-[10px]">esc</kbd> close
            </span>
          </div>
          <span className="uppercase tracking-widest text-[10px] text-[#8B5CF6]">
            rocky archive command
          </span>
        </div>
      </div>
    </div>
  );
};
