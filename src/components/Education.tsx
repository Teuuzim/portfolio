import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Education({ language }: { language: Language }) {
  const { education } = translations[language]

  return (
    <section id="education" className="section-space scroll-mt-20">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <SectionHeading kicker={education.kicker} title={education.title} />
        <article className="card p-7 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-emerald-950/15 dark:bg-emerald-300 dark:text-[#071510]">
              <Icon name="graduation" className="h-7 w-7" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">{education.degree}</h3>
              <p className="mt-2 text-lg font-semibold text-brand-700 dark:text-green-400">{education.university}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><Icon name="map" className="h-4 w-4" />{education.location}</span>
                <span>{education.period}</span>
              </div>
            </div>
          </div>
          <div className="mt-7 space-y-4 border-t border-brand-700/10 pt-7 leading-7 text-gray-600 dark:border-green-400/10 dark:text-slate-300">
            {education.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </div>
    </section>
  )
}
