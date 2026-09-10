import React from 'react';
import { Search, X } from 'lucide-react';
import { ProjectCategory, SortOption } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';

interface CatalogueFiltersProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Tools', '3D', 'AI', 'Experiment'];
const SORT_OPTIONS: SortOption[] = ['Featured', 'Newest', 'Oldest'];

export const CatalogueFilters: React.FC<CatalogueFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
}) => {
  const { t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const getCategoryLabel = (cat: ProjectCategory): string => {
    switch (cat) {
      case 'All':
        return t.filters.all;
      case 'Tools':
        return t.filters.tools;
      case '3D':
        return t.filters.threeD;
      case 'AI':
        return t.filters.ai;
      case 'Experiment':
        return t.filters.experiment;
      default:
        return cat;
    }
  };

  const getSortLabel = (opt: SortOption): string => {
    switch (opt) {
      case 'Featured':
        return t.filters.featured;
      case 'Newest':
        return t.filters.newest;
      case 'Oldest':
        return t.filters.oldest;
      default:
        return opt;
    }
  };

  return (
    <div
      className={`w-full py-7 border-b font-mono text-[12px] transition-colors duration-300 ${
        isDark ? 'border-violet-950/40 text-[#F5F3EF]' : 'border-[#E2DFD2] text-[#171717]'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Category Filters: Typographic labels with active underline. NO pills. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] opacity-50 select-none mr-1">
            {t.filters.filterLabel}
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative py-1 text-[12px] uppercase tracking-[0.14em] transition-colors cursor-pointer focus:outline-none ${
                  isSelected
                    ? 'font-semibold text-current'
                    : 'opacity-65 hover:opacity-100'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                {isSelected && (
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                      isDark ? 'bg-violet-400' : 'bg-[#8B5CF6]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Search, Sort & Count */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          {/* Search field */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 opacity-50 absolute left-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className={`pl-6 pr-6 py-1 bg-transparent border-b text-[12px] placeholder:opacity-40 placeholder:italic focus:outline-none transition-colors w-36 sm:w-48 font-mono ${
                isDark
                  ? 'border-violet-950 focus:border-violet-400 text-[#F5F3EF]'
                  : 'border-[#E2DFD2] focus:border-[#8B5CF6] text-[#171717]'
              }`}
              aria-label={t.filters.searchPlaceholder}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-0 p-0.5 opacity-50 hover:opacity-100"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[11px] uppercase tracking-[0.18em] opacity-50">
              {t.filters.sortLabel}
            </span>
            <div className="flex items-center gap-3">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onSortChange(opt)}
                  className={`tracking-wider transition-colors cursor-pointer text-[12px] ${
                    sortBy === opt
                      ? 'font-semibold text-current underline underline-offset-4 decoration-[#8B5CF6]'
                      : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {getSortLabel(opt)}
                </button>
              ))}
            </div>
          </div>

          {/* Count index badge */}
          <div
            className={`hidden sm:inline-block text-[11px] font-mono pl-3 border-l ${
              isDark ? 'border-violet-950/40 opacity-60' : 'border-[#E2DFD2] opacity-75'
            }`}
          >
            [{filteredCount}/{totalCount}]
          </div>
        </div>
      </div>
    </div>
  );
};
