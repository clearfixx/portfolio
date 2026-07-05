import Link from 'next/link'

const navItems = [
  { label: 'Missions', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Logs', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      {navItems.map((item) => (
        <Link className="navbar__link" href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
