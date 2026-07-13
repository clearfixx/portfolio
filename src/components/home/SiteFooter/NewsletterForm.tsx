'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { LockIcon } from '@/components/icons'

type SubmitState = 'error' | 'idle' | 'submitting' | 'success'

type NewsletterResponse = {
  message?: string
  ok?: boolean
}

type NewsletterFormProps = {
  buttonLabel: string
  note: string
  placeholder: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readFormValue(formData: FormData, name: string) {
  const value = formData.get(name)

  return typeof value === 'string' ? value.trim() : ''
}

function focusEmailField(form: HTMLFormElement) {
  const emailField = form.elements.namedItem('email')

  if (emailField instanceof HTMLInputElement) {
    emailField.focus()
  }
}

export function NewsletterForm({ buttonLabel, note, placeholder }: NewsletterFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [fieldError, setFieldError] = useState('')
  const [feedback, setFeedback] = useState('')
  const isSubmitting = submitState === 'submitting'

  const clearError = () => {
    if (fieldError) {
      setFieldError('')
    }

    if (submitState !== 'idle') {
      setSubmitState('idle')
      setFeedback('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = readFormValue(formData, 'email').toLowerCase()

    if (!email) {
      setFieldError('Enter your email address')
      setSubmitState('error')
      setFeedback('Enter your email address.')
      focusEmailField(form)
      return
    }

    if (!emailPattern.test(email)) {
      setFieldError('Enter a valid email address')
      setSubmitState('error')
      setFeedback('Check the highlighted field and try again.')
      focusEmailField(form)
      return
    }

    setFieldError('')
    setSubmitState('submitting')
    setFeedback('Adding you to Build Notes…')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          website: readFormValue(formData, 'website'),
        }),
      })
      const result = (await response.json().catch(() => ({}))) as NewsletterResponse

      if (!response.ok) {
        throw new Error(result.message || 'Unable to subscribe right now.')
      }

      form.reset()
      setSubmitState('success')
      setFeedback(result.message || 'You’re subscribed to Build Notes.')
    } catch (error) {
      setSubmitState('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to subscribe right now.')
    }
  }

  const statusNote = feedback || note

  return (
    <form
      aria-busy={isSubmitting}
      className="site-footer__newsletter-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className={`site-footer__newsletter-field${fieldError ? ' is-invalid' : ''}`}>
        <span className="sr-only">{placeholder}</span>
        <input
          aria-describedby="newsletter-status"
          aria-invalid={Boolean(fieldError)}
          autoComplete="email"
          disabled={isSubmitting}
          maxLength={254}
          name="email"
          onInput={clearError}
          placeholder={fieldError || placeholder}
          required
          type="email"
        />
      </label>

      <label aria-hidden="true" className="site-footer__newsletter-honeypot">
        <span>Website</span>
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Wait…' : buttonLabel}
      </button>

      <p
        aria-live="polite"
        className="site-footer__newsletter-note"
        data-state={submitState}
        id="newsletter-status"
        role={submitState === 'error' ? 'alert' : submitState === 'success' ? 'status' : undefined}
      >
        <LockIcon />
        {statusNote}
      </p>
    </form>
  )
}
