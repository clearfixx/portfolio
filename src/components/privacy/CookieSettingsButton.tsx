'use client'

import Link from 'next/link'
import { openCookiePreferences, openCookieConsentBanner } from './cookieConsentStore'

export function CookieSettingsButton() {
  return (
    <Link href="" className="footer-link footer-link--button" onClick={openCookiePreferences}>Privacy</Link>
  )
}

export function CookieSettingBanner() {
  return (
    <Link href={''} className="footer-link footer-link--button" onClick={openCookieConsentBanner}>Privacy Settings</Link>
  )
}
