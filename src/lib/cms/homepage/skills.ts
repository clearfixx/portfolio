import type { Homepage, TechStack } from '@/payload-types'

import type {
  SkillCard,
  SkillCardIcon,
  SkillCardKey,
  SkillCardTone,
  SkillDetail,
  SkillFocusItem,
  SkillPrinciple,
  SkillTechnology,
  SkillWorkflowStep,
  SkillsSectionViewModel,
} from './types'

type SkillsSection = NonNullable<Homepage['skillsSection']>
type SkillsSectionCard = NonNullable<SkillsSection['cards']>[number]

const DEFAULT_EYEBROW = 'Skills & Technologies'
const DEFAULT_TITLE = 'My Engineering Toolkit'
const DEFAULT_DESCRIPTION =
  'The technologies, tools and practices I use to design, build and ship scalable digital products.'
const DEFAULT_FOOTER_LABEL = 'Technology is just a tool.'
const DEFAULT_FOOTER_TEXT = 'Problem solving is the craft.'

const CARD_PRESENTATION: Record<
  SkillCardKey,
  {
    icon: SkillCardIcon
    tone: SkillCardTone
  }
> = {
  architecture: {
    icon: 'layers',
    tone: 'purple',
  },
  backend: {
    icon: 'server',
    tone: 'cyan',
  },
  devops: {
    icon: 'cloud',
    tone: 'blue',
  },
  focus: {
    icon: 'focus',
    tone: 'green',
  },
  frontend: {
    icon: 'browser',
    tone: 'cyan',
  },
  workflow: {
    icon: 'workflow',
    tone: 'green',
  },
}

const DEFAULT_TECHNOLOGY_SLUGS: Partial<Record<SkillCardKey, string[]>> = {
  backend: ['nestjs', 'nodejs', 'prisma', 'postgresql'],
  devops: ['docker', 'aws', 'cicd', 'monitoring'],
  frontend: ['nextjs', 'react', 'typescript', 'scss'],
  workflow: ['git', 'github', 'vscode', 'eslint', 'prettier'],
}

const SKILL_CARD_KEYS = new Set<SkillCardKey>(Object.keys(CARD_PRESENTATION) as SkillCardKey[])

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function isSkillCardKey(value: string | null | undefined): value is SkillCardKey {
  return Boolean(value && SKILL_CARD_KEYS.has(value as SkillCardKey))
}

function isPopulatedTechnology(value: number | TechStack | null | undefined): value is TechStack {
  return typeof value === 'object' && value !== null
}

function toTechnology(value: TechStack): SkillTechnology | undefined {
  const id = normalizeText(value.slug)
  const name = normalizeText(value.name)

  if (!id || !name || value.visible === false) {
    return undefined
  }

  return {
    id,
    name,
  }
}

function uniqueTechnologies(technologies: SkillTechnology[]): SkillTechnology[] {
  const seen = new Set<string>()

  return technologies.filter((technology) => {
    if (seen.has(technology.id)) {
      return false
    }

    seen.add(technology.id)
    return true
  })
}

function getTechnologies(
  card: SkillsSectionCard,
  key: SkillCardKey,
  visibleTechnologies: TechStack[],
): SkillTechnology[] | undefined {
  const selected = (card.technologies ?? [])
    .filter(isPopulatedTechnology)
    .map(toTechnology)
    .filter((technology): technology is SkillTechnology => Boolean(technology))

  if (selected.length > 0) {
    return uniqueTechnologies(selected)
  }

  const fallbackSlugs = DEFAULT_TECHNOLOGY_SLUGS[key]

  if (!fallbackSlugs?.length) {
    return undefined
  }

  const bySlug = new Map(
    visibleTechnologies
      .map(toTechnology)
      .filter((technology): technology is SkillTechnology => Boolean(technology))
      .map((technology) => [technology.id, technology]),
  )

  const fallback = fallbackSlugs
    .map((slug) => bySlug.get(slug))
    .filter((technology): technology is SkillTechnology => Boolean(technology))

  return fallback.length > 0 ? fallback : undefined
}

function getLabels(
  values:
    | Array<{
        label?: string | null
      }>
    | null
    | undefined,
): string[] | undefined {
  const labels = (values ?? [])
    .map((value) => normalizeText(value.label))
    .filter((label): label is string => Boolean(label))

  return labels.length > 0 ? labels : undefined
}

function getDetails(
  values:
    | Array<{
        caption?: string | null
        items?: Array<{
          label?: string | null
        }> | null
        label?: string | null
        value?: string | null
      }>
    | null
    | undefined,
): SkillDetail[] | undefined {
  const details = (values ?? []).flatMap((value) => {
    const label = normalizeText(value.label)

    if (!label) {
      return []
    }

    const items = getLabels(value.items)

    return [
      {
        caption: normalizeText(value.caption),
        items,
        label,
        value: normalizeText(value.value),
      },
    ]
  })

  return details.length > 0 ? details : undefined
}

function getWorkflow(
  values:
    | Array<{
        icon?: SkillWorkflowStep['icon'] | null
        label?: string | null
      }>
    | null
    | undefined,
): SkillWorkflowStep[] | undefined {
  const workflow = (values ?? []).flatMap((value) => {
    const label = normalizeText(value.label)

    if (!label || !value.icon) {
      return []
    }

    return [
      {
        icon: value.icon,
        label,
      },
    ]
  })

  return workflow.length > 0 ? workflow : undefined
}

function getPrinciples(
  values:
    | Array<{
        description?: string | null
        icon?: SkillPrinciple['icon'] | null
        title?: string | null
      }>
    | null
    | undefined,
): SkillPrinciple[] | undefined {
  const principles = (values ?? []).flatMap((value) => {
    const title = normalizeText(value.title)
    const description = normalizeText(value.description)

    if (!title || !description || !value.icon) {
      return []
    }

    return [
      {
        description,
        icon: value.icon,
        title,
      },
    ]
  })

  return principles.length > 0 ? principles : undefined
}

function getFocusItems(
  values:
    | Array<{
        description?: string | null
        icon?: SkillFocusItem['icon'] | null
        title?: string | null
      }>
    | null
    | undefined,
): SkillFocusItem[] | undefined {
  const focusItems = (values ?? []).flatMap((value) => {
    const title = normalizeText(value.title)
    const description = normalizeText(value.description)

    if (!title || !description || !value.icon) {
      return []
    }

    return [
      {
        description,
        icon: value.icon,
        title,
      },
    ]
  })

  return focusItems.length > 0 ? focusItems : undefined
}

export function buildSkillsSectionViewModel(
  homepage: Homepage,
  visibleTechnologies: TechStack[],
): SkillsSectionViewModel {
  const section = homepage.skillsSection
  const seen = new Set<SkillCardKey>()

  const cards: SkillCard[] = (section?.cards ?? []).flatMap((card, sourceIndex) => {
    if (!isSkillCardKey(card.key) || seen.has(card.key)) {
      return []
    }

    seen.add(card.key)

    const presentation = CARD_PRESENTATION[card.key]
    const title = normalizeText(card.title)
    const description = normalizeText(card.description)

    if (!title || !description) {
      return []
    }

    return [
      {
        area: card.key,
        badge: normalizeText(card.badge) ?? '',
        description,
        details: getDetails(card.details),
        focusItems: getFocusItems(card.focusItems),
        focusLine: getLabels(card.focusLine),
        icon: presentation.icon,
        id: card.key,
        number: String(sourceIndex + 1).padStart(2, '0'),
        pills: getLabels(card.pills),
        pillsTitle: normalizeText(card.pillsTitle),
        principles: getPrinciples(card.principles),
        technologies: getTechnologies(card, card.key, visibleTechnologies),
        title,
        tone: presentation.tone,
        workflow: getWorkflow(card.workflow),
        workflowTitle: normalizeText(card.workflowTitle),
      },
    ]
  })

  return {
    cards,
    description: cleanText(section?.description, DEFAULT_DESCRIPTION),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_EYEBROW),
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_FOOTER_LABEL),
      text: cleanText(section?.footerText, DEFAULT_FOOTER_TEXT),
    },
    title: cleanText(section?.title, DEFAULT_TITLE),
  }
}
