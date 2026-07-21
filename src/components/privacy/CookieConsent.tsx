'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import {
  CookieConsentDraft,
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  saveCookieConsent,
  subscribeToCookieConsent,
} from './cookieConsentStore'

const defaultDraft: CookieConsentDraft = {
  preferences: true,
  analytics: false,
}

const subscribeToHydration = () => () => {}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 6L52 14V29C52 42.5 43.7 54.4 32 58C20.3 54.4 12 42.5 12 29V14L32 6Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M23 31H41V45H23V31Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path
        d="M27 31V25.5C27 22.4 29.2 20 32 20C34.8 20 37 22.4 37 25.5V31"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M32 36V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  label: string
  onChange?: () => void
}) {
  return (
    <button
      className={`cookie-toggle ${checked ? 'is-checked' : ''}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
    >
      <span />
    </button>
  )
}

export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  )

  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  )

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [draft, setDraft] = useState<CookieConsentDraft>(defaultDraft)
  const [isBannerForcedOpen, setIsBannerForcedOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const getDraftFromSavedConsent = () => {
      const savedConsent = getCookieConsentSnapshot()

      return savedConsent
        ? {
            preferences: savedConsent.preferences,
            analytics: savedConsent.analytics,
          }
        : defaultDraft
    }

    const handleOpenPreferences = () => {
      setDraft(getDraftFromSavedConsent())
      setIsBannerForcedOpen(false)
      setIsPreferencesOpen(true)
    }

    const handleOpenConsentBanner = () => {
      setDraft(getDraftFromSavedConsent())
      setIsPreferencesOpen(false)
      setIsBannerForcedOpen(true)
    }

    window.addEventListener('portfolio:open-cookie-preferences', handleOpenPreferences)
    window.addEventListener('portfolio:open-cookie-consent-banner', handleOpenConsentBanner)

    return () => {
      window.removeEventListener('portfolio:open-cookie-preferences', handleOpenPreferences)
      window.removeEventListener('portfolio:open-cookie-consent-banner', handleOpenConsentBanner)
    }
  }, [])

  useEffect(() => {
    if (!isPreferencesOpen) {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )

    getFocusableElements()[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsPreferencesOpen(false)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements()
      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements.at(-1)

      if (!firstFocusableElement || !lastFocusableElement) {
        return
      }

      if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? lastFocusableElement : firstFocusableElement).focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      const previousFocus = previousFocusRef.current
      previousFocusRef.current = null
      previousFocus?.focus()
    }
  }, [isPreferencesOpen])

  const closePreferences = () => {
    setIsPreferencesOpen(false)
  }

  const closeBanner = () => {
    setIsBannerForcedOpen(false)
  }

  const rejectOptional = () => {
    saveCookieConsent({
      preferences: false,
      analytics: false,
    })

    closeBanner()
    closePreferences()
  }

  const acceptAll = () => {
    saveCookieConsent({
      preferences: true,
      analytics: true,
    })

    closeBanner()
    closePreferences()
  }

  const savePreferences = () => {
    saveCookieConsent(draft)
    closeBanner()
    closePreferences()
  }

  const shouldShowBanner =
    isHydrated && !isPreferencesOpen && (consent === null || isBannerForcedOpen)

  if (!shouldShowBanner && !isPreferencesOpen) {
    return null
  }

  return (
    <>
      {shouldShowBanner ? (
        <section className="cookie-consent" aria-labelledby="cookie-consent-title">
          <div className="cookie-consent__icon">
            <ShieldIcon />
          </div>

          <div className="cookie-consent__content">
            <p className="cookie-consent__eyebrow">Privacy Console</p>

            <h2 id="cookie-consent-title">Cookie preferences</h2>

            <p>
              This site uses necessary storage for core interface behavior. Optional analytics will
              be enabled only after your consent.
            </p>
          </div>

          <div className="cookie-consent__actions">
            <button className="button button--ghost" type="button" onClick={rejectOptional}>
              Reject optional
            </button>

            <button
              className="button button--outline"
              type="button"
              onClick={() => setIsPreferencesOpen(true)}
            >
              Customize
            </button>

            <button className="button button--primary" type="button" onClick={acceptAll}>
              Accept all
            </button>
          </div>
        </section>
      ) : null}

      {isPreferencesOpen ? (
        <div
          ref={dialogRef}
          className="cookie-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="cookie-modal__backdrop" onClick={closePreferences} />

          <section className="cookie-modal__panel">
            <button
              className="cookie-modal__close"
              type="button"
              aria-label="Close cookie preferences"
              onClick={closePreferences}
            >
              ×
            </button>

            <aside className="cookie-modal__sidebar">
              <p className="cookie-modal__eyebrow">Privacy Console</p>

              <nav className="cookie-modal__nav" aria-label="Privacy settings">
                <button className="is-active" type="button">
                  Cookie Preferences
                </button>
                <button type="button">About Cookies</button>
                <button type="button">Privacy Policy</button>
              </nav>

              <p className="cookie-modal__note">
                Your privacy matters.
                <br />
                You&apos;re in control.
              </p>
            </aside>

            <div className="cookie-modal__main">
              <p className="cookie-modal__eyebrow">Customize preferences</p>

              <h2 id="cookie-modal-title">Choose what the site can use</h2>

              <div className="cookie-options">
                <article className="cookie-option">
                  <div>
                    <h3>Necessary</h3>
                    <p>Required for basic site behavior and saving your cookie choice.</p>
                  </div>

                  <span className="cookie-option__badge">Always active</span>

                  <Toggle checked disabled label="Necessary cookies are always active" />
                </article>

                <article className="cookie-option">
                  <div>
                    <h3>Preferences</h3>
                    <p>Remember interface settings like theme and layout preferences.</p>
                  </div>

                  <Toggle
                    checked={draft.preferences}
                    label="Toggle preference cookies"
                    onChange={() =>
                      setDraft((currentDraft) => ({
                        ...currentDraft,
                        preferences: !currentDraft.preferences,
                      }))
                    }
                  />
                </article>

                <article className="cookie-option">
                  <div>
                    <h3>Analytics</h3>
                    <p>Anonymous traffic statistics to understand what should be improved.</p>
                  </div>

                  <Toggle
                    checked={draft.analytics}
                    label="Toggle analytics cookies"
                    onChange={() =>
                      setDraft((currentDraft) => ({
                        ...currentDraft,
                        analytics: !currentDraft.analytics,
                      }))
                    }
                  />
                </article>

                <article className="cookie-option is-disabled">
                  <div>
                    <h3>Marketing</h3>
                    <p>Not used on this website.</p>
                  </div>

                  <span className="cookie-option__badge">Not used</span>

                  <Toggle checked={false} disabled label="Marketing cookies are not used" />
                </article>
              </div>

              <div className="cookie-modal__actions">
                <button className="button button--ghost" type="button" onClick={closePreferences}>
                  Close
                </button>

                <button className="button button--primary" type="button" onClick={savePreferences}>
                  Save preferences
                </button>
              </div>
            </div>

            <aside className="cookie-modal__info">
              <ShieldIcon />

              <h3>You&apos;re in control</h3>

              <p>
                You can change or withdraw your consent at any time. Your choices are saved on this
                device.
              </p>
            </aside>
          </section>
        </div>
      ) : null}
    </>
  )
}
