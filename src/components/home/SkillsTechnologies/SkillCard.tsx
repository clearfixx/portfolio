import type { SkillCard as SkillCardType, SkillCardIcon, SkillFocusItem, SkillPrinciple, SkillWorkflowStep } from './data'
import { TechnologyBadge } from './TechnologyBadge'

type SkillCardProps = {
  card: SkillCardType
}

export function SkillCard({ card }: SkillCardProps) {
  return (
    <article
      className={`skills-tech__card skills-tech__card--${card.area} skills-tech__card--${card.tone}`}
    >
      <span className="skills-tech__card-action" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M5 3h8v8" />
          <path d="m13 3-10 10" />
        </svg>
      </span>

      <div className="skills-tech__card-header">
        <span className="skills-tech__card-icon" aria-hidden="true">
          <CardIcon icon={card.icon} />
        </span>

        <div className="skills-tech__card-heading">
          <div className="skills-tech__card-title-row">
            <span className="skills-tech__card-number">{card.number}</span>
            <h3>{card.title}</h3>
            <span className="skills-tech__card-stack-badge">
              <span aria-hidden="true" />
              {card.badge}
            </span>
          </div>
          <p>{card.description}</p>
        </div>
      </div>

      {card.technologies?.length ? (
        <div className="skills-tech__badges" aria-label={`${card.title} technologies`}>
          {card.technologies.map((technology) => (
            <TechnologyBadge key={`${card.id}-${technology.name}`} technology={technology} />
          ))}
        </div>
      ) : null}

      {card.workflow?.length ? (
        <section className="skills-tech__workflow" aria-label={`${card.title} process`}>
          <h4>{card.workflowTitle}</h4>
          <div className="skills-tech__workflow-track">
            {card.workflow.map((step) => (
              <WorkflowStep key={`${card.id}-${step.label}`} step={step} />
            ))}
          </div>
        </section>
      ) : null}

      {card.pills?.length ? (
        <section className="skills-tech__pill-group" aria-label={`${card.title} capabilities`}>
          <h4>{card.pillsTitle}</h4>
          <div className="skills-tech__pills">
            {card.pills.map((pill) => (
              <span key={`${card.id}-${pill}`}>{pill}</span>
            ))}
          </div>
        </section>
      ) : null}

      {card.principles?.length ? (
        <div className="skills-tech__principles">
          {card.principles.map((principle) => (
            <PrincipleItem key={`${card.id}-${principle.title}`} principle={principle} />
          ))}
        </div>
      ) : null}

      {card.focusItems?.length ? (
        <div className="skills-tech__focus-items">
          {card.focusItems.map((item) => (
            <FocusItem key={`${card.id}-${item.title}`} item={item} />
          ))}
        </div>
      ) : null}

      {card.details?.length ? (
        <dl className="skills-tech__details">
          {card.details.map((detail) => (
            <div key={`${card.id}-${detail.label}`}>
              <dt>{detail.label}</dt>
              {detail.items?.length ? (
                <dd className="skills-tech__detail-list">
                  {detail.items.map((item) => (
                    <span key={`${card.id}-${detail.label}-${item}`}>{item}</span>
                  ))}
                </dd>
              ) : (
                <dd>
                  {detail.value}
                  {detail.caption ? <span>{detail.caption}</span> : null}
                </dd>
              )}
            </div>
          ))}
        </dl>
      ) : null}

      {card.focusLine?.length ? (
        <div className="skills-tech__focus-line">
          <strong>Focus</strong>
          {card.focusLine.map((item) => (
            <span key={`${card.id}-${item}`}>{item}</span>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function CardIcon({ icon }: { icon: SkillCardIcon }) {
  switch (icon) {
    case 'browser':
      return (
        <svg viewBox="0 0 32 32">
          <path d="M5 7h22v18H5V7Z" />
          <path d="M5 12h22" />
          <path d="m14 17-4 3 4 3M18 17l4 3-4 3" />
        </svg>
      )
    case 'workflow':
      return (
        <svg viewBox="0 0 32 32">
          <path d="M10 6v6M7 9h6M22 20v6M19 23h6" />
          <path d="M9 23 23 9" />
          <path d="M20 6h6v6M6 20h6v6" />
        </svg>
      )
    case 'server':
      return (
        <svg viewBox="0 0 32 32">
          <path d="M7 7h18v7H7V7Zm0 11h18v7H7v-7Z" />
          <path d="M11 10h.1M11 21h.1M15 10h7M15 21h7" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 32 32">
          <path d="M10 23h14a5 5 0 0 0 0-10 8 8 0 0 0-15.2 2.8A3.8 3.8 0 0 0 10 23Z" />
        </svg>
      )
    case 'layers':
      return (
        <svg viewBox="0 0 32 32">
          <path d="m16 5 11 6-11 6-11-6 11-6Z" />
          <path d="m5 16 11 6 11-6M5 21l11 6 11-6" />
        </svg>
      )
    case 'focus':
      return (
        <svg viewBox="0 0 32 32">
          <path d="M16 5v4M16 23v4M5 16h4M23 16h4" />
          <circle cx="16" cy="16" r="7" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      )
    default:
      return null
  }
}

function WorkflowStep({ step }: { step: SkillWorkflowStep }) {
  return (
    <span className="skills-tech__workflow-step">
      <span aria-hidden="true">
        <WorkflowIcon icon={step.icon} />
      </span>
      {step.label}
    </span>
  )
}

function WorkflowIcon({ icon }: { icon: SkillWorkflowStep['icon'] }) {
  switch (icon) {
    case 'plan':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M6 7h12M6 12h8M6 17h10" />
        </svg>
      )
    case 'code':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      )
    case 'commit':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 12h6M14 12h6" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'review':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 12s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    case 'deploy':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 3 4 8 5 2-5 2-4 6-4-6-5-2 5-2 4-8Z" />
        </svg>
      )
    default:
      return null
  }
}

function PrincipleItem({ principle }: { principle: SkillPrinciple }) {
  return (
    <section className="skills-tech__principle">
      <span aria-hidden="true">
        <PrincipleIcon icon={principle.icon} />
      </span>
      <div>
        <h4>{principle.title}</h4>
        <p>{principle.description}</p>
      </div>
    </section>
  )
}

function PrincipleIcon({ icon }: { icon: SkillPrinciple['icon'] }) {
  switch (icon) {
    case 'layers':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      )
    case 'cube':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12v9M4 7.5l8 4.5 8-4.5" />
        </svg>
      )
    case 'scale':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 19h16" />
          <path d="M6 16v3M12 10v9M18 5v14" />
          <path d="m16 7 2-2 2 2" />
        </svg>
      )
    case 'wrench':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M14 6a5 5 0 0 0 6 6L11 21 3 13l9-9Z" />
        </svg>
      )
    case 'flask':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M9 3h6M10 3v5l-5 10a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3L14 8V3" />
          <path d="M8 16h8" />
        </svg>
      )
    default:
      return null
  }
}

function FocusItem({ item }: { item: SkillFocusItem }) {
  return (
    <section className="skills-tech__focus-item">
      <span aria-hidden="true">
        <FocusIcon icon={item.icon} />
      </span>
      <div>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </section>
  )
}

function FocusIcon({ icon }: { icon: SkillFocusItem['icon'] }) {
  switch (icon) {
    case 'ai':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 3v18M7 7h10M7 17h10" />
          <path d="M5 12h14" />
        </svg>
      )
    case 'system':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M8 10h8M8 14h8" />
        </svg>
      )
    case 'automation':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    case 'performance':
      return (
        <svg viewBox="0 0 24 24">
          <path d="m13 2-9 11h7l-1 9 10-13h-7l1-7Z" />
        </svg>
      )
    default:
      return null
  }
}
