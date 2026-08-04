import type { ComponentType, SVGProps } from 'react'
import Image from 'next/image'

import {
  ClockIcon,
  GithubIcon,
  LinkIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  XIcon,
} from '@/components/icons'
import { PortfolioSection } from '@/components/home/PortfolioSection'
import type {
  ContactChannelIcon,
  ContactChannelViewModel,
  ContactSectionViewModel,
  ContactSocialIcon,
} from '@/lib/cms/homepage'

import { ContactForm } from './ContactForm'
import styles from './ContactCTA.module.scss'
import mapStyles from './ContactCTAMap.module.scss'
import formStyles from './ContactFormFoundation.module.scss'
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type ContactCTAProps = {
  content: ContactSectionViewModel
}

const CHANNEL_ICONS: Record<ContactChannelIcon, IconComponent> = {
  clock: ClockIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  pin: PinIcon,
  telegram: TelegramIcon,
}

const SOCIAL_ICONS: Record<ContactSocialIcon, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  telegram: TelegramIcon,
  x: XIcon,
}

function ContactChannelItem({ channel }: { channel: ContactChannelViewModel }) {
  const Icon = CHANNEL_ICONS[channel.icon]
  const content = (
    <>
      <span className={styles.channelIcon}>
        <Icon />
      </span>
      <span className={styles.channelCopy}>
        <span>{channel.label}</span>
        <strong>{channel.value}</strong>
      </span>
    </>
  )

  if (channel.href) {
    return (
      <a
        className={styles.channel}
        href={channel.href}
        rel={channel.external ? 'noreferrer' : undefined}
        target={channel.external ? '_blank' : undefined}
      >
        {content}
      </a>
    )
  }

  return <div className={styles.channel}>{content}</div>
}

function ContactMap({ content }: { content: ContactSectionViewModel }) {
  return (
    <div className={mapStyles.mapPanel}>
      <Image
        className={mapStyles.mapImage}
        src="/images/contact/kyiv-map.png"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        quality={75}
        sizes="(max-width: 1180px) 100vw, 56vw"
      />

      <div className={mapStyles.mapOverlay} aria-hidden="true" />

      <div className={mapStyles.pin} aria-hidden="true">
        <PinIcon />
        <span />
      </div>

      {content.location ? (
        <div className={mapStyles.locationBadge}>
          <PinIcon />
          {content.location}
        </div>
      ) : null}

      <div className={styles.contactCard}>
        {content.channels.length > 0 ? (
          <div className={styles.channels}>
            {content.channels.map((channel) => (
              <ContactChannelItem channel={channel} key={channel.id} />
            ))}
          </div>
        ) : (
          <p className={styles.empty} role="status">
            Contact details are being updated.
          </p>
        )}

        {content.socialLinks.length > 0 ? (
          <div className={styles.socials} aria-label="Social links">
            {content.socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon]

              return (
                <a
                  className={styles.socialLink}
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
        ) : null}

        <div className={styles.availability} data-tone={content.availability.tone}>
          <span />
          {content.availability.label}
        </div>
      </div>
    </div>
  )
}

function ContactTitle({ title }: { title: ContactSectionViewModel['title'] }) {
  return (
    <>
      {title.leading}
      {title.accent ? (
        <>
          {title.leading ? ' ' : null}
          <span className={styles.titleAccent}>{title.accent}</span>
        </>
      ) : null}
      {title.trailing ? ` ${title.trailing}` : null}
    </>
  )
}

export function ContactCTA({ content }: ContactCTAProps) {
  return (
    <PortfolioSection
      id="contact"
      eyebrow={content.eyebrow}
      title={<ContactTitle title={content.title} />}
      description={content.description}
      number="07"
      footer={{
        icon: LinkIcon,
        label: content.footer.label,
        text: content.footer.text,
      }}
    >
      <div
        className={[
          styles.root,
          formStyles.scope,
          content.form.enabled ? null : styles.channelsOnly,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <ContactMap content={content} />

        {content.form.enabled ? (
          <section className={styles.formPanel} aria-labelledby="contact-form-title">
            <div className={styles.formHeader}>
              <h3 id="contact-form-title">{content.form.title}</h3>
              <p>{content.form.description}</p>
            </div>

            <ContactForm />
          </section>
        ) : null}
      </div>
    </PortfolioSection>
  )
}
