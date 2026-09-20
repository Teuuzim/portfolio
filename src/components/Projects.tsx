import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations, type ProjectItem } from '../data/translations'
import { usePointerCapability } from '../hooks/usePointerCapability'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './interactive/TiltCard'

type ProjectLabels = { liveDemo: string; repository: string; galleryHint: string }

interface ProjectCardProps {
  project: ProjectItem
  index: number
  labels: ProjectLabels
  className?: string
  titleClassName?: string
}

function ProjectCard({ project, index, labels, className, titleClassName = 'text-xl' }: ProjectCardProps) {
  return (
    <TiltCard className={`card group flex h-full flex-col p-7 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="icon-box transition-transform duration-300 group-hover:-translate-y-1">
          <Icon name={project.icon} />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          case / {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className={`${titleClassName} mt-5 font-display font-bold leading-snug tracking-[-0.03em] text-ink`}>
        {project.title}
      </h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
        {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>
      {(project.demo || project.github) && (
        <div className="mt-auto flex flex-wrap gap-4 border-t border-brand-700/10 pt-5 dark:border-emerald-300/10">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
              {labels.liveDemo}
              <Icon name="external" className="h-4 w-4" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              <Icon name="github" className="h-4 w-4" />
              {labels.repository}
            </a>
          )}
        </div>
      )}
    </TiltCard>
  )
}

function useHorizontalScroll(
  cardsRef: React.RefObject<HTMLElement>,
  viewportRef: React.RefObject<HTMLElement>,
  gutterRef: React.RefObject<HTMLElement>,
) {
  const [{ distance, viewportHeight, gutter }, setDimensions] = useState({
    distance: 0,
    viewportHeight: 0,
    gutter: 0,
  })

  useEffect(() => {
    const cards = cardsRef.current
    const viewport = viewportRef.current
    if (!cards || !viewport) return

    // Measuring the cards row (which the gutter never touches) instead of the
    // outer track keeps this a single pass: if distance depended on the applied
    // gutter, the first measurement would always read zero and need a second
    // one, which browsers skip entirely while a tab is hidden.
    const measure = () => {
      const anchor = gutterRef.current
      const offset = anchor
        ? anchor.getBoundingClientRect().left -
          viewport.getBoundingClientRect().left +
          parseFloat(getComputedStyle(anchor).paddingLeft || '0')
        : 0
      const gutterWidth = Math.max(0, offset)
      setDimensions({
        distance: Math.max(0, gutterWidth + cards.scrollWidth - viewport.clientWidth),
        viewportHeight: viewport.clientHeight,
        gutter: gutterWidth,
      })
    }
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(cards)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [cardsRef, viewportRef, gutterRef])

  return { distance, viewportHeight, gutter }
}

interface GalleryProps {
  items: ProjectItem[]
  labels: ProjectLabels
  heading: { kicker: string; title: string; subtitle: string }
}

function ProjectsHorizontal({ items, labels, heading }: GalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const { distance, viewportHeight, gutter } = useHorizontalScroll(cardsRef, viewportRef, headingRef)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 })

  // Scroll room equals viewport height plus exactly the horizontal distance the
  // track needs to travel — so wide viewports where every card already fits
  // (distance = 0) don't reserve a dead scroll zone with nothing to animate.
  const sectionHeight = viewportHeight > 0 ? `${viewportHeight + distance}px` : '100vh'
  const pinned = distance > 0

  return (
    <div ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div ref={viewportRef} className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-24">
        <div ref={headingRef} className="container-shell shrink-0">
          <SectionHeading kicker={heading.kicker} title={heading.title} subtitle={heading.subtitle} />
        </div>

        <motion.div className="mt-12 flex w-max" style={{ x }}>
          {/* A real flex child rather than padding: padding grows only the
              border-box, which a content-box ResizeObserver never reports. */}
          <div className="shrink-0" style={{ width: gutter }} aria-hidden="true" />
          <div ref={cardsRef} className="flex w-max gap-6">
            {items.map((project, index) => (
              <div key={project.title} className="w-[20rem] shrink-0 sm:w-[23rem]">
                <ProjectCard project={project} index={index} labels={labels} />
              </div>
            ))}
            <div className="w-2 shrink-0 sm:w-4 lg:w-6" aria-hidden="true" />
          </div>
        </motion.div>

        {pinned && (
          <div className="container-shell mt-12 flex shrink-0 items-center gap-5">
            <span className="h-px flex-1 overflow-hidden bg-brand-700/15 dark:bg-emerald-300/15">
              <motion.span
                className="block h-full origin-left bg-brand-700 dark:bg-emerald-300"
                style={{ scaleX: progress }}
              />
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700/60 dark:text-emerald-300/50">
              {labels.galleryHint}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsGrid({ items, labels, heading }: GalleryProps) {
  return (
    <div className="section-space container-shell">
      <SectionHeading kicker={heading.kicker} title={heading.title} subtitle={heading.subtitle} />
      <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-12">
        {items.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            labels={labels}
            className={index < 2 ? 'lg:col-span-6' : 'lg:col-span-4'}
            titleClassName={index < 2 ? 'text-2xl lg:text-3xl' : 'text-xl'}
          />
        ))}
      </div>
    </div>
  )
}

export function Projects({ language }: { language: Language }) {
  const { projects, labels } = translations[language]
  const { isTouch, prefersReducedMotion } = usePointerCapability()
  const useHorizontal = !isTouch && !prefersReducedMotion

  const heading = { kicker: projects.kicker, title: projects.title, subtitle: projects.subtitle }
  const projectLabels: ProjectLabels = {
    liveDemo: labels.liveDemo,
    repository: labels.repository,
    galleryHint: labels.galleryHint,
  }
  const Gallery = useHorizontal ? ProjectsHorizontal : ProjectsGrid

  return (
    <section id="projects" className="scroll-mt-20 bg-panel">
      <Gallery items={projects.items} labels={projectLabels} heading={heading} />
    </section>
  )
}
