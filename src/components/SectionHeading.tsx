interface SectionHeadingProps {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ kicker, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <header className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}
