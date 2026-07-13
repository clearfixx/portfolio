function normalizeCount(value: number | null | undefined): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.max(0, Math.floor(value ?? 0))
}

export function calculateCompletedProjectsTotal(
  completedProjectsOutsidePortfolio: number | null | undefined,
  publishedProjectsCount: number | null | undefined,
): number {
  return normalizeCount(completedProjectsOutsidePortfolio) + normalizeCount(publishedProjectsCount)
}
