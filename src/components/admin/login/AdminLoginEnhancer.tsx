// Portfolio Admin Experience — login refinement
'use client'

import { useEffect } from 'react'

const REMEMBER_EMAIL_STORAGE_KEY = 'portfolio-admin:remember-email'

const emailIcon = `
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7" />
    <path d="m5 7.5 7 5.5 7-5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" />
  </svg>
`

const lockIcon = `
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <rect height="10" rx="2" stroke="currentColor" stroke-width="1.7" width="14" x="5" y="10" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
    <path d="M12 14v2" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
  </svg>
`

const eyeIcon = `
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path d="M3.5 12s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7" />
    <circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.7" />
  </svg>
`

const eyeOffIcon = `
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path d="M4 4 20 20" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
    <path d="M10.2 7.2A8.8 8.8 0 0 1 12 7c5.3 0 8.5 5 8.5 5a13.6 13.6 0 0 1-2.5 2.9M14.8 16.5c-.9.3-1.8.5-2.8.5-5.3 0-8.5-5-8.5-5a13.9 13.9 0 0 1 3-3.4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" />
  </svg>
`

const checkIcon = `
  <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
    <path d="m4 8 2.35 2.35L12 4.9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
  </svg>
`

function resolveField(input: HTMLInputElement): HTMLElement | null {
  return (
    input.closest<HTMLElement>('.field-type') ??
    input.closest<HTMLElement>('[class*="field-type"]') ??
    input.parentElement?.parentElement ??
    input.parentElement
  )
}

function resolveInputShell(input: HTMLInputElement): HTMLElement | null {
  return input.closest<HTMLElement>('.input-wrapper') ?? input.parentElement
}

function visuallyHideLabel(field: HTMLElement | null, fallback: string): void {
  const label = field?.querySelector<HTMLLabelElement>('label')

  if (!label) return

  const accessibleName = label.textContent?.replace('*', '').trim() || fallback
  label.classList.add('portfolio-admin-visually-hidden')
  label.dataset.portfolioAdminLoginLabel = 'true'

  if (!label.htmlFor) {
    label.setAttribute('aria-label', accessibleName)
  }
}

function addLeadingIcon(shell: HTMLElement, kind: 'email' | 'password'): void {
  if (shell.querySelector('[data-portfolio-admin-auth-icon]')) return

  const icon = document.createElement('span')
  icon.className = 'portfolio-admin-auth-input__icon'
  icon.dataset.portfolioAdminAuthIcon = kind
  icon.innerHTML = kind === 'email' ? emailIcon : lockIcon
  shell.prepend(icon)
}

function readRememberedEmail(): string {
  try {
    return window.localStorage.getItem(REMEMBER_EMAIL_STORAGE_KEY)?.trim() ?? ''
  } catch {
    return ''
  }
}

function storeRememberedEmail(value: string): void {
  try {
    const email = value.trim()

    if (email) {
      window.localStorage.setItem(REMEMBER_EMAIL_STORAGE_KEY, email)
    } else {
      window.localStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY)
    }
  } catch {
    // Storage can be unavailable in strict privacy modes. Login must still work.
  }
}

function clearRememberedEmail(): void {
  try {
    window.localStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY)
  } catch {
    // Storage can be unavailable in strict privacy modes. Login must still work.
  }
}

function setNativeInputValue(input: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set

  if (setter) {
    setter.call(input, value)
  } else {
    input.value = value
  }

  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

function enhanceEmail(input: HTMLInputElement): void {
  if (input.dataset.portfolioAdminEnhanced === 'true') return

  const field = resolveField(input)
  const shell = resolveInputShell(input)
  if (!shell) return

  input.dataset.portfolioAdminEnhanced = 'true'
  input.classList.add('portfolio-admin-auth-input__control')
  input.placeholder = input.placeholder || 'Email address'
  input.autocomplete = 'email'
  input.inputMode = 'email'

  shell.classList.add('portfolio-admin-auth-input', 'is-email')
  addLeadingIcon(shell, 'email')
  visuallyHideLabel(field, 'Email address')

  const rememberedEmail = readRememberedEmail()
  if (!input.value && rememberedEmail) {
    setNativeInputValue(input, rememberedEmail)
  }
}

function enhancePassword(input: HTMLInputElement): void {
  if (input.dataset.portfolioAdminEnhanced === 'true') return

  const field = resolveField(input)
  const shell = resolveInputShell(input)
  if (!shell) return

  input.dataset.portfolioAdminEnhanced = 'true'
  input.classList.add('portfolio-admin-auth-input__control')
  input.placeholder = input.placeholder || 'Password'
  input.autocomplete = 'current-password'

  shell.classList.add('portfolio-admin-auth-input', 'is-password')
  addLeadingIcon(shell, 'password')
  visuallyHideLabel(field, 'Password')

  if (shell.querySelector('[data-portfolio-admin-password-toggle]')) return

  const toggle = document.createElement('button')
  toggle.className = 'portfolio-admin-auth-input__toggle'
  toggle.dataset.portfolioAdminPasswordToggle = 'true'
  toggle.type = 'button'

  const renderToggle = (): void => {
    const passwordIsVisible = input.type === 'text'
    toggle.innerHTML = passwordIsVisible ? eyeOffIcon : eyeIcon
    toggle.setAttribute('aria-label', passwordIsVisible ? 'Hide password' : 'Show password')
    toggle.setAttribute('aria-pressed', String(passwordIsVisible))
    toggle.title = passwordIsVisible ? 'Hide password' : 'Show password'
  }

  toggle.addEventListener('click', () => {
    const selectionStart = input.selectionStart
    const selectionEnd = input.selectionEnd

    input.type = input.type === 'password' ? 'text' : 'password'
    renderToggle()
    input.focus({ preventScroll: true })

    if (selectionStart !== null && selectionEnd !== null) {
      input.setSelectionRange(selectionStart, selectionEnd)
    }
  })

  renderToggle()
  shell.append(toggle)
}

function enhanceLoginActions(email: HTMLInputElement): void {
  const form = email.closest<HTMLFormElement>('form')
  if (!form) return

  const existingOptions = form.querySelector<HTMLElement>('[data-portfolio-admin-login-options]')
  if (existingOptions) return

  const submit = form.querySelector<HTMLElement>('button[type="submit"], input[type="submit"]')
  if (!submit) return

  const options = document.createElement('div')
  options.className = 'portfolio-admin-auth-options'
  options.dataset.portfolioAdminLoginOptions = 'true'

  const remember = document.createElement('label')
  remember.className = 'portfolio-admin-auth-remember'

  const checkbox = document.createElement('input')
  checkbox.className = 'portfolio-admin-auth-remember__input'
  checkbox.type = 'checkbox'
  checkbox.checked = Boolean(readRememberedEmail())
  checkbox.setAttribute('aria-label', 'Remember me')

  const box = document.createElement('span')
  box.className = 'portfolio-admin-auth-remember__box'
  box.innerHTML = checkIcon
  box.setAttribute('aria-hidden', 'true')

  const copy = document.createElement('span')
  copy.className = 'portfolio-admin-auth-remember__copy'
  copy.textContent = 'Remember me'

  remember.append(checkbox, box, copy)
  options.append(remember)

  const forgotLink = form.querySelector<HTMLAnchorElement>('.forgot-password, a[href*="forgot"]')

  if (forgotLink) {
    forgotLink.classList.add('portfolio-admin-auth-forgot')
    options.append(forgotLink)
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      storeRememberedEmail(email.value)
    } else {
      clearRememberedEmail()
    }
  })

  if (form.dataset.portfolioAdminRememberBound !== 'true') {
    form.dataset.portfolioAdminRememberBound = 'true'
    form.addEventListener('submit', () => {
      const activeCheckbox = form.querySelector<HTMLInputElement>(
        '.portfolio-admin-auth-remember__input',
      )

      if (activeCheckbox?.checked) {
        storeRememberedEmail(email.value)
      } else {
        clearRememberedEmail()
      }
    })
  }

  submit.before(options)
}

function enhanceLoginForm(): void {
  const email = document.querySelector<HTMLInputElement>(
    '.login input[type="email"], .login input[name="email"], input[autocomplete="email"]',
  )
  const password = document.querySelector<HTMLInputElement>(
    '.login input[type="password"], .login input[name="password"], input[autocomplete="current-password"]',
  )

  if (email) enhanceEmail(email)
  if (password) enhancePassword(password)
  if (email) enhanceLoginActions(email)
}

export default function AdminLoginEnhancer() {
  useEffect(() => {
    enhanceLoginForm()

    const observer = new MutationObserver(enhanceLoginForm)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
