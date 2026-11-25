import { useEffect } from 'react'
import { motion } from 'motion/react'
import { splash } from '../data/profile'
import { Logo } from './Logo'

/**
 * Intro screen: the signature writes itself left to right, then the screen
 * fades off the already-rendered page (so the content is never missing from
 * the DOM, only covered for a moment).
 */
export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, splash.durationMs)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = overflow
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] grid place-items-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      <motion.div
        className="text-3xl sm:text-5xl"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.2, ease: [0.45, 0, 0.25, 1] }}
      >
        <Logo />
      </motion.div>
    </motion.div>
  )
}
