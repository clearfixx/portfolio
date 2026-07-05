import Link from 'next/link'

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Andrii Kulahin homepage">
      <span className="logo__mark">AK</span>

      <span className="logo__content">
        <span className="logo__name">Andrii Kulahin</span>
        <span className="logo__role">
          <i aria-hidden="true" />
          Software Engineer
        </span>
      </span>
    </Link>
  )
}
