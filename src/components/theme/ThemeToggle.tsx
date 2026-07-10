'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

type ThemeViewTransition = {
  finished: Promise<void>
}

type ThemeTransitionDocument = Document & {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>,
  ) => ThemeViewTransition
}

function subscribeToHydration() {
  return () => undefined
}

function getHydratedSnapshot() {
  return true
}

function getServerHydratedSnapshot() {
  return false
}

function waitForTheme(theme: string) {
  return new Promise<void>((resolve) => {
    const root = document.documentElement

    if (root.dataset.theme === theme) {
      resolve()
      return
    }

    const observer = new MutationObserver(() => {
      if (root.dataset.theme !== theme) return

      window.clearTimeout(timeoutId)
      observer.disconnect()
      resolve()
    })

    const timeoutId = window.setTimeout(() => {
      observer.disconnect()
      resolve()
    }, 160)

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
  })
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  )
  const isThemeReady = isHydrated && resolvedTheme !== undefined
  const isLightTheme = isThemeReady && resolvedTheme === 'light'
  const nextTheme = isLightTheme ? 'dark' : 'light'

  const toggleTheme = () => {
    if (!isThemeReady) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const transitionDocument = document as ThemeTransitionDocument

    if (prefersReducedMotion || !transitionDocument.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    const transition = transitionDocument.startViewTransition(async () => {
      setTheme(nextTheme)
      await waitForTheme(nextTheme)
    })

    void transition.finished.catch(() => undefined)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={isThemeReady ? `Switch to ${nextTheme} theme` : 'Toggle color theme'}
      aria-pressed={isThemeReady ? isLightTheme : undefined}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon theme-toggle__icon--moon">
        <MoonIcon />
      </span>

      <span className="theme-toggle__icon theme-toggle__icon--sun">
        <SunIcon />
      </span>
    </button>
  )
}
