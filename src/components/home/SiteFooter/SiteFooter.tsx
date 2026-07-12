import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
} from '@/components/icons'

import { NewsletterForm } from './NewsletterForm'

import {
  footerBio,
  footerFeedLinks,
  footerLinks,
  footerSnapshots,
  footerSocialLinks,
  footerXPosts,
  type FooterSnapshot,
  type FooterSocialLink,
} from './data'

import { Logo } from '@/components/brand'
import { CookieSettingBanner } from '@/components/privacy/CookieSettingsButton'

type IconProps = SVGProps<SVGSVGElement>

const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.9 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
  </svg>
)

const ReplyIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" {...props}>
    <path d="M20 15a4 4 0 0 1-4 4H8l-4 3V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7Z" />
  </svg>
)

const RepostIcon = (props: IconProps) => (
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
    <path d="m17 2 4 4-4 4" />
    <path d="M3 10V8a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 14v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const HeartIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" {...props}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
)

const iconMap: Record<FooterSocialLink['icon'], ComponentType<IconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  telegram: TelegramIcon,
  mail: MailIcon,
}

function FooterSocialLinkItem({ social }: { social: FooterSocialLink }) {
  const Icon = iconMap[social.icon]

  return (
    <a
      className="site-footer__social-link"
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
    >
      <Icon />
    </a>
  )
}

function SnapshotCard({ snapshot }: { snapshot: FooterSnapshot }) {
  return (
    <article
      className={`site-footer__snapshot site-footer__snapshot--${snapshot.kind}`}
      aria-label={snapshot.title}
    >
      <div className="site-footer__snapshot-screen" aria-hidden="true">
        {snapshot.kind === 'quote' ? (
          <div className="site-footer__snapshot-quote">
            <span>{'//'}</span>
            <strong>BUILD</strong>
            <strong>SHIP</strong>
            <strong>REPEAT</strong>
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

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      aria-label="Site footer"
      data-motion="rise"
      data-motion-duration="section"
    >
      <div className="site-container">
        <div className="site-footer__top">
          <section className="site-footer__panel site-footer__profile">
            <div className="site-footer__profile-head">
              <div className="site-footer__avatar-wrap">
                <Image
                  className="site-footer__avatar"
                  src={footerBio.image}
                  alt={footerBio.name}
                  width={148}
                  height={148}
                />
                <span className="site-footer__avatar-status" aria-hidden="true" />
              </div>

              <div className="site-footer__identity">
                <h2>{footerBio.name}</h2>
                <p>{footerBio.role}</p>
              </div>
            </div>

            <div className="site-footer__bio">
              {footerBio.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="site-footer__availability">
              <span />
              <strong>Available</strong>
              <p>{footerBio.availability}</p>
            </div>

            <div className="site-footer__connect">
              <span>Connect</span>

              <div className="site-footer__socials">
                {footerSocialLinks.map((social) => (
                  <FooterSocialLinkItem social={social} key={social.id} />
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
                  <h2>X Signals</h2>
                  <p>@ak_dev</p>
                </div>
              </div>

              <a href={footerFeedLinks.x} className="site-footer__view-link">
                View more on X
                <ArrowUpRightIcon />
              </a>
            </header>

            <div className="site-footer__posts">
              {footerXPosts.map((post) => (
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

                  <div className="site-footer__post-meta" aria-label="Post metrics">
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
          </section>

          <section className="site-footer__panel site-footer__snapshots">
            <header className="site-footer__panel-header">
              <div className="site-footer__panel-title">
                <span className="site-footer__panel-icon site-footer__panel-icon--instagram">
                  <InstagramIcon />
                </span>

                <div>
                  <h2>Build Snapshots</h2>
                  <p>Instagram visual log</p>
                </div>
              </div>

              <a href={footerFeedLinks.instagram} className="site-footer__view-link">
                View on Instagram
                <ArrowUpRightIcon />
              </a>
            </header>

            <div className="site-footer__snapshot-grid">
              {footerSnapshots.map((snapshot) => (
                <SnapshotCard snapshot={snapshot} key={snapshot.id} />
              ))}
            </div>

            <div className="site-footer__newsletter">
              <div className="site-footer__newsletter-copy">
                <div className="site-footer__newsletter-title">
                  <MailIcon />
                  <h3>Build Notes</h3>
                </div>

                <p>
                  Notes on engineering, architecture and better products.
                </p>
              </div>

              <NewsletterForm />
            </div>
          </section>
        </div>

        <div className="site-footer__bottom">
          <Logo />

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <CookieSettingBanner />
            {footerLinks.map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="site-footer__copyright">
            © 2026 Built with <span>❤️</span>, clean architecture and <em>lot</em> of <span>☕️</span>.
          </p>
        </div>
      </div>
    </footer>
  )
}
