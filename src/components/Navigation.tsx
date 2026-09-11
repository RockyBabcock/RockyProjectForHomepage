import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  onOpenStatement?: () => void;
  onOpenCommand?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenStatement, onOpenCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        isDark
          ? 'bg-[#030014]/85 text-[#F5F3EF]'
          : 'bg-[#F5F4ED]/85 text-[#171717]'
      } backdrop-blur-md border-b ${isDark ? 'border-violet-950/30' : 'border-[#E2DFD2]/60'}`}
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        {/* Left: Minimal studio logo / brand */}
        <div className="flex items-baseline gap-4">
          <Link
            to="/"
            className="group inline-flex items-baseline gap-2.5 tracking-[-0.03em] select-none"
            aria-label="Rocky Babcock — Studio"
          >
            <span className="font-serif text-2xl sm:text-[26px] font-normal tracking-[-0.02em] transition-colors group-hover:opacity-75">
              Rocky Babcock
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.22em] opacity-35">
              Studio
            </span>
          </Link>
        </div>

        {/* Right: Editorial Studio Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] uppercase tracking-[0.22em] font-mono"
        >
          <Link
            to="/"
            aria-current={isWorkActive ? 'page' : undefined}
            className={`transition-all duration-200 py-1 relative ${
              isWorkActive
                ? 'text-current font-medium'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Work</span>
            {isWorkActive && (
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] ${isDark ? 'bg-violet-400' : 'bg-[#171717]'}`} />
            )}
          </Link>

          <Link
            to="/archive"
            aria-current={isArchiveActive ? 'page' : undefined}
            className={`transition-all duration-200 py-1 relative ${
              isArchiveActive
                ? 'text-current font-medium'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Archive</span>
            {isArchiveActive && (
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] ${isDark ? 'bg-violet-400' : 'bg-[#171717]'}`} />
            )}
          </Link>

          <Link
            to="/experiments"
            aria-current={isLabsActive ? 'page' : undefined}
            className={`transition-all duration-200 py-1 relative ${
              isLabsActive
                ? 'text-current font-medium'
                : 'opacity-55 hover:opacity-100'
            }`}
          >
            <span>Labs</span>
            {isLabsActive && (
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] ${isDark ? 'bg-violet-400' : 'bg-[#171717]'}`} />
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

          {/* Secondary Controls: subtle dividers, un-boxed */}
          <div className="flex items-center gap-6 pl-4 border-l border-current/10">
            {/* Mode Switcher: text / clean icon */}
            <button
              onClick={toggleMode}
              className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center gap-2 cursor-pointer text-[11px] tracking-[0.2em]"
              title={`Switch to ${isDark ? 'Paper (Light)' : 'Studio (Dark)'} surface`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-violet-400" />
                  <span className="hidden lg:inline">Studio</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="hidden lg:inline">Paper</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="opacity-75 hover:opacity-100 transition-opacity">
              <LanguageSwitcher />
            </div>

            {/* Subtle Command Palette hint */}
            {onOpenCommand && (
              <button
                onClick={onOpenCommand}
                className="opacity-45 hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 cursor-pointer text-[11px]"
                title="Search (⌘K or /)"
                aria-label="Open command palette"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="text-[10px] opacity-70">⌘K</span>
              </button>
            )}
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3 font-mono">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="p-2 opacity-70 hover:opacity-100 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={toggleMode}
            className="p-2 opacity-70 hover:opacity-100 cursor-pointer"
            aria-label="Toggle mode"
          >
            {isDark ? <Moon className="w-4 h-4 text-violet-400" /> : <Sun className="w-4 h-4 text-[#8B5CF6]" />}
          </button>

          <LanguageSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-current opacity-80 hover:opacity-100 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Subtle Scroll Progress Indicator at header base */}
      <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-transparent overflow-hidden pointer-events-none">
        <div
          className={`h-full transition-[width] duration-150 ease-out ${
            isDark ? 'bg-gradient-to-r from-violet-600 to-indigo-400' : 'bg-gradient-to-r from-[#171717] to-[#8B5CF6]'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 space-y-5 transition-colors ${
            isDark ? 'bg-[#08041c] border-violet-950/40 text-[#F5F3EF]' : 'bg-[#FAF9F5] border-[#E2DFD2] text-[#171717]'
          }`}
        >
          <div className="flex flex-col gap-4 text-sm font-mono uppercase tracking-[0.2em]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isWorkActive ? 'font-semibold text-current' : 'opacity-70'}`}
            >
              Work
            </Link>

            <Link
              to="/archive"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isArchiveActive ? 'font-semibold text-current' : 'opacity-70'}`}
            >
              Archive
            </Link>

            <Link
              to="/experiments"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isLabsActive ? 'font-semibold text-current' : 'opacity-70'}`}
            >
              Labs
            </Link>

            {onOpenStatement && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatement();
                }}
                className="py-1 text-left opacity-70 hover:opacity-100 cursor-pointer"
              >
                {t.nav.about}
              </button>
            )}

            <a
              href="https://github.com/rockybuildingaiweb3-boop/RockyBlogForHomePage"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 opacity-70 hover:opacity-100 inline-flex items-center gap-1.5"
            >
              <span>Notes</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
