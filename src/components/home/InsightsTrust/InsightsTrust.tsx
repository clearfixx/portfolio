import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode, SVGProps } from 'react'

import { PortfolioSection } from '@/components/home/PortfolioSection'
import type {
  InsightsArticleViewModel,
  InsightsFeedbackViewModel,
  InsightsFeaturedArticleViewModel,
  InsightsTrustMetricViewModel,
  InsightsTrustViewModel,
} from '@/lib/cms/homepage'

type CodeTokenType =
  'function' | 'keyword' | 'operator' | 'plain' | 'property' | 'punctuation' | 'string' | 'type'

type CodeToken = {
  type?: CodeTokenType
  value: string
}

const CODE_PREVIEW = {
  lines: [
    [
      { value: 'type', type: 'keyword' },
      { value: ' ButtonProps ', type: 'type' },
      { value: '= ', type: 'operator' },
      { value: '{', type: 'punctuation' },
    ],
    [
      { value: '  variant', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: "'primary'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'secondary'", type: 'string' },
    ],
    [
      { value: '  size', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: "'sm'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'md'", type: 'string' },
      { value: ' | ', type: 'operator' },
      { value: "'lg'", type: 'string' },
    ],
    [
      { value: '  loading', type: 'property' },
      { value: '?: ', type: 'operator' },
      { value: 'boolean', type: 'type' },
    ],
    [{ value: '}', type: 'punctuation' }],
    [],
    [
      { value: 'export', type: 'keyword' },
      { value: ' function ', type: 'keyword' },
      { value: 'Button', type: 'function' },
      { value: '(props) ', type: 'plain' },
      { value: '{', type: 'punctuation' },
    ],
    [
      { value: '  return ', type: 'keyword' },
      { value: '<button />', type: 'function' },
    ],
    [{ value: '}', type: 'punctuation' }],
  ] satisfies CodeToken[][],
  title: 'components/Button.tsx',
} as const

function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
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

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <path d="M4 9h16" />
      <path d="M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="m7 10 2 2-2 2" />
      <path d="M12 15h5" />
    </svg>
  )
}

function CubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </svg>
  )
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
    </svg>
  )
}

function CommitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6 12h12" />
      <path d="M9 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
      <path d="M21 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
    </svg>
  )
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M16 19v-1.2c0-1.7-1.3-3-3-3H7c-1.7 0-3 1.3-3 3V19" />
      <path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M20 19v-1.2c0-1.4-.9-2.5-2.2-2.9" />
      <path d="M16.5 5.3a3 3 0 0 1 0 5.4" />
    </svg>
  )
}

const articleIcons = {
  cube: CubeIcon,
  terminal: TerminalIcon,
}

const metricIcons = {
  calendar: CalendarIcon,
  code: CodeIcon,
  commit: CommitIcon,
  users: UsersIcon,
}

function getCodeTokenClassName(token: CodeToken) {
  return token.type
    ? `insights-trust__token insights-trust__token--${token.type}`
    : 'insights-trust__token'
}

function ArticleMeta({ article }: { article: InsightsArticleViewModel }) {
  return (
    <div className="insights-trust__article-meta">
      <span>
        <CalendarIcon />
        {article.date}
      </span>
      <span>
        <ClockIcon />
        {article.readTime}
      </span>
      <span className="insights-trust__article-category">{article.category}</span>
    </div>
  )
}

function FeaturedCodePreview({ articleId }: { articleId: string }) {
  return (
    <div className="insights-trust__code-card" aria-label="Article code preview">
      <div className="insights-trust__code-topbar">
        <span />
        <span />
        <span />
        <strong>{CODE_PREVIEW.title}</strong>
      </div>
      <pre>
        <code>
          {CODE_PREVIEW.lines.map((line, lineIndex) => (
            <span className="insights-trust__code-line" key={`${articleId}-line-${lineIndex}`}>
              {line.length > 0
                ? line.map((token, tokenIndex) => (
                    <span
                      className={getCodeTokenClassName(token)}
                      key={`${articleId}-line-${lineIndex}-token-${tokenIndex}`}
                    >
                      {token.value}
                    </span>
                  ))
                : '\u00A0'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

function FeaturedArticleMedia({ article }: { article: InsightsFeaturedArticleViewModel }) {
  if (article.image) {
    return (
      <div className="insights-trust__image-card">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(max-width: 860px) 100vw, 360px"
        />
        <span className="insights-trust__image-scanline" aria-hidden="true" />
      </div>
    )
  }

  return <FeaturedCodePreview articleId={article.id} />
}

function FeaturedArticleContent({ article }: { article: InsightsFeaturedArticleViewModel }) {
  return (
    <>
      <div className="insights-trust__featured-copy">
        <span className="insights-trust__featured-label">{article.label}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <ArticleMeta article={article} />
      </div>
      <FeaturedArticleMedia article={article} />
    </>
  )
}

function FeaturedArticle({ article }: { article: InsightsFeaturedArticleViewModel }) {
  if (article.href) {
    return (
      <Link className="insights-trust__featured-article" href={article.href}>
        <FeaturedArticleContent article={article} />
      </Link>
    )
  }

  return (
    <article className="insights-trust__featured-article">
      <FeaturedArticleContent article={article} />
    </article>
  )
}

function CompactArticleContent({
  article,
  index,
}: {
  article: InsightsArticleViewModel
  index: number
}) {
  const Icon = articleIcons[article.icon]

  return (
    <>
      <span className="insights-trust__article-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="insights-trust__article-icon">
        <Icon />
      </span>
      <span className="insights-trust__article-content">
        <strong>{article.title}</strong>
        <span>{article.excerpt}</span>
      </span>
      <span className="insights-trust__article-details">
        <span>{article.date}</span>
        <span>
          <ClockIcon />
          {article.readTime}
        </span>
      </span>
      {article.href ? <ArrowUpRightIcon className="insights-trust__article-arrow" /> : null}
    </>
  )
}

function CompactArticle({ article, index }: { article: InsightsArticleViewModel; index: number }) {
  if (article.href) {
    return (
      <Link className="insights-trust__article-row" href={article.href}>
        <CompactArticleContent article={article} index={index} />
      </Link>
    )
  }

  return (
    <article className="insights-trust__article-row insights-trust__article-row--static">
      <CompactArticleContent article={article} index={index} />
    </article>
  )
}

function FeedbackAvatar({ feedback }: { feedback: InsightsFeedbackViewModel }) {
  return (
    <div className="insights-trust__avatar" aria-hidden="true">
      {feedback.avatar ? (
        <Image src={feedback.avatar.src} alt="" fill sizes="58px" />
      ) : (
        feedback.initials
      )}
    </div>
  )
}

function FeedbackCard({ feedback }: { feedback: InsightsFeedbackViewModel }) {
  return (
    <article className="insights-trust__feedback-card" key={feedback.id}>
      <FeedbackAvatar feedback={feedback} />
      <div className="insights-trust__quote-mark" aria-hidden="true">
        “
      </div>
      <div className="insights-trust__feedback-content">
        <p>{feedback.quote}</p>
        <div>
          <strong>{feedback.author}</strong>
          <span>{feedback.role}</span>
        </div>
      </div>
      {feedback.verified ? (
        <span className="insights-trust__verified">
          <span />
          Verified
        </span>
      ) : null}
    </article>
  )
}

function TrustMetricCard({ metric }: { metric: InsightsTrustMetricViewModel }) {
  const Icon = metricIcons[metric.icon]

  return (
    <div className="insights-trust__metric">
      <Icon />
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </div>
  )
}

function renderSectionTitle(content: InsightsTrustViewModel): ReactNode {
  return content.title.map((segment, index) => {
    if (segment.tone === 'accent') {
      return (
        <span className="insights-trust__title-accent" key={`${segment.tone}-${index}`}>
          {segment.text}
        </span>
      )
    }

    if (segment.tone === 'muted') {
      return (
        <span className="insights-trust__title-muted" key={`${segment.tone}-${index}`}>
          {segment.text}
        </span>
      )
    }

    return segment.text
  })
}

type InsightsTrustProps = {
  content: InsightsTrustViewModel
}

export function InsightsTrust({ content }: InsightsTrustProps) {
  return (
    <PortfolioSection
      id="insights"
      eyebrow={content.eyebrow}
      title={renderSectionTitle(content)}
      description={content.description}
      number="05"
      footer={{
        icon: ShieldCheckIcon,
        label: content.footer.label,
        text: content.footer.text,
      }}
    >
      <div className="insights-trust">
        <section className="insights-trust__panel insights-trust__panel--articles">
          <div className="insights-trust__panel-header">
            <h3>{content.articles.title}</h3>
            {content.articles.cta ? (
              <Link href={content.articles.cta.href}>
                {content.articles.cta.label}
                <ArrowUpRightIcon />
              </Link>
            ) : null}
          </div>

          {content.articles.featured ? (
            <FeaturedArticle article={content.articles.featured} />
          ) : (
            <p className="insights-trust__empty" role="status">
              Published engineering notes are being prepared.
            </p>
          )}

          {content.articles.items.length > 0 ? (
            <div className="insights-trust__article-list">
              {content.articles.items.map((article, index) => (
                <CompactArticle article={article} index={index} key={article.id} />
              ))}
            </div>
          ) : null}
        </section>

        <aside className="insights-trust__panel insights-trust__panel--feedback">
          <div className="insights-trust__panel-header">
            <h3>{content.feedback.title}</h3>
          </div>

          {content.feedback.items.length > 0 ? (
            <div className="insights-trust__feedback-list">
              {content.feedback.items.map((feedback) => (
                <FeedbackCard feedback={feedback} key={feedback.id} />
              ))}
            </div>
          ) : (
            <p className="insights-trust__empty" role="status">
              Approved client feedback will appear here.
            </p>
          )}

          <div className="insights-trust__trust-signals">
            <h3>{content.metrics.title}</h3>
            <div className="insights-trust__metrics">
              {content.metrics.items.map((metric) => (
                <TrustMetricCard metric={metric} key={metric.id} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PortfolioSection>
  )
}
