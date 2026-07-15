import Link from 'next/link'

type SiteLogoProps = {
  className?: string
  href?: string
  width?: number
  height?: number
  leftBracketFill?: string
  rightBracketFill?: string
  letterAFill?: string
  LetterKFill?: string
}

export function Logo({
  className,
  href = '/',
  width = 80,
  height = 80,
  leftBracketFill = '#13f2e3',
  rightBracketFill = '#9b5cff',
  letterAFill = '#ffffff',
  LetterKFill = '#ffffff',
}: SiteLogoProps) {
  return (
    <Link
      className={['logo', className].filter(Boolean).join(' ')}
      href={href}
      aria-label="Andrii Kulahin homepage"
    >
      <span className="logo__mark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 176 124"
          fill="none"
          role="img"
          aria-label="AK logo"
        >
          {/* Left bracket */}
          <path d="M11 40H31L24 47H19V84H24L31 91H11V40Z" fill={leftBracketFill} />

          {/* Letter A */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.5 40H72.5L89.5 91H76.4L73.2 80.6H53.4L50.2 91H37.2L54.5 40ZM56.8 69.6H69.8L63.3 48.8L56.8 69.6Z"
            fill={letterAFill}
          />

          {/* Letter K — vertical stem */}
          <path d="M91.5 40H102.8V91H91.5V40Z" fill={LetterKFill} />

          {/* Letter K — diagonal arms */}
          <path
            d="M103 62.2L121.3 40H135.4L114.3 64.2L136.8 91H122.1L103 67.2V62.2Z"
            fill={LetterKFill}
          />

          {/* Right bracket */}
          <path d="M165 40H145L152 47H157V84H152L145 91H165V40Z" fill={rightBracketFill} />
        </svg>
      </span>

      <span className="logo__content">
        <span className="logo__name">Andrii Kulahin</span>

        <span className="logo__role">
          Software Engineer <i aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}
