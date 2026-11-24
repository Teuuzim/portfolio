import type { Language } from '../hooks/useLanguage'
import { translations, type ProjectItem } from '../data/translations'
import chatBotIllustration from '../assets/illustrations/chat-bot.svg'
import chatBotIllustrationDark from '../assets/illustrations/chat-bot-dark.svg'
import { Icon } from './Icon'
import { Illustration } from './Illustration'
import { Reveal } from './Reveal'

function ProjectImage({ project }: { project: ProjectItem }) {
  const preview = project.preview
  if (!preview) return null

  switch (preview.kind) {
    case 'image':
      return (
        <img
          src={preview.src}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      )
    case 'chat':
      return (
        <div className="grid aspect-[16/10] w-full place-items-center bg-line/40 p-8">
          <Illustration
            light={chatBotIllustration}
            dark={chatBotIllustrationDark}
            width={800}
            height={714}
            className="h-full w-auto"
          />
        </div>
      )
  }
}

export function Projects({ language }: { language: Language }) {
  const { projects, labels } = translations[language]

  return (
    <section id="projects" className="shell section">
      <h2 className="section-title">{projects.title}</h2>
      <p className="section-subtitle">{projects.subtitle}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.items.map((project, index) => (
          <Reveal key={project.title} from="bottom" delay={(index % 2) * 0.12} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-card ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <ProjectImage project={project} />
              <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-6 text-center">
                <h3 className="text-2xl font-medium">{project.title}</h3>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
                  {project.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {(project.demo || project.github) && (
                  <div className="mt-auto flex flex-wrap justify-center gap-3 pt-6">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="btn-small">
                        {labels.liveDemo}
                        <Icon name="external" className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn-small">
                        <Icon name="github" className="h-3.5 w-3.5" />
                        {labels.repository}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
