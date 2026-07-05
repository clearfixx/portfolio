import Link from 'next/link'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8 8.8 8.8 0 1 0 20.2 15.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar__links" aria-label="Main navigation">
        {navItems.map((item, index) => (
          <Link
            className={`navbar__link ${index === 0 ? 'is-active' : ''}`}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="navbar__actions">
        <button className="theme-toggle" type="button" aria-label="Toggle theme">
          <MoonIcon />
        </button>

        <Link className="lets-talk" href="#contact">
          Let&apos;s Talk
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M9 7H17V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
