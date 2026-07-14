import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

import { Logo } from '@/components/brand'
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
} from '@/components/icons'
import { CookieSettingBanner } from '@/components/privacy/CookieSettingsButton'
import type {
  SiteFooterGitHubFeedViewModel,
  SiteFooterSnapshotViewModel,
  SiteFooterSocialIcon,
  SiteFooterSocialLinkViewModel,
  SiteFooterViewModel,
} from '@/lib/cms/homepage'

import { getSiteFooterXFeed } from '@/lib/cms/homepage/x-feed'

import { NewsletterForm } from './NewsletterForm'

type IconProps = SVGProps<SVGSVGElement>

const InstagramIcon = (props: IconProps) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.9 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
  </svg>
)

const ReplyIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M20 15a4 4 0 0 1-4 4H8l-4 3V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7Z" />
  </svg>
)

const RepostIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m17 2 4 4-4 4" />
    <path d="M3 10V8a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 14v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const HeartIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
)

const iconMap: Record<SiteFooterSocialIcon, ComponentType<IconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  telegram: TelegramIcon,
  x: XIcon,
}

function FooterSocialLinkItem({ social }: { social: SiteFooterSocialLinkViewModel }) {
  const Icon = iconMap[social.icon]

  return (
    <a
      aria-label={social.label}
      className="site-footer__social-link"
      href={social.href}
      rel={social.external ? 'noreferrer' : undefined}
      target={social.external ? '_blank' : undefined}
    >
      <Icon />
    </a>
  )
}

function SnapshotCard({ snapshot }: { snapshot: SiteFooterSnapshotViewModel }) {
  const quoteWords = snapshot.title.replace(/[.]/g, '').split(/\s+/).filter(Boolean).slice(0, 3)

  return (
    <article
      aria-label={snapshot.title}
      className={`site-footer__snapshot site-footer__snapshot--${snapshot.kind}`}
    >
      <div className="site-footer__snapshot-screen">
        {snapshot.image ? (
          <Image
            alt={snapshot.image.alt}
            className="site-footer__snapshot-image"
            fill
            sizes="(max-width: 760px) 82px, 92px"
            src={snapshot.image.src}
          />
        ) : snapshot.kind === 'quote' ? (
          <div className="site-footer__snapshot-quote">
            <span>{'//'}</span>
            {quoteWords.map((word) => (
              <strong key={word}>{word.toUpperCase()}</strong>
            ))}
          </div>
        ) : (
          <>
            <span className="site-footer__snapshot-dot" />
            <span className="site-footer__snapshot-dot" />
            <span className="site-footer__snapshot-dot" />
            <i />
            <i />
            <i />
          </>
        )}
      </div>
    </article>
  )
}

function FooterViewLink({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return null
  }

  return (
    <a className="site-footer__view-link" href={href} rel="noreferrer" target="_blank">
      {label}
      <ArrowUpRightIcon />
    </a>
  )
}

function CommitStream({ feed }: { feed: SiteFooterGitHubFeedViewModel }) {
  return (
    <section
      aria-labelledby="site-footer-commit-stream-title"
      className="site-footer__commits"
      data-cache-state={feed.state}
    >
      <header className="site-footer__commit-header">
        <div className="site-footer__commit-heading">
          <span className="site-footer__commit-icon">
            <GithubIcon />
          </span>
          <div>
            <div className="site-footer__commit-title-row">
              <h3 id="site-footer-commit-stream-title">{feed.title}</h3>
              <span className="site-footer__commit-status">{feed.statusLabel}</span>
            </div>
            <p>{feed.subtitle}</p>
          </div>
        </div>

        <FooterViewLink href={feed.href} label={feed.linkLabel} />
      </header>

      <div className="site-footer__commit-list">
        {feed.commits.map((commit) => (
          <a
            aria-label={`View ${commit.repository} commit ${commit.shortSha}: ${commit.title}`}
            className="site-footer__commit"
            href={commit.href}
            key={commit.id}
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="site-footer__commit-track">
              <i />
            </span>

            <span className="site-footer__commit-body">
              <span className="site-footer__commit-meta">
                <strong>{commit.repository}</strong>
                <code>{commit.shortSha}</code>
              </span>
              <span className="site-footer__commit-message">{commit.title}</span>
              <time dateTime={commit.committedAt}>{commit.timeLabel}</time>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

type SiteFooterProps = {
  content: SiteFooterViewModel
  githubFeed?: SiteFooterGitHubFeedViewModel | null
}

export async function SiteFooter({ content, githubFeed = null }: SiteFooterProps) {
  const liveXFeed = await getSiteFooterXFeed()
  const resolvedXFeed = liveXFeed ?? content.xFeed

  return (
    <footer
      aria-label="Site footer"
      className="site-footer"
      data-motion="rise"
      data-motion-duration="section"
    >
      <div className="site-container">
        <div className="site-footer__top">
          <section className="site-footer__panel site-footer__profile">
            <div className="site-footer__profile-head">
              <div className="site-footer__avatar-wrap">
                <Image
                  alt={content.profile.image.alt}
                  className="site-footer__avatar"
                  height={148}
                  src={content.profile.image.src}
                  width={148}
                />
                <span
                  aria-hidden="true"
                  className={
                    content.profile.availability.active
                      ? 'site-footer__avatar-status'
                      : 'site-footer__avatar-status site-footer__avatar-status--offline'
                  }
                />
              </div>
              <div className="site-footer__identity">
                <h2>{content.profile.name}</h2>
                <p>{content.profile.role}</p>
              </div>
            </div>

            <div className="site-footer__bio">
              {content.profile.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="site-footer__availability">
              <span
                className={
                  content.profile.availability.active
                    ? undefined
                    : 'site-footer__availability-dot--offline'
                }
              />
              <strong>{content.profile.availability.label}</strong>
              <p>{content.profile.availability.detail}</p>
            </div>

            <div className="site-footer__connect">
              <span>{content.profile.connectLabel}</span>
              <div className="site-footer__socials">
                {content.profile.socialLinks.map((social) => (
                  <FooterSocialLinkItem key={social.id} social={social} />
                ))}
              </div>
            </div>
          </section>

          <section className="site-footer__panel site-footer__feed">
            <header className="site-footer__panel-header">
              <div className="site-footer__panel-title">
                <span className="site-footer__panel-icon site-footer__panel-icon--x">
                  <XIcon />
                </span>
                <div>
                  <h2>{resolvedXFeed.title}</h2>
                  <p>{resolvedXFeed.handle}</p>
                </div>
              </div>
              <FooterViewLink href={resolvedXFeed.href} label={resolvedXFeed.linkLabel} />
            </header>

            {resolvedXFeed.posts.length > 0 ? (
              <div className="site-footer__posts">
                {resolvedXFeed.posts.map((post) => (
                  <article className="site-footer__post" key={post.id}>
                    <div className="site-footer__post-head">
                      <span className="site-footer__post-brand">
                        <XIcon />
                      </span>
                      <div className="site-footer__post-copy">
                        <p>{post.content}</p>
                        <time>
                          {post.date} • {post.time}
                        </time>
                      </div>
                    </div>
                    <div aria-label="Post metrics" className="site-footer__post-meta">
                      <span>
                        <ReplyIcon />
                        {post.replies}
                      </span>
                      <span>
                        <RepostIcon />
                        {post.reposts}
                      </span>
                      <span className="site-footer__post-like">
                        <HeartIcon />
                        {post.likes}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="site-footer__empty" role="status">
                Curated build signals will appear here.
              </p>
            )}
          </section>

          <section className="site-footer__panel site-footer__snapshots">
            <header className="site-footer__panel-header">
              <div className="site-footer__panel-title">
                <span className="site-footer__panel-icon site-footer__panel-icon--instagram">
                  <InstagramIcon />
                </span>
                <div>
                  <h2>{content.snapshots.title}</h2>
                  <p>{content.snapshots.subtitle}</p>
                </div>
              </div>
              <FooterViewLink href={content.snapshots.href} label={content.snapshots.linkLabel} />
            </header>

            {content.snapshots.items.length > 0 ? (
              <div className="site-footer__snapshot-grid">
                {content.snapshots.items.slice(0, 6).map((snapshot) => (
                  <SnapshotCard key={snapshot.id} snapshot={snapshot} />
                ))}
              </div>
            ) : (
              <p className="site-footer__empty" role="status">
                Build snapshots are being prepared.
              </p>
            )}

            {githubFeed ? <CommitStream feed={githubFeed} /> : null}

            <div className="site-footer__newsletter">
              <div className="site-footer__newsletter-copy">
                <div className="site-footer__newsletter-title">
                  <MailIcon />
                  <h3>{content.newsletter.title}</h3>
                </div>
                <p>{content.newsletter.description}</p>
              </div>
              <NewsletterForm
                buttonLabel={content.newsletter.buttonLabel}
                note={content.newsletter.note}
                placeholder={content.newsletter.placeholder}
              />
            </div>
          </section>
        </div>

        <div className="site-footer__bottom">
          <Logo />
          <nav aria-label="Footer navigation" className="site-footer__nav">
            <CookieSettingBanner />
            {content.navigation.map((link) => (
              <Link href={link.href} key={link.id}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="site-footer__copyright">
            © {content.copyright.year} {content.copyright.prefix}{' '}
            <em>{content.copyright.emphasis}</em> {content.copyright.suffix}
          </p>
        </div>
      </div>
    </footer>
  )
}
