import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[#E2DFD2] bg-[#ECEADE]/60 mt-28 sm:mt-36 py-16 sm:py-24 text-[#171717] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Handwritten Signature & Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] font-sans">
                {t.footer.subtitle}
              </span>
              <div className="font-['Caveat',cursive] text-4xl sm:text-5xl text-[#171717] select-none pt-1">
                {t.hero.name}
              </div>
            </div>
            <p className="text-sm text-[#67645C] max-w-md font-sans leading-relaxed font-light">
              {t.footer.bio}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#67645C]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#6F87AA]/80" />
              <span>{t.footer.studioLocation}</span>
            </div>
          </div>

          {/* Center Column: Restrained Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] font-sans block">
              {t.footer.index}
            </span>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link
                  to="/"
                  className="text-[#171717] hover:text-[#6F87AA] transition-colors inline-flex items-center gap-1"
                >
                  {t.footer.projectsLink}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/rockybuildingaiweb3-boop/rocky-homepage-unfinished"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#67645C] hover:text-[#171717] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{t.footer.githubLink}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#67645C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li className="text-[#9E9A90] cursor-default flex items-center justify-between">
                <span>{t.footer.writingLink}</span>
                <span className="text-[11px] italic font-serif text-[#67645C]">{t.footer.forthcoming}</span>
              </li>
              <li className="text-[#9E9A90] cursor-default flex items-center justify-between">
                <span>{t.footer.notesLink}</span>
                <span className="text-[11px] italic font-serif text-[#67645C]">{t.footer.forthcoming}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Colophon & Curatorial Note */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] font-sans block">
              {t.footer.colophon}
            </span>
            <div className="text-xs text-[#67645C] space-y-1.5 font-sans leading-relaxed">
              <p>{t.footer.colophonDesc1}</p>
              <p>{t.footer.colophonDesc2}</p>
              <p>{t.footer.colophonDesc3}</p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-[#9E9A90] font-sans">
                {t.footer.copyright}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom subtle border and minimal copyright */}
        <div className="mt-12 pt-6 border-t border-[#E2DFD2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#67645C] gap-4">
          <div className="font-['Caveat',cursive] text-lg text-[#6F87AA]">
            "{t.footer.craftQuote}"
          </div>
          <div className="font-sans text-[11px] text-[#9E9A90]">
            {t.footer.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
};
