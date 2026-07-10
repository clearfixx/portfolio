import { RocketIcon } from '@/components/icons'

import { PortfolioSection } from '../PortfolioSection'
import { MissionIntro } from './MissionIntro'
import { MissionPreview } from './MissionPreview'

export function CurrentMission() {
  return (
    <PortfolioSection
      id="current-mission"
      eyebrow="Current Mission"
      title="Building DSS Universe"
      description="A live preview of my flagship platform — a modular ecosystem for research, community, AI, education, CMS, and developer tools."
      number="01"
      footer={{
        icon: RocketIcon,
        label: 'Mission Status',
        text: 'Building the future, one release at a time.',
      }}
    >
      <div className="current-mission">
        <MissionIntro />
        <MissionPreview />
      </div>
    </PortfolioSection>
  )
}
