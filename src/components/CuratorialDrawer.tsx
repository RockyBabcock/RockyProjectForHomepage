import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { WatercolorStain } from './WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';

interface CuratorialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorialDrawer: React.FC<CuratorialDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-2xl bg-[#F5F4ED] h-full shadow-2xl overflow-y-auto border-l border-[#E2DFD2] z-10 text-[#171717] flex flex-col justify-between">
        {/* Watercolor Bleed at Top of Statement */}
        <div className="absolute top-0 right-0 w-72 h-64 pointer-events-none opacity-60">
          <WatercolorStain variant="corner-pool" palette="warm" opacity={0.7} />
        </div>

        <div>
          {/* Header Bar */}
          <div className="sticky top-0 bg-[#F5F4ED]/95 backdrop-blur-md px-8 py-6 border-b border-[#E2DFD2] flex items-center justify-between z-20">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-sans block">
                {t.drawer.studioNotes}
              </span>
              <h3 className="font-serif text-2xl font-light text-[#171717] lowercase">
                {t.drawer.aboutRocky}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#67645C] hover:text-[#171717] transition-colors focus:outline-none cursor-pointer"
              aria-label="Close studio notes"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content with Strict 46rem Reading Measure */}
          <div className="px-8 sm:px-12 py-10 space-y-8 max-w-[46rem] font-sans">
            {/* Handwritten marginal opening */}
            <div className="font-['Caveat',cursive] text-2xl text-[#6F87AA] -rotate-1">
              {t.drawer.marginalQuote}
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-3xl font-light text-[#171717] tracking-tight lowercase">
                {t.drawer.heading}
              </h4>
              <p className="text-lg font-serif text-[#171717] leading-relaxed italic">
                {t.drawer.subheading}
              </p>
              <p className="text-[15px] text-[#67645C] leading-relaxed">
                {t.drawer.body}
              </p>
            </div>

            <div className="p-6 bg-[#ECEADE]/70 border-l-2 border-[#6F87AA] space-y-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] font-sans block font-medium">
                {t.drawer.philosophyTag}
              </span>
              <p className="text-[15px] font-serif italic text-[#171717] leading-relaxed">
                {t.drawer.philosophyQuote}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-serif text-2xl font-light text-[#171717] lowercase">
                {t.drawer.foundationsHeading}
              </h5>
              <ul className="space-y-3 text-[14px] text-[#67645C] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="font-serif text-[#BC9A64] font-medium">01.</span>
                  <span>
                    <strong className="text-[#171717] font-medium font-sans">{t.drawer.foundation1Title}:</strong>{' '}
                    {t.drawer.foundation1Desc}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-serif text-[#BC9A64] font-medium">02.</span>
                  <span>
                    <strong className="text-[#171717] font-medium font-sans">{t.drawer.foundation2Title}:</strong>{' '}
                    {t.drawer.foundation2Desc}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-serif text-[#BC9A64] font-medium">03.</span>
                  <span>
                    <strong className="text-[#171717] font-medium font-sans">{t.drawer.foundation3Title}:</strong>{' '}
                    {t.drawer.foundation3Desc}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E2DFD2] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#9E9A90] block">
                  {t.drawer.repoReference}
                </span>
                <span className="text-sm font-serif italic text-[#171717]">
                  rocky-homepage-unfinished / repository
                </span>
              </div>
              <a
                href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-[#171717] hover:text-[#6F87AA] inline-flex items-center gap-1"
              >
                <span>{t.drawer.sourceLink}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer of Drawer */}
        <div className="px-8 py-6 bg-[#ECEADE] border-t border-[#E2DFD2] flex items-center justify-between">
          <span className="font-['Caveat',cursive] text-2xl text-[#171717]">
            Rocky Babcock
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-widest bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] transition-colors cursor-pointer"
          >
            {t.drawer.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
};
