import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { getProjectBySlug, getNextProject } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import { WatercolorStain } from '../components/WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { useSurfaceMode } from '../context/SurfaceModeContext';
import { EditorialBrowserFrame } from '../components/EditorialBrowserFrame';
import { MagneticLink } from '../components/MagneticLink';
import { ProjectArchitectureDiagram } from '../components/ProjectArchitectureDiagram';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const nextProject = project ? getNextProject(project.slug) : null;
  const { localizeText, localizeArray, t } = useLanguage();
  const { mode } = useSurfaceMode();
  const isDark = mode === 'dark';

  const title = project ? localizeText(project.title) : '';
  const summary = project ? localizeText(project.summary) : '';
  const eyebrow = project ? localizeText(project.eyebrow) : '';
  const role = project ? localizeText(project.role) : '';
  const description = project ? localizeText(project.description) : '';
  const handwrittenNote = project?.handwrittenNote ? localizeText(project.handwrittenNote) : '';
  const aboutText = project?.detailedContent.about ? localizeText(project.detailedContent.about) : '';
  const quote = project?.detailedContent.editorialQuote ? localizeText(project.detailedContent.editorialQuote) : '';
  const quoteAuthor = project?.detailedContent.quoteAuthor ? localizeText(project.detailedContent.quoteAuthor) : '';
  const materials = project?.detailedContent.colophon?.materials
    ? localizeText(project.detailedContent.colophon.materials)
    : '';
  const designPoints = project?.detailedContent.designApproach
    ? localizeArray(project.detailedContent.designApproach)
    : [];

  usePageMeta({
    title: project ? `${title} — Rocky Babcock` : 'Project — Rocky Babcock',
    description: summary || 'Cinematic creative technology portfolio for Rocky Babcock.',
    ogTitle: project ? `${title} — Rocky Babcock` : 'Rocky Babcock',
    ogDescription: summary,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-28 text-center space-y-6">
        <h1 className="font-serif text-4xl lowercase">
          {t.project.projectNotFound}
        </h1>
        <p className="text-sm opacity-70 font-sans">
          {t.project.projectNotFoundDesc}
        </p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-2.5 font-mono transition-colors cursor-pointer ${
            isDark
              ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
              : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.project.returnToProjects}</span>
        </Link>
      </div>
    );
  }

  return (
    <article
      className={`relative w-full pb-24 transition-colors duration-300 ${
        isDark ? 'text-[#F5F3EF]' : 'text-[#171717]'
      }`}
    >
      {/* Background soft pigment wash */}
      <div className="absolute top-12 right-0 w-96 h-80 pointer-events-none opacity-40 z-0">
        <WatercolorStain variant="corner-pool" palette={project.pigmentAccent} opacity={isDark ? 0.3 : 0.6} />
      </div>

      {/* Top Breadcrumb */}
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
            <span>{t.project.returnToProjects}</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs opacity-70">
            <span>archive entry:</span>
            <span className={`font-semibold ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
              #{project.number}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Project Header: Number, Type Badge, Title, Eyebrow, Year */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
          {/* Large Project Number & Type */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light leading-none tracking-tighter select-none opacity-35">
              {project.number}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest font-semibold ${
                  isDark ? 'bg-violet-600 text-[#030014]' : 'bg-[#171717] text-[#F5F4ED]'
                }`}
              >
                {project.type}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] opacity-65 font-mono">
                {project.category}
              </span>
            </div>
            {handwrittenNote && (
              <div className={`pt-2 font-['Caveat',cursive] text-xl -rotate-1 ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
                ~ {handwrittenNote}
              </div>
            )}
          </div>

          {/* Project Title & Eyebrow */}
          <div className="lg:col-span-9 space-y-3 sm:space-y-4">
            <span
              className={`text-[12px] uppercase tracking-[0.24em] font-mono block font-semibold ${
                isDark ? 'text-violet-400' : 'text-[#8B5CF6]'
              }`}
            >
              [ {eyebrow} ]
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[5rem] font-light leading-[0.94] tracking-tight lowercase">
              {title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic opacity-75 max-w-3xl leading-relaxed pt-1 font-light">
              "{summary}"
            </p>
          </div>
        </div>

        {/* 2. Structured Technical Metadata Grid */}
        <div
          className={`mt-10 sm:mt-12 pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-6 text-[12px] font-mono transition-colors ${
            isDark ? 'border-violet-950/40 opacity-80' : 'border-[#E2DFD2]'
          }`}
        >
          <div>
            <span className="block text-[10px] uppercase tracking-wider opacity-50 mb-1">
              role
            </span>
            <span className="font-medium text-sm leading-snug">
              {role}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider opacity-50 mb-1">
              status
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  project.status === 'Live'
                    ? 'bg-emerald-500'
                    : project.status === 'Beta'
                    ? 'bg-amber-500'
                    : 'bg-[#8B5CF6]'
                }`}
              />
              <span className="font-medium">{project.status}</span>
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider opacity-50 mb-1">
              year & release
            </span>
            <span className="font-serif italic text-base">
              {project.year}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider opacity-50 mb-1">
              built with
            </span>
            <span className="text-xs font-mono line-clamp-2 opacity-90">
              {project.tools.join(' · ')}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Hero Browser / Artifact Preview Frame */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-6 sm:my-8">
        <EditorialBrowserFrame
          project={project}
          aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
          priority={true}
          showOverlayAction={false}
        />
        <div
          className={`mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-mono gap-2 border-b pb-3 transition-colors ${
            isDark ? 'border-violet-950/40 text-violet-300/70' : 'border-[#E2DFD2]/60 text-[#67645C]'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>●</span>
            <span>Interface Specimen: {project.previewUrl}</span>
          </span>
          <span className={`font-['Caveat',cursive] font-sans text-base ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
            ~ authentic production architecture
          </span>
        </div>
      </section>

      {/* 4. Reading Section with Strict 46rem Measure */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Connections, Stack, and Notes */}
          <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1 font-sans">
            <div
              className={`p-6 border space-y-4 rounded-xs transition-colors ${
                isDark
                  ? 'bg-[#0b0524] border-violet-950/60'
                  : 'bg-[#ECEADE]/70 border-[#E2DFD2]'
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] opacity-60 block font-mono">
                project connections
              </span>

              <div className="space-y-3 font-mono">
                {project.demo && (
                  <MagneticLink strength={3} className="w-full">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between py-2 text-xs uppercase tracking-wider border-b group w-full transition-colors ${
                        isDark ? 'border-violet-950/40 hover:text-violet-300' : 'border-[#E2DFD2] hover:text-[#8B5CF6]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>launch live app</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </MagneticLink>
                )}

                {project.github && (
                  <MagneticLink strength={3} className="w-full">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between py-2 text-xs uppercase tracking-wider border-b group w-full transition-colors ${
                        isDark ? 'border-violet-950/40 hover:text-violet-300' : 'border-[#E2DFD2] hover:text-[#8B5CF6]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-3.5 h-3.5 text-current" />
                        <span>source code</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </MagneticLink>
                )}
              </div>

              {project.detailedContent.colophon && (
                <div className="pt-4 space-y-2 text-xs opacity-75 font-mono">
                  <span className="text-[10px] uppercase tracking-wider opacity-50 block">
                    technical colophon
                  </span>
                  <p>
                    <strong className="font-semibold text-current">Typography:</strong>{' '}
                    {project.detailedContent.colophon.typography}
                  </p>
                  {materials && (
                    <p>
                      <strong className="font-semibold text-current">Materials:</strong>{' '}
                      {materials}
                    </p>
                  )}
                  <p>
                    <strong className="font-semibold text-current">Release:</strong>{' '}
                    {project.detailedContent.colophon.release}
                  </p>
                </div>
              )}
            </div>

            {/* Studio Note */}
            <div
              className={`p-6 border-l-2 space-y-2 rounded-xs ${
                isDark
                  ? 'border-violet-400 bg-[#0e0730]/70'
                  : 'border-[#8B5CF6] bg-[#FAF9F5]'
              }`}
            >
              <span className={`font-['Caveat',cursive] text-xl block ${isDark ? 'text-violet-300' : 'text-[#8B5CF6]'}`}>
                {t.project.studioNote}
              </span>
              <p className="text-xs opacity-75 leading-relaxed font-light font-sans">
                "{t.project.studioNoteDefault}"
              </p>
            </div>
          </aside>

          {/* Right Column: Narrow Reading Spine (Strictly constrained to 46rem) */}
          <main className="lg:col-span-8 order-1 lg:order-2 max-w-[46rem] space-y-12">
            {/* Intent & Architecture */}
            <section className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono block opacity-60">
                01 / intent & architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light lowercase tracking-tight">
                problem space & inquiry
              </h2>
              <p className="text-base sm:text-lg font-serif leading-relaxed italic opacity-90">
                {aboutText}
              </p>
              <p className="text-[15px] sm:text-base opacity-75 font-sans leading-relaxed font-light">
                {description}
              </p>
            </section>

            {/* Quote Break */}
            {quote && (
              <blockquote
                className={`my-10 py-6 border-y space-y-2 ${
                  isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
                }`}
              >
                <p className="font-serif text-xl sm:text-2xl font-light italic leading-snug">
                  “{quote}”
                </p>
                {quoteAuthor && (
                  <cite className="block text-xs font-mono not-italic opacity-60 uppercase tracking-wider">
                    — {quoteAuthor}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Design & Engineering Principles */}
            {designPoints.length > 0 && (
              <section className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono block opacity-60">
                  02 / engineering & visual principles
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light lowercase tracking-tight">
                  architecture decisions
                </h2>

                <div className="space-y-4">
                  {designPoints.map((point, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 pb-4 border-b ${
                        isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]/50'
                      }`}
                    >
                      <span className={`font-mono text-sm font-semibold select-none pt-0.5 ${isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}`}>
                        0{i + 1}.
                      </span>
                      <p className="text-[15px] opacity-75 font-sans leading-relaxed font-light">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 03 / System Architecture Diagram */}
            <section className="space-y-4 pt-2">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono block opacity-60">
                03 / system architecture & data flow
              </span>
              <ProjectArchitectureDiagram project={project} />
            </section>

            {/* 04 / Additional Visuals */}
            {project.detailedContent.visuals.length > 0 && (
              <section className="space-y-8 pt-4">
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono block opacity-60">
                  04 / interface documentation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light lowercase tracking-tight">
                  system views
                </h2>

                <div className="space-y-8">
                  {project.detailedContent.visuals.map((vis, vIdx) => (
                    <figure key={vIdx} className="space-y-2">
                      <div
                        className={`overflow-hidden border rounded-xs ${
                          isDark ? 'bg-[#0c0628] border-violet-950/60' : 'bg-[#ECEADE] border-[#E2DFD2]'
                        }`}
                      >
                        <img
                          src={vis.url}
                          alt={localizeText(vis.caption)}
                          loading="lazy"
                          className={`w-full ${vis.aspect || 'aspect-[16/10]'} object-cover`}
                        />
                      </div>
                      <figcaption className="flex items-baseline justify-between text-xs opacity-75 font-mono">
                        <span>{localizeText(vis.caption)}</span>
                        <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>view 0{vIdx + 2}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* 05 / Stack / Technologies */}
            <section
              className={`pt-8 border-t space-y-4 ${
                isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono block opacity-60">
                05 / instruments & technologies
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`px-3 py-1 border rounded-xs ${
                      isDark
                        ? 'bg-[#0f0730] border-violet-950 text-violet-300'
                        : 'bg-[#ECEADE] text-[#171717] border-[#E2DFD2]'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4 font-mono">
              {project.demo && (
                <MagneticLink strength={4}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-colors inline-flex items-center gap-2 ${
                      isDark
                        ? 'bg-violet-600 text-[#030014] hover:bg-violet-400 font-semibold'
                        : 'bg-[#171717] text-[#F5F4ED] hover:bg-[#8B5CF6]'
                    }`}
                  >
                    <span>launch live demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </MagneticLink>
              )}
              {project.github && (
                <MagneticLink strength={4}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-2.5 text-xs uppercase tracking-widest border transition-colors inline-flex items-center gap-2 ${
                      isDark
                        ? 'border-violet-800 text-violet-300 hover:border-violet-400 hover:text-white'
                        : 'border-[#E2DFD2] text-[#171717] hover:border-[#171717] hover:bg-[#ECEADE]'
                    }`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>view source code</span>
                  </a>
                </MagneticLink>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* 5. Next Project Transition */}
      {nextProject && (
        <section
          className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-20 pt-10 border-t ${
            isDark ? 'border-violet-950/40' : 'border-[#E2DFD2]'
          }`}
        >
          <Link
            to={`/projects/${nextProject.slug}`}
            className={`group block p-8 sm:p-12 border transition-all relative overflow-hidden rounded-xs ${
              isDark
                ? 'bg-[#0b0524] hover:bg-[#120938] border-violet-950/60'
                : 'bg-[#ECEADE]/70 hover:bg-[#ECEADE] border-[#E2DFD2]'
            }`}
          >
            {/* Subtle corner wash */}
            <div className="absolute top-0 right-0 w-48 h-40 pointer-events-none opacity-40">
              <WatercolorStain variant="corner-pool" palette={nextProject.pigmentAccent} />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] opacity-60 font-mono flex items-center gap-2">
                  <span>{t.project.nextProject}</span>
                  <span className={isDark ? 'text-violet-400' : 'text-[#8B5CF6]'}>/</span>
                  <span>#{nextProject.number}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-mono font-semibold ${
                      isDark ? 'bg-violet-600 text-[#030014]' : 'bg-[#171717] text-[#F5F4ED]'
                    }`}
                  >
                    {nextProject.type}
                  </span>
                </span>
                <h3
                  className={`font-serif text-3xl sm:text-5xl font-light lowercase transition-colors ${
                    isDark ? 'group-hover:text-violet-300' : 'group-hover:text-[#8B5CF6]'
                  }`}
                >
                  {localizeText(nextProject.title)}
                </h3>
                <p className="text-[15px] opacity-75 font-sans max-w-xl font-light">
                  {localizeText(nextProject.summary)}
                </p>
              </div>

              <div
                className={`flex items-center gap-2 text-xs uppercase tracking-widest font-mono transition-colors ${
                  isDark ? 'group-hover:text-violet-300 text-violet-400' : 'group-hover:text-[#8B5CF6] text-[#171717]'
                }`}
              >
                <span>{t.project.viewProject}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
};
