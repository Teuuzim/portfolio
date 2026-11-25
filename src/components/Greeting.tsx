import type { Language } from '../hooks/useLanguage'
import { translations } from '../data/translations'
import { profile, resumeHref } from '../data/profile'
import heroScene from '../assets/scenes/hero.webp'
import floatBolt from '../assets/scenes/float-bolt.webp'
import floatChat from '../assets/scenes/float-chat.webp'
import floatCode from '../assets/scenes/float-code.webp'
import floatGear from '../assets/scenes/float-gear.webp'
import { FloatingScene, type Floater } from './FloatingScene'
import { Reveal } from './Reveal'

const HERO_FLOATERS: Floater[] = [
  { src: floatCode, x: -3, y: 6, width: 17, depth: 1.2, period: 5.5, sway: -5 },
  { src: floatBolt, x: 87, y: -2, width: 9, depth: 1.7, period: 4.5, sway: 8 },
  { src: floatChat, x: 85, y: 44, width: 15, depth: 0.9, period: 6.5, sway: 4 },
  { src: floatGear, x: 0, y: 60, width: 12, depth: 1.4, period: 7, sway: 30 },
]
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
        <FloatingScene
          src={heroScene}
          width={967}
          height={767}
          floaters={HERO_FLOATERS}
          play={play}
          eager
          className="mx-auto w-full max-w-[580px]"
        />
      </Reveal>
    </section>
  )
}
