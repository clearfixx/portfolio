import type { GitHubFeedReadResult } from '@dss-feeds/github-feed/payload'
import { describe, expect, it } from 'vitest'

import { buildSiteFooterGitHubFeedViewModel } from '@/lib/cms/homepage/github-feed'

const NOW = new Date('2026-07-14T04:30:00.000Z')

function createResult(overrides: Partial<GitHubFeedReadResult> = {}): GitHubFeedReadResult {
  return {
    adapterVersion: '0.0.0',
    cachedCommitCount: 3,
    checksum: 'checksum',
    commits: [
      {
        authorLogin: 'clearfixx',
        authorName: 'Andrii',
        committedAt: '2026-07-14T02:15:00.000Z',
        id: 'portfolio:abc123',
        kind: 'commit',
        repository: 'clearfixx/portfolio',
        repositoryUrl: 'https://github.com/clearfixx/portfolio',
        sha: 'abc123456789',
        shortSha: 'abc1234',
        source: 'github',
        title: 'feat(footer): add live commit stream',
        url: 'https://github.com/clearfixx/portfolio/commit/abc123456789',
      },
      {
        authorLogin: 'clearfixx',
        authorName: 'Andrii',
        committedAt: '2026-07-14T01:30:00.000Z',
        id: 'dss-universe:def456',
        kind: 'commit',
        repository: 'clearfixx/dss-universe',
        repositoryUrl: 'https://github.com/clearfixx/dss-universe',
        sha: 'def456789012',
        shortSha: 'def4567',
        source: 'github',
        title: 'docs: update architecture notes',
        url: 'https://github.com/clearfixx/dss-universe/commit/def456789012',
      },
    ],
    freshUntil: '2026-07-14T05:00:00.000Z',
    generatedAt: '2026-07-14T03:30:00.000Z',
    nextSyncAt: '2026-07-14T05:00:00.000Z',
    renderable: true,
    staleUntil: '2026-07-15T05:00:00.000Z',
    state: 'fresh',
    warnings: [],
    ...overrides,
  }
}

describe('homepage GitHub footer feed', () => {
  it('maps fresh cached commits into the compact footer model', () => {
    const result = buildSiteFooterGitHubFeedViewModel(createResult(), NOW)

    expect(result).toMatchObject({
      href: 'https://github.com/clearfixx',
      linkLabel: 'View on GitHub',
      state: 'fresh',
      statusLabel: 'Live activity',
      subtitle: 'Latest repository activity',
      title: 'Commit Stream',
    })
    expect(result?.commits).toEqual([
      expect.objectContaining({
        repository: 'portfolio',
        shortSha: 'abc1234',
        timeLabel: '2h ago',
      }),
      expect.objectContaining({
        repository: 'dss-universe',
        shortSha: 'def4567',
        timeLabel: '3h ago',
      }),
    ])
  })

  it('silently hides empty, expired, and unavailable cache states', () => {
    expect(
      buildSiteFooterGitHubFeedViewModel(
        createResult({
          commits: [],
          renderable: false,
          state: 'expired',
        }),
        NOW,
      ),
    ).toBeNull()
  })
})
