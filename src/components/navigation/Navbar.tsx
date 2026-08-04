'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type KeyboardEvent, type MouseEvent, useEffect, useMemo, useRef, useState } from 'react'

import { ThemeToggle } from '@/components/theme/ThemeToggle'

import { isNavigationRouteActive } from './navigation-route-state'
import styles from './NavbarShell.module.scss'
import mobileStyles from './NavbarMobileNavigation.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'
import type { NavigationViewModel } from '@/lib/cms/navigation'

type NavbarProps = {
  navigation: NavigationViewModel
}

type LandingItem = NavigationViewModel['landingItems'][number]
type RouteItem = NonNullable<NavigationViewModel['pagesMenu']>['items'][number]
type CtaItem = NonNullable<NavigationViewModel['cta']>
type ScrollItem = {
  sectionId: string
}

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

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getActiveSectionId(items: ScrollItem[]) {
  const markerPosition = Math.min(window.innerHeight * 0.36, 340)
  const documentHeight = document.documentElement.scrollHeight
  const scrollBottom = window.scrollY + window.innerHeight
  const existingItems = items.filter((item) => document.getElementById(item.sectionId))

  if (scrollBottom >= documentHeight - 12) {
    return existingItems.at(-1)?.sectionId ?? 'hero'
  }

  let activeSectionId = 'hero'

  for (const item of existingItems) {
    const section = document.getElementById(item.sectionId)

    if (section && section.getBoundingClientRect().top <= markerPosition) {
      activeSectionId = item.sectionId
    }
  }

  return activeSectionId
}

export function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname()
  const sectionItems = useMemo<ScrollItem[]>(() => {
    const items = navigation.landingItems.map((item) => ({
      sectionId: item.sectionId,
    }))
    const ctaSectionId = navigation.cta?.sectionId

    if (ctaSectionId && !items.some((item) => item.sectionId === ctaSectionId)) {
      items.push({
        sectionId: ctaSectionId,
      })
    }

    return items
  }, [navigation.cta?.sectionId, navigation.landingItems])

  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false)

  const isProgrammaticScrollRef = useRef(false)
  const scrollLockTimeoutRef = useRef<number | null>(null)
  const frameRef = useRef(0)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLElement>(null)
  const menuCloseRef = useRef<HTMLButtonElement>(null)
  const restoreMenuFocusRef = useRef(false)
  const pagesMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const pagesMenuRef = useRef<HTMLDivElement>(null)
  const pagesMenuContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pathname !== '/') {
      return
    }

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameRef.current)

      frameRef.current = window.requestAnimationFrame(() => {
        if (isProgrammaticScrollRef.current) {
          return
        }

        setActiveSection(getActiveSectionId(sectionItems))
      })
    }

    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.cancelAnimationFrame(frameRef.current)

      if (scrollLockTimeoutRef.current !== null) {
        window.clearTimeout(scrollLockTimeoutRef.current)
      }

      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [pathname, sectionItems])

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
    if (!isPagesMenuOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (
        target instanceof Node &&
        pagesMenuContainerRef.current &&
        !pagesMenuContainerRef.current.contains(target)
      ) {
        setIsPagesMenuOpen(false)
      }
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      setIsPagesMenuOpen(false)
      pagesMenuTriggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPagesMenuOpen])

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

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
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

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: LandingItem | CtaItem,
  ) => {
    closeMenu(false)
    setIsPagesMenuOpen(false)

    if (pathname !== '/' || !item.sectionId) {
      return
    }

    const section = document.getElementById(item.sectionId)

    if (!section) {
      return
    }

    event.preventDefault()
    isProgrammaticScrollRef.current = true

    if (scrollLockTimeoutRef.current !== null) {
      window.clearTimeout(scrollLockTimeoutRef.current)
    }

    setActiveSection(item.sectionId)
    window.history.pushState(null, '', `#${item.sectionId}`)

    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })

    scrollLockTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
      setActiveSection(getActiveSectionId(sectionItems))
      scrollLockTimeoutRef.current = null
    }, SCROLL_LOCK_MS)
  }

  const handlePagesMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown') {
      return
    }

    event.preventDefault()
    setIsPagesMenuOpen(true)

    window.requestAnimationFrame(() => {
      pagesMenuRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    })
  }

  const pagesMenuActive =
    navigation.pagesMenu?.items.some((item) => isNavigationRouteActive(pathname, item)) ?? false
  const ctaActive =
    pathname === '/' &&
    Boolean(navigation.cta?.sectionId && activeSection === navigation.cta.sectionId)

  return (
    <div className={styles.navbar}>
      <nav className={styles.links} aria-label="Main navigation">
        {navigation.landingItems.map((item) => {
          const isActive = pathname === '/' && activeSection === item.sectionId

          return (
            <Link
              className={`${styles.link} ${isActive ? 'is-active' : ''}`}
              href={item.href}
              key={item.id}
              aria-current={isActive ? 'location' : undefined}
              onClick={(event) => handleSectionClick(event, item)}
            >
              {item.label}
            </Link>
          )
        })}

        {navigation.pagesMenu ? (
          <div className={dropdownStyles.dropdown} ref={pagesMenuContainerRef}>
            <button
              className={`${dropdownStyles.dropdownTrigger} ${pagesMenuActive ? 'is-active' : ''}`}
              type="button"
              ref={pagesMenuTriggerRef}
              aria-controls="navbar-pages-menu"
              aria-expanded={isPagesMenuOpen}
              onClick={() => setIsPagesMenuOpen((current) => !current)}
              onKeyDown={handlePagesMenuKeyDown}
            >
              {navigation.pagesMenu.label}
              <ChevronDownIcon />
            </button>

            {isPagesMenuOpen ? (
              <div
                className={dropdownStyles.dropdownMenu}
                id="navbar-pages-menu"
                ref={pagesMenuRef}
              >
                <span className={dropdownStyles.dropdownEyebrow}>Internal pages</span>

                {navigation.pagesMenu.items.map((item) => {
                  const isActive = isNavigationRouteActive(pathname, item)
                  const className = `${dropdownStyles.dropdownItem} ${isActive ? 'is-active' : ''}`
                  const content = (
                    <>
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.href}</small>
                      </span>
                      <ArrowUpRightIcon />
                    </>
                  )

                  return item.external ? (
                    <a
                      className={className}
                      href={item.href}
                      key={item.id}
                      target={item.newTab ? '_blank' : undefined}
                      rel={item.newTab ? 'noreferrer' : undefined}
                      onClick={() => setIsPagesMenuOpen(false)}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      className={className}
                      href={item.href}
                      key={item.id}
                      target={item.newTab ? '_blank' : undefined}
                      rel={item.newTab ? 'noreferrer' : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsPagesMenuOpen(false)}
                    >
                      {content}
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </nav>

      <div className={styles.actions}>
        {navigation.cta ? (
          navigation.cta.external ? (
            <a
              className={`${styles.letsTalk} ${ctaActive ? 'is-active' : ''}`}
              href={navigation.cta.href}
              target={navigation.cta.newTab ? '_blank' : undefined}
              rel={navigation.cta.newTab ? 'noreferrer' : undefined}
            >
              {navigation.cta.label}
              <ArrowUpRightIcon />
            </a>
          ) : (
            <Link
              className={`${styles.letsTalk} ${ctaActive ? 'is-active' : ''}`}
              href={navigation.cta.href}
              aria-current={ctaActive ? 'location' : undefined}
              target={navigation.cta.newTab ? '_blank' : undefined}
              rel={navigation.cta.newTab ? 'noreferrer' : undefined}
              onClick={(event) => handleSectionClick(event, navigation.cta as CtaItem)}
            >
              {navigation.cta.label}
              <ArrowUpRightIcon />
            </Link>
          )
        ) : null}

        <ThemeToggle />
      </div>

      <button
        ref={menuToggleRef}
        className={styles.mobileToggle}
        type="button"
        aria-controls="mobile-navigation-panel"
        aria-expanded={isMenuOpen}
        aria-label="Open navigation menu"
        onClick={() => {
          restoreMenuFocusRef.current = false
          setIsPagesMenuOpen(false)
          setIsMenuOpen(true)
        }}
      >
        <span />
        <span />
        <span />
      </button>

      {isMenuOpen ? (
        <div className={mobileStyles.mobileNavigation}>
          <button
            className={mobileStyles.mobileBackdrop}
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => closeMenu(true)}
          />

          <aside
            ref={menuPanelRef}
            className={mobileStyles.mobilePanel}
            id="mobile-navigation-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            tabIndex={-1}
          >
            <div className={mobileStyles.mobileHeader}>
              <div>
                <span>PORTFOLIO // NAV</span>
                <strong id="mobile-navigation-title">Navigation</strong>
              </div>

              <button
                ref={menuCloseRef}
                className={mobileStyles.mobileClose}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => closeMenu(true)}
              >
                <span />
                <span />
              </button>
            </div>

            <div className={mobileStyles.mobileGroups}>
              {navigation.landingItems.length > 0 ? (
                <section className={mobileStyles.mobileGroup}>
                  <span className={mobileStyles.mobileGroupLabel}>On this page</span>
                  <nav className={mobileStyles.mobileLinks} aria-label="Homepage sections">
                    {navigation.landingItems.map((item, index) => {
                      const isActive = pathname === '/' && activeSection === item.sectionId

                      return (
                        <Link
                          className={`${mobileStyles.mobileLink} ${isActive ? 'is-active' : ''}`}
                          href={item.href}
                          key={item.id}
                          aria-current={isActive ? 'location' : undefined}
                          onClick={(event) => handleSectionClick(event, item)}
                        >
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <strong>{item.label}</strong>
                          <ArrowUpRightIcon />
                        </Link>
                      )
                    })}
                  </nav>
                </section>
              ) : null}

              {navigation.pagesMenu ? (
                <section className={mobileStyles.mobileGroup}>
                  <span className={mobileStyles.mobileGroupLabel}>
                    {navigation.pagesMenu.label}
                  </span>
                  <nav className={mobileStyles.mobileLinks} aria-label="Internal pages">
                    {navigation.pagesMenu.items.map((item) => {
                      const isActive = isNavigationRouteActive(pathname, item)
                      const className = `${mobileStyles.mobileLink} ${mobileStyles.mobileLinkPage} ${
                        isActive ? 'is-active' : ''
                      }`
                      const content = (
                        <>
                          <span>{'//'}</span>
                          <strong>{item.label}</strong>
                          <ArrowUpRightIcon />
                        </>
                      )

                      return item.external ? (
                        <a
                          className={className}
                          href={item.href}
                          key={item.id}
                          target={item.newTab ? '_blank' : undefined}
                          rel={item.newTab ? 'noreferrer' : undefined}
                          onClick={() => closeMenu(false)}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          className={className}
                          href={item.href}
                          key={item.id}
                          target={item.newTab ? '_blank' : undefined}
                          rel={item.newTab ? 'noreferrer' : undefined}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => closeMenu(false)}
                        >
                          {content}
                        </Link>
                      )
                    })}
                  </nav>
                </section>
              ) : null}
            </div>

            <div className={mobileStyles.mobileFooter}>
              <div className={mobileStyles.mobileTheme}>
                <div>
                  <span>Interface theme</span>
                  <strong>Dark / Light</strong>
                </div>
                <ThemeToggle />
              </div>

              {navigation.cta ? (
                navigation.cta.external ? (
                  <a
                    className={mobileStyles.mobileCta}
                    href={navigation.cta.href}
                    target={navigation.cta.newTab ? '_blank' : undefined}
                    rel={navigation.cta.newTab ? 'noreferrer' : undefined}
                    onClick={() => closeMenu(false)}
                  >
                    {navigation.cta.label}
                    <ArrowUpRightIcon />
                  </a>
                ) : (
                  <Link
                    className={mobileStyles.mobileCta}
                    href={navigation.cta.href}
                    target={navigation.cta.newTab ? '_blank' : undefined}
                    rel={navigation.cta.newTab ? 'noreferrer' : undefined}
                    onClick={(event) => handleSectionClick(event, navigation.cta as CtaItem)}
                  >
                    {navigation.cta.label}
                    <ArrowUpRightIcon />
                  </Link>
                )
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
