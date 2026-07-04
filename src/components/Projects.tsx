import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Projects({ language }: { language: Language }) {
  const { projects, labels } = translations[language]

  return (
    <section id="projects" className="section-space scroll-mt-20 bg-[#EEF6F0] dark:bg-[#0E1511]">
      <div className="container-shell">
        <SectionHeading kicker={projects.kicker} title={projects.title} subtitle={projects.subtitle} align="center" />
        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project) => (
            <article key={project.title} className="card group flex h-full flex-col p-7">
              <span className="icon-box transition-transform duration-300 group-hover:-translate-y-1">
                <Icon name={project.icon} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-gray-900 dark:text-slate-50">
                {project.title}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              {(project.demo || project.github) && (
                <div className="mt-7 flex flex-wrap gap-3 border-t border-brand-700/10 pt-5 dark:border-green-400/10">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
