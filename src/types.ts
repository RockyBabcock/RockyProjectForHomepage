import { MultilingualText, MultilingualArray } from './i18n/types';

export type ProjectCategory = 'All' | 'Tools' | '3D' | 'AI' | 'Web3' | 'Experiment' | 'Labs' | 'Archive';
export type ProjectType =
  | 'ASSET REGISTRY'
  | 'SPATIAL 3D WEB'
  | 'AI PRODUCT CANVAS'
  | 'DEVELOPER TOOL'
  | 'DECENTRALIZED PROTOCOL'
  | 'CREATIVE COMPUTATION'
  | 'RESEARCH PROTOTYPE';

export type EntryType = 'FEATURED' | 'PROJECT' | 'EXPERIMENT' | 'LAB' | 'ARCHIVE';
export type ProjectDiscipline = 'DESIGN' | 'ENGINEERING' | 'AI' | 'WEB3' | '3D' | 'CREATIVE CODE';

export type ProjectStatus = 'Live' | 'Building' | 'Beta' | 'Prototype' | 'Archived';
export type SortOption = 'Featured' | 'Newest' | 'Oldest';

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface DesignDecisionNote {
  number?: string;
  title: MultilingualText;
  rationale: MultilingualText;
  impact?: MultilingualText;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  figma?: string;
  additional?: { label: string; url: string }[];
}

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

export interface ProjectMediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt?: string;
  caption?: string | MultilingualText;
  aspectRatio?: string;
}

export interface ProjectDetailedContent {
  about: MultilingualText;
  problem?: MultilingualText;
  process?: MultilingualText;
  designApproach: MultilingualArray;
  designDecisions?: DesignDecisionNote[];
  visuals: ProjectVisual[];
  interactionExperience?: MultilingualArray;
  technicalApproach?: MultilingualArray;
  editorialQuote?: MultilingualText;
  colophon?: ProjectColophon;
  quoteAuthor?: MultilingualText;
  outcome?: MultilingualText;
  reflection?: MultilingualText;
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
  entryType?: EntryType;
  eyebrow: MultilingualText;
  summary: MultilingualText;
  thesis?: MultilingualText;
  description: MultilingualText;
  category: ProjectCategory;
  disciplines?: ProjectDiscipline[];
  tags: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  cover: string;
  previewUrl: string;
  role: MultilingualText;
  contribution?: string[];
  timeline?: string;
  team?: string;
  tools: string[];
  technologies?: string[];
  github?: string;
  demo?: string;
  links?: ProjectLinks;
  metrics?: ProjectMetric[];
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
  // Real Project Media presentation fields
  media?: ProjectMediaItem[];
  heroMedia?: ProjectMediaItem;
  galleryMedia?: ProjectMediaItem[];
  mobileMedia?: ProjectMediaItem;
  detailMedia?: ProjectMediaItem[];
  detailedContent: ProjectDetailedContent;
}

export interface ExperimentItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  discipline: ProjectDiscipline;
  category: string;
  year: string;
  status: ProjectStatus;
  tags: string[];
  thumbnail: string;
  github?: string;
  liveUrl?: string;
  interactiveSnippet?: string;
  notes?: string;
}

