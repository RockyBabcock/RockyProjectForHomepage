import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { ExperimentItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useSurfaceMode } from '../../context/SurfaceModeContext';

interface ExperimentCardProps {
  experiment: ExperimentItem;
  index: number;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment, index }) => {
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = localizeText(experiment.title);
  const description = localizeText(experiment.description);
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      className={`group border rounded-xs transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isDark
          ? 'bg-[#08041c]/70 border-violet-950/60 hover:border-violet-700'
          : 'bg-[#FAF9F5] border-[#E2DFD2] hover:border-[#171717]'
      }`}
    >
      {/* Thumbnail or Visual Specimen */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/10">
        <img
          src={experiment.thumbnail}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-xs font-mono text-[10px] uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs">
            {experiment.discipline}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs font-mono text-[10px] uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                experiment.status === 'Live'
                  ? 'bg-emerald-400'
                  : experiment.status === 'Prototype'
                  ? 'bg-amber-400'
                  : 'bg-violet-400'
              }`}
            />
            <span>{experiment.status}</span>
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-xs opacity-50">
            <span>EXP_{formattedIndex}</span>
            <span>{experiment.year}</span>
          </div>

          <h3 className="font-serif text-2xl font-light tracking-tight lowercase text-current group-hover:italic transition-all">
            {title}
          </h3>

          <p className="text-sm font-sans opacity-75 font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags and Links */}
        <div className="pt-4 border-t border-current/10 space-y-3">
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] opacity-70">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-current/15 rounded-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {experiment.notes && (
            <p className="font-mono text-[11px] opacity-50 italic">
              ↳ {experiment.notes}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 font-mono text-xs">
            {experiment.github && (
              <a
                href={experiment.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 hover:text-[#8B5CF6] transition-colors p-1"
                aria-label={`GitHub for ${title}`}
              >
                <Github className="w-3.5 h-3.5" />
                <span className="text-[11px] uppercase tracking-wider">CODE</span>
              </a>
            )}
            {experiment.liveUrl && (
              <a
                href={experiment.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-[#8B5CF6] hover:underline p-1"
                aria-label={`Launch ${title}`}
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold">RUN</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
