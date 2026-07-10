import { UserIcon } from '@/components/icons'

import { PortfolioSection } from '../PortfolioSection'
import { JourneyPanel } from './JourneyPanel'
import { PhilosophyPanel } from './PhilosophyPanel'
import { ProfilePanel } from './ProfilePanel'

export function EngineerProfile() {
  return (
    <PortfolioSection
      id="engineer-profile"
      eyebrow="About me"
      title="Engineer Profile"
      description="A builder of scalable systems and meaningful digital experiences."
      number="03"
      footer={{
        icon: UserIcon,
        label: 'Engineer mindset',
        text: 'turning complex ideas into clean, maintainable systems.',
      }}
    >
      <div className="engineer-profile__grid">
        <ProfilePanel />
        <JourneyPanel />
        <PhilosophyPanel />
      </div>
    </PortfolioSection>
  )
}
