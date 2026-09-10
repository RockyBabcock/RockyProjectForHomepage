import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { getProjectBySlug, getNextProject } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import { WatercolorStain } from '../components/WatercolorStain';
import { useLanguage } from '../i18n/LanguageContext';
import { EditorialBrowserFrame } from '../components/EditorialBrowserFrame';
import { MagneticLink } from '../components/MagneticLink';
import { ProjectArchitectureDiagram } from '../components/ProjectArchitectureDiagram';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const nextProject = project ? getNextProject(project.slug) : null;
  const { localizeText, localizeArray, t } = useLanguage();

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

  // Dynamic SEO meta tags per project
  usePageMeta({
    title: project ? `${title} — Rocky Babcock` : 'Project — Rocky Babcock',
    description: summary || 'Editorial digital project archive for Rocky Babcock.',
    ogTitle: project ? `${title} — Rocky Babcock` : 'Rocky Babcock',
    ogDescription: summary,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-28 text-center space-y-6">
        <h1 className="font-serif text-4xl text-[#171717] lowercase">
          {t.project.projectNotFound}
        </h1>
        <p className="text-sm text-[#67645C] font-sans">
          {t.project.projectNotFoundDesc}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-2.5 bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.project.returnToProjects}</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="relative w-full pb-24 text-[#171717] animate-[paperDevelop_0.6s_ease-out]">
      {/* Background soft watercolor pigment wash */}
      <div className="absolute top-12 right-0 w-96 h-80 pointer-events-none opacity-40 z-0">
        <WatercolorStain variant="corner-pool" palette={project.pigmentAccent} opacity={0.6} />
      </div>

      {/* Top Breadcrumb / Return to Projects */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 border-b border-[#E2DFD2]/60">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#67645C] hover:text-[#171717] transition-colors font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.project.returnToProjects}</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[#67645C]">
            <span className="text-[#9E9A90]">archive entry:</span>
            <span className="font-semibold text-[#171717]">#{project.number}</span>
          </div>
        </div>
      </div>

      {/* 1. Project Header: Number, Type Badge, Title, Eyebrow, Year */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
          {/* Large Project Number & Type */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-[#171717] leading-none tracking-tighter select-none">
              {project.number}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-[#171717] text-[#F5F4ED] text-[10px] uppercase font-mono tracking-widest">
                {project.type}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#67645C] font-sans">
                {project.category}
              </span>
            </div>
            {handwrittenNote && (
              <div className="pt-2 font-['Caveat',cursive] text-xl text-[#6F87AA] -rotate-1">
                ~ {handwrittenNote}
              </div>
            )}
          </div>

          {/* Project Title & Eyebrow */}
          <div className="lg:col-span-9 space-y-3 sm:space-y-4">
            <span className="text-[12px] uppercase tracking-[0.24em] text-[#6F87AA] font-mono block font-medium">
              [ {eyebrow} ]
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[5rem] font-light leading-[0.94] tracking-tight lowercase text-[#171717]">
              {title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#67645C] max-w-3xl leading-relaxed pt-1">
              "{summary}"
            </p>
          </div>
        </div>

        {/* 2. Structured Real Technical Metadata Grid */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#E2DFD2] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[12px] font-sans text-[#67645C]">
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#9E9A90] mb-1">
              role
            </span>
            <span className="text-[#171717] font-medium text-sm leading-snug">
              {role}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#9E9A90] mb-1">
              status
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#171717] text-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  project.status === 'Live'
                    ? 'bg-emerald-600'
                    : project.status === 'Beta'
                    ? 'bg-amber-600'
                    : 'bg-[#6F87AA]'
                }`}
              />
              <span className="font-medium">{project.status}</span>
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#9E9A90] mb-1">
              year & release
            </span>
            <span className="text-[#171717] font-serif italic text-base">
              {project.year}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#9E9A90] mb-1">
              built with
            </span>
            <span className="text-[#171717] text-xs font-mono line-clamp-2">
              {project.tools.join(' · ')}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Hero Browser Preview Frame */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-6 sm:my-8">
        <EditorialBrowserFrame
          project={project}
          aspectRatio="aspect-[16/10] sm:aspect-[21/10]"
          priority={true}
          showOverlayAction={false}
        />
        <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-[#67645C] font-mono gap-2 border-b border-[#E2DFD2]/60 pb-3">
          <span className="flex items-center gap-2">
            <span className="text-[#6F87AA]">●</span>
            <span>Interface Specimen: {project.previewUrl}</span>
          </span>
          <span className="font-['Caveat',cursive] font-sans text-base text-[#6F87AA]">
            ~ real production architecture
          </span>
        </div>
      </section>

      {/* 4. Reading Section with Strict 46rem Measure */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Quick External Links, Stack, and Notes */}
          <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1 font-sans">
            <div className="p-6 bg-[#ECEADE]/70 border border-[#E2DFD2] space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#67645C] block font-medium">
                project connections
              </span>

              <div className="space-y-3">
                {project.demo && (
                  <MagneticLink strength={3} className="w-full">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 text-xs uppercase tracking-wider text-[#171717] hover:text-[#6F87AA] border-b border-[#E2DFD2] group w-full"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-[#6F87AA]" />
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
                      className="flex items-center justify-between py-2 text-xs uppercase tracking-wider text-[#171717] hover:text-[#6F87AA] border-b border-[#E2DFD2] group w-full"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-3.5 h-3.5 text-[#171717]" />
                        <span>source code</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </MagneticLink>
                )}
              </div>

              {project.detailedContent.colophon && (
                <div className="pt-4 space-y-2 text-xs text-[#67645C]">
                  <span className="text-[10px] uppercase tracking-wider text-[#9E9A90] block font-mono">
                    technical colophon
                  </span>
                  <p>
                    <strong className="text-[#171717] font-medium">Typography:</strong>{' '}
                    {project.detailedContent.colophon.typography}
                  </p>
                  {materials && (
                    <p>
                      <strong className="text-[#171717] font-medium">Materials:</strong>{' '}
                      {materials}
                    </p>
                  )}
                  <p>
                    <strong className="text-[#171717] font-medium">Release:</strong>{' '}
                    {project.detailedContent.colophon.release}
                  </p>
                </div>
              )}
            </div>

            {/* Studio Note */}
            <div className="p-6 border-l-2 border-[#6F87AA] bg-[#F5F4ED] space-y-2">
              <span className="font-['Caveat',cursive] text-xl text-[#6F87AA] block">
                {t.project.studioNote}
              </span>
              <p className="text-xs text-[#67645C] leading-relaxed">
                "{t.project.studioNoteDefault}"
              </p>
            </div>
          </aside>

          {/* Right Column: Narrow Reading Spine (Strictly constrained to 46rem) */}
          <main className="lg:col-span-8 order-1 lg:order-2 max-w-[46rem] space-y-12">
            {/* Intent & Architecture */}
            <section className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono block font-medium">
                01 / intent & architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171717] lowercase tracking-tight">
                problem space & inquiry
              </h2>
              <p className="text-base sm:text-lg font-serif text-[#171717] leading-relaxed italic">
                {aboutText}
              </p>
              <p className="text-[15px] sm:text-base text-[#67645C] font-sans leading-relaxed">
                {description}
              </p>
            </section>

            {/* Quote Break */}
            {quote && (
              <blockquote className="my-10 py-6 border-y border-[#E2DFD2] space-y-2">
                <p className="font-serif text-xl sm:text-2xl font-light italic text-[#171717] leading-snug">
                  “{quote}”
                </p>
                {quoteAuthor && (
                  <cite className="block text-xs font-sans not-italic text-[#67645C] uppercase tracking-wider">
                    — {quoteAuthor}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Design & Engineering Principles */}
            {designPoints.length > 0 && (
              <section className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono block font-medium">
                  02 / engineering & visual principles
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171717] lowercase tracking-tight">
                  architecture decisions
                </h2>

                <div className="space-y-4">
                  {designPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-[#E2DFD2]/50">
                      <span className="font-mono text-sm font-medium text-[#6F87AA] select-none pt-0.5">
                        0{i + 1}.
                      </span>
                      <p className="text-[15px] text-[#67645C] font-sans leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 03 / System Architecture Diagram */}
            <section className="space-y-4 pt-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono block font-medium">
                03 / system architecture & data flow
              </span>
              <ProjectArchitectureDiagram project={project} />
            </section>

            {/* 04 / Additional Visuals */}
            {project.detailedContent.visuals.length > 0 && (
              <section className="space-y-8 pt-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono block font-medium">
                  04 / interface documentation
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171717] lowercase tracking-tight">
                  system views
                </h2>

                <div className="space-y-8">
                  {project.detailedContent.visuals.map((vis, vIdx) => (
                    <figure key={vIdx} className="space-y-2">
                      <div className="overflow-hidden bg-[#ECEADE] border border-[#E2DFD2]">
                        <img
                          src={vis.url}
                          alt={localizeText(vis.caption)}
                          loading="lazy"
                          className={`w-full ${vis.aspect || 'aspect-[16/10]'} object-cover`}
                        />
                      </div>
                      <figcaption className="flex items-baseline justify-between text-xs text-[#67645C] font-sans">
                        <span>{localizeText(vis.caption)}</span>
                        <span className="font-mono text-[11px] text-[#6F87AA]">view 0{vIdx + 2}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* 05 / Stack / Technologies */}
            <section className="pt-8 border-t border-[#E2DFD2] space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono block font-medium">
                05 / instruments & technologies
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-[#ECEADE] text-[#171717] border border-[#E2DFD2]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              {project.demo && (
                <MagneticLink strength={4}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[#171717] text-[#F5F4ED] hover:bg-[#6F87AA] transition-colors inline-flex items-center gap-2"
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
                    className="px-5 py-2.5 text-xs uppercase tracking-widest border border-[#E2DFD2] text-[#171717] hover:border-[#171717] hover:bg-[#ECEADE] transition-colors inline-flex items-center gap-2"
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
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-20 pt-10 border-t border-[#E2DFD2]">
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group block p-8 sm:p-12 bg-[#ECEADE]/70 hover:bg-[#ECEADE] border border-[#E2DFD2] transition-colors relative overflow-hidden"
          >
            {/* Subtle corner wash */}
            <div className="absolute top-0 right-0 w-48 h-40 pointer-events-none opacity-40">
              <WatercolorStain variant="corner-pool" palette={nextProject.pigmentAccent} />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#67645C] font-mono flex items-center gap-2">
                  <span>{t.project.nextProject}</span>
                  <span className="text-[#6F87AA]">/</span>
                  <span>#{nextProject.number}</span>
                  <span className="px-1.5 py-0.2 bg-[#171717] text-[#F5F4ED] text-[9px]">
                    {nextProject.type}
                  </span>
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] lowercase group-hover:text-[#6F87AA] transition-colors">
                  {localizeText(nextProject.title)}
                </h3>
                <p className="text-[15px] text-[#67645C] font-sans max-w-xl">
                  {localizeText(nextProject.summary)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans text-[#171717] group-hover:text-[#6F87AA] transition-colors">
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
