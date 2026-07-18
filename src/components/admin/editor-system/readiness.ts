import type { AdminReadinessDefinition, AdminReadinessResult } from './types'

export function defineReadiness<TDocument>(
  definition: AdminReadinessDefinition<TDocument>,
): AdminReadinessDefinition<TDocument> {
  return definition
}

export function evaluateReadiness<TDocument>(
  definition: AdminReadinessDefinition<TDocument>,
  document: TDocument,
): AdminReadinessResult {
  const checks = definition.checks.map((check) => ({
    description: check.description,
    id: check.id,
    label: check.label,
    ready: safelyEvaluate(check.evaluate, document),
    weight: Math.max(0, check.weight ?? 1),
  }))
  const total = checks.reduce((sum, check) => sum + check.weight, 0)
  const completed = checks.reduce((sum, check) => sum + (check.ready ? check.weight : 0), 0)
  const score = total > 0 ? Math.round((completed / total) * 100) : 100

  return {
    checks,
    completed,
    score,
    state: score === 100 ? 'ready' : score === 0 ? 'empty' : 'in-progress',
    total,
  }
}

function safelyEvaluate<TDocument>(
  evaluate: (document: TDocument) => boolean,
  document: TDocument,
): boolean {
  try {
    return Boolean(evaluate(document))
  } catch {
    return false
  }
}

export function hasText(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

export function hasValue(value: unknown): boolean {
  return (
    value !== null &&
    value !== undefined &&
    value !== '' &&
    (!Array.isArray(value) || value.length > 0)
  )
}

export function hasRows(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0
}

export function richTextWordCount(value: unknown): number {
  const fragments: string[] = []
  collectText(value, fragments)
  return fragments.join(' ').trim().split(/\s+/u).filter(Boolean).length
}

function collectText(value: unknown, result: string[]): void {
  if (typeof value === 'string') {
    result.push(value)
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectText(item, result))
  } else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (typeof record.text === 'string') result.push(record.text)
    Object.entries(record).forEach(([key, nested]) => {
      if (!['text', 'type', 'version'].includes(key)) collectText(nested, result)
    })
  }
}
