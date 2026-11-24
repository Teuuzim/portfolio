import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { profile, resumeHref } from '../data/profile'
import helloIllustration from '../assets/illustrations/hello.svg'
import helloIllustrationDark from '../assets/illustrations/hello-dark.svg'
import { Illustration } from './Illustration'
import { Reveal } from './Reveal'
import { SocialMedia } from './SocialMedia'

interface GreetingProps {
  language: Language
  /** False while the intro screen is still up, so the entrance isn't spent behind it. */
  play: boolean
}

export function Greeting({ language, play }: GreetingProps) {
  const { hero, labels } = translations[language]

  return (
    <section
      id="top"
      className="shell grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-24"
    >
      <Reveal from="left" when={play} className="text-center lg:text-left">
        <h1 className="text-[2.4rem] font-medium leading-tight sm:text-6xl lg:text-[48px] xl:text-[56px]">
          {hero.greeting}{' '}
          {/* The wave stays glued to the name so it never wraps onto a line alone. */}
          <span className="whitespace-nowrap">
            {profile.firstName}{' '}
            <span className="inline-block origin-[70%_70%] animate-wave" aria-hidden="true">
              👋
            </span>
          </span>
        </h1>
        <p className="mt-6 text-xl leading-normal text-muted sm:text-2xl lg:text-[26px] lg:leading-[1.45]">
          {hero.role} {hero.bio}
        </p>
        <SocialMedia className="mt-8 justify-center lg:justify-start" />
        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a href="#contact" className="btn">
            {labels.contactMe}
          </a>
          <a href={resumeHref(language)} download className="btn">
            {labels.downloadResume}
          </a>
        </div>
      </Reveal>

      <Reveal from="right" when={play} delay={0.1}>
        <Illustration
          light={helloIllustration}
          dark={helloIllustrationDark}
          width={880}
          height={523}
          eager
          className="mx-auto w-full max-w-[600px]"
        />
      </Reveal>
    </section>
  )
}
