'use client'

import Link from 'next/link'
import { type MouseEvent, useEffect, useRef, useState } from 'react'

import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navItems = [
  { label: 'Home', href: '#hero', sectionId: 'hero', index: '01' },
  { label: 'Projects', href: '#projects', sectionId: 'projects', index: '02' },
  {
    label: 'About',
    href: '#engineer-profile',
    sectionId: 'engineer-profile',
    index: '03',
  },
  {
    label: 'Stack',
    href: '#skills-technologies',
    sectionId: 'skills-technologies',
    index: '04',
  },
  { label: 'Contact', href: '#contact', sectionId: 'contact', index: '05' },
]

const SCROLL_LOCK_MS = 900
const DESKTOP_NAV_QUERY = '(min-width: 901px)'
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

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

    if (!section) {
      continue
    }

    if (section.getBoundingClientRect().top <= markerPosition) {
      activeSectionId = item.sectionId
    }
  }

  return activeSectionId
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState(navItems[0].sectionId)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isProgrammaticScrollRef = useRef(false)
  const scrollLockTimeoutRef = useRef<number | null>(null)
  const frameRef = useRef(0)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLElement>(null)
  const menuCloseRef = useRef<HTMLButtonElement>(null)
  const restoreMenuFocusRef = useRef(false)

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

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY)

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return
      }

      restoreMenuFocusRef.current = false
      setIsMenuOpen(false)
    }

    desktopQuery.addEventListener('change', handleDesktopChange)

    return () => {
      desktopQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const menuToggle = menuToggleRef.current
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousTouchAction = body.style.touchAction
    const previousOverscrollBehavior = body.style.overscrollBehavior

    body.classList.add('mobile-navigation-open')
    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
    body.style.overscrollBehavior = 'none'

    const focusFrame = window.requestAnimationFrame(() => {
      menuCloseRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        restoreMenuFocusRef.current = true
        setIsMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const panel = menuPanelRef.current

      if (!panel) {
        return
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute('disabled'))

      if (focusableElements.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)

      body.classList.remove('mobile-navigation-open')
      body.style.overflow = previousOverflow
      body.style.touchAction = previousTouchAction
      body.style.overscrollBehavior = previousOverscrollBehavior

      if (restoreMenuFocusRef.current) {
        window.requestAnimationFrame(() => {
          menuToggle?.focus()
        })
      }

      restoreMenuFocusRef.current = false
    }
  }, [isMenuOpen])

  const closeMenu = (restoreFocus: boolean) => {
    restoreMenuFocusRef.current = restoreFocus
    setIsMenuOpen(false)
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (!section) {
      return
    }

    event.preventDefault()
    closeMenu(false)

    isProgrammaticScrollRef.current = true

    if (scrollLockTimeoutRef.current !== null) {
      window.clearTimeout(scrollLockTimeoutRef.current)
    }

    setActiveSection(sectionId)
    window.history.pushState(null, '', `#${sectionId}`)

    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
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

      <button
        ref={menuToggleRef}
        className="navbar__mobile-toggle"
        type="button"
        aria-controls="mobile-navigation-panel"
        aria-expanded={isMenuOpen}
        aria-label="Open navigation menu"
        onClick={() => {
          restoreMenuFocusRef.current = false
          setIsMenuOpen(true)
        }}
      >
        <span />
        <span />
        <span />
      </button>

      {isMenuOpen ? (
        <div className="mobile-navigation">
          <button
            className="mobile-navigation__backdrop"
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => closeMenu(true)}
          />

          <aside
            ref={menuPanelRef}
            className="mobile-navigation__panel"
            id="mobile-navigation-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            tabIndex={-1}
          >
            <div className="mobile-navigation__header">
              <div>
                <span>PORTFOLIO // NAV</span>
                <strong id="mobile-navigation-title">Navigation</strong>
              </div>

              <button
                ref={menuCloseRef}
                className="mobile-navigation__close"
                type="button"
                aria-label="Close navigation menu"
                onClick={() => closeMenu(true)}
              >
                <span />
                <span />
              </button>
            </div>

            <nav className="mobile-navigation__links" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId

                return (
                  <Link
                    className={`mobile-navigation__link ${isActive ? 'is-active' : ''}`}
                    href={item.href}
                    key={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => handleNavClick(event, item.sectionId)}
                  >
                    <span>{item.index}</span>
                    <strong>{item.label}</strong>
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
                      <path
                        d="M7 17L17 7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 7H17V15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )
              })}
            </nav>

            <div className="mobile-navigation__footer">
              <div className="mobile-navigation__theme">
                <div>
                  <span>Interface theme</span>
                  <strong>Dark / Light</strong>
                </div>
                <ThemeToggle />
              </div>

              <Link
                className="mobile-navigation__cta"
                href="#contact"
                onClick={(event) => handleNavClick(event, 'contact')}
              >
                Start a conversation
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
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
          </aside>
        </div>
      ) : null}
    </div>
  )
}
