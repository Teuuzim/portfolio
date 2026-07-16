import { motion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Projects({ language }: { language: Language }) {
  const { projects, labels } = translations[language]

  return (
    <section id="projects" className="section-space scroll-mt-20 bg-[#E7F2EA] dark:bg-[#091B15]">
      <div className="container-shell">
        <SectionHeading kicker={projects.kicker} title={projects.title} subtitle={projects.subtitle} />
        <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-12">
          {projects.items.map((project, index) => (
            <motion.article
              key={project.title}
              className={`card group flex h-full flex-col p-7 lg:p-5 ${index < 2 ? 'lg:col-span-6' : 'lg:col-span-4'}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="icon-box transition-transform duration-300 group-hover:-translate-y-1"><Icon name={project.icon} /></span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">case / {String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={`${index < 2 ? 'text-2xl lg:text-3xl' : 'text-xl'} mt-5 font-display font-bold leading-snug tracking-[-0.03em] text-[#153329] dark:text-slate-50`}>{project.title}</h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              {(project.demo || project.github) && (
                <div className="mt-7 flex flex-wrap gap-4 border-t border-brand-700/10 pt-5 dark:border-emerald-300/10">
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
