import Image from 'next/image'

import {
  ArrowUpRightIcon,
  ContactUserIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MessageIcon,
  PinIcon,
} from '@/components/icons'

import { PortfolioSection } from '@/components/home/PortfolioSection'
import { ProjectTypeSelect } from '@/components/home/ProjectTypeSelect'

import {
  contactChannels,
  socialLinks,
  type ContactChannel,
} from './data'

type ContactCTAProps = {
  contact?: unknown
  contactSection?: unknown
}

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
      <Image
        className="contact-cta__map-image"
        src="/images/contact/kyiv-map.png"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        quality={72}
        sizes="(max-width: 1180px) 100vw, 56vw"
      />

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
                <ContactUserIcon />
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
