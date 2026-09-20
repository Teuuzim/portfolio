import { useEffect, useRef, useState } from 'react'
import { usePointerCapability } from '../../hooks/usePointerCapability'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface TextScrambleProps {
  text: string
  className?: string
  duration?: number
}

export function TextScramble({ text, className, duration = 900 }: TextScrambleProps) {
  const { prefersReducedMotion } = usePointerCapability()
  const [display, setDisplay] = useState(prefersReducedMotion ? text : '')
  const frameRef = useRef<number>()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text)
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const revealCount = Math.floor(progress * text.length)
      const next = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealCount) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setDisplay(next)

      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text, duration, prefersReducedMotion])

  return <span className={className}>{display}</span>
}
