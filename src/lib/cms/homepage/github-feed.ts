import { readGitHubFeed, type GitHubFeedReadResult } from '@dss-feeds/github-feed/payload'

import { getPayloadClient } from '../client'
import type { SiteFooterGitHubFeedViewModel } from './types'

const FOOTER_COMMIT_LIMIT = 3

export async function getSiteFooterGitHubFeed(
  now = new Date(),
): Promise<SiteFooterGitHubFeedViewModel | null> {
  try {
    const payload = await getPayloadClient()
    const result = await readGitHubFeed({
      payload,
      commitCount: FOOTER_COMMIT_LIMIT,
      now,
      order: 'desc',
    })

    return buildSiteFooterGitHubFeedViewModel(result, now)
  } catch {
    return null
  }
}

export function buildSiteFooterGitHubFeedViewModel(
  result: GitHubFeedReadResult,
  now = new Date(),
): SiteFooterGitHubFeedViewModel | null {
  if (
    !result.renderable ||
    (result.state !== 'fresh' && result.state !== 'stale') ||
    result.commits.length === 0
  ) {
    return null
  }

  const commits = result.commits.slice(0, FOOTER_COMMIT_LIMIT).map((commit) => ({
    committedAt: commit.committedAt,
    href: commit.url,
    id: commit.id,
    repository: getRepositoryLabel(commit.repository),
    repositoryHref: commit.repositoryUrl,
    shortSha: commit.shortSha,
    timeLabel: formatCommitTime(commit.committedAt, now),
    title: commit.title,
  }))

  return {
    commits,
    href: getGitHubProfileURL(result.commits[0]?.repositoryUrl),
    linkLabel: 'View on GitHub',
    state: result.state,
    statusLabel: 'Live activity',
    subtitle: 'Latest repository activity',
    title: 'Commit Stream',
  }
}

function getRepositoryLabel(repository: string): string {
  const segments = repository.split('/').filter(Boolean)

  return segments.at(-1) ?? repository
}

function getGitHubProfileURL(repositoryURL: string | undefined): string {
  if (!repositoryURL) {
    return 'https://github.com'
  }

  try {
    const url = new URL(repositoryURL)
    const [owner] = url.pathname.split('/').filter(Boolean)

    if (url.hostname === 'github.com' && owner) {
      return `https://github.com/${owner}`
    }
  } catch {
    return 'https://github.com'
  }

  return 'https://github.com'
}

function formatCommitTime(value: string, now: Date): string {
  const timestamp = Date.parse(value)
  const elapsed = now.getTime() - timestamp

  if (Number.isNaN(timestamp) || elapsed < 0) {
    return 'Just now'
  }

  const minutes = Math.floor(elapsed / 60_000)

  if (minutes < 1) {
    return 'Just now'
  }

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days}d ago`
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: now.getFullYear() === new Date(timestamp).getFullYear() ? undefined : 'numeric',
  }).format(new Date(timestamp))
}
