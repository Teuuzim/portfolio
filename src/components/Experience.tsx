import type { Language } from '../hooks/useLanguage'
import { translations, type ExperienceItem } from '../data/translations'
import { Reveal } from './Reveal'

// Without company logos to sample a color from, each company gets one from a
// fixed set, in order of first appearance.
const BANNER_COLORS = ['#55198b', '#1d4f91', '#0f766e', '#9a3412']

function bannerColors(items: ExperienceItem[]) {
  const byCompany = new Map<string, string>()
  for (const { company } of items) {
    if (!byCompany.has(company)) byCompany.set(company, BANNER_COLORS[byCompany.size % BANNER_COLORS.length])
  }
  return byCompany
}

function ExperienceCard({ item, color }: { item: ExperienceItem; color: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-card ring-1 ring-line transition-shadow duration-300 hover:shadow-card-hover">
      <div
        className="relative flex h-40 items-start justify-center px-4 pt-10"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0) 70%), linear-gradient(${color}, ${color})` }}
      >
        <h3 className="text-center text-2xl font-semibold text-white">{item.company}</h3>
        <span
          className="absolute -bottom-12 left-1/2 grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-4 border-card text-5xl shadow-lg"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        >
          {item.emoji}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-16 text-center">
        <p className="text-2xl font-medium">{item.role}</p>
        <p className="mt-2 font-semibold">{item.period}</p>
        <p className="mt-1 text-sm text-muted">{item.location}</p>
        <p className="mt-5 leading-relaxed text-muted">{item.description[0]}</p>
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-left leading-snug text-muted">
          {item.activities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Experience({ language }: { language: Language }) {
  const { experience, nav } = translations[language]
  const colors = bannerColors(experience.items)

  return (
    <section id="experience" className="shell section">
      <h2 className="section-title">{nav.experience}</h2>
      <p className="section-subtitle">{experience.subtitle}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experience.items.map((item, index) => (
          <Reveal key={`${item.company}-${item.role}`} from="bottom" delay={index * 0.12} className="h-full">
            <ExperienceCard item={item} color={colors.get(item.company) ?? BANNER_COLORS[0]} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
