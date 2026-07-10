'use client'

import { useTheme } from 'next-themes'

const THEME_TRANSITION_CLASS = 'is-theme-transitioning'
const THEME_TRANSITION_MS = 260

let transitionTimeout: number | undefined

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
  const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light'

  const toggleTheme = () => {
    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.clearTimeout(transitionTimeout)

    if (prefersReducedMotion) {
      root.classList.remove(THEME_TRANSITION_CLASS)
      setTheme(nextTheme)
      return
    }

    root.classList.add(THEME_TRANSITION_CLASS)
    setTheme(nextTheme)

    transitionTimeout = window.setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS)
      transitionTimeout = undefined
    }, THEME_TRANSITION_MS)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={resolvedTheme === 'light'}
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
