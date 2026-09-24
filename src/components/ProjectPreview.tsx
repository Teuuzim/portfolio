import { motion, useReducedMotion } from 'motion/react'
import type { Language } from '../hooks/useLanguage'
import type { ProjectItem } from '../data/translations'
import { Icon } from './Icon'

const EASE = [0.22, 1, 0.36, 1] as const

const COPY = {
  en: {
    assistant: 'Assistant · online',
    chat: [
      { from: 'user', text: 'Hi! I want to book an appraisal.' },
      { from: 'bot', text: 'Sure! What kind of piece is it?' },
      { from: 'user', text: 'A gold ring.' },
      { from: 'bot', text: 'Perfect — routing you to the São Paulo team ✓' },
    ],
    sheet: { title: 'leads.sync', columns: ['Name', 'Source', 'Status'], synced: 'Synced to CRM' },
    rows: [
      ['Ana Souza', 'WhatsApp', 'Qualified'],
      ['Bruno Lima', 'Website', 'New'],
      ['Carla Dias', 'Instagram', 'Qualified'],
      ['Diego Alves', 'WhatsApp', 'Follow-up'],
    ],
  },
  pt: {
    assistant: 'Assistente · online',
    chat: [
      { from: 'user', text: 'Oi! Quero agendar uma avaliação.' },
      { from: 'bot', text: 'Claro! Qual é o tipo de peça?' },
      { from: 'user', text: 'Um anel de ouro.' },
      { from: 'bot', text: 'Perfeito — encaminhando para a equipe de SP ✓' },
    ],
    sheet: { title: 'leads.sync', columns: ['Nome', 'Origem', 'Status'], synced: 'Sincronizado no CRM' },
    rows: [
      ['Ana Souza', 'WhatsApp', 'Qualificado'],
      ['Bruno Lima', 'Site', 'Novo'],
      ['Carla Dias', 'Instagram', 'Qualificado'],
      ['Diego Alves', 'WhatsApp', 'Retorno'],
    ],
  },
} as const

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-brand-700/10 bg-brand-500/[0.05] px-4 py-2.5 dark:border-emerald-300/10 dark:bg-emerald-300/[0.04]">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="min-w-0 flex-1 truncate rounded-md bg-white/70 px-3 py-1 text-center font-mono text-[10px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
        {label}
      </span>
    </div>
  )
}

function hostname(url?: string) {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function ScreenshotPreview({ project, src }: { project: ProjectItem; src: string }) {
  const body = (
    <img
      src={src}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/preview:scale-[1.04]"
    />
  )
  return (
    <>
      <Chrome label={hostname(project.demo)} />
      <div className="aspect-[16/10] overflow-hidden bg-canvas">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer" tabIndex={-1} className="block h-full">
            {body}
          </a>
        ) : body}
      </div>
    </>
  )
}

function ChatPreview({ language }: { language: Language }) {
  const copy = COPY[language]
  const reduceMotion = useReducedMotion()
  return (
    <>
      <Chrome label={copy.assistant} />
      <div className="flex aspect-[16/10] flex-col justify-end gap-2.5 bg-canvas p-5">
        {copy.chat.map((message, i) => {
          const isBot = message.from === 'bot'
          return (
            <motion.div
              key={message.text}
              className={`flex max-w-[80%] items-end gap-2 ${isBot ? 'self-start' : 'self-end'}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.55, ease: EASE }}
            >
              {isBot && (
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-white dark:bg-emerald-300 dark:text-[#071510]">
                  <Icon name="bot" className="h-3.5 w-3.5" />
                </span>
              )}
              <span
                className={`rounded-2xl px-3.5 py-2 text-xs leading-5 ${
                  isBot
                    ? 'rounded-bl-md bg-white text-gray-700 shadow-sm dark:bg-white/[0.07] dark:text-slate-200'
                    : 'rounded-br-md bg-brand-700 text-white dark:bg-emerald-300 dark:text-[#071510]'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

function SheetPreview({ language }: { language: Language }) {
  const copy = COPY[language]
  const reduceMotion = useReducedMotion()
  const syncDelay = 0.3 + copy.rows.length * 0.35
  return (
    <>
      <Chrome label={copy.sheet.title} />
      <div className="flex aspect-[16/10] flex-col bg-canvas p-4">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-brand-700/10 bg-brand-700/10 text-[11px] dark:border-emerald-300/10 dark:bg-emerald-300/10">
          {copy.sheet.columns.map((column) => (
            <span key={column} className="bg-brand-500/10 px-3 py-2 font-mono font-semibold uppercase tracking-[0.1em] text-brand-700 dark:bg-emerald-300/10 dark:text-emerald-300">
              {column}
            </span>
          ))}
          {copy.rows.map((row, r) =>
            row.map((cell, c) => (
              <motion.span
                key={`${r}-${c}`}
                className="bg-surface px-3 py-2 text-gray-700 dark:text-slate-300"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + r * 0.35 + c * 0.08, ease: EASE }}
              >
                {cell}
              </motion.span>
            )),
          )}
        </div>
        <motion.span
          className="mt-auto inline-flex items-center gap-2 self-end rounded-full bg-brand-700 px-3 py-1.5 font-mono text-[10px] font-semibold text-white dark:bg-emerald-300 dark:text-[#071510]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: syncDelay, ease: EASE }}
        >
          <Icon name="sheet" className="h-3.5 w-3.5" />
          {copy.sheet.synced}
        </motion.span>
      </div>
    </>
  )
}

export function ProjectPreview({ project, language }: { project: ProjectItem; language: Language }) {
  const preview = project.preview
  if (!preview) return null
  return (
    <div className="group/preview overflow-hidden rounded-xl border border-brand-700/10 bg-surface shadow-sm dark:border-emerald-300/10">
      {preview.kind === 'image' && <ScreenshotPreview project={project} src={preview.src} />}
      {preview.kind === 'chat' && <ChatPreview language={language} />}
      {preview.kind === 'sheet' && <SheetPreview language={language} />}
    </div>
  )
}
