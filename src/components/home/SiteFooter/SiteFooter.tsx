import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

import {
  footerBio,
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

const GithubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
  </svg>
)

const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
)

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.293 19.494h2.039L6.486 3.24H4.298l13.31 17.407Z" />
  </svg>
)

const TelegramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z" />
  </svg>
)

const MailIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" {...props}>
    <path d="M4 6h16v12H4V6Z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

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

const ArrowUpRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" {...props}>
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
)

const LockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" {...props}>
    <path d="M7 10V8a5 5 0 0 1 10 0v2" />
    <path d="M6 10h12v10H6V10Z" />
    <path d="M12 14v2" />
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
    <footer className="site-footer" aria-label="Site footer">
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

              <a href="#" className="site-footer__view-link">
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

              <a href="#" className="site-footer__view-link">
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

              <form className="site-footer__newsletter-form">
                <label className="site-footer__newsletter-field">
                  <span className="sr-only">What&apos;s a good email address?</span>
                  <input type="email" name="email" placeholder="What&apos;s a good email address?" />
                </label>

                <button type="button">Gimme!</button>

                <p className="site-footer__newsletter-note">
                  <LockIcon />
                  No spam. Unsubscribe anytime.
                </p>
              </form>
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
