import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon, Search, Command } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  onOpenStatement?: () => void;
  onOpenCommand?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenStatement, onOpenCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { mode, toggleMode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const isWorkActive = location.pathname === '/';
  const isArchiveActive = location.pathname.startsWith('/archive') || location.pathname.startsWith('/projects');
  const isExperimentsActive = location.pathname.startsWith('/experiments');

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#030014]/85 border-violet-950/40 text-[#F5F3EF]'
          : 'bg-[#F5F4ED]/90 border-[#E2DFD2]/70 text-[#171717]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand / Logo + Studio Ecosystem Signal */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 select-none"
            aria-label="Rocky / WORK"
          >
            <span className="font-serif text-2xl font-light tracking-tight transition-colors group-hover:text-[#8B5CF6]">
              rocky<span className="text-[#8B5CF6] font-serif">.</span>
            </span>
            <span className="text-[11px] uppercase font-mono tracking-[0.24em] opacity-60">
              / ARCHIVE
            </span>
          </Link>

          {/* Live Studio Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-current/15 text-[10px] font-mono tracking-wider opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="uppercase text-[9px]">LIVE</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-[12px] uppercase tracking-[0.2em] font-mono"
        >
          <Link
            to="/"
            aria-current={isWorkActive ? 'page' : undefined}
            className={`transition-colors py-1 relative ${
              isWorkActive
                ? 'font-semibold text-current'
                : 'opacity-65 hover:opacity-100'
            }`}
          >
            <span>SELECTED</span>
            {isWorkActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#8B5CF6]" />
            )}
          </Link>

          <Link
            to="/archive"
            aria-current={isArchiveActive ? 'page' : undefined}
            className={`transition-colors py-1 relative ${
              isArchiveActive
                ? 'font-semibold text-current'
                : 'opacity-65 hover:opacity-100'
            }`}
          >
            <span>CATALOGUE</span>
            {isArchiveActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#8B5CF6]" />
            )}
          </Link>

          <Link
            to="/experiments"
            aria-current={isExperimentsActive ? 'page' : undefined}
            className={`transition-colors py-1 relative ${
              isExperimentsActive
                ? 'font-semibold text-current'
                : 'opacity-65 hover:opacity-100'
            }`}
          >
            <span>LABS</span>
            {isExperimentsActive && (
              <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#8B5CF6]" />
            )}
          </Link>

          {onOpenStatement && (
            <button
              onClick={onOpenStatement}
              className="opacity-65 hover:opacity-100 transition-opacity py-1 cursor-pointer focus:outline-none"
            >
              {t.nav.about}
            </button>
          )}

          <a
            href="https://github.com/rockybuildingaiweb3-boop/RockyBlogForHomePage"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-65 hover:opacity-100 transition-opacity py-1 inline-flex items-center gap-1 group"
          >
            <span>NOTES</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Command Palette trigger */}
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono opacity-70 hover:opacity-100 border border-current/20 hover:border-[#8B5CF6] rounded-xs transition-all cursor-pointer"
              title="Quick command search (Cmd+K or /)"
            >
              <Search className="w-3 h-3 text-[#8B5CF6]" />
              <span className="text-[10px]">⌘K</span>
            </button>
          )}

          {/* Surface Mode Switcher: Paper / Studio Dark */}
          <div className="pl-2 border-l border-current/15">
            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono rounded-xs border border-current/15 hover:border-current/40 transition-colors cursor-pointer"
              title={`Switch surface mode (currently ${mode})`}
              aria-label={`Toggle surface mode (currently ${mode})`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3 h-3 text-[#A78BFA]" />
                  <span>STUDIO</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-[#8B5CF6]" />
                  <span>PAPER</span>
                </>
              )}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="pl-2 border-l border-current/15">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="p-1.5 rounded-xs border border-current/20 text-xs font-mono"
              aria-label="Search archive"
            >
              <Search className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </button>
          )}

          {/* Surface Mode button on mobile */}
          <button
            onClick={toggleMode}
            className="p-1.5 rounded-xs border border-current/20 text-xs font-mono"
            aria-label="Toggle surface mode"
          >
            {isDark ? <Moon className="w-3.5 h-3.5 text-[#A78BFA]" /> : <Sun className="w-3.5 h-3.5 text-[#8B5CF6]" />}
          </button>

          <LanguageSwitcher />

          {onOpenStatement && (
            <button
              onClick={onOpenStatement}
              className="text-[11px] font-mono px-2 py-1 border border-current/20 hover:bg-current/10"
            >
              {t.nav.about}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-current hover:text-[#8B5CF6] focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-5 space-y-4 transition-colors ${
            isDark ? 'bg-[#08041c] border-violet-950/40 text-[#F5F3EF]' : 'bg-[#ECEADE] border-[#E2DFD2] text-[#171717]'
          }`}
        >
          <div className="flex flex-col gap-3.5 text-xs font-mono uppercase tracking-wider">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 font-semibold text-current"
            >
              SELECTED WORK
            </Link>

            <Link
              to="/archive"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 opacity-80 hover:opacity-100 text-current"
            >
              CATALOGUE ARCHIVE
            </Link>

            <Link
              to="/experiments"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 opacity-80 hover:opacity-100 text-current"
            >
              CREATIVE LABS
            </Link>

            {onOpenStatement && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatement();
                }}
                className="py-1 text-left opacity-75 hover:opacity-100 cursor-pointer"
              >
                {t.nav.about}
              </button>
            )}

            <a
              href="https://github.com/rockybuildingaiweb3-boop/RockyBlogForHomePage"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 opacity-75 hover:opacity-100 inline-flex items-center gap-1"
            >
              <span>NOTES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 opacity-75 hover:opacity-100 inline-flex items-center gap-1"
            >
              <span>{t.nav.github}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
