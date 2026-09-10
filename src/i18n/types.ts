export type Language = 'en' | 'fr' | 'ja' | 'de' | 'zh' | 'ru';

export interface LanguageOption {
  code: Language;
  label: string; // e.g. "English", "Français", "日本語", "Deutsch", "中文", "Русский"
  shortLabel: string; // e.g. "EN", "FR", "JA", "DE", "ZH", "RU"
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'ja', label: '日本語', shortLabel: 'JA' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE' },
  { code: 'zh', label: '中文', shortLabel: 'ZH' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU' },
];

export type MultilingualText = string | Partial<Record<Language, string>>;
export type MultilingualArray = string[] | Partial<Record<Language, string[]>>;

export interface UITranslations {
  nav: {
    projects: string;
    about: string;
    github: string;
    language: string;
    archiveNumber: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    statement: string;
    exploreArchive: string;
    viewAbout: string;
    artifactCaption: string;
    artifactLabel: string;
    artifactFigure: string;
  };
  filters: {
    filterLabel: string;
    sortLabel: string;
    all: string;
    ai: string;
    web3: string;
    openSource: string;
    experiment: string;
    design: string;
    featured: string;
    newest: string;
    oldest: string;
    searchPlaceholder: string;
    resetFilters: string;
    noProjectsFound: string;
    noProjectsDesc: string;
    totalIndex: string;
  };
  project: {
    viewProject: string;
    role: string;
    status: string;
    year: string;
    tools: string;
    instruments: string;
    returnToProjects: string;
    returnToArchive: string;
    projectNotFound: string;
    projectNotFoundDesc: string;
    projectLinks: string;
    liveProject: string;
    sourceCode: string;
    productionNotes: string;
    studioNote: string;
    studioNoteDefault: string;
    intentInquiry: string;
    visualPrinciples: string;
    visualDocumentation: string;
    instrumentsTech: string;
    launchProject: string;
    viewSource: string;
    nextProject: string;
    previousProject: string;
    figureLabel: string;
  };
  drawer: {
    studioNotes: string;
    aboutRocky: string;
    marginalQuote: string;
    heading: string;
    subheading: string;
    body: string;
    philosophyTag: string;
    philosophyQuote: string;
    foundationsHeading: string;
    foundation1Title: string;
    foundation1Desc: string;
    foundation2Title: string;
    foundation2Desc: string;
    foundation3Title: string;
    foundation3Desc: string;
    repoReference: string;
    sourceLink: string;
    closeButton: string;
  };
  footer: {
    subtitle: string;
    bio: string;
    studioLocation: string;
    index: string;
    projectsLink: string;
    githubLink: string;
    writingLink: string;
    notesLink: string;
    forthcoming: string;
    colophon: string;
    colophonDesc1: string;
    colophonDesc2: string;
    colophonDesc3: string;
    copyright: string;
    craftQuote: string;
    tagline: string;
  };
  rail: {
    current: string;
    total: string;
  };
}
