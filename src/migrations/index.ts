import * as migration_20260808_100951_portfolio_baseline from './20260808_100951_portfolio_baseline'

export const migrations = [
  {
    up: migration_20260808_100951_portfolio_baseline.up,
    down: migration_20260808_100951_portfolio_baseline.down,
    name: '20260808_100951_portfolio_baseline',
  },
]
