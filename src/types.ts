import { MultilingualText, MultilingualArray } from './i18n/types';

export type ProjectCategory = 'All' | 'Tools' | '3D' | 'AI' | 'Experiment';
export type ProjectType =
  | 'ASSET REGISTRY'
  | 'SPATIAL 3D WEB'
  | 'AI PRODUCT CANVAS'
  | 'DEVELOPER TOOL';

export type ProjectStatus = 'Live' | 'Building' | 'Beta' | 'Archived';
export type SortOption = 'Featured' | 'Newest' | 'Oldest';

export interface ProjectVisual {
  url: string;
  caption: MultilingualText;
  aspect?: string;
  bleed?: boolean;
}

export interface ProjectColophon {
  typography: string;
  materials?: MultilingualText;
  release: string;
}

export interface ProjectDetailedContent {
  about: MultilingualText;
  designApproach: MultilingualArray;
  visuals: ProjectVisual[];
  editorialQuote?: MultilingualText;
  colophon?: ProjectColophon;
  quoteAuthor?: MultilingualText;
}

export type LayoutVariant = 'lead-7' | 'offset-5' | 'cinema-12' | 'standard-6' | 'offset-6';

export type VisualArtifactMode =
  | 'browser'
  | 'interface'
  | '3d-spatial'
  | 'ai-carousel'
  | 'terminal'
  | 'agent-graph'
  | 'dashboard'
  | 'workflow'
  | 'typographic'
  | 'image'
  | 'mixed';

export type WatercolorVariant =
  | 'cool'
  | 'warm'
  | 'blue-grey'
  | 'muted-olive'
  | 'mixed'
  | 'ochre';

export type WatercolorIntensity = 'subtle' | 'medium' | 'deep';

export interface Project {
  slug: string;
  number: string;
  title: MultilingualText;
  type: ProjectType;
  eyebrow: MultilingualText;
  summary: MultilingualText;
  description: MultilingualText;
  category: ProjectCategory;
  tags: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  cover: string;
  previewUrl: string;
  role: MultilingualText;
  tools: string[];
  technologies?: string[];
  github?: string;
  demo?: string;
  colSpanDesktop?: string;
  aspectRatio?: string;
  pigmentAccent: 'cool' | 'warm' | 'blue-grey' | 'ochre' | 'muted-olive';
  visualMode?: VisualArtifactMode;
  artifactMode?: 'registry' | 'spatial' | 'ai-canvas' | 'browser' | 'terminal' | 'diagram' | 'image' | 'mixed';
  watercolorVariant?: WatercolorVariant;
  watercolorIntensity?: WatercolorIntensity;
  layoutVariant?: LayoutVariant;
  handwrittenNote?: MultilingualText;
  offsetMargin?: string;
  detailedContent: ProjectDetailedContent;
}

