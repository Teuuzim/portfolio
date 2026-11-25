import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { Icon } from './Icon'
import { Reveal } from './Reveal'

export function Education({ language }: { language: Language }) {
  const { education, nav } = translations[language]
  const [summary, ...details] = education.paragraphs

  return (
    <section id="education" className="shell section">
      <h2 className="section-title">{nav.education}</h2>

      <Reveal from="left" className="mt-10">
        <article className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:gap-8">
          <span
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-card text-5xl shadow-card ring-1 ring-line"
            aria-hidden="true"
          >
            🎓
          </span>
          <div className="max-w-4xl">
            <h3 className="text-2xl sm:text-3xl">{education.university}</h3>
            <p className="mt-2 text-lg font-semibold sm:text-xl">{education.degree}</p>
            <p className="mt-2 text-lg">{education.period}</p>
            <p className="mt-1 flex items-center gap-1.5 text-muted">
              <Icon name="map" className="h-4 w-4" />
              {education.location}
            </p>
            <p className="mt-4 text-lg leading-relaxed">{summary}</p>
            {details.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-lg leading-relaxed text-muted">
                {details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </Reveal>
    </section>
  )
}
