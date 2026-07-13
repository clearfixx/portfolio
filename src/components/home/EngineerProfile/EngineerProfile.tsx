import { UserIcon } from '@/components/icons'
import type { EngineerProfileViewModel } from '@/lib/cms/homepage'

import { PortfolioSection } from '../PortfolioSection'
import { JourneyPanel } from './JourneyPanel'
import { PhilosophyPanel } from './PhilosophyPanel'
import { ProfilePanel } from './ProfilePanel'

type EngineerProfileProps = {
  content: EngineerProfileViewModel | null
}

export function EngineerProfile({ content }: EngineerProfileProps) {
  if (!content) {
    return null
  }

  return (
    <PortfolioSection
      id="engineer-profile"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      number="03"
      footer={{
        icon: UserIcon,
        label: content.footer.label,
        text: content.footer.text,
      }}
    >
      <div className="engineer-profile__grid">
        <ProfilePanel profile={content.profile} />
        <JourneyPanel journey={content.journey} />
        <PhilosophyPanel principles={content.principles} />
      </div>
    </PortfolioSection>
  )
}
