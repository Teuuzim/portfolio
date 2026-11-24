/**
 * Scroll reveal text, adapted from Magic UI's Text Reveal (via 21st.dev).
 * Original: Dillion Verma, https://github.com/magicuidesign/magicui
 * License: MIT
 *
 * Changes from the original: no 200vh sticky stage, so it works inline on a
 * heading. Each word fills from a ghost to solid as the heading rises from
 * the bottom of the viewport to its middle. The ghost is the word's own low
 * opacity rather than a duplicated copy, so the text is never doubled for
 * screen readers or crawlers.
 */
import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { motion, useScroll, useTransform } from 'motion/react'

type RevealTag = 'h1' | 'h2' | 'h3' | 'p'

interface ScrollRevealTextProps {
  children: string
  as?: RevealTag
  className?: string
}

const GHOST = 0.14

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [GHOST, 1])
  const blur = useTransform(progress, range, ['blur(5px)', 'blur(0px)'])
  return (
    <motion.span className="inline-block" style={{ opacity, filter: blur }}>
      {children}
    </motion.span>
  )
}

export function ScrollRevealText({ children, as: Tag = 'h2', className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  // Fully filled by the time the heading's top reaches the middle of the
  // viewport, the same line the Experience timeline uses.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'start 50%'] })
  const words = children.split(' ')

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
            {word}
          </Word>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
