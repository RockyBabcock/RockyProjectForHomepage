import React from 'react';
import { Search, X } from 'lucide-react';
import { ProjectCategory, SortOption } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

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

const CATEGORIES: ProjectCategory[] = ['All', 'AI', 'Web3', 'Open Source', 'Experiment', 'Design'];
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

  const getCategoryLabel = (cat: ProjectCategory): string => {
    switch (cat) {
      case 'All':
        return t.filters.all;
      case 'AI':
        return t.filters.ai;
      case 'Web3':
        return t.filters.web3;
      case 'Open Source':
        return t.filters.openSource;
      case 'Experiment':
        return t.filters.experiment;
      case 'Design':
        return t.filters.design;
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
    <div className="w-full py-7 border-b border-[#E2DFD2] font-sans text-[12px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Category Filters: Typographic labels, underline, thin rules, spacing. NO pills. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E9A90] select-none mr-1">
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
                    ? 'text-[#171717] font-semibold'
                    : 'text-[#67645C] hover:text-[#171717]'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6F87AA]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Quiet search & quiet sort */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          {/* Quiet Search field (styled like a publication index query) */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#9E9A90] absolute left-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="pl-6 pr-6 py-1 bg-transparent border-b border-[#E2DFD2] focus:border-[#6F87AA] text-[12px] text-[#171717] placeholder:text-[#9E9A90] placeholder:italic focus:outline-none transition-colors w-36 sm:w-44 font-sans"
              aria-label={t.filters.searchPlaceholder}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-0 p-0.5 text-[#9E9A90] hover:text-[#171717]"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#9E9A90]">
              {t.filters.sortLabel}
            </span>
            <div className="flex items-center gap-3">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onSortChange(opt)}
                  className={`tracking-wider transition-colors cursor-pointer text-[12px] ${
                    sortBy === opt
                      ? 'text-[#171717] underline decoration-[#6F87AA] underline-offset-4 font-medium'
                      : 'text-[#67645C] hover:text-[#171717]'
                  }`}
                >
                  {getSortLabel(opt)}
                </button>
              ))}
            </div>
          </div>

          {/* Count index badge */}
          <div className="hidden sm:inline-block text-[11px] text-[#67645C] font-mono pl-3 border-l border-[#E2DFD2]">
            [{filteredCount}/{totalCount}]
          </div>
        </div>
      </div>
    </div>
  );
};
