import type { ComponentType, SVGProps } from 'react'

import { PortfolioSection } from '@/components/home/PortfolioSection'

import {
  deliveryPhases,
  pipelineMetrics,
  type DeliveryPhase,
  type DeliveryPhaseStatus,
  type PipelineMetric,
} from './data'

type IconProps = SVGProps<SVGSVGElement>

function LayersIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  )
}

function SearchIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ArchitectureIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="9" y="3.5" width="6" height="4" rx="1" />
      <path d="M12 7.5V11" />
      <path d="M5 11h14" />
      <path d="M5 11v4M12 11v4M19 11v4" />
      <rect x="2" y="15" width="6" height="5" rx="1" />
      <rect x="9" y="15" width="6" height="5" rx="1" />
      <rect x="16" y="15" width="6" height="5" rx="1" />
    </svg>
  )
}

function InterfaceIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M4 5h16v14H4V5Z" />
      <path d="M4 9h16" />
      <path d="M8 13h4" />
      <path d="M8 16h8" />
      <path d="M15 13h2" />
    </svg>
  )
}

function CodeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
      <path className="delivery-pipeline__icon-accent" d="m14 5-4 14" />
    </svg>
  )
}

function RocketIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 2.8c2.7 1.9 4.3 5.2 4.3 8.8v4.2L12 18l-4.3-2.2v-4.2c0-3.6 1.6-6.9 4.3-8.8Z" />
      <circle cx="12" cy="10.2" r="2" />
      <path d="m7.8 13.8-3 2.3v3.2l4.3-1.8" />
      <path d="m16.2 13.8 3 2.3v3.2l-4.3-1.8" />
      <path className="delivery-pipeline__icon-accent" d="M9.5 18.3 12 21.5l2.5-3.2" />
    </svg>
  )
}

function ProgressIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4.5l3 1.8" />
      <path d="M12 5.7v1M18.3 12h-1" />
      <path d="M12 18.3v-1M5.7 12h1" />
    </svg>
  )
}

function FlagIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M5 21V4" />
      <path d="M5 5h12l-1.5 4L17 13H5" />
    </svg>
  )
}

function ShieldIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 3 19 6v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3Z" />
      <path d="m8.8 12.2 2 2 4.5-5" />
    </svg>
  )
}

function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <path d="m6 12 4 4 8-8" />
    </svg>
  )
}

function ClockIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

const phaseIcons: Record<DeliveryPhase['icon'], ComponentType<IconProps>> = {
  search: SearchIcon,
  architecture: ArchitectureIcon,
  interface: InterfaceIcon,
  code: CodeIcon,
  rocket: RocketIcon,
}

const metricIcons: Record<PipelineMetric['icon'], ComponentType<IconProps>> = {
  progress: ProgressIcon,
  flag: FlagIcon,
  shield: ShieldIcon,
}

const statusLabels: Record<DeliveryPhaseStatus, string> = {
  complete: 'Complete',
  progress: 'In progress',
  pending: 'Pending',
}

function PipelineMetricCard({ metric }: { metric: PipelineMetric }) {
  const Icon = metricIcons[metric.icon]

  return (
    <article className="delivery-pipeline__metric">
      <span className="delivery-pipeline__metric-icon">
        <Icon />
      </span>

      <div>
        <h3>{metric.title}</h3>
        <p>{metric.description}</p>
      </div>
    </article>
  )
}

function PipelineStatusPanel() {
  return (
    <aside className="delivery-pipeline__status-panel">
      <div className="delivery-pipeline__status-header">
        <span>Pipeline status</span>
        <strong>
          <i />
          On track
        </strong>
      </div>

      <div className="delivery-pipeline__radar" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>

      <div className="delivery-pipeline__velocity">
        <span>Project velocity</span>
        <strong>
          92% <em>+8%</em>
        </strong>
        <i />
      </div>

      <p>Last updated: 2 min ago</p>
    </aside>
  )
}

function DeliveryPhaseCard({ phase }: { phase: DeliveryPhase }) {
  const Icon = phaseIcons[phase.icon]

  return (
    <article className={`delivery-pipeline__phase delivery-pipeline__phase--${phase.status}`}>
      <span className="delivery-pipeline__phase-number">{phase.number}</span>

      <div className="delivery-pipeline__phase-icon">
        <Icon />
      </div>

      <h3>{phase.title}</h3>

      <ul>
        {phase.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="delivery-pipeline__phase-status">
        {phase.status === 'complete' ? <CheckIcon /> : <ClockIcon />}
        {statusLabels[phase.status]}
      </div>
    </article>
  )
}

export function DeliveryPipeline() {
  return (
    <PortfolioSection
      id="delivery"
      eyebrow="DELIVERY PIPELINE"
      title={
        <>
          From rough idea to{' '}
          <span className="delivery-pipeline__title-accent">production-ready</span> system.
        </>
      }
      description="A clear build process for turning vague requirements into stable, maintainable products."
      number="05"
      footer={{
        icon: LayersIcon,
        label: 'Structured process',
        text: 'Clear scope. Clean build. Reliable launch.',
      }}
    >
      <div className="delivery-pipeline">
        <div className="delivery-pipeline__metrics">
          {pipelineMetrics.map((metric) => (
            <PipelineMetricCard metric={metric} key={metric.id} />
          ))}
        </div>

        <div className="delivery-pipeline__body">
          <PipelineStatusPanel />

          <div className="delivery-pipeline__flow">
            <div className="delivery-pipeline__rail" aria-hidden="true">
              {deliveryPhases.map((phase) => (
                <span key={phase.id} />
              ))}
            </div>

            <div className="delivery-pipeline__phases">
              {deliveryPhases.map((phase) => (
                <DeliveryPhaseCard phase={phase} key={phase.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortfolioSection>
  )
}
