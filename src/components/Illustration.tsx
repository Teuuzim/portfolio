interface IllustrationProps {
  /** Original unDraw artwork. */
  light: string
  /** Same artwork with its near-black lifted, so it doesn't vanish on the dark background. */
  dark: string
  width: number
  height: number
  className?: string
  eager?: boolean
}

/**
 * Decorative illustration that swaps to its dark variant with the theme class.
 * Only the visible one is fetched when lazy, since browsers skip lazy images
 * that are display:none.
 */
export function Illustration({ light, dark, width, height, className = '', eager = false }: IllustrationProps) {
  const loading = eager ? undefined : 'lazy'
  return (
    <>
      <img src={light} alt="" width={width} height={height} loading={loading} className={`${className} dark:hidden`} />
      <img src={dark} alt="" width={width} height={height} loading={loading} className={`${className} hidden dark:block`} />
    </>
  )
}
