import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

const siteUrl =
  process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

async function openNewsletterForm(page: Page) {
  await page.emulateMedia({
    reducedMotion: 'reduce',
  })

  await page.goto(siteUrl, {
    waitUntil: 'load',
  })

  const rejectOptional = page.getByRole('button', {
    name: 'Reject optional',
  })

  if (
    (await rejectOptional.count()) > 0 &&
    (await rejectOptional.isVisible())
  ) {
    await rejectOptional.click()
  }

  const form = page.locator('.site-footer__newsletter-form')

  await form.scrollIntoViewIfNeeded()
  await expect(form).toBeVisible()

  // The footer has client-side reveal logic. Give hydration and the
  // reduced-motion layout a short moment to settle before typing.
  await page.waitForTimeout(750)

  await expect(
    form.getByRole('button', {
      name: 'Gimme!',
    }),
  ).toBeEnabled()

  return form
}

function getEmailField(form: Locator) {
  return form.getByRole('textbox', {
    name: "What's a good email address?",
  })
}

async function fillEmail(
  form: Locator,
  value: string,
) {
  const email = getEmailField(form)

  await email.fill(value)
  await expect(email).toHaveValue(value)

  // Catch a late client remount before the submit click.
  await email.page().waitForTimeout(100)
  await expect(email).toHaveValue(value)

  return email
}

test.describe('Build Notes newsletter', () => {
  test('shows custom validation for an empty email', async ({ page }) => {
    let requestCount = 0

    page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/api/newsletter'
      ) {
        requestCount += 1
      }
    })

    const form = await openNewsletterForm(page)
    const email = getEmailField(form)

    await expect(form).toHaveAttribute('novalidate', '')

    await form.getByRole('button', {
      name: 'Gimme!',
    }).click()

    await expect(email).toHaveAttribute(
      'placeholder',
      "Field Email can't be empty",
    )
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(email).toBeFocused()

    await expect(form.getByRole('alert')).toContainText(
      'Enter your email address.',
    )

    expect(requestCount).toBe(0)
  })

  test('shows custom validation for an invalid email', async ({ page }) => {
    let requestCount = 0

    page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        new URL(request.url()).pathname === '/api/newsletter'
      ) {
        requestCount += 1
      }
    })

    const form = await openNewsletterForm(page)
    const email = await fillEmail(
      form,
      'not-an-email',
    )

    await form.getByRole('button', {
      name: 'Gimme!',
    }).click()

    await expect(email).toHaveAttribute(
      'placeholder',
      'Enter a valid email address',
    )
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(email).toBeFocused()

    await expect(form.getByRole('alert')).toContainText(
      'Check the highlighted field and try again.',
    )

    expect(requestCount).toBe(0)
  })

  test('submits a valid email and resets the field', async ({ page }) => {
    let submittedBody: Record<string, unknown> | undefined

    await page.route('**/api/newsletter', async (route) => {
      submittedBody = route.request().postDataJSON()

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          message: "You're subscribed to Build Notes.",
        }),
      })
    })

    const form = await openNewsletterForm(page)
    const email = await fillEmail(
      form,
      'newsletter-test@example.com',
    )

    await form.getByRole('button', {
      name: 'Gimme!',
    }).click()

    await expect(form.getByRole('status')).toContainText(
      "You're subscribed to Build Notes.",
    )

    expect(submittedBody).toEqual({
      email: 'newsletter-test@example.com',
      website: '',
    })

    await expect(email).toHaveValue('')
    await expect(email).toHaveAttribute('aria-invalid', 'false')
  })

  test('shows the existing-subscriber response', async ({ page }) => {
    await page.route('**/api/newsletter', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          message: "You're already subscribed to Build Notes.",
        }),
      })
    })

    const form = await openNewsletterForm(page)
    const email = await fillEmail(
      form,
      'existing@example.com',
    )

    await form.getByRole('button', {
      name: 'Gimme!',
    }).click()

    await expect(form.getByRole('status')).toContainText(
      "You're already subscribed to Build Notes.",
    )

    await expect(email).toHaveValue('')
  })

  test('keeps the email after a server error', async ({ page }) => {
    await page.route('**/api/newsletter', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: false,
          message: 'Unable to subscribe right now. Please try again later.',
        }),
      })
    })

    const form = await openNewsletterForm(page)
    const email = await fillEmail(
      form,
      'retry@example.com',
    )

    await form.getByRole('button', {
      name: 'Gimme!',
    }).click()

    await expect(form.getByRole('alert')).toContainText(
      'Unable to subscribe right now. Please try again later.',
    )

    await expect(email).toHaveValue('retry@example.com')
  })
})
