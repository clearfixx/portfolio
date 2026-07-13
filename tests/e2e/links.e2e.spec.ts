import { expect, test } from '@playwright/test'

const siteUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

test('homepage has no broken internal links, anchors, or images', async ({ page, request }) => {
  const siteOrigin = new URL(siteUrl).origin
  const failedResources = new Set<string>()

  page.on('requestfailed', (failedRequest) => {
    const url = new URL(failedRequest.url())

    if (url.origin === siteOrigin) {
      failedResources.add(
        `${failedRequest.method()} ${url.pathname}: ${
          failedRequest.failure()?.errorText ?? 'request failed'
        }`,
      )
    }
  })

  page.on('response', (response) => {
    const url = new URL(response.url())

    if (url.origin === siteOrigin && response.status() >= 400) {
      failedResources.add(
        `${response.request().method()} ${url.pathname}: HTTP ${response.status()}`,
      )
    }
  })

  await page.goto(siteUrl, {
    waitUntil: 'domcontentloaded',
  })

  const hrefs = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute('href') ?? '',
      text: anchor.textContent?.trim() || anchor.getAttribute('aria-label') || '(unlabelled link)',
    })),
  )

  const currentUrl = new URL(page.url())
  const checkedInternalUrls = new Set<string>()

  for (const link of hrefs) {
    const href = link.href.trim()

    expect.soft(href, `${link.text} must not have an empty href`).not.toBe('')
    expect.soft(href, `${link.text} must not use a placeholder hash`).not.toBe('#')
    expect
      .soft(href.toLowerCase(), `${link.text} must not use a javascript: URL`)
      .not.toMatch(/^javascript:/)

    if (!href || href === '#' || href.toLowerCase().startsWith('javascript:')) {
      continue
    }

    if (href.startsWith('mailto:')) {
      expect
        .soft(href, `${link.text} must contain a valid email address`)
        .toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+/i)
      continue
    }

    if (href.startsWith('tel:')) {
      expect.soft(href.slice(4).trim(), `${link.text} must contain a phone number`).not.toBe('')
      continue
    }

    const url = new URL(href, currentUrl)

    if (url.origin !== siteOrigin) {
      expect
        .soft(['http:', 'https:'], `${link.text} must use an HTTP(S) external URL`)
        .toContain(url.protocol)
      continue
    }

    if (url.hash && url.pathname === currentUrl.pathname) {
      const targetId = decodeURIComponent(url.hash.slice(1))
      const targetExists = await page.evaluate(
        (id) => document.getElementById(id) !== null,
        targetId,
      )

      expect.soft(targetExists, `${link.text} points to missing #${targetId}`).toBe(true)
      continue
    }

    url.hash = ''

    if (checkedInternalUrls.has(url.href)) {
      continue
    }

    checkedInternalUrls.add(url.href)

    const response = await request.get(url.href)
    expect.soft(response.status(), `${link.text} points to ${url.pathname}`).toBeLessThan(400)
  }

  const images = page.locator('img')

  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index)
    const source =
      (await image.getAttribute('src')) ?? (await image.getAttribute('alt')) ?? `image ${index + 1}`

    await image.scrollIntoViewIfNeeded()

    await expect
      .poll(
        () =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
          ),
        {
          message: `${source} must load successfully`,
          timeout: 10_000,
        },
      )
      .toBe(true)
  }
  expect.soft([...failedResources], 'Local resources must not return errors').toEqual([])
})
