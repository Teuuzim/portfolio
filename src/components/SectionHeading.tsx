import { motion } from 'motion/react'
import { SplitText } from './interactive/SplitText'

interface SectionHeadingProps {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ kicker, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <header className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        {kicker}
      </motion.p>
      <SplitText as="h2" className="section-title block">
        {title}
      </SplitText>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}
