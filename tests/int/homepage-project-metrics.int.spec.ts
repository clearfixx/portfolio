import { describe, expect, it } from 'vitest'

import { calculateCompletedProjectsTotal } from '@/lib/cms/homepage'

describe('completed projects metric', () => {
  it('adds completed projects outside the portfolio to published projects', () => {
    expect(calculateCompletedProjectsTotal(5, 4)).toBe(9)
  })

  it('uses the published count when the manual value is empty', () => {
    expect(calculateCompletedProjectsTotal(null, 4)).toBe(4)
  })

  it('uses the manual count when there are no published projects', () => {
    expect(calculateCompletedProjectsTotal(5, 0)).toBe(5)
  })

  it('normalizes negative, fractional, and invalid count values', () => {
    expect(calculateCompletedProjectsTotal(-5, 4.9)).toBe(4)
    expect(calculateCompletedProjectsTotal(5.9, Number.NaN)).toBe(5)
  })
})
