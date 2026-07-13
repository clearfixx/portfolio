import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

const siteUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

async function openContactForm(page: Page) {
  await page.goto(`${siteUrl}/#contact`, {
    waitUntil: 'domcontentloaded',
  })

  const rejectOptional = page.getByRole('button', {
    name: 'Reject optional',
  })

  if ((await rejectOptional.count()) > 0 && (await rejectOptional.isVisible())) {
    await rejectOptional.click()
  }

  const form = page.locator('.contact-cta__form')

  await form.scrollIntoViewIfNeeded()
  await expect(form).toBeVisible()

  // The CAPTCHA intentionally rejects interactions made too soon after mount.
  await page.waitForTimeout(600)

  return form
}

async function selectWebsite(form: Locator) {
  const trigger = form.locator('[data-contact-field="projectType"]')

  await trigger.click()
  await trigger.press('Enter')

  await expect(trigger).toHaveText('Website')
}

async function fillValidFields(form: Locator, email = 'playwright-contact@example.com') {
  await form
    .getByRole('textbox', {
      name: 'Your Name',
    })
    .fill('Playwright Contact')

  await form
    .getByRole('textbox', {
      name: 'Your Email',
    })
    .fill(email)

  await selectWebsite(form)

  await form
    .getByRole('textbox', {
      name: 'Message',
    })
    .fill('This is a valid automated contact-form message.')
}

async function completeCaptchaWithPointer(form: Locator) {
  const captcha = form.locator('[name="captcha"]')

  await form.locator('.contact-cta__captcha-control').click()

  await expect(captcha).toBeChecked()
}

test.describe('contact form', () => {
  test('shows custom validation for every empty field', async ({ page }) => {
    const form = await openContactForm(page)

    await expect(form).toHaveAttribute('novalidate', '')

    await form
      .getByRole('button', {
        name: 'Start the conversation',
      })
      .click()

    const name = form.getByRole('textbox', {
      name: 'Your Name',
    })
    const email = form.getByRole('textbox', {
      name: 'Your Email',
    })
    const message = form.getByRole('textbox', {
      name: 'Message',
    })
    const projectType = form.locator('[data-contact-field="projectType"]')

    await expect(name).toHaveAttribute('placeholder', "Field Name can't be empty")
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toBeFocused()

    await expect(email).toHaveAttribute('placeholder', "Field Email can't be empty")
    await expect(email).toHaveAttribute('aria-invalid', 'true')

    await expect(projectType).toHaveText('Choose a project type')
    await expect(projectType).toHaveAttribute('aria-invalid', 'true')

    await expect(message).toHaveAttribute('placeholder', "Field Message can't be empty")
    await expect(message).toHaveAttribute('aria-invalid', 'true')

    await expect(form.locator('.contact-cta__captcha-copy strong')).toHaveText(
      'Confirm that you are human',
    )

    await expect(form.getByRole('alert')).toHaveText('Check the highlighted fields and try again.')
  })

  test('shows the custom invalid-email state without submitting', async ({ page }) => {
    let contactRequests = 0

    page.on('request', (request) => {
      if (request.method() === 'POST' && new URL(request.url()).pathname === '/api/contact') {
        contactRequests += 1
      }
    })

    const form = await openContactForm(page)

    await fillValidFields(form, 'not-an-email')
    await completeCaptchaWithPointer(form)

    await form
      .getByRole('button', {
        name: 'Start the conversation',
      })
      .click()

    const email = form.getByRole('textbox', {
      name: 'Your Email',
    })

    await expect(email).toHaveAttribute('placeholder', 'Enter a valid email address')
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(email).toBeFocused()
    expect(contactRequests).toBe(0)
  })

  test('rejects a programmatic CAPTCHA click', async ({ page }) => {
    const form = await openContactForm(page)
    const captcha = form.locator('[name="captcha"]')

    await page.evaluate(() => {
      const input = document.querySelector<HTMLInputElement>('[name="captcha"]')

      input?.click()
    })

    await expect(captcha).not.toBeChecked()

    await expect(form.locator('.contact-cta__captcha-copy strong')).toHaveText(
      'Human verification failed. Click the checkbox manually.',
    )

    await expect(form.getByRole('alert')).toHaveText('Human verification failed.')
  })

  test('accepts CAPTCHA verification from the keyboard', async ({ page }) => {
    const form = await openContactForm(page)
    const captcha = form.locator('[name="captcha"]')

    await captcha.focus()
    await captcha.press('Space')

    await expect(captcha).toBeChecked()

    await expect(form.locator('.contact-cta__captcha-copy strong')).toHaveText('I am human')
  })

  test('submits valid data and resets the form', async ({ page }) => {
    let submittedBody: Record<string, unknown> | undefined

    await page.route('**/api/contact', async (route) => {
      submittedBody = route.request().postDataJSON()

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          message: 'Message sent successfully.',
        }),
      })
    })

    const form = await openContactForm(page)

    await fillValidFields(form)
    await completeCaptchaWithPointer(form)

    await form
      .getByRole('button', {
        name: 'Start the conversation',
      })
      .click()

    await expect(form.getByRole('status')).toHaveText(
      'Message sent. I’ll get back to you as soon as possible.',
    )

    expect(submittedBody).toMatchObject({
      name: 'Playwright Contact',
      email: 'playwright-contact@example.com',
      projectType: 'website',
      message: 'This is a valid automated contact-form message.',
      website: '',
      captcha: {
        checked: true,
        interaction: 'pointer',
        trusted: true,
      },
    })

    await expect(
      form.getByRole('textbox', {
        name: 'Your Name',
      }),
    ).toHaveValue('')

    await expect(
      form.getByRole('textbox', {
        name: 'Your Email',
      }),
    ).toHaveValue('')

    await expect(
      form.getByRole('textbox', {
        name: 'Message',
      }),
    ).toHaveValue('')

    await expect(form.locator('[data-contact-field="projectType"]')).toHaveText('Project Type')

    await expect(form.locator('[name="captcha"]')).not.toBeChecked()
  })
})
