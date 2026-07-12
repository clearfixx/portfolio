'use client'

import { useEffect, useRef, useState } from 'react'
import type {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  PointerEvent,
} from 'react'

import {
  ArrowUpRightIcon,
  ContactUserIcon,
  LockIcon,
  MailIcon,
  MessageIcon,
} from '@/components/icons'
import { ProjectTypeSelect } from '@/components/home/ProjectTypeSelect'

const MAX_MESSAGE_LENGTH = 1000
const MIN_HUMAN_INTERACTION_MS = 500
const CAPTCHA_INTERACTION_WINDOW_MS = 1500

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

type FieldName = 'name' | 'email' | 'projectType' | 'message' | 'captcha'

type FormErrors = Partial<Record<FieldName, string>>

type CaptchaInteraction = {
  kind: 'pointer' | 'keyboard'
  at: number
  trusted: boolean
}

type CaptchaProof = {
  checked: true
  interaction: 'pointer' | 'keyboard'
  trusted: true
  elapsedMs: number
}

type ContactResponse = {
  ok?: boolean
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readFormValue(formData: FormData, name: string) {
  const value = formData.get(name)

  return typeof value === 'string' ? value.trim() : ''
}

function validateForm(
  formData: FormData,
  captchaChecked: boolean,
  captchaProof: CaptchaProof | null,
): FormErrors {
  const name = readFormValue(formData, 'name')
  const email = readFormValue(formData, 'email')
  const projectType = readFormValue(formData, 'projectType')
  const message = readFormValue(formData, 'message')
  const errors: FormErrors = {}

  if (!name) {
    errors.name = "Field Name can't be empty"
  } else if (name.length < 2) {
    errors.name = 'Name must contain at least 2 characters'
  }

  if (!email) {
    errors.email = "Field Email can't be empty"
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!projectType) {
    errors.projectType = 'Choose a project type'
  }

  if (!message) {
    errors.message = "Field Message can't be empty"
  } else if (message.length < 10) {
    errors.message = 'Message must contain at least 10 characters'
  }

  if (!captchaChecked || !captchaProof) {
    errors.captcha = 'Confirm that you are human'
  }

  return errors
}

function focusFirstInvalidField(
  form: HTMLFormElement,
  errors: FormErrors,
) {
  const order: FieldName[] = [
    'name',
    'email',
    'projectType',
    'message',
    'captcha',
  ]

  const selectors: Record<FieldName, string> = {
    name: '[name="name"]',
    email: '[name="email"]',
    projectType: '[data-contact-field="projectType"]',
    message: '[name="message"]',
    captcha: '[name="captcha"]',
  }

  const firstInvalid = order.find((field) => errors[field])

  if (!firstInvalid) {
    return
  }

  window.requestAnimationFrame(() => {
    form
      .querySelector<HTMLElement>(selectors[firstInvalid])
      ?.focus()
  })
}

export function ContactForm() {
  const formStartedAtRef = useRef(0)
  const captchaInteractionRef = useRef<CaptchaInteraction | null>(null)
  const captchaProofRef = useRef<CaptchaProof | null>(null)

  const [messageLength, setMessageLength] = useState(0)
  const [selectVersion, setSelectVersion] = useState(0)
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedback, setFeedback] = useState('')

  const isSubmitting = submitState === 'submitting'

  useEffect(() => {
    formStartedAtRef.current = performance.now()
  }, [])

  const clearFieldError = (field: FieldName) => {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]

      return next
    })

    if (submitState !== 'idle') {
      setSubmitState('idle')
      setFeedback('')
    }
  }

  const handleCaptchaPointerDown = (
    event: PointerEvent<HTMLLabelElement>,
  ) => {
    captchaInteractionRef.current = {
      kind: 'pointer',
      at: performance.now(),
      trusted: event.nativeEvent.isTrusted,
    }
  }

  const handleCaptchaKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== ' ') {
      return
    }

    captchaInteractionRef.current = {
      kind: 'keyboard',
      at: performance.now(),
      trusted: event.nativeEvent.isTrusted,
    }
  }

  const handleCaptchaChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.currentTarget.checked) {
      captchaProofRef.current = null
      setCaptchaChecked(false)
      clearFieldError('captcha')
      return
    }

    const now = performance.now()
    const interaction = captchaInteractionRef.current
    const elapsedMs = Math.round(now - formStartedAtRef.current)
    const interactionAge = interaction
      ? now - interaction.at
      : Number.POSITIVE_INFINITY

    const isHumanInteraction =
      event.nativeEvent.isTrusted &&
      interaction?.trusted === true &&
      interactionAge <= CAPTCHA_INTERACTION_WINDOW_MS &&
      elapsedMs >= MIN_HUMAN_INTERACTION_MS

    if (!isHumanInteraction || !interaction) {
      captchaProofRef.current = null
      setCaptchaChecked(false)
      setErrors((current) => ({
        ...current,
        captcha: 'Human verification failed. Click the checkbox manually.',
      }))
      setSubmitState('error')
      setFeedback('Human verification failed.')
      return
    }

    captchaProofRef.current = {
      checked: true,
      interaction: interaction.kind,
      trusted: true,
      elapsedMs,
    }

    setCaptchaChecked(true)
    clearFieldError('captcha')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const nextErrors = validateForm(
      formData,
      captchaChecked,
      captchaProofRef.current,
    )

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitState('error')
      setFeedback('Check the highlighted fields and try again.')
      focusFirstInvalidField(form, nextErrors)
      return
    }

    setErrors({})
    setSubmitState('submitting')
    setFeedback('Sending your message…')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: readFormValue(formData, 'name'),
          email: readFormValue(formData, 'email'),
          projectType: readFormValue(formData, 'projectType'),
          message: readFormValue(formData, 'message'),
          website: readFormValue(formData, 'website'),
          captcha: captchaProofRef.current,
        }),
      })

      const result = (await response.json().catch(() => ({}))) as ContactResponse

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to send your message right now.',
        )
      }

      form.reset()
      captchaInteractionRef.current = null
      captchaProofRef.current = null
      formStartedAtRef.current = performance.now()

      setMessageLength(0)
      setSelectVersion((current) => current + 1)
      setCaptchaChecked(false)
      setErrors({})
      setSubmitState('success')
      setFeedback('Message sent. I’ll get back to you as soon as possible.')
    } catch (error) {
      setSubmitState('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now.',
      )
    }
  }

  return (
    <form
      className="contact-cta__form"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="contact-cta__fieldset" disabled={isSubmitting}>
        <label
          className={`contact-cta__field${errors.name ? ' is-invalid' : ''}`}
        >
          <span className="contact-cta__field-icon">
            <ContactUserIcon />
          </span>
          <span className="sr-only">Your Name</span>
          <input
            name="name"
            type="text"
            placeholder={errors.name ?? 'Your Name'}
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            onInput={() => {
              clearFieldError('name')
            }}
          />
          <span id="contact-name-error" className="sr-only">
            {errors.name ?? ''}
          </span>
        </label>

        <label
          className={`contact-cta__field${errors.email ? ' is-invalid' : ''}`}
        >
          <span className="contact-cta__field-icon">
            <MailIcon />
          </span>
          <span className="sr-only">Your Email</span>
          <input
            name="email"
            type="email"
            placeholder={errors.email ?? 'Your Email'}
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            onInput={() => {
              clearFieldError('email')
            }}
          />
          <span id="contact-email-error" className="sr-only">
            {errors.email ?? ''}
          </span>
        </label>

        <ProjectTypeSelect
          key={selectVersion}
          invalid={Boolean(errors.projectType)}
          errorMessage={errors.projectType}
          errorId="contact-project-type-error"
          onValueChange={() => {
            clearFieldError('projectType')
          }}
        />

        <label
          className={`contact-cta__field contact-cta__field--message${
            errors.message ? ' is-invalid' : ''
          }`}
        >
          <span className="contact-cta__field-icon">
            <MessageIcon />
          </span>
          <span className="sr-only">Message</span>
          <textarea
            name="message"
            placeholder={errors.message ?? 'Message'}
            minLength={10}
            maxLength={MAX_MESSAGE_LENGTH}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            onChange={(event) => {
              setMessageLength(event.currentTarget.value.length)
              clearFieldError('message')
            }}
          />
          <span id="contact-message-error" className="sr-only">
            {errors.message ?? ''}
          </span>
          <span className="contact-cta__counter">
            {messageLength} / {MAX_MESSAGE_LENGTH}
          </span>
        </label>

        <label className="contact-cta__honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </label>

        <div
          className={`contact-cta__captcha${
            errors.captcha ? ' is-invalid' : ''
          }`}
        >
          <label
            className="contact-cta__captcha-control"
            onPointerDown={handleCaptchaPointerDown}
          >
            <input
              className="contact-cta__captcha-input"
              name="captcha"
              type="checkbox"
              checked={captchaChecked}
              required
              aria-invalid={Boolean(errors.captcha)}
              aria-describedby="contact-captcha-copy"
              onKeyDown={handleCaptchaKeyDown}
              onChange={handleCaptchaChange}
            />
            <span className="contact-cta__captcha-box" aria-hidden="true" />
            <span
              id="contact-captcha-copy"
              className="contact-cta__captcha-copy"
            >
              <strong>
                {errors.captcha ?? 'I am human'}
              </strong>
              <span>
                Simple interaction verification
              </span>
            </span>
          </label>
        </div>

        <button className="contact-cta__submit" type="submit">
          {isSubmitting ? 'Sending…' : 'Start the conversation'}
          <ArrowUpRightIcon />
        </button>
      </fieldset>

      {feedback ? (
        <p
          className="contact-cta__feedback"
          data-state={submitState}
          role={submitState === 'error' ? 'alert' : 'status'}
        >
          {feedback}
        </p>
      ) : null}

      <p className="contact-cta__privacy">
        <LockIcon />
        Your message is private and secure.
      </p>
    </form>
  )
}
