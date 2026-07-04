import type { SVGProps } from 'react'
import type { IconName } from '../data/translations'

type CommonIcon =
  | IconName
  | 'arrow'
  | 'external'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'map'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'download'
  | 'check'
  | 'graduation'
  | 'chevron'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: CommonIcon
}

const paths: Record<CommonIcon, React.ReactNode> = {
  code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
  server: <><rect width="18" height="8" x="3" y="3" rx="2" /><rect width="18" height="8" x="3" y="13" rx="2" /><path d="M7 7h.01M7 17h.01" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  spark: <><path d="m12 3-1.7 4.3L6 9l4.3 1.7L12 15l1.7-4.3L18 9l-4.3-1.7L12 3Z" /><path d="m5 15-.9 2.1L2 18l2.1.9L5 21l.9-2.1L8 18l-2.1-.9L5 15Z" /><path d="m19 14-.6 1.4L17 16l1.4.6L19 18l.6-1.4L21 16l-1.4-.6L19 14Z" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-8.7 8.7a2.1 2.1 0 0 0 3 3l8.7-8.7a4 4 0 0 0 5-5L18 9l-2.4-2.4 2.3-2.3Z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  workflow: <><rect width="7" height="5" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="16" rx="1" /><path d="M6.5 8v5a3 3 0 0 0 3 3H14M17.5 16v-5a3 3 0 0 0-3-3H10" /></>,
  briefcase: <><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 12h20M10 12v2h4v-2" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  cart: <><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M3 4h2l2.5 11h11l2-7H6" /></>,
  bot: <><rect width="18" height="14" x="3" y="7" rx="2" /><path d="M12 3v4M8 12h.01M16 12h.01M8 17h8" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></>,
  message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /><path d="M8 9h8M8 13h5" /></>,
  layout: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M2 9h20M8 9v11" /></>,
  sheet: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  external: <><path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.2.5S18.1.1 15 2a13.4 13.4 0 0 0-7 0C4.9.1 3.8.5 3.8.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  graduation: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12.5V17c3 2 9 2 12 0v-4.5M22 10v6" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
}

export function Icon({ name, className = 'h-5 w-5', ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
