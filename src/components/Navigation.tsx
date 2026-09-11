import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon, Search, Terminal, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  onOpenStatement?: () => void;
  onOpenCommand?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenStatement, onOpenCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { t } = useLanguage();
  const { mode, toggleMode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const isWorkActive = location.pathname === '/';
  const isArchiveActive = location.pathname.startsWith('/archive');
  const isLabsActive = location.pathname.startsWith('/experiments');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-500 px-4 sm:px-8 py-3">
      {/* Dynamic Floating Morphing Glass Frame */}
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? isDark
              ? 'max-w-[1320px] rounded-full bg-[#08021c]/80 backdrop-blur-2xl border border-violet-600/40 shadow-[0_20px_60px_-10px_rgba(124,58,237,0.35)] px-6 sm:px-8 h-16 text-[#F5F3EF]'
              : 'max-w-[1320px] rounded-full bg-[#FAF9F5]/85 backdrop-blur-2xl border border-[#D8D4C5] shadow-[0_20px_50px_-10px_rgba(30,20,50,0.12)] px-6 sm:px-8 h-16 text-[#171717]'
            : isDark
            ? 'max-w-[1560px] bg-transparent border-b border-violet-950/40 px-2 sm:px-4 h-20 text-[#F5F3EF]'
            : 'max-w-[1560px] bg-transparent border-b border-[#E2DFD2]/70 px-2 sm:px-4 h-20 text-[#171717]'
        } flex items-center justify-between`}
      >
        {/* Left: Studio Identity & Telemetry Node */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 select-none"
            aria-label="Rocky Babcock — Studio"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping shrink-0" />
            <span className="font-serif text-2xl sm:text-[25px] font-normal tracking-[-0.02em] transition-opacity group-hover:opacity-75">
              Rocky Babcock
            </span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.24em] opacity-45 px-1.5 py-0.5 rounded-xs bg-current/5">
              STUDIO
            </span>
          </Link>
        </div>

        {/* Center/Right: Cinematic Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] uppercase tracking-[0.22em] font-mono"
        >
          <Link
            to="/"
            aria-current={isWorkActive ? 'page' : undefined}
            className={`transition-all duration-300 py-1 relative ${
              isWorkActive
                ? 'text-current font-bold'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Work</span>
            {isWorkActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-violet-400" />
            )}
          </Link>

          <Link
            to="/archive"
            aria-current={isArchiveActive ? 'page' : undefined}
            className={`transition-all duration-300 py-1 relative ${
              isArchiveActive
                ? 'text-current font-bold'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Archive</span>
            {isArchiveActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-violet-400" />
            )}
          </Link>

          <Link
            to="/experiments"
            aria-current={isLabsActive ? 'page' : undefined}
            className={`transition-all duration-300 py-1 relative ${
              isLabsActive
                ? 'text-current font-bold'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Labs</span>
            {isLabsActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-violet-400" />
            )}
          </Link>

          {onOpenStatement && (
            <button
              onClick={onOpenStatement}
              className="opacity-55 hover:opacity-100 transition-opacity py-1 cursor-pointer focus:outline-none"
            >
              <span>{t.nav.about}</span>
            </button>
          )}

          {/* Interactive Tool Control Strip */}
          <div className="flex items-center gap-5 pl-5 border-l border-current/15">
            {/* Command Palette Trigger */}
            {onOpenCommand && (
              <button
                onClick={onOpenCommand}
                className="opacity-65 hover:opacity-100 transition-all cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/50 text-[10px]"
                title="Open Command Palette (⌘K)"
                aria-label="Open Command Palette"
              >
                <Terminal className="w-3 h-3 text-violet-400" />
                <span className="hidden lg:inline text-violet-300 font-semibold">CMD</span>
                <kbd className="text-[9px] opacity-75 font-mono px-1 py-0.2 bg-black/20 rounded">⌘K</kbd>
              </button>
            )}

            {/* Surface Mode Toggle */}
            <button
              onClick={toggleMode}
              className="opacity-65 hover:opacity-100 transition-opacity inline-flex items-center gap-2 cursor-pointer text-[10px] tracking-[0.2em]"
              title={`Switch to ${isDark ? 'Paper (Light Canvas)' : 'Studio (Lab Violet)'} surface`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-violet-400" />
                  <span className="hidden xl:inline">Studio</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="hidden xl:inline">Paper</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-3">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="p-2 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4 text-violet-400" />
            </button>
          )}

          <button
            onClick={toggleMode}
            className="p-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Toggle dark and light surface mode"
          >
            {isDark ? <Moon className="w-4 h-4 text-violet-400" /> : <Sun className="w-4 h-4 text-[#8B5CF6]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 opacity-75 hover:opacity-100 transition-opacity"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-2 p-6 rounded-sm border shadow-2xl space-y-6 transition-all font-mono text-sm uppercase tracking-widest ${
            isDark
              ? 'bg-[#0a0520] border-violet-900/60 text-[#F5F3EF]'
              : 'bg-[#FAF9F5] border-[#E2DFD2] text-[#171717]'
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isWorkActive ? 'text-violet-400 font-bold' : 'opacity-70'}`}
            >
              Work
            </Link>
            <Link
              to="/archive"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isArchiveActive ? 'text-violet-400 font-bold' : 'opacity-70'}`}
            >
              Archive
            </Link>
            <Link
              to="/experiments"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isLabsActive ? 'text-violet-400 font-bold' : 'opacity-70'}`}
            >
              Labs
            </Link>
            {onOpenStatement && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatement();
                }}
                className="text-left py-1 opacity-70"
              >
                {t.nav.about}
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-current/10 flex items-center justify-between">
            <span className="text-xs opacity-50">LANGUAGE</span>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};
