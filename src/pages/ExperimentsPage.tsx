import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Sparkles, Terminal } from 'lucide-react';
import { experimentsData } from '../data/experiments';
import { ExperimentCard } from '../components/experiments/ExperimentCard';
import { ProjectDiscipline } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

export const ExperimentsPage: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { localizeText } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  usePageMeta({
    title: 'Creative Code & Research Labs — Rocky Babcock',
    description: 'Experimental shaders, transformer visualizers, Web3 EVM profilers, and generative graphics by Rocky Babcock.',
  });

  const disciplines: ('ALL' | ProjectDiscipline)[] = [
    'ALL',
    'CREATIVE CODE',
    'AI',
    'WEB3',
    'ENGINEERING',
    'DESIGN',
  ];

  const filteredExperiments = useMemo(() => {
    let result = [...experimentsData];

    if (selectedDiscipline !== 'ALL') {
      result = result.filter((exp) => exp.discipline === selectedDiscipline);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((exp) => {
        const title = localizeText(exp.title).toLowerCase();
        const desc = localizeText(exp.description).toLowerCase();
        const tags = exp.tags.join(' ').toLowerCase();
        return title.includes(q) || desc.includes(q) || tags.includes(q);
      });
    }

    return result;
  }, [selectedDiscipline, searchQuery, localizeText]);

  return (
    <div
      className={`min-h-screen pb-24 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Top Breadcrumb Navigation */}
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 border-b transition-colors ${
          isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/60'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-mono transition-colors ${
              isDark ? 'text-violet-300 hover:text-white' : 'text-[#67645C] hover:text-[#171717]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>back to selected work</span>
          </Link>

          <span className="font-mono text-xs opacity-50 uppercase tracking-widest">
            experimental lab // 2024—2026
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 sm:pt-16 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8B5CF6] tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>[ COMPUTATIONAL LABS & PROTOTYPES ]</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight lowercase">
            creative code & research<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
          </h1>
          <p className="text-base sm:text-lg font-sans opacity-80 font-light leading-relaxed">
            Smaller explorations, WebGL shader canvases, AI attention visualizers, and Web3 protocol simulations developed during architectural experiments.
          </p>
        </div>

        {/* Filters and Search Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-current/10">
          {/* Discipline Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscipline(d)}
                className={`px-3 py-1.5 rounded-xs transition-all uppercase tracking-wider cursor-pointer ${
                  selectedDiscipline === d
                    ? isDark
                      ? 'bg-violet-600 text-white font-medium shadow-xs'
                      : 'bg-[#171717] text-white font-medium shadow-xs'
                    : 'border border-current/15 opacity-60 hover:opacity-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiments..."
              className="w-full pl-9 pr-4 py-1.5 text-xs font-mono bg-transparent border border-current/20 rounded-xs outline-none focus:border-[#8B5CF6]"
            />
          </div>
        </div>

        {/* Experiment Cards Grid */}
        {filteredExperiments.length === 0 ? (
          <div className="py-20 text-center font-mono text-sm opacity-50 space-y-2">
            <p>No experiments matching current discipline or search query.</p>
            <button
              onClick={() => {
                setSelectedDiscipline('ALL');
                setSearchQuery('');
              }}
              className="text-xs uppercase underline text-[#8B5CF6]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredExperiments.map((exp, idx) => (
              <ExperimentCard key={exp.id} experiment={exp} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
