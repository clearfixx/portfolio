import { StackIcon } from '@/components/icons'
import type { SkillsSectionViewModel } from '@/lib/cms/homepage'

import { PortfolioSection } from '../PortfolioSection'
import { EngineeringDna } from './EngineeringDna'
import { SkillCard } from './SkillCard'

type SkillsTechnologiesProps = {
  content: SkillsSectionViewModel
}

export function SkillsTechnologies({ content }: SkillsTechnologiesProps) {
  return (
    <PortfolioSection
      id="skills-technologies"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      number="04"
      footer={{
        icon: StackIcon,
        label: content.footer.label,
        text: content.footer.text,
      }}
    >
      {content.cards.length > 0 ? (
        <div className="skills-tech__layout">
          {content.cards.map((card) => (
            <SkillCard key={card.id} card={card} />
          ))}
          <EngineeringDna />
        </div>
      ) : (
        <p className="skills-tech__empty" role="status">
          Skills and technology details are being prepared for publication.
        </p>
      )}
    </PortfolioSection>
  )
}
