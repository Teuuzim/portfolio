import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations, type ProjectItem } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { ProjectPreview } from './ProjectPreview'

type ProjectLabels = { liveDemo: string; repository: string; galleryHint: string }

const EASE = [0.22, 1, 0.36, 1] as const
const DESKTOP_QUERY = '(min-width: 1024px)'

function subscribeDesktop(callback: () => void) {
  const list = window.matchMedia(DESKTOP_QUERY)
  list.addEventListener('change', callback)
  return () => list.removeEventListener('change', callback)
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
}

const pad = (value: number) => String(value).padStart(2, '0')

function ProjectLinks({ project, labels }: { project: ProjectItem; labels: ProjectLabels }) {
  if (!project.demo && !project.github) return null
  return (
    <div className="flex flex-wrap gap-5">
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
  )
}

function ProjectDetails({ project, labels, compact = false }: {
  project: ProjectItem
  labels: ProjectLabels
  /** Clamp the copy so the sticky panel keeps one height across projects. */
  compact?: boolean
}) {
  return (
    <>
      {compact ? (
        <p className="line-clamp-4 text-sm leading-7 text-gray-600 dark:text-slate-300">
          {project.description.join(' ')}
        </p>
      ) : (
        <div className="space-y-3 text-sm leading-7 text-gray-600 dark:text-slate-300">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        {(compact ? project.tags.slice(0, 3) : project.tags).map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>
      {(project.demo || project.github) && (
        <div className="mt-7 border-t border-brand-700/10 pt-5 dark:border-emerald-300/10">
          <ProjectLinks project={project} labels={labels} />
        </div>
      )}
    </>
  )
}

interface RowProps {
  project: ProjectItem
  index: number
  active: boolean
  onActivate: () => void
  /** Hover/focus preview — only where a side panel exists to show it. */
  onPreview?: () => void
  controls: string
}

function ProjectRow({ project, index, active, onActivate, onPreview, controls }: RowProps) {
  const reduceMotion = useReducedMotion()
  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      // With a side panel the row selects what it shows; in the accordion it
      // expands its own details.
      aria-pressed={onPreview ? active : undefined}
      aria-expanded={onPreview ? undefined : active}
      aria-controls={controls}
      className="group relative isolate flex w-full items-center gap-5 py-6 text-left sm:gap-8 lg:py-7"
    >
      {active && (
        <motion.span
          layoutId="project-row-highlight"
          className="absolute inset-y-1 -left-4 -right-4 -z-10 rounded-2xl bg-brand-500/[0.07] dark:bg-emerald-300/[0.06]"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}
      <span
        className={`w-8 shrink-0 font-mono text-xs font-semibold tracking-[0.14em] transition-colors duration-300 ${
          active ? 'text-brand-700 dark:text-emerald-300' : 'text-slate-400'
        }`}
      >
        {pad(index + 1)}
      </span>
      <motion.span
        className={`min-w-0 flex-1 font-display text-2xl font-bold leading-tight tracking-[-0.035em] transition-colors duration-300 sm:text-3xl lg:text-[2.35rem] ${
          active ? 'text-brand-700 dark:text-emerald-300' : 'text-ink/45 group-hover:text-ink/80'
        }`}
        animate={{ x: active && !reduceMotion ? 12 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {project.title}
      </motion.span>
      <span className="hidden shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">
        {project.tags[0]}
      </span>
      <motion.span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
          active
            ? 'border-brand-700 bg-brand-700 text-white dark:border-emerald-300 dark:bg-emerald-300 dark:text-[#071510]'
            : 'border-brand-700/15 text-brand-700 dark:border-emerald-300/15 dark:text-emerald-300'
        }`}
        animate={{ rotate: active ? 0 : -45 }}
        transition={{ duration: 0.45, ease: EASE }}
        aria-hidden="true"
      >
        <Icon name="arrow" className="h-3.5 w-3.5" />
      </motion.span>
    </button>
  )
}

function PreviewPanel({ project, index, total, labels, language }: {
  project: ProjectItem
  index: number
  total: number
  labels: ProjectLabels
  language: Language
}) {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? 0 : 1

  return (
    <div
      id="project-preview"
      className="card relative flex h-[47rem] flex-col overflow-hidden p-6 hover:translate-y-0 xl:p-7"
    >
      {/* The preview wipes in top-down while the outgoing one lifts away,
          so switching projects reads like flipping between browser tabs. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`preview-${index}`}
          className="mb-6"
          initial={{ opacity: 0, clipPath: reduceMotion ? 'inset(0% 0 0% 0)' : 'inset(0% 0 100% 0)', y: 16 * offset }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)', y: 0 }}
          exit={{ opacity: 0, y: -12 * offset, scale: reduceMotion ? 1 : 0.97 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <ProjectPreview project={project} language={language} />
        </motion.div>
      </AnimatePresence>

      <div className="relative flex items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`icon-${index}`}
            className="icon-box"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 * offset }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Icon name={project.icon} />
          </motion.span>
        </AnimatePresence>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          case {pad(index + 1)} / {pad(total)}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.title}
          className="relative mt-5"
          initial={{ opacity: 0, y: 24 * offset, filter: `blur(${8 * offset}px)` }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16 * offset, filter: `blur(${6 * offset}px)` }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h3 className="mb-4 font-display text-2xl font-bold leading-snug tracking-[-0.03em] text-ink">
            {project.title}
          </h3>
          <ProjectDetails project={project} labels={labels} compact />
        </motion.div>
      </AnimatePresence>

      <div className="relative mt-auto flex gap-1.5 pt-6" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-brand-700/10 dark:bg-emerald-300/10">
            <motion.span
              className="block h-full origin-left bg-brand-700 dark:bg-emerald-300"
              initial={false}
              animate={{ scaleX: i <= index ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

interface ListProps {
  items: ProjectItem[]
  labels: ProjectLabels
  language: Language
}

function ProjectsEditorial({ items, labels, language }: ListProps) {
  const [active, setActive] = useState(0)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  const nearView = useInView(gridRef, { once: true, margin: '600px 0px' })

  // Warm the screenshot cache before the section arrives, so the first switch
  // to each project reveals a loaded image instead of an empty frame.
  useEffect(() => {
    if (!nearView) return
    for (const { preview } of items) {
      if (preview?.kind === 'image') new Image().src = preview.src
    }
  }, [nearView, items])

  // A thin band across the middle of the viewport: whichever row crosses it
  // becomes the active one, so the preview follows the reader while scrolling.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = rowRefs.current.indexOf(entry.target as HTMLLIElement)
          if (index >= 0) setActive(index)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    rowRefs.current.forEach((row) => row && observer.observe(row))
    return () => observer.disconnect()
    // Keyed by `items`, not its length: rows are keyed by title, which differs
    // between languages, so a language switch remounts them with new nodes.
  }, [items])

  return (
    <div ref={gridRef} className="mt-14 grid gap-12 lg:grid-cols-12 xl:gap-16">
      <div className="lg:col-span-7">
        <ol className="border-b border-brand-700/10 dark:border-emerald-300/10">
          {items.map((project, index) => (
            <motion.li
              key={project.title}
              ref={(node) => { rowRefs.current[index] = node }}
              className="relative border-t border-brand-700/10 dark:border-emerald-300/10"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: EASE }}
            >
              <ProjectRow
                project={project}
                index={index}
                active={index === active}
                onActivate={() => setActive(index)}
                onPreview={() => setActive(index)}
                controls="project-preview"
              />
            </motion.li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700/60 dark:text-emerald-300/50">
          {labels.galleryHint}
        </p>
      </div>

      {/* Fixed height (clamped copy, capped tags) so switching projects never
          shifts the content below the section. */}
      <div className="lg:col-span-5">
        <PreviewPanel project={items[active]} index={active} total={items.length} labels={labels} language={language} />
      </div>
    </div>
  )
}

function ProjectsAccordion({ items, labels, language }: ListProps) {
  const [open, setOpen] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <ol className="mt-12 border-b border-brand-700/10 dark:border-emerald-300/10">
      {items.map((project, index) => {
        const isOpen = open === index
        const panelId = `project-panel-${index}`
        return (
          <li key={project.title} className="border-t border-brand-700/10 dark:border-emerald-300/10">
            <ProjectRow
              project={project}
              index={index}
              active={isOpen}
              onActivate={() => setOpen(isOpen ? null : index)}
              controls={panelId}
            />
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                >
                  <div className="pb-8 pl-[3.25rem] sm:pl-16">
                    {project.preview && (
                      <div className="mb-6">
                        <ProjectPreview project={project} language={language} />
                      </div>
                    )}
                    <ProjectDetails project={project} labels={labels} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ol>
  )
}

export function Projects({ language }: { language: Language }) {
  const { projects, labels } = translations[language]
  const isDesktop = useIsDesktop()

  const projectLabels: ProjectLabels = {
    liveDemo: labels.liveDemo,
    repository: labels.repository,
    galleryHint: labels.galleryHint,
  }
  const List = isDesktop ? ProjectsEditorial : ProjectsAccordion

  return (
    <section id="projects" className="scroll-mt-20 bg-panel">
      <div className="section-space container-shell">
        <SectionHeading kicker={projects.kicker} title={projects.title} subtitle={projects.subtitle} />
        <List items={projects.items} labels={projectLabels} language={language} />
      </div>
    </section>
  )
}
