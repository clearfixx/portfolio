import { StackIcon } from '@/components/icons'

import { PortfolioSection } from '../PortfolioSection'
import { EngineeringDna } from './EngineeringDna'
import { SkillCard } from './SkillCard'
import { skillCards } from './data'

export function SkillsTechnologies() {
  return (
    <PortfolioSection
      id="skills-technologies"
      eyebrow="Skills & Technologies"
      title="My Engineering Toolkit"
      description="The technologies, tools and practices I use to design, build and ship scalable digital products."
      number="04"
      footer={{
        icon: StackIcon,
        label: 'Technology is just a tool.',
        text: 'Problem solving is the craft.',
      }}
    >
      <div className="skills-tech__layout">
        {skillCards.map((card) => (
          <SkillCard key={card.id} card={card} />
        ))}

        <EngineeringDna />
      </div>
    </PortfolioSection>
  )
}
