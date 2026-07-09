import type { ComponentType, SVGProps } from 'react'

import { PortfolioSection } from '@/components/home/PortfolioSection'

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
      <path d="M21 4 3 11.2l7 2.1L17 8l-4.7 6.5L18 20l3-16Z" />
      <path d="m10 13.3 2.3 6.7" />
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
      <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.1-3.4-1.1-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.8 1 .8 2v2.4c0 .3.2.6.8.5A9.2 9.2 0 0 0 12 2.8Z" />
    </svg>
  )
}

function LinkedinIcon(props: IconProps) {
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
      <path d="M5 9v10" />
      <path d="M5 5.5v.1" />
      <path d="M10 19v-6.2c0-2.1 1.4-3.8 3.5-3.8s3.5 1.7 3.5 3.8V19" />
      <path d="M10 9v10" />
      <path d="M3 3h18v18H3V3Z" />
    </svg>
  )
}

function XIcon(props: IconProps) {
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
      <path d="m5 5 14 14" />
      <path d="m19 5-6.2 7.1" />
      <path d="m11.2 14-6.2 5" />
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
      <svg className="contact-cta__map-svg" viewBox="0 0 760 470" aria-hidden="true">
        <path
          className="contact-cta__map-zone"
          d="M54 82 168 52l92 42 110-28 112 46 132-18 88 74-18 154-82 86-145 15-108-39-117 38-124-54-58-116 4-170Z"
        />
        <path
          className="contact-cta__river"
          d="M426 22c-28 44-22 86 11 128 32 41 40 86 10 134-32 51-25 96 22 134"
        />
        <path
          className="contact-cta__road contact-cta__road--primary"
          d="M90 330c91-66 170-87 265-91 101-5 190-43 292-130"
        />
        <path
          className="contact-cta__road"
          d="M76 176c92 26 166 61 229 104 70 47 161 68 288 73"
        />
        <path
          className="contact-cta__road"
          d="M146 82c19 76 43 137 72 182 36 56 46 102 30 146"
        />
        <path
          className="contact-cta__road"
          d="M316 76c-15 70-8 126 23 168 39 53 44 107 18 162"
        />
        <path
          className="contact-cta__road"
          d="M574 102c-47 54-72 112-75 174-3 59-20 106-53 140"
        />
        <path
          className="contact-cta__route"
          d="M118 386c75-68 146-113 213-136 78-28 171-23 278 12"
        />
        <circle className="contact-cta__node" cx="170" cy="146" r="5" />
        <circle className="contact-cta__node" cx="246" cy="244" r="5" />
        <circle className="contact-cta__node" cx="330" cy="128" r="5" />
        <circle className="contact-cta__node" cx="512" cy="210" r="5" />
        <circle className="contact-cta__node" cx="620" cy="320" r="5" />
        <circle className="contact-cta__node" cx="376" cy="318" r="5" />
      </svg>

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
      number="06"
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

            <label className="contact-cta__field">
              <span className="contact-cta__field-icon">
                <LayersIcon />
              </span>
              <span className="sr-only">Project Type</span>
              <select name="projectType" defaultValue="">
                <option value="" disabled>
                  Project Type
                </option>
                <option value="website">Website</option>
                <option value="web-app">Web App</option>
                <option value="architecture">Architecture Review</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
            </label>

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
