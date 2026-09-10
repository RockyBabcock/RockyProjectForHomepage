import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, SUPPORTED_LANGUAGES, UITranslations, MultilingualText, MultilingualArray } from './types';
import { translations } from './translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: UITranslations;
  localizeText: (field?: MultilingualText | null, fallback?: string) => string;
  localizeArray: (field?: MultilingualArray | null, fallback?: string[]) => string[];
  isTransitioning: boolean;
}

const STORAGE_KEY = 'rocky_archive_lang';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
      // Detect browser language
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('fr')) return 'fr';
      if (navLang.startsWith('ja')) return 'ja';
      if (navLang.startsWith('de')) return 'de';
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('ru')) return 'ru';
    } catch {
      // Ignore localStorage errors in restricted environments
    }
    return 'en';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = useCallback((newLang: Language) => {
    if (newLang === language) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // Storage fail-safe
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 120);
    }, 80);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const localizeText = useCallback(
    (field?: MultilingualText | null, fallback = ''): string => {
      if (!field) return fallback;
      if (typeof field === 'string') return field;
      return field[language] || field.en || fallback;
    },
    [language]
  );

  const localizeArray = useCallback(
    (field?: MultilingualArray | null, fallback: string[] = []): string[] => {
      if (!field) return fallback;
      if (Array.isArray(field)) return field;
      return field[language] || field.en || fallback;
    },
    [language]
  );

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        localizeText,
        localizeArray,
        isTransitioning,
      }}
    >
      <div
        className={`transition-opacity duration-200 ${
          isTransitioning ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
