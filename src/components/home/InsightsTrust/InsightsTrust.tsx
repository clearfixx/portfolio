import Image from 'next/image'
import Link from 'next/link'
import type { SVGProps } from 'react'

import { PortfolioSection } from '@/components/home/PortfolioSection'

import {
  clientFeedback,
  featuredInsightArticle,
  insightArticles,
  trustMetrics,
  type CodeToken,
  type InsightArticle,
  type TrustMetric,
} from './data'

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
  terminal: TerminalIcon,
  cube: CubeIcon,
}

const metricIcons = {
  code: CodeIcon,
  calendar: CalendarIcon,
  commit: CommitIcon,
  users: UsersIcon,
}

function getCodeTokenClassName(token: CodeToken) {
  return token.type
    ? `insights-trust__token insights-trust__token--${token.type}`
    : 'insights-trust__token'
}

function ArticleMeta() {
  return (
    <div className="insights-trust__article-meta">
      <span>
        <CalendarIcon />
        {featuredInsightArticle.date}
      </span>

      <span>
        <ClockIcon />
        {featuredInsightArticle.readTime}
      </span>

      <span className="insights-trust__article-category">{featuredInsightArticle.category}</span>
    </div>
  )
}

function FeaturedCodePreview() {
  return (
    <div className="insights-trust__code-card" aria-label="Article code preview">
      <div className="insights-trust__code-topbar">
        <span />
        <span />
        <span />
        <strong>{featuredInsightArticle.codeTitle}</strong>
      </div>

      <pre>
        <code>
          {featuredInsightArticle.codeLines.map((line, lineIndex) => (
            <span
              className="insights-trust__code-line"
              key={`${featuredInsightArticle.id}-line-${lineIndex}`}
            >
              {line.length > 0
                ? line.map((token, tokenIndex) => (
                    <span
                      className={getCodeTokenClassName(token)}
                      key={`${featuredInsightArticle.id}-line-${lineIndex}-token-${tokenIndex}`}
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

function FeaturedArticleMedia() {
  if (featuredInsightArticle.image) {
    return (
      <div className="insights-trust__image-card">
        <Image
          src={featuredInsightArticle.image.src}
          alt={featuredInsightArticle.image.alt}
          fill
          sizes="(max-width: 860px) 100vw, 360px"
        />

        <span className="insights-trust__image-scanline" aria-hidden="true" />
      </div>
    )
  }

  return <FeaturedCodePreview />
}

function FeaturedArticle() {
  return (
    <article className="insights-trust__featured-article">
      <div className="insights-trust__featured-copy">
        <span className="insights-trust__featured-label">{featuredInsightArticle.label}</span>

        <h3>{featuredInsightArticle.title}</h3>

        <p>{featuredInsightArticle.excerpt}</p>

        <ArticleMeta />
      </div>

      <FeaturedArticleMedia />
    </article>
  )
}

function CompactArticle({ article, index }: { article: InsightArticle; index: number }) {
  const Icon = articleIcons[article.icon]

  return (
    <Link className="insights-trust__article-row" href={article.href}>
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

      <ArrowUpRightIcon className="insights-trust__article-arrow" />
    </Link>
  )
}

function TrustMetricCard({ metric }: { metric: TrustMetric }) {
  const Icon = metricIcons[metric.icon]

  return (
    <div className="insights-trust__metric">
      <Icon />
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </div>
  )
}

export function InsightsTrust() {
  return (
    <PortfolioSection
      id="insights"
      eyebrow="INSIGHTS & TRUST"
      title={
        <>
          Latest <span className="insights-trust__title-accent">Articles</span> & Client{' '}
          <span className="insights-trust__title-muted">Feedback</span>
        </>
      }
      description="Build notes, engineering thoughts and client feedback collected from real project work."
      number="06"
      footer={{
        icon: ShieldCheckIcon,
        label: 'Real projects. Real feedback. Real impact.',
        text: 'Built with passion. Delivered with precision.',
      }}
    >
      <div className="insights-trust">
        <section className="insights-trust__panel insights-trust__panel--articles">
          <div className="insights-trust__panel-header">
            <h3>Latest Articles</h3>

            <Link href="/articles">
              View all articles
              <ArrowUpRightIcon />
            </Link>
          </div>

          <FeaturedArticle />

          <div className="insights-trust__article-list">
            {insightArticles.map((article, index) => (
              <CompactArticle article={article} index={index} key={article.id} />
            ))}
          </div>
        </section>

        <aside className="insights-trust__panel insights-trust__panel--feedback">
          <div className="insights-trust__panel-header">
            <h3>Client Feedback</h3>
          </div>

          <div className="insights-trust__feedback-list">
            {clientFeedback.map((feedback) => (
              <article className="insights-trust__feedback-card" key={feedback.id}>
                <div className="insights-trust__avatar" aria-hidden="true">
                  {feedback.author
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>

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
            ))}
          </div>

          <div className="insights-trust__trust-signals">
            <h3>Trust Signals</h3>

            <div className="insights-trust__metrics">
              {trustMetrics.map((metric) => (
                <TrustMetricCard metric={metric} key={metric.id} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PortfolioSection>
  )
}
