import { ActivityIcon, CodeIcon, LayersIcon, PackageIcon } from '@/components/icons/project'
import type { ProjectDirectoryItem } from '@/lib/cms/public-projects'
import type { ReactNode } from 'react'

type ProjectRegistryPreviewProps = {
  project: Pick<
    ProjectDirectoryItem,
    'category' | 'progress' | 'slug' | 'stage' | 'stageLabel' | 'technologies' | 'title' | 'version'
  >
}

type PreviewVariant = 'commerce' | 'community' | 'data' | 'platform' | 'product' | 'service'

type PreviewTelemetryItem = {
  label: string
  value: string
}

type PreviewDefinition = {
  activeLine: number
  fileName: string
  language: string
  lines: ReactNode[]
  secondaryFile: string
  symbol: string
  telemetry: PreviewTelemetryItem[]
  variant: PreviewVariant
}

const PREVIEW_VARIANT_LABELS: Record<PreviewVariant, string> = {
  commerce: 'Commerce flow',
  community: 'Community graph',
  data: 'Data pipeline',
  platform: 'Platform registry',
  product: 'Product runtime',
  service: 'Service module',
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term))
}

function resolvePreviewVariant(project: ProjectRegistryPreviewProps['project']): PreviewVariant {
  const fingerprint = [project.title, project.slug, project.category, ...project.technologies]
    .join(' ')
    .toLocaleLowerCase()

  if (
    includesAny(fingerprint, [
      'commerce',
      'checkout',
      'ecommerce',
      'market',
      'payment',
      'shop',
      'store',
    ])
  ) {
    return 'commerce'
  }

  if (includesAny(fingerprint, ['community', 'forum', 'member', 'network', 'social', 'space'])) {
    return 'community'
  }

  if (
    includesAny(fingerprint, [
      'analytics',
      'artificial intelligence',
      'data',
      'machine learning',
      'model',
      'pipeline',
    ])
  ) {
    return 'data'
  }

  if (
    includesAny(fingerprint, [
      'api',
      'backend',
      'microservice',
      'nest.js',
      'nestjs',
      'service',
      'worker',
    ])
  ) {
    return 'service'
  }

  if (
    includesAny(fingerprint, [
      'cms',
      'ecosystem',
      'monorepo',
      'platform',
      'system',
      'universe',
      'workspace',
    ])
  ) {
    return 'platform'
  }

  return 'product'
}

function readTechnology(
  project: ProjectRegistryPreviewProps['project'],
  index: number,
  fallback: string,
) {
  return project.technologies[index]?.toLocaleLowerCase() ?? fallback
}

function buildPreview(project: ProjectRegistryPreviewProps['project']): PreviewDefinition {
  const variant = resolvePreviewVariant(project)
  const release = project.version ? `v${project.version.replace(/^v/i, '')}` : 'rolling'
  const primaryTechnology = readTechnology(project, 0, 'typescript')
  const secondaryTechnology = readTechnology(project, 1, 'runtime')
  const tertiaryTechnology = readTechnology(project, 2, 'services')

  if (variant === 'commerce') {
    return {
      activeLine: 4,
      fileName: 'commerce.pipeline.ts',
      language: 'TypeScript',
      secondaryFile: 'checkout.events.ts',
      symbol: 'checkout',
      telemetry: [
        { label: 'Checkout', value: 'orchestrated' },
        { label: 'Inventory', value: 'live sync' },
        { label: 'Release', value: release },
      ],
      variant,
      lines: [
        <>
          <span className="is-keyword">export const</span>{' '}
          <span className="is-variable">checkout</span> ={' '}
          <span className="is-function">createFlow</span>({'{'}
        </>,
        <>
          {'  '}storefront: <span className="is-string">&apos;{primaryTechnology}&apos;</span>,
        </>,
        <>
          {'  '}payments: <span className="is-string">&apos;secured&apos;</span>,
        </>,
        <>
          {'  '}inventory: <span className="is-string">&apos;realtime&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className="is-number">{project.progress}</span>,
        </>,
        <>{'}'})</>,
      ],
    }
  }

  if (variant === 'community') {
    return {
      activeLine: 3,
      fileName: 'community.graph.ts',
      language: 'TypeScript',
      secondaryFile: 'presence.channel.ts',
      symbol: 'network',
      telemetry: [
        { label: 'Presence', value: 'realtime' },
        { label: 'Spaces', value: 'connected' },
        { label: 'Release', value: release },
      ],
      variant,
      lines: [
        <>
          <span className="is-keyword">export const</span>{' '}
          <span className="is-variable">network</span> ={' '}
          <span className="is-function">connectCommunity</span>({'{'}
        </>,
        <>
          {'  '}identity: <span className="is-string">&apos;{primaryTechnology}&apos;</span>,
        </>,
        <>
          {'  '}presence: <span className="is-string">&apos;realtime&apos;</span>,
        </>,
        <>
          {'  '}spaces: <span className="is-string">&apos;federated&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className="is-number">{project.progress}</span>,
        </>,
        <>{'}'})</>,
      ],
    }
  }

  if (variant === 'data') {
    return {
      activeLine: 4,
      fileName: 'model.pipeline.ts',
      language: 'TypeScript',
      secondaryFile: 'dataset.schema.ts',
      symbol: 'pipeline',
      telemetry: [
        { label: 'Pipeline', value: 'streaming' },
        { label: 'Model', value: 'ready' },
        { label: 'Release', value: release },
      ],
      variant,
      lines: [
        <>
          <span className="is-keyword">const</span> <span className="is-variable">pipeline</span> ={' '}
          <span className="is-function">composeModel</span>({'{'}
        </>,
        <>
          {'  '}source: <span className="is-string">&apos;events&apos;</span>,
        </>,
        <>
          {'  '}inference: <span className="is-string">&apos;edge&apos;</span>,
        </>,
        <>
          {'  '}cache: <span className="is-string">&apos;vector&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className="is-number">{project.progress}</span>,
        </>,
        <>{'}'})</>,
      ],
    }
  }

  if (variant === 'service') {
    return {
      activeLine: 3,
      fileName: 'runtime.module.ts',
      language: 'TypeScript',
      secondaryFile: 'service.contract.ts',
      symbol: 'module',
      telemetry: [
        { label: 'Runtime', value: 'healthy' },
        { label: 'Contracts', value: 'typed' },
        { label: 'Release', value: release },
      ],
      variant,
      lines: [
        <>
          <span className="is-decorator">@Module</span>({'{'}
        </>,
        <>
          {'  '}imports: [<span className="is-class">{primaryTechnology}</span>],
        </>,
        <>
          {'  '}providers: [<span className="is-class">ProjectService</span>],
        </>,
        <>
          {'  '}exports: [<span className="is-class">ProjectService</span>],
        </>,
        <>{'}'})</>,
        <>
          <span className="is-keyword">export class</span>{' '}
          <span className="is-class">RuntimeModule</span> {'{}'}
        </>,
      ],
    }
  }

  if (variant === 'platform') {
    return {
      activeLine: 3,
      fileName: 'platform.registry.ts',
      language: 'TypeScript',
      secondaryFile: 'system.topology.ts',
      symbol: 'registry',
      telemetry: [
        {
          label: 'Modules',
          value: `${Math.max(project.technologies.length, 1)} linked`,
        },
        { label: 'Runtime', value: project.stageLabel },
        { label: 'Release', value: release },
      ],
      variant,
      lines: [
        <>
          <span className="is-keyword">export const</span>{' '}
          <span className="is-variable">platform</span> ={' '}
          <span className="is-function">defineSystem</span>({'{'}
        </>,
        <>
          {'  '}id: <span className="is-string">&apos;{project.slug}&apos;</span>,
        </>,
        <>
          {'  '}modules: [
          <span className="is-string">
            &apos;{primaryTechnology}&apos;, &apos;{secondaryTechnology}&apos;, &apos;
            {tertiaryTechnology}&apos;
          </span>
          ],
        </>,
        <>
          {'  '}stage: <span className="is-string">&apos;{project.stage}&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className="is-number">{project.progress}</span>,
        </>,
        <>{'}'})</>,
      ],
    }
  }

  return {
    activeLine: 3,
    fileName: 'project.runtime.ts',
    language: 'TypeScript',
    secondaryFile: 'project.schema.ts',
    symbol: 'runtime',
    telemetry: [
      { label: 'Runtime', value: project.stageLabel },
      {
        label: 'Stack',
        value: `${Math.max(project.technologies.length, 1)} services`,
      },
      { label: 'Release', value: release },
    ],
    variant,
    lines: [
      <>
        <span className="is-keyword">export const</span>{' '}
        <span className="is-variable">product</span> ={' '}
        <span className="is-function">defineProject</span>({'{'}
      </>,
      <>
        {'  '}name: <span className="is-string">&apos;{project.title}&apos;</span>,
      </>,
      <>
        {'  '}stack: [
        <span className="is-string">
          &apos;{primaryTechnology}&apos;, &apos;{secondaryTechnology}&apos;
        </span>
        ],
      </>,
      <>
        {'  '}stage: <span className="is-string">&apos;{project.stage}&apos;</span>,
      </>,
      <>
        {'  '}progress: <span className="is-number">{project.progress}</span>,
      </>,
      <>{'}'})</>,
    ],
  }
}

export function ProjectRegistryPreview({ project }: ProjectRegistryPreviewProps) {
  const preview = buildPreview(project)

  return (
    <div
      aria-hidden="true"
      className={`project-preview project-preview--${preview.variant}`}
      data-preview={preview.variant}
    >
      <header className="project-preview__header">
        <span className="project-preview__window-controls">
          <i />
          <i />
          <i />
        </span>

        <div className="project-preview__tabs">
          <span className="project-preview__tab is-active">
            <CodeIcon aria-hidden="true" size={12} />
            {preview.fileName}
          </span>
          <span className="project-preview__tab">
            <LayersIcon aria-hidden="true" size={12} />
            {preview.secondaryFile}
          </span>
        </div>

        <span className="project-preview__branch">main</span>
      </header>

      <div className="project-preview__workspace">
        <aside className="project-preview__activity">
          <span className="is-active">
            <CodeIcon aria-hidden="true" size={15} />
          </span>
          <span>
            <LayersIcon aria-hidden="true" size={15} />
          </span>
          <span>
            <PackageIcon aria-hidden="true" size={15} />
          </span>
          <span>
            <ActivityIcon aria-hidden="true" size={15} />
          </span>
        </aside>

        <ol className="project-preview__code">
          {preview.lines.map((line, index) => (
            <li className={index + 1 === preview.activeLine ? 'is-active' : undefined} key={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <code>{line}</code>
            </li>
          ))}
        </ol>
      </div>

      <div className="project-preview__telemetry">
        {preview.telemetry.map((item, index) => (
          <span key={item.label}>
            <i className={index === 0 ? 'is-live' : undefined} />
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        ))}
      </div>

      <footer className="project-preview__statusbar">
        <span>
          <i />
          {PREVIEW_VARIANT_LABELS[preview.variant]}
        </span>
        <span>{preview.symbol}</span>
        <span>{preview.language}</span>
        <strong>{project.progress}%</strong>
      </footer>
    </div>
  )
}

// project-preview-system-v33
