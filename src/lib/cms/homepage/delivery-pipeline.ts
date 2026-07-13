import type { Homepage } from '@/payload-types'

import type {
  DeliveryPipelineMetricIcon,
  DeliveryPipelineMetricKey,
  DeliveryPipelineMetricViewModel,
  DeliveryPipelinePhaseIcon,
  DeliveryPipelinePhaseKey,
  DeliveryPipelinePhaseStatus,
  DeliveryPipelinePhaseViewModel,
  DeliveryPipelineTitleViewModel,
  DeliveryPipelineViewModel,
} from './types'

const PHASE_ORDER: DeliveryPipelinePhaseKey[] = [
  'discovery',
  'architecture',
  'interface',
  'development',
  'launch',
]

const PHASE_ICONS: Record<DeliveryPipelinePhaseKey, DeliveryPipelinePhaseIcon> = {
  architecture: 'architecture',
  development: 'code',
  discovery: 'search',
  interface: 'interface',
  launch: 'rocket',
}

const METRIC_ICONS: Record<DeliveryPipelineMetricKey, DeliveryPipelineMetricIcon> = {
  maintainable: 'shield',
  milestones: 'flag',
  predictable: 'progress',
}

const PHASE_KEYS = new Set<DeliveryPipelinePhaseKey>(PHASE_ORDER)
const METRIC_KEYS = new Set<DeliveryPipelineMetricKey>(
  Object.keys(METRIC_ICONS) as DeliveryPipelineMetricKey[],
)
const PHASE_STATUSES = new Set<DeliveryPipelinePhaseStatus>(['complete', 'pending', 'progress'])

const DEFAULT_SECTION = {
  description:
    'A clear build process for turning vague requirements into stable, maintainable products.',
  eyebrow: 'DELIVERY PIPELINE',
  footerLabel: 'Structured process',
  footerText: 'Clear scope. Clean build. Reliable launch.',
  title: 'From rough idea to production-ready system.',
  titleAccent: 'production-ready',
} as const

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim()

  return normalized || undefined
}

function cleanText(value: string | null | undefined, fallback: string): string {
  return normalizeText(value) ?? fallback
}

function isPhaseKey(value: string | null | undefined): value is DeliveryPipelinePhaseKey {
  return Boolean(value && PHASE_KEYS.has(value as DeliveryPipelinePhaseKey))
}

function isMetricKey(value: string | null | undefined): value is DeliveryPipelineMetricKey {
  return Boolean(value && METRIC_KEYS.has(value as DeliveryPipelineMetricKey))
}

function getPhaseStatus(value: string | null | undefined): DeliveryPipelinePhaseStatus {
  return value && PHASE_STATUSES.has(value as DeliveryPipelinePhaseStatus)
    ? (value as DeliveryPipelinePhaseStatus)
    : 'pending'
}

function getLabels(
  values:
    | Array<{
        label?: string | null
      }>
    | null
    | undefined,
): string[] {
  const seen = new Set<string>()

  return (values ?? []).flatMap((value) => {
    const label = normalizeText(value.label)

    if (!label || seen.has(label)) {
      return []
    }

    seen.add(label)
    return [label]
  })
}

function splitTitle(
  title: string,
  accentPhrase: string | undefined,
): DeliveryPipelineTitleViewModel {
  if (!accentPhrase) {
    return {
      leading: title,
    }
  }

  const accentStart = title.indexOf(accentPhrase)

  if (accentStart < 0) {
    return {
      leading: title,
    }
  }

  const accentEnd = accentStart + accentPhrase.length

  return {
    accent: title.slice(accentStart, accentEnd),
    leading: title.slice(0, accentStart),
    trailing: title.slice(accentEnd) || undefined,
  }
}

function getMetrics(
  section: Homepage['deliveryPipelineSection'],
): DeliveryPipelineMetricViewModel[] {
  const seen = new Set<DeliveryPipelineMetricKey>()

  return (section?.metrics ?? []).flatMap((metric) => {
    if (!isMetricKey(metric.key) || seen.has(metric.key)) {
      return []
    }

    const title = normalizeText(metric.title)
    const description = normalizeText(metric.description)

    if (!title || !description) {
      return []
    }

    seen.add(metric.key)

    return [
      {
        description,
        icon: METRIC_ICONS[metric.key],
        id: metric.key,
        title,
      },
    ]
  })
}

function getPhases(
  section: Homepage['deliveryPipelineSection'],
): DeliveryPipelinePhaseViewModel[] | null {
  const byKey = new Map<DeliveryPipelinePhaseKey, DeliveryPipelinePhaseViewModel>()

  for (const phase of section?.phases ?? []) {
    if (!isPhaseKey(phase.key) || byKey.has(phase.key)) {
      continue
    }

    const title = normalizeText(phase.title)
    const items = getLabels(phase.items)

    if (!title || items.length === 0) {
      continue
    }

    byKey.set(phase.key, {
      icon: PHASE_ICONS[phase.key],
      id: phase.key,
      items,
      number: '',
      status: getPhaseStatus(phase.status),
      title,
    })
  }

  if (byKey.size !== PHASE_ORDER.length) {
    return null
  }

  return PHASE_ORDER.map((key, index) => ({
    ...byKey.get(key)!,
    number: String(index + 1).padStart(2, '0'),
  }))
}

export function buildDeliveryPipelineViewModel(
  homepage: Homepage,
): DeliveryPipelineViewModel | null {
  const section = homepage.deliveryPipelineSection

  if (section?.enabled === false) {
    return null
  }

  const phases = getPhases(section)

  if (!phases) {
    return null
  }

  const title = cleanText(section?.title, DEFAULT_SECTION.title)

  return {
    description: cleanText(section?.description, DEFAULT_SECTION.description),
    eyebrow: cleanText(section?.eyebrow, DEFAULT_SECTION.eyebrow),
    footer: {
      label: cleanText(section?.footerLabel, DEFAULT_SECTION.footerLabel),
      text: cleanText(section?.footerText, DEFAULT_SECTION.footerText),
    },
    metrics: getMetrics(section),
    phases,
    title: splitTitle(title, normalizeText(section?.titleAccent) ?? DEFAULT_SECTION.titleAccent),
  }
}
