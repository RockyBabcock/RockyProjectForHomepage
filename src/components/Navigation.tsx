import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  onOpenStatement?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenStatement }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isProjectsActive = location.pathname === '/' || location.pathname.startsWith('/projects');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F4ED]/94 backdrop-blur-xs border-b border-[#E2DFD2]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5"
            aria-label={`${t.hero.name} ${t.nav.archiveNumber}`}
          >
            <span className="font-serif text-2xl font-light tracking-tight text-[#171717] group-hover:text-[#6F87AA] transition-colors">
              rocky<span className="text-[#6F87AA] font-serif">.</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] font-sans">
              {t.nav.archiveNumber}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 text-[12px] uppercase tracking-[0.18em] font-sans text-[#67645C]"
        >
          <Link
            to="/"
            aria-current={isProjectsActive ? 'page' : undefined}
            className={`transition-colors py-1 ${
              isProjectsActive ? 'text-[#171717] font-medium border-b border-[#6F87AA]' : 'hover:text-[#171717]'
            }`}
          >
            {t.nav.projects}
          </Link>

          {onOpenStatement && (
            <button
              onClick={onOpenStatement}
              className="hover:text-[#171717] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              {t.nav.about}
            </button>
          )}

          <a
            href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#171717] transition-colors py-1 inline-flex items-center gap-1 group"
          >
            <span>{t.nav.github}</span>
            <ArrowUpRight className="w-3 h-3 text-[#67645C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Discreet Publication Language Switcher */}
          <div className="pl-3 border-l border-[#E2DFD2]">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <LanguageSwitcher />

          {onOpenStatement && (
            <button
              onClick={onOpenStatement}
              className="text-[12px] px-2.5 py-1 text-[#171717] border border-[#E2DFD2] hover:bg-[#ECEADE]"
            >
              {t.nav.about}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171717] hover:text-[#6F87AA] focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2DFD2] bg-[#ECEADE] px-6 py-5 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-sans uppercase tracking-wider">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#171717] font-medium"
            >
              {t.nav.projects}
            </Link>

            {onOpenStatement && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatement();
                }}
                className="py-1 text-left text-[#67645C] hover:text-[#171717] cursor-pointer"
              >
                {t.nav.about}
              </button>
            )}

            <a
              href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-[#67645C] hover:text-[#171717] inline-flex items-center gap-1"
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
