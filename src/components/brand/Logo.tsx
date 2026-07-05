import Link from 'next/link'

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Andrii Kulahin homepage">
      <span className="logo__mark">
        <span>A K</span>
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
