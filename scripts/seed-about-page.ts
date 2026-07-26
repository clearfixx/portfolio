import process from 'node:process'

import type { About } from '../src/payload-types'
import { ABOUT_DEFAULT_CONTENT } from '../src/globals/About'

// about-cms-foundation-v1

function populated<T>(value: T[] | null | undefined): value is T[] {
  return Boolean(value?.length)
}

async function main() {
  process.loadEnvFile('.env')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing after loading .env')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })

  const [current, projectResult] = await Promise.all([
    payload.findGlobal({
      slug: 'about',
      depth: 0,
    }) as Promise<About>,
    payload.find({
      collection: 'projects',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: 'dss-universe',
        },
      },
    }),
  ])

  const primaryProject = current.currentFocus?.primaryProject ?? projectResult.docs[0]?.id

  await payload.updateGlobal({
    slug: 'about',
    data: {
      hero: {
        ...ABOUT_DEFAULT_CONTENT.hero,
        ...current.hero,
        actions: populated(current.hero?.actions)
          ? current.hero.actions
          : ABOUT_DEFAULT_CONTENT.hero.actions,
        signals: populated(current.hero?.signals)
          ? current.hero.signals
          : ABOUT_DEFAULT_CONTENT.hero.signals,
      },
      career: {
        ...ABOUT_DEFAULT_CONTENT.career,
        ...current.career,
        items: populated(current.career?.items)
          ? current.career.items
          : ABOUT_DEFAULT_CONTENT.career.items,
      },
      principles: {
        ...ABOUT_DEFAULT_CONTENT.principles,
        ...current.principles,
        items: populated(current.principles?.items)
          ? current.principles.items
          : ABOUT_DEFAULT_CONTENT.principles.items,
      },
      operatingSystem: {
        ...ABOUT_DEFAULT_CONTENT.operatingSystem,
        ...current.operatingSystem,
        steps: populated(current.operatingSystem?.steps)
          ? current.operatingSystem.steps
          : ABOUT_DEFAULT_CONTENT.operatingSystem.steps,
        currentStage: {
          ...ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage,
          ...current.operatingSystem?.currentStage,
          items: populated(current.operatingSystem?.currentStage?.items)
            ? current.operatingSystem.currentStage.items
            : ABOUT_DEFAULT_CONTENT.operatingSystem.currentStage.items,
        },
        guardrails: {
          ...ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails,
          ...current.operatingSystem?.guardrails,
          items: populated(current.operatingSystem?.guardrails?.items)
            ? current.operatingSystem.guardrails.items
            : ABOUT_DEFAULT_CONTENT.operatingSystem.guardrails.items,
        },
        outputs: {
          ...ABOUT_DEFAULT_CONTENT.operatingSystem.outputs,
          ...current.operatingSystem?.outputs,
          items: populated(current.operatingSystem?.outputs?.items)
            ? current.operatingSystem.outputs.items
            : ABOUT_DEFAULT_CONTENT.operatingSystem.outputs.items,
        },
        telemetry: populated(current.operatingSystem?.telemetry)
          ? current.operatingSystem.telemetry
          : ABOUT_DEFAULT_CONTENT.operatingSystem.telemetry,
      },
      experience: {
        ...ABOUT_DEFAULT_CONTENT.experience,
        ...current.experience,
        items: populated(current.experience?.items)
          ? current.experience.items
          : ABOUT_DEFAULT_CONTENT.experience.items,
        summary: populated(current.experience?.summary)
          ? current.experience.summary
          : ABOUT_DEFAULT_CONTENT.experience.summary,
      },
      currentFocus: {
        ...ABOUT_DEFAULT_CONTENT.currentFocus,
        ...current.currentFocus,
        primaryProject,
        cards: populated(current.currentFocus?.cards)
          ? current.currentFocus.cards
          : ABOUT_DEFAULT_CONTENT.currentFocus.cards,
      },
      personalSignals: {
        ...ABOUT_DEFAULT_CONTENT.personalSignals,
        ...current.personalSignals,
        items: populated(current.personalSignals?.items)
          ? current.personalSignals.items
          : ABOUT_DEFAULT_CONTENT.personalSignals.items,
      },
      cta: {
        ...ABOUT_DEFAULT_CONTENT.cta,
        ...current.cta,
      },
      seo: {
        ...ABOUT_DEFAULT_CONTENT.seo,
        ...current.seo,
      },
    },
  })

  console.log(
    primaryProject
      ? 'About Page CMS foundation ready. DSS Universe is linked as the primary project.'
      : 'About Page CMS foundation ready. Primary project is not linked because DSS Universe was not found.',
  )
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('About Page CMS seed failed.')

    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    } else {
      console.error(error)
    }

    process.exit(1)
  })
