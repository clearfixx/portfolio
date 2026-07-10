export type CookieConsent = {
  version: 1
  preferences: boolean
  analytics: boolean
}

export type CookieConsentDraft = Pick<CookieConsent, 'preferences' | 'analytics'>

const COOKIE_CONSENT_STORAGE_KEY = 'portfolio-cookie-consent'

let cachedRawValue: string | null = null
let cachedSnapshot: CookieConsent | null = null

const subscribers = new Set<() => void>()

function isCookieConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<CookieConsent>

  return (
    candidate.version === 1 &&
    typeof candidate.preferences === 'boolean' &&
    typeof candidate.analytics === 'boolean'
  )
}

function parseCookieConsent(rawValue: string | null): CookieConsent | null {
  if (!rawValue) return null

  try {
    const parsedValue = JSON.parse(rawValue)

    return isCookieConsent(parsedValue) ? parsedValue : null
  } catch {
    return null
  }
}

function emitCookieConsentChange() {
  subscribers.forEach((subscriber) => subscriber())
}

export function getCookieConsentSnapshot() {
  if (typeof window === 'undefined') return null

  const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)

  if (rawValue === cachedRawValue) {
    return cachedSnapshot
  }

  cachedRawValue = rawValue
  cachedSnapshot = parseCookieConsent(rawValue)

  return cachedSnapshot
}

export function getCookieConsentServerSnapshot() {
  return null
}

export function subscribeToCookieConsent(callback: () => void) {
  if (typeof window === 'undefined') return () => {}

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
      cachedRawValue = null
      callback()
    }
  }

  subscribers.add(callback)
  window.addEventListener('storage', handleStorageChange)

  return () => {
    subscribers.delete(callback)
    window.removeEventListener('storage', handleStorageChange)
  }
}

export function saveCookieConsent(draft: CookieConsentDraft) {
  const nextConsent: CookieConsent = {
    version: 1,
    preferences: draft.preferences,
    analytics: draft.analytics,
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(nextConsent))

  cachedRawValue = null
  emitCookieConsentChange()
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('portfolio:open-cookie-preferences'))
}

export function openCookieConsentBanner() {
  window.dispatchEvent(new CustomEvent('portfolio:open-cookie-consent-banner'))
}
