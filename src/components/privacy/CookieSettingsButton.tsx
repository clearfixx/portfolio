'use client'

import { openCookieConsentBanner, openCookiePreferences } from './cookieConsentStore'

export function CookieSettingsButton() {
  return (
    <button
      className="footer-link footer-link--button"
      type="button"
      onClick={openCookiePreferences}
    >
      Privacy
    </button>
  )
}

export function CookieSettingBanner() {
  return (
    <button
      className="footer-link footer-link--button"
      type="button"
      onClick={openCookieConsentBanner}
    >
      Privacy Settings
    </button>
  )
}
