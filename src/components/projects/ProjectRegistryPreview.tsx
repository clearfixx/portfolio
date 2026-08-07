import { ActivityIcon, CodeIcon, LayersIcon, PackageIcon } from '@/components/icons/project'
import type { ProjectDirectoryItem } from '@/lib/cms/public-projects'
import type { ReactNode } from 'react'

import styles from './ProjectRegistryShell.module.scss'
import workspaceStyles from './ProjectRegistryWorkspace.module.scss'
import headerStyles from './ProjectRegistryHeader.module.scss'
import statusBarStyles from './ProjectRegistryStatusBar.module.scss'
import telemetryStyles from './ProjectRegistryTelemetry.module.scss'
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

const previewVariantClass: Record<PreviewVariant, string> = {
  commerce: styles.commerce,
  community: styles.community,
  data: styles.data,
  platform: styles.platform,
  product: styles.product,
  service: styles.service,
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
          <span className={workspaceStyles.keyword}>export const</span>{' '}
          <span className={workspaceStyles.variable}>checkout</span> ={' '}
          <span className={workspaceStyles.functionToken}>createFlow</span>({'{'}
        </>,
        <>
          {'  '}storefront:{' '}
          <span className={workspaceStyles.stringToken}>&apos;{primaryTechnology}&apos;</span>,
        </>,
        <>
          {'  '}payments: <span className={workspaceStyles.stringToken}>&apos;secured&apos;</span>,
        </>,
        <>
          {'  '}inventory: <span className={workspaceStyles.stringToken}>&apos;realtime&apos;</span>
          ,
        </>,
        <>
          {'  '}progress: <span className={workspaceStyles.numberToken}>{project.progress}</span>,
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
          <span className={workspaceStyles.keyword}>export const</span>{' '}
          <span className={workspaceStyles.variable}>network</span> ={' '}
          <span className={workspaceStyles.functionToken}>connectCommunity</span>({'{'}
        </>,
        <>
          {'  '}identity:{' '}
          <span className={workspaceStyles.stringToken}>&apos;{primaryTechnology}&apos;</span>,
        </>,
        <>
          {'  '}presence: <span className={workspaceStyles.stringToken}>&apos;realtime&apos;</span>,
        </>,
        <>
          {'  '}spaces: <span className={workspaceStyles.stringToken}>&apos;federated&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className={workspaceStyles.numberToken}>{project.progress}</span>,
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
          <span className={workspaceStyles.keyword}>const</span>{' '}
          <span className={workspaceStyles.variable}>pipeline</span> ={' '}
          <span className={workspaceStyles.functionToken}>composeModel</span>({'{'}
        </>,
        <>
          {'  '}source: <span className={workspaceStyles.stringToken}>&apos;events&apos;</span>,
        </>,
        <>
          {'  '}inference: <span className={workspaceStyles.stringToken}>&apos;edge&apos;</span>,
        </>,
        <>
          {'  '}cache: <span className={workspaceStyles.stringToken}>&apos;vector&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className={workspaceStyles.numberToken}>{project.progress}</span>,
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
          <span className={workspaceStyles.decorator}>@Module</span>({'{'}
        </>,
        <>
          {'  '}imports: [<span className={workspaceStyles.classToken}>{primaryTechnology}</span>],
        </>,
        <>
          {'  '}providers: [<span className={workspaceStyles.classToken}>ProjectService</span>],
        </>,
        <>
          {'  '}exports: [<span className={workspaceStyles.classToken}>ProjectService</span>],
        </>,
        <>{'}'})</>,
        <>
          <span className={workspaceStyles.keyword}>export class</span>{' '}
          <span className={workspaceStyles.classToken}>RuntimeModule</span> {'{}'}
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
          <span className={workspaceStyles.keyword}>export const</span>{' '}
          <span className={workspaceStyles.variable}>platform</span> ={' '}
          <span className={workspaceStyles.functionToken}>defineSystem</span>({'{'}
        </>,
        <>
          {'  '}id: <span className={workspaceStyles.stringToken}>&apos;{project.slug}&apos;</span>,
        </>,
        <>
          {'  '}modules: [
          <span className={workspaceStyles.stringToken}>
            &apos;{primaryTechnology}&apos;, &apos;{secondaryTechnology}&apos;, &apos;
            {tertiaryTechnology}&apos;
          </span>
          ],
        </>,
        <>
          {'  '}stage:{' '}
          <span className={workspaceStyles.stringToken}>&apos;{project.stage}&apos;</span>,
        </>,
        <>
          {'  '}progress: <span className={workspaceStyles.numberToken}>{project.progress}</span>,
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
        <span className={workspaceStyles.keyword}>export const</span>{' '}
        <span className={workspaceStyles.variable}>product</span> ={' '}
        <span className={workspaceStyles.functionToken}>defineProject</span>({'{'}
      </>,
      <>
        {'  '}name: <span className={workspaceStyles.stringToken}>&apos;{project.title}&apos;</span>
        ,
      </>,
      <>
        {'  '}stack: [
        <span className={workspaceStyles.stringToken}>
          &apos;{primaryTechnology}&apos;, &apos;{secondaryTechnology}&apos;
        </span>
        ],
      </>,
      <>
        {'  '}stage:{' '}
        <span className={workspaceStyles.stringToken}>&apos;{project.stage}&apos;</span>,
      </>,
      <>
        {'  '}progress: <span className={workspaceStyles.numberToken}>{project.progress}</span>,
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
      className={`${styles.preview} ${previewVariantClass[preview.variant]}`}
      data-preview={preview.variant}
    >
      <header className={headerStyles.header}>
        <span className={headerStyles.windowControls}>
          <i />
          <i />
          <i />
        </span>

        <div className={headerStyles.tabs}>
          <span className={headerStyles.tab} data-active>
            <CodeIcon aria-hidden="true" size={12} />
            {preview.fileName}
          </span>
          <span className={headerStyles.tab}>
            <LayersIcon aria-hidden="true" size={12} />
            {preview.secondaryFile}
          </span>
        </div>

        <span className={headerStyles.branch}>main</span>
      </header>

      <div className={workspaceStyles.workspace}>
        <aside className={workspaceStyles.activity}>
          <span className={workspaceStyles.active}>
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

        <ol className={workspaceStyles.code}>
          {preview.lines.map((line, index) => (
            <li
              className={index + 1 === preview.activeLine ? workspaceStyles.active : undefined}
              key={index}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <code>{line}</code>
            </li>
          ))}
        </ol>
      </div>

      <div className={telemetryStyles.telemetry}>
        {preview.telemetry.map((item, index) => (
          <span key={item.label}>
            <i className={index === 0 ? telemetryStyles.live : undefined} />
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        ))}
      </div>

      <footer className={statusBarStyles.statusbar}>
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

// project-registry-preview-css-module-v1
