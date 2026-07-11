import type { ComponentType, SVGProps } from 'react'

import { PortfolioSection } from '@/components/home/PortfolioSection'
import { ProjectTypeSelect } from '@/components/home/ProjectTypeSelect'

type ContactCTAProps = {
  contact?: unknown
  contactSection?: unknown
}

type IconProps = SVGProps<SVGSVGElement>

type ContactChannel = {
  id: string
  label: string
  value: string
  href?: string
  icon: ComponentType<IconProps>
}

type SocialLink = {
  id: string
  label: string
  href: string
  icon: ComponentType<IconProps>
}

function ArrowUpRightIcon(props: IconProps) {
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
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

function LinkIcon(props: IconProps) {
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
      <path d="M10.4 13.6a4 4 0 0 0 5.7 0l2.2-2.2a4 4 0 0 0-5.7-5.7l-1.2 1.2" />
      <path d="M13.6 10.4a4 4 0 0 0-5.7 0l-2.2 2.2a4 4 0 0 0 5.7 5.7l1.2-1.2" />
    </svg>
  )
}

function MailIcon(props: IconProps) {
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
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z" />
    </svg>
  )
}

function PinIcon(props: IconProps) {
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
      <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
      <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
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

function UserIcon(props: IconProps) {
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
      <path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" />
      <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  )
}


function MessageIcon(props: IconProps) {
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
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8" />
      <path d="M8 12h5" />
    </svg>
  )
}

function LockIcon(props: IconProps) {
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
      <path d="M7 10V8a5 5 0 0 1 10 0v2" />
      <path d="M6 10h12v10H6V10Z" />
      <path d="M12 14v2" />
    </svg>
  )
}

function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
    </svg>
  )
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  )
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.293 19.494h2.039L6.486 3.24H4.298l13.31 17.407Z" />
    </svg>
  )
}

const contactChannels: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'andrii.kulahin.dev@gmail.com',
    href: 'mailto:andrii.kulahin.dev@gmail.com',
    icon: MailIcon,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@ak_dev',
    href: 'https://t.me/ak_dev',
    icon: TelegramIcon,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Kyiv, Ukraine',
    icon: PinIcon,
  },
  {
    id: 'availability',
    label: 'Availability',
    value: 'Open for freelance & product work',
    icon: ClockIcon,
  },
]

const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/clearfixx',
    icon: GithubIcon,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: LinkedinIcon,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/ak_dev',
    icon: TelegramIcon,
  },
  {
    id: 'x',
    label: 'X',
    href: '#',
    icon: XIcon,
  },
]

function ContactChannelItem({ channel }: { channel: ContactChannel }) {
  const Icon = channel.icon

  const content = (
    <>
      <span className="contact-cta__channel-icon">
        <Icon />
      </span>

      <span className="contact-cta__channel-copy">
        <span>{channel.label}</span>
        <strong>{channel.value}</strong>
      </span>
    </>
  )

  if (channel.href) {
    return (
      <a className="contact-cta__channel" href={channel.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return <div className="contact-cta__channel">{content}</div>
}

function KyivMap() {
  return (
    <div className="contact-cta__map-panel">
      <div className="contact-cta__map-image" aria-hidden="true" />

      <div className="contact-cta__map-overlay" aria-hidden="true" />

      <div className="contact-cta__pin" aria-hidden="true">
        <PinIcon />
        <span />
      </div>

      <div className="contact-cta__location-badge">
        <PinIcon />
        Kyiv, Ukraine
      </div>

      <div className="contact-cta__contact-card">
        <div className="contact-cta__channels">
          {contactChannels.map((channel) => (
            <ContactChannelItem channel={channel} key={channel.id} />
          ))}
        </div>

        <div className="contact-cta__socials" aria-label="Social links">
          {socialLinks.map((social) => {
            const Icon = social.icon

            return (
              <a
                className="contact-cta__social-link"
                href={social.href}
                key={social.id}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>

        <div className="contact-cta__availability">
          <span />
          Available
        </div>
      </div>
    </div>
  )
}

export function ContactCTA({ contact, contactSection }: ContactCTAProps) {
  void contact
  void contactSection

  return (
    <PortfolioSection
      id="contact"
      eyebrow="CONTACT"
      title={
        <>
          Not enough? <span className="contact-cta__title-accent">Let&apos;s talk.</span>
        </>
      }
      description="If you need a scalable product, clean architecture and reliable delivery — I’m ready to discuss your project."
      number="07"
      footer={{
        icon: LinkIcon,
        label: 'Mission link',
        text: 'Open for freelance, product work and collaboration.',
      }}
    >
      <div className="contact-cta">
        <KyivMap />

        <section className="contact-cta__form-panel" aria-labelledby="contact-form-title">
          <div className="contact-cta__form-header">
            <h3 id="contact-form-title">Start the conversation</h3>
            <p>Tell me what you’re building, what you need, and where you need help.</p>
          </div>

          <form className="contact-cta__form">
            <label className="contact-cta__field">
              <span className="contact-cta__field-icon">
                <UserIcon />
              </span>
              <span className="sr-only">Your Name</span>
              <input name="name" type="text" placeholder="Your Name" autoComplete="name" />
            </label>

            <label className="contact-cta__field">
              <span className="contact-cta__field-icon">
                <MailIcon />
              </span>
              <span className="sr-only">Your Email</span>
              <input name="email" type="email" placeholder="Your Email" autoComplete="email" />
            </label>

            <ProjectTypeSelect />

            <label className="contact-cta__field contact-cta__field--message">
              <span className="contact-cta__field-icon">
                <MessageIcon />
              </span>
              <span className="sr-only">Message</span>
              <textarea name="message" placeholder="Message" maxLength={1000} />
              <span className="contact-cta__counter">0 / 1000</span>
            </label>

            <button className="contact-cta__submit" type="button">
              Start the conversation
              <ArrowUpRightIcon />
            </button>

            <p className="contact-cta__privacy">
              <LockIcon />
              Your message is private and secure.
            </p>
          </form>
        </section>
      </div>
    </PortfolioSection>
  )
}
