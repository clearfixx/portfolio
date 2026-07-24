import Image from 'next/image'
import type { ComponentType, SVGProps } from 'react'

import { ContactForm } from '@/components/home/ContactCTA/ContactForm'
import {
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  XIcon,
} from '@/components/icons'
import { PublicBreadcrumbs, PublicPageHeroFrame, PublicPageShell } from '@/components/public-page'
import type {
  ContactChannelIcon,
  ContactSocialIcon,
  ContactsPageViewModel,
  ContactsStatusIcon,
} from '@/lib/cms'

import styles from '@/app/(frontend)/styles/pages/contacts.module.scss'

// contacts-page-foundation-v1

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

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

function StatusIcon({ name }: { name: ContactsStatusIcon }) {
  if (name === 'clock') {
    return <ClockIcon />
  }

  if (name === 'pin') {
    return <PinIcon />
  }

  if (name === 'signal') {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <path d="M3 9h18M8 9v11M11 13h6M11 16h4" />
    </svg>
  )
}

function SplitTitle({ title }: { title: ContactsPageViewModel['hero']['title'] }) {
  return (
    <>
      {title.leading}
      {title.accent ? (
        <>
          {title.leading ? ' ' : null}
          <span>{title.accent}</span>
        </>
      ) : null}
      {title.trailing ? ` ${title.trailing}` : null}
    </>
  )
}

function StatusConsole({ content }: { content: ContactsPageViewModel }) {
  return (
    <aside
      aria-label="Contact channel status"
      className={styles.statusConsole}
      data-status={content.status.availability.tone}
    >
      <div aria-hidden="true" className={styles.consoleGrid} />

      <header>
        <div>
          <span>CONTACT_PROTOCOL</span>
          <strong>Transmission channel</strong>
        </div>
        <b>
          <i />
          {content.status.availability.label}
        </b>
      </header>

      <dl>
        {content.status.items.map((item) => (
          <div key={item.id}>
            <dt>
              <span>
                <StatusIcon name={item.icon} />
              </span>
              {item.label}
            </dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <footer>
        <span>ENCRYPTION</span>
        <strong>PRIVATE_MESSAGE / READY</strong>
      </footer>
    </aside>
  )
}

function ChannelsPanel({ content }: { content: ContactsPageViewModel }) {
  return (
    <section
      aria-labelledby="contacts-channels-title"
      className={styles.channelsPanel}
      data-motion="rise"
    >
      <Image
        alt=""
        aria-hidden="true"
        className={styles.mapImage}
        fill
        loading="lazy"
        quality={75}
        sizes="(max-width: 980px) 100vw, 46vw"
        src="/images/contact/kyiv-map.png"
      />
      <div aria-hidden="true" className={styles.mapOverlay} />
      <div aria-hidden="true" className={styles.mapSignal}>
        <span />
        <i />
        <b />
      </div>

      <header className={styles.panelHeading}>
        <span>{content.channels.eyebrow}</span>
        <h2 id="contacts-channels-title">{content.channels.title}</h2>
        <p>{content.channels.description}</p>
      </header>

      <div className={styles.channelDeck}>
        {content.contact.channels.length > 0 ? (
          content.contact.channels.map((channel) => {
            const Icon = CHANNEL_ICONS[channel.icon]
            const channelContent = (
              <>
                <span className={styles.channelIcon}>
                  <Icon />
                </span>
                <span className={styles.channelCopy}>
                  <small>{channel.label}</small>
                  <strong>{channel.value}</strong>
                </span>
                {channel.href ? (
                  <span aria-hidden="true" className={styles.channelArrow}>
                    ↗
                  </span>
                ) : null}
              </>
            )

            return channel.href ? (
              <a
                className={styles.channel}
                href={channel.href}
                key={channel.id}
                rel={channel.external ? 'noreferrer' : undefined}
                target={channel.external ? '_blank' : undefined}
              >
                {channelContent}
              </a>
            ) : (
              <div className={styles.channel} key={channel.id}>
                {channelContent}
              </div>
            )
          })
        ) : (
          <p className={styles.emptyState}>Contact channels are being updated.</p>
        )}
      </div>

      <div className={styles.locationBadge}>
        <PinIcon />
        {content.contact.location ?? 'Remote / Ukraine'}
      </div>
    </section>
  )
}

function ContactFormPanel({ content }: { content: ContactsPageViewModel }) {
  if (!content.form.enabled) {
    return (
      <section className={`${styles.formPanel} ${styles.formUnavailable}`} data-motion="rise">
        <span>{content.form.eyebrow}</span>
        <h2>{content.form.title}</h2>
        <p>The public form is currently disabled. Use one of the direct channels instead.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="contacts-form-title" className={styles.formPanel} data-motion="rise">
      <header className={styles.panelHeading}>
        <span>{content.form.eyebrow}</span>
        <h2 id="contacts-form-title">{content.form.title}</h2>
        <p>{content.form.description}</p>
      </header>

      <div className={`contact-cta ${styles.formScope}`}>
        <ContactForm source="contact-page" />
      </div>
    </section>
  )
}

function ProcessSection({ content }: { content: ContactsPageViewModel }) {
  return (
    <section aria-labelledby="contacts-process-title" className={styles.process} data-motion="rise">
      <header className={styles.sectionHeading}>
        <div>
          <span>{content.process.eyebrow}</span>
          <h2 id="contacts-process-title">{content.process.title}</h2>
        </div>
        <p>{content.process.description}</p>
      </header>

      <ol>
        {content.process.steps.map((step, index) => (
          <li key={step.id}>
            <div className={styles.stepRail}>
              <span>{step.code}</span>
              <i />
            </div>
            <div>
              <small>STEP_{String(index + 1).padStart(2, '0')}</small>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function SocialSection({ content }: { content: ContactsPageViewModel }) {
  if (!content.social.enabled) {
    return null
  }

  const emailChannel = content.contact.channels.find(
    (channel) => channel.id === 'email' && channel.href,
  )

  return (
    <section
      aria-labelledby="contacts-social-title"
      className={styles.socialPanel}
      data-motion="rise"
    >
      <div>
        <span>{content.social.eyebrow}</span>
        <h2 id="contacts-social-title">{content.social.title}</h2>
        <p>{content.social.description}</p>
      </div>

      <nav aria-label="Public social channels">
        {content.social.links.map((social) => {
          const Icon = SOCIAL_ICONS[social.icon]

          return (
            <a href={social.href} key={social.id} rel="noreferrer" target="_blank">
              <Icon />
              <span>{social.label}</span>
              <b aria-hidden="true">↗</b>
            </a>
          )
        })}

        {emailChannel?.href ? (
          <a className={styles.emailSocialLink} href={emailChannel.href}>
            <MailIcon />
            <span>Send a direct email</span>
            <b aria-hidden="true">↗</b>
          </a>
        ) : null}
      </nav>
    </section>
  )
}

export function ContactsPage({ content }: { content: ContactsPageViewModel }) {
  const preferredHeroChannelIds = ['email', 'telegram', 'phone']
  const heroChannels = preferredHeroChannelIds
    .flatMap((channelId) => {
      const channel = content.contact.channels.find(
        (candidate) => candidate.id === channelId && candidate.href,
      )

      return channel ? [channel] : []
    })
    .slice(0, 2)

  if (!content.enabled) {
    return null
  }

  return (
    <main className={styles.page} id="main-content">
      <PublicPageShell className={styles.shell} variant="index">
        <PublicBreadcrumbs items={[{ label: content.breadcrumbLabel }]} />

        <PublicPageHeroFrame
          aria-labelledby="contacts-page-title"
          className={styles.hero}
          variant="index"
        >
          <div className={styles.heroCopy} data-motion="rise">
            <p className={styles.eyebrow}>
              <span aria-hidden="true">{'//'}</span>
              {content.hero.eyebrow}
            </p>
            <h1 id="contacts-page-title">
              <SplitTitle title={content.hero.title} />
            </h1>
            <p className={styles.heroDescription}>{content.hero.description}</p>

            {heroChannels.length > 0 ? (
              <div aria-label="Preferred contact channels" className={styles.heroActions}>
                {heroChannels.map((channel) => {
                  const Icon = CHANNEL_ICONS[channel.icon]

                  if (!channel.href) {
                    return null
                  }

                  return (
                    <a
                      className={styles.heroAction}
                      href={channel.href}
                      key={channel.id}
                      rel={channel.external ? 'noreferrer' : undefined}
                      target={channel.external ? '_blank' : undefined}
                    >
                      <span>
                        <Icon />
                      </span>
                      <small>{channel.label}</small>
                      <strong>{channel.value}</strong>
                      <b aria-hidden="true">↗</b>
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>

          <div className={styles.heroVisual} data-motion="rise">
            <StatusConsole content={content} />
          </div>
        </PublicPageHeroFrame>

        <div className={styles.workspace}>
          <ChannelsPanel content={content} />
          <ContactFormPanel content={content} />
        </div>

        <ProcessSection content={content} />
        <SocialSection content={content} />
      </PublicPageShell>
    </main>
  )
}

// contacts-page-polish-devtools-workaround-v1-5
