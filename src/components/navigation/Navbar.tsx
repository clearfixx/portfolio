'use client'

import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navItems = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'About', href: '#engineer-profile', sectionId: 'engineer-profile' },
  { label: 'Stack', href: '#skills-technologies', sectionId: 'skills-technologies' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

const SCROLL_LOCK_MS = 900

function getActiveSectionId() {
  const markerPosition = Math.min(window.innerHeight * 0.36, 340)
  const documentHeight = document.documentElement.scrollHeight
  const scrollBottom = window.scrollY + window.innerHeight

  if (scrollBottom >= documentHeight - 12) {
    return 'contact'
  }

  let activeSectionId = navItems[0].sectionId

  for (const item of navItems) {
    const section = document.getElementById(item.sectionId)

    if (!section) continue

    const rect = section.getBoundingClientRect()

    if (rect.top <= markerPosition) {
      activeSectionId = item.sectionId
    }
  }

  return activeSectionId
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState(navItems[0].sectionId)
  const isProgrammaticScrollRef = useRef(false)
  const scrollLockTimeoutRef = useRef<number | null>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameRef.current)

      frameRef.current = window.requestAnimationFrame(() => {
        if (isProgrammaticScrollRef.current) {
          return
        }

        setActiveSection(getActiveSectionId())
      })
    }

    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.cancelAnimationFrame(frameRef.current)

      if (scrollLockTimeoutRef.current !== null) {
        window.clearTimeout(scrollLockTimeoutRef.current)
      }

      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (!section) return

    event.preventDefault()

    isProgrammaticScrollRef.current = true

    if (scrollLockTimeoutRef.current !== null) {
      window.clearTimeout(scrollLockTimeoutRef.current)
    }

    setActiveSection(sectionId)
    window.history.pushState(null, '', `#${sectionId}`)

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    scrollLockTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
      setActiveSection(getActiveSectionId())
      scrollLockTimeoutRef.current = null
    }, SCROLL_LOCK_MS)
  }

  return (
    <div className="navbar">
      <nav className="navbar__links" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId

          return (
            <Link
              className={`navbar__link ${isActive ? 'is-active' : ''}`}
              href={item.href}
              key={item.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, item.sectionId)}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="navbar__actions">
        <Link
          className="lets-talk"
          href="#contact"
          onClick={(event) => handleNavClick(event, 'contact')}
        >
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

        <ThemeToggle />
      </div>
    </div>
  )
}
