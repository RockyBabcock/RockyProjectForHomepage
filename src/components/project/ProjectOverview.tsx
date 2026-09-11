import React from 'react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const aboutText = project.detailedContent.about ? localizeText(project.detailedContent.about) : '';
  const quote = project.detailedContent.editorialQuote ? localizeText(project.detailedContent.editorialQuote) : '';
  const quoteAuthor = project.detailedContent.quoteAuthor ? localizeText(project.detailedContent.quoteAuthor) : '';
  const description = localizeText(project.description);

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">01</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">THE IDEA & CORE INQUIRY</span>
      </div>

      <div className="space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
          problem space & thesis<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
        </h2>

        <div className="space-y-4 text-base sm:text-lg opacity-85 font-sans leading-relaxed font-light">
          <p>{description}</p>
          {aboutText && <p>{aboutText}</p>}
        </div>

        {/* Editorial Pull Quote */}
        {quote && (
          <blockquote
            className={`my-8 p-6 sm:p-8 border-l-2 font-serif text-xl sm:text-2xl italic font-light leading-snug transition-colors ${
              isDark
                ? 'border-violet-400 bg-[#0c0628]/40 text-violet-100'
                : 'border-[#8B5CF6] bg-[#FAF9F5] text-[#171717]'
            }`}
          >
            "{quote}"
            {quoteAuthor && (
              <cite className="block not-italic font-mono text-xs uppercase tracking-widest mt-4 opacity-60">
                — {quoteAuthor}
              </cite>
            )}
          </blockquote>
        )}
      </div>
    </section>
  );
};
