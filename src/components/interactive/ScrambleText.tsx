/**
 * Scramble text, adapted from Magic UI's Hyper Text (via 21st.dev).
 * Original: Dillion Verma, https://github.com/magicuidesign/magicui
 * License: MIT
 *
 * Changes from the original: the text keeps its own font and case; each
 * scrambling glyph is locked to the width of the character it stands in for,
 * so a proportional display font doesn't jitter; settled characters render as
 * one normal (kerned) run, so the text at rest is untouched; screen readers
 * get the plain text; and reduced motion skips the effect entirely.
 */
import { useEffect, useRef, useState } from 'react'
import { usePointerCapability } from '../../hooks/usePointerCapability'

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/'

type ScrambleTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface ScrambleTextProps {
  children: string
  as?: ScrambleTag
  className?: string
  /** Total time for every character to settle, in ms. */
  duration?: number
  /** Wait before the first play, in ms. */
  delay?: number
  playOnMount?: boolean
  playOnHover?: boolean
  charset?: string
}

interface Frame {
  /** How many characters, counted from the start, have settled. */
  resolved: number
  glyphs: string[]
}

const randomGlyphs = (text: string, charset: string) =>
  text.split('').map((char) => (char.trim() === '' ? char : charset[Math.floor(Math.random() * charset.length)]))

export function ScrambleText({
  children,
  as: Tag = 'span',
  className,
  duration = 900,
  delay = 0,
  playOnMount = true,
  playOnHover = true,
  charset = DEFAULT_CHARSET,
}: ScrambleTextProps) {
  const { canHover, prefersReducedMotion } = usePointerCapability()
  const autoplay = playOnMount && !prefersReducedMotion

  // Starting scrambled (rather than flipping to it after mount) keeps the real
  // text from flashing for a frame before the effect begins.
  const [frame, setFrame] = useState<Frame | null>(() =>
    autoplay ? { resolved: 0, glyphs: randomGlyphs(children, charset) } : null,
  )
  const [run, setRun] = useState(autoplay ? 1 : 0)
  const running = useRef(false)

  useEffect(() => {
    if (run === 0) return
    let frameId = 0
    running.current = true

    const begin = () => {
      const startedAt = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        if (progress >= 1) {
          running.current = false
          setFrame(null)
          return
        }
        setFrame({ resolved: progress * children.length, glyphs: randomGlyphs(children, charset) })
        frameId = requestAnimationFrame(tick)
      }
      frameId = requestAnimationFrame(tick)
    }

    const timeoutId = window.setTimeout(begin, run === 1 ? delay : 0)
    return () => {
      window.clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
      running.current = false
    }
  }, [run, children, duration, delay, charset])

  const handlePointerEnter = () => {
    if (!playOnHover || !canHover || prefersReducedMotion || running.current) return
    setRun((current) => current + 1)
  }

  const settledUpTo = frame ? Math.ceil(frame.resolved) : Infinity
  let offset = 0
  const parts = children.split(/(\s+)/).map((part, partIndex) => {
    const start = offset
    offset += part.length
    // Plain whitespace between words stays a real break opportunity.
    if (part.trim() === '') return part

    const settled = Math.max(0, Math.min(part.length, settledUpTo - start))
    return (
      <span key={partIndex} className="whitespace-nowrap">
        {part.slice(0, settled)}
        {part
          .slice(settled)
          .split('')
          .map((char, index) => (
            // The invisible real character sizes the cell; the scrambled glyph
            // is absolutely positioned so a wider glyph can't push the line.
            <span key={index} className="relative inline-block">
              <span className="invisible">{char}</span>
              <span className="absolute inset-y-0 left-1/2 -translate-x-1/2">
                {frame?.glyphs[start + settled + index] ?? char}
              </span>
            </span>
          ))}
      </span>
    )
  })

  // The plain-text copy only exists mid-scramble; at rest the visible text is
  // the one copy, so crawlers and copy-paste never see the name twice.
  return (
    <Tag className={className}>
      {frame && <span className="sr-only">{children}</span>}
      <span aria-hidden={frame ? true : undefined} onPointerEnter={handlePointerEnter}>
        {parts}
      </span>
    </Tag>
  )
}
