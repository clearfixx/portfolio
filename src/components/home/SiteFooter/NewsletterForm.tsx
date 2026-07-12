'use client'

import { useState } from 'react'
import type { SubmitEvent } from 'react'

import { LockIcon } from '@/components/icons'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

type NewsletterResponse = {
  ok?: boolean
  message?: string
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

export function NewsletterForm() {
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

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = readFormValue(formData, 'email').toLowerCase()

    if (!email) {
      setFieldError("Enter your email address")
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
        throw new Error(
          result.message || 'Unable to subscribe right now.',
        )
      }

      form.reset()
      setSubmitState('success')
      setFeedback(
        result.message || 'You’re subscribed to Build Notes.',
      )
    } catch (error) {
      setSubmitState('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Unable to subscribe right now.',
      )
    }
  }

  const note =
    feedback || 'No spam. Unsubscribe anytime.'

  return (
    <form
      className="site-footer__newsletter-form"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <label
        className={`site-footer__newsletter-field${
          fieldError ? ' is-invalid' : ''
        }`}
      >
        <span className="sr-only">
          What&apos;s a good email address?
        </span>
        <input
          type="email"
          name="email"
          placeholder={
            fieldError || "What's a good email address?"
          }
          autoComplete="email"
          maxLength={254}
          required
          aria-invalid={Boolean(fieldError)}
          aria-describedby="newsletter-status"
          onInput={clearError}
        />
      </label>

      <label
        className="site-footer__newsletter-honeypot"
        aria-hidden="true"
      >
        <span>Website</span>
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wait…' : 'Gimme!'}
      </button>

      <p
        id="newsletter-status"
        className="site-footer__newsletter-note"
        data-state={submitState}
        role={
          submitState === 'error'
            ? 'alert'
            : submitState === 'success'
              ? 'status'
              : undefined
        }
        aria-live="polite"
      >
        <LockIcon />
        {note}
      </p>
    </form>
  )
}
