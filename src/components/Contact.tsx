import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { profile } from '../data/profile'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SocialMedia } from './SocialMedia'

export function Contact({ language }: { language: Language }) {
  const { contact, hero } = translations[language]
  const [intro, ...rest] = contact.paragraphs

  return (
    <section id="contact" className="shell section grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
      <Reveal from="left">
        <h2 className="section-title">{contact.title}</h2>
        <p className="section-subtitle">{intro}</p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all text-xl font-semibold text-fg underline-offset-4 hover:text-accent hover:underline dark:hover:text-accent-soft sm:text-2xl"
        >
          {profile.email}
        </a>

        {rest.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-lg text-muted">
            {paragraph}
          </p>
        ))}

        <p className="mt-6 flex items-center gap-2 text-lg">
          <Icon name="map" className="h-5 w-5 shrink-0" />
          {contact.location}
        </p>
        <p className="mt-3 flex items-center gap-2 text-lg">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {hero.status}
        </p>

        <SocialMedia className="mt-8" />
      </Reveal>

      <Reveal from="right" className="mx-auto">
        <img
          src={profile.photo}
          alt={profile.name}
          width={424}
          height={424}
          loading="lazy"
          className="h-64 w-64 rounded-full border-[7px] border-accent-soft object-cover shadow-card-hover sm:h-72 sm:w-72"
        />
      </Reveal>
    </section>
  )
}
