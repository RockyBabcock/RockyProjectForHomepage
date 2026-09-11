import React, { useState } from 'react';
import { Maximize2, ExternalLink, Image as ImageIcon, Film } from 'lucide-react';
import { Project, ProjectMediaItem } from '../../types';
import { useSurfaceMode } from '../../context/SurfaceModeContext';
import { ProjectMediaFrame } from '../ProjectMediaFrame';
import { MediaLightbox } from '../MediaLightbox';

interface ProjectEvidenceProps {
  project: Project;
}

export const ProjectEvidence: React.FC<ProjectEvidenceProps> = ({ project }) => {
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  // Build list of media items from heroMedia and gallery media
  const mediaList: ProjectMediaItem[] = React.useMemo(() => {
    const list: ProjectMediaItem[] = [];
    if (project.heroMedia) {
      list.push(project.heroMedia);
    }
    if (project.media && project.media.length > 0) {
      project.media.forEach((item) => {
        if (!list.some((existing) => existing.src === item.src)) {
          list.push(item);
        }
      });
    }
    // Fallback item if list is empty
    if (list.length === 0) {
      list.push({
        type: 'image',
        src: project.cover,
        alt: `${project.slug} specimen capture`,
        caption: `Verified capture artifact for ${project.slug}`,
      });
    }
    return list;
  }, [project]);

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 border-b pb-2 font-mono text-xs border-current/10">
        <span className="font-bold text-[#8B5CF6]">06</span>
        <span className="opacity-40">/</span>
        <span className="uppercase tracking-[0.2em] font-semibold">PRODUCTION EVIDENCE</span>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight lowercase">
              media archive & captures<span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>.</span>
            </h2>
            <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
              Real 1:1 screenshots, exported assets & 60fps recordings from deployed software
            </p>
          </div>

          <div className="font-mono text-xs opacity-75">
            <span>[ {String(mediaList.length).padStart(2, '0')} VERIFIED ARTIFACTS ]</span>
          </div>
        </div>

        {/* Media Exhibition Gallery Grid */}
        <div className="space-y-10 pt-4">
          {mediaList.map((item, index) => {
            const plateIndex = String(index + 1).padStart(2, '0');
            const totalCount = String(mediaList.length).padStart(2, '0');
            const isVideo = item.type === 'video';

            const caption = typeof item.caption === 'string'
              ? item.caption
              : typeof item.caption === 'object' && item.caption !== null
              ? (item.caption as any).en || ''
              : `Production evidence specimen plate #${plateIndex}`;

            return (
              <figure
                key={index}
                className={`group/plate border rounded-xs p-4 sm:p-6 transition-all duration-300 ${
                  isDark
                    ? 'border-violet-950/60 bg-[#070417]/50 hover:border-violet-700/60'
                    : 'border-[#E2DFD2] bg-[#FAF9F5]/70 hover:border-[#8B5CF6]/50'
                }`}
              >
                {/* Plate Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-current/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8B5CF6] font-bold">[ PLATE {plateIndex} / {totalCount} ]</span>
                    <span className="opacity-40">·</span>
                    <span className="opacity-70 text-[11px] uppercase tracking-wider">
                      {isVideo ? '60FPS RECORDING' : '1:1 CAPTURE'}
                    </span>
                  </div>

                  <button
                    onClick={() => openLightbox(index)}
                    className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium opacity-75 hover:opacity-100 transition-opacity cursor-pointer ${
                      isDark ? 'text-violet-300' : 'text-[#8B5CF6]'
                    }`}
                    title="Open in fullscreen museum lightbox"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">expand specimen</span>
                  </button>
                </div>

                {/* Media Artifact Frame with Click-to-expand */}
                <div
                  onClick={() => openLightbox(index)}
                  className="cursor-pointer overflow-hidden rounded-xs transition-transform duration-300 group-hover/plate:scale-[1.005]"
                >
                  <ProjectMediaFrame
                    project={project}
                    mediaItem={item}
                    aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
                    isHovered={false}
                    priority={index === 0}
                    allowZoom={false}
                    showCaption={false}
                  />
                </div>

                {/* Plate Caption Footer */}
                <figcaption className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono text-xs opacity-75">
                  <span className="text-sm font-light font-sans opacity-90">{caption}</span>
                  <span className="text-[11px] opacity-50 shrink-0 uppercase tracking-widest">
                    REF_{project.number} · {project.slug}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Museum Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <MediaLightbox
          isOpen={true}
          onClose={closeLightbox}
          items={mediaList}
          currentIndex={activeLightboxIndex}
          onSelectIndex={setActiveLightboxIndex}
          projectNumber={project.number}
          projectSlug={project.slug}
          liveDemoUrl={project.demo}
        />
      )}
    </section>
  );
};
