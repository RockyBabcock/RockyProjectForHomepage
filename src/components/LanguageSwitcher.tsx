import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '../i18n/types';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Discreet Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${t.nav.language}: ${currentOption.label}`}
        className="group inline-flex items-center gap-1.5 py-1 px-2 text-[12px] uppercase tracking-[0.18em] font-sans text-[#67645C] hover:text-[#171717] transition-colors focus:outline-none cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#9E9A90] group-hover:text-[#6F87AA] transition-colors" />
        <span className="font-medium text-[#171717]">{currentOption.shortLabel}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#9E9A90] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#171717]' : ''
          }`}
        />
      </button>

      {/* Editorial Popover */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-44 origin-top-right bg-[#F5F4ED] border border-[#E2DFD2] shadow-lg rounded-none z-50 py-1.5 focus:outline-none divide-y divide-[#E2DFD2]/50 text-xs font-sans animate-paper-develop"
        >
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#9E9A90] select-none">
            {t.nav.language}
          </div>
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  role="menuitem"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left tracking-normal transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#ECEADE] text-[#171717] font-medium'
                      : 'text-[#67645C] hover:bg-[#ECEADE]/50 hover:text-[#171717]'
                  }`}
                >
                  <span className="font-serif text-[14px]">{opt.label}</span>
                  <span
                    className={`text-[10px] tracking-wider uppercase font-sans ${
                      isSelected ? 'text-[#6F87AA] font-semibold' : 'text-[#9E9A90]'
                    }`}
                  >
                    {opt.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
