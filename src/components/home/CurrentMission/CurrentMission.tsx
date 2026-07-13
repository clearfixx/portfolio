import { RocketIcon } from '@/components/icons'
import type { CurrentMissionViewModel } from '@/lib/cms/homepage'

import { PortfolioSection } from '../PortfolioSection'
import { MissionIntro } from './MissionIntro'
import { MissionPreview } from './MissionPreview'

type CurrentMissionProps = {
  content: CurrentMissionViewModel | null
}

export function CurrentMission({ content }: CurrentMissionProps) {
  if (!content) {
    return null
  }

  return (
    <PortfolioSection
      id="current-mission"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      number="01"
      footer={{
        icon: RocketIcon,
        label: content.footer.label,
        text: content.footer.text,
      }}
    >
      {content.project ? (
        <div className="current-mission">
          <MissionIntro project={content.project} />
          <MissionPreview project={content.project} />
        </div>
      ) : (
        <div className="current-mission current-mission--empty">
          <p className="current-mission__empty" role="status">
            The current mission is being prepared for publication.
          </p>
        </div>
      )}
    </PortfolioSection>
  )
}
