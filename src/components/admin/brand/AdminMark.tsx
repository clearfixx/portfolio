// Portfolio Admin Experience — shell polish

import { Logo } from '../../brand/Logo'

type AdminMarkProps = {
  className?: string
  height?: number
  href?: string
  title?: string
  width?: number
}

export function AdminMark({
  className,
  height = 124,
  href = '/admin',
  title,
  width = 176,
}: AdminMarkProps) {
  return (
    <span
      className={`portfolio-admin-brand-mark ${className ?? ''}`.trim()}
      data-admin-brand-mark
      title={title}
    >
      <Logo
        className="portfolio-admin-brand-mark__logo"
        height={height}
        href={href}
        width={width}
      />
    </span>
  )
}
