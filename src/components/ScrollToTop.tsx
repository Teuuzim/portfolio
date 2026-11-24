import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from './Icon'

export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label={label}
          title={label}
          className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-card-hover transition-colors hover:bg-accent-soft"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
        >
          <Icon name="arrow" className="h-5 w-5 -rotate-90" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
