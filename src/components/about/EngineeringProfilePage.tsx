import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { AboutPageViewModel, AboutProfileIconName, AboutProfileViewModel } from '@/lib/cms'
import { PublicBreadcrumbs, PublicPageHeroFrame, PublicPageShell } from '@/components/public-page'
import { EngineeringProfileMotion } from './EngineeringProfileMotion'

import styles from '@/app/(frontend)/styles/pages/about.module.scss'

// about-live-data-integration-v2

function ProfileIcon({ name, size = 18 }: { name: AboutProfileIconName; size?: number }) {
  const paths: Record<AboutProfileIconName, ReactNode> = {
    architecture: (
      <>
        <path d="M4 18V9l8-5 8 5v9" />
        <path d="M8 18v-5h8v5M3 20h18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    automation: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <circle cx="12" cy="12" r="4" />
        <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </>
    ),
    code: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        <path d="m13 5-2 14" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    performance: (
      <>
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="m12 13 4-4" />
        <path d="M7 17h10" />
      </>
    ),
    product: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h5M8 17h3" />
      </>
    ),
    signal: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    ),
    system: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 9v11" />
        <path d="M11 13h6M11 16h4" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
        {paths[name]}
      </g>
    </svg>
  )
}

function SectionHeading({
  description,
  eyebrow,
  title,
}: {
  description?: string
  eyebrow: string
  title: string
}) {
  return (
    <header className={styles.sectionHeading}>
      <span>{eyebrow}</span>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  )
}

function ProfileConsole({ profile }: { profile: AboutProfileViewModel }) {
  const details = [
    ['PROFILE_ID', profile.profileId],
    ['ROLE', profile.role],
    ['LOCATION', profile.location],
    ['EXPERIENCE', profile.experience],
    ['FOCUS', profile.focus],
    ['STATUS', profile.availability],
  ]

  return (
    <div
      aria-label={`${profile.name} engineering profile identity`}
      className={styles.profileConsole}
    >
      <div aria-hidden="true" className={styles.consoleGrid} />
      <div aria-hidden="true" className={styles.consoleCorners}>
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className={styles.identityVisual}>
        <div aria-hidden="true" className={styles.identityScanner} />
        <div className={`${styles.avatar}${profile.portrait ? ` ${styles.avatarWithImage}` : ''}`}>
          {profile.portrait ? (
            <Image
              alt={profile.portrait.alt}
              className={styles.avatarImage}
              fill
              priority
              sizes="160px"
              src={profile.portrait.src}
            />
          ) : (
            <span>{profile.initials}</span>
          )}
          <small>ENGINEER</small>
        </div>
        <div className={styles.onlineStatus}>
          <i />
          {profile.statusLabel}
        </div>
      </div>

      <dl className={styles.identityDetails}>
        {details.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div aria-hidden="true" className={styles.consoleTelemetry}>
        <span>
          <i />
          <i />
          <i />
        </span>
        <b>PROFILE CHANNEL / STABLE</b>
      </div>
    </div>
  )
}

export function EngineeringProfilePage({ content }: { content: AboutPageViewModel }) {
  const hasThinkingColumn = content.principles.enabled || content.operatingSystem.enabled
  const hasExperienceColumn = content.experience.enabled || content.currentFocus.enabled
  const hasFinalGrid = content.personalSignals.enabled || content.cta.enabled

  return (
    <EngineeringProfileMotion>
      <main className={styles.page} id="main-content">
        <PublicPageShell className={styles.shell} variant="index">
          <PublicBreadcrumbs items={[{ label: content.breadcrumbLabel }]} />

          {content.hero.enabled ? (
            <PublicPageHeroFrame className={styles.hero} variant="index">
              <div className={styles.heroCopy} data-profile-reveal>
                <div className={styles.availability}>
                  <i />
                  {content.hero.availabilityLabel}
                </div>
                <h1>
                  {content.hero.title}
                  <span> {content.hero.titleAccent}</span>
                </h1>
                <p>{content.hero.description}</p>

                <div className={styles.heroActions}>
                  {content.hero.actions.map((action) => (
                    <Link
                      className={
                        action.tone === 'primary' ? styles.primaryAction : styles.secondaryAction
                      }
                      href={action.href}
                      key={action.id}
                    >
                      {action.label}
                      <ProfileIcon name={action.icon} size={16} />
                    </Link>
                  ))}
                </div>

                <div aria-label="Profile summary" className={styles.heroSignals}>
                  {content.hero.signals.map((signal) => (
                    <span key={signal.id}>
                      <strong>{signal.value}</strong>
                      {signal.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.heroVisual} data-profile-reveal>
                <ProfileConsole profile={content.profile} />
              </div>
            </PublicPageHeroFrame>
          ) : null}

          {content.career.enabled ? (
            <section
              className={`${styles.panel} ${styles.timeline}`}
              data-profile-reveal
              id="career"
            >
              <SectionHeading
                description={content.career.description}
                eyebrow={content.career.eyebrow}
                title={content.career.title}
              />

              <ol className={styles.timelineList}>
                {content.career.items.map((entry, index) => (
                  <li key={entry.id}>
                    <div className={styles.timelineNode}>
                      <i />
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <span className={styles.period}>{entry.period}</span>
                    <h3>{entry.role}</h3>
                    <p>{entry.description}</p>
                    {entry.stack.length > 0 ? (
                      <div className={styles.tags}>
                        {entry.stack.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {hasThinkingColumn ? (
            <div className={styles.twoColumn}>
              {content.principles.enabled ? (
                <section className={`${styles.panel} ${styles.principles}`} data-profile-reveal>
                  <SectionHeading
                    description={content.principles.description}
                    eyebrow={content.principles.eyebrow}
                    title={content.principles.title}
                  />

                  <div className={styles.principleGrid}>
                    {content.principles.items.map((principle) => (
                      <article key={principle.id}>
                        <span className={styles.iconBox}>
                          <ProfileIcon name={principle.icon} />
                        </span>
                        <h3>{principle.title}</h3>
                        <p>{principle.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}

              {content.operatingSystem.enabled ? (
                <section
                  className={`${styles.panel} ${styles.operatingSystem}`}
                  data-profile-reveal
                >
                  <SectionHeading
                    description={content.operatingSystem.description}
                    eyebrow={content.operatingSystem.eyebrow}
                    title={content.operatingSystem.title}
                  />

                  <ol className={styles.operatingSteps}>
                    {content.operatingSystem.steps.map((step, index) => (
                      <li key={step.id}>
                        <div className={styles.stepNode}>
                          <span>{step.code}</span>
                          <ProfileIcon
                            name={
                              index === 0
                                ? 'compass'
                                : index === content.operatingSystem.steps.length - 1
                                  ? 'signal'
                                  : 'system'
                            }
                            size={16}
                          />
                        </div>
                        <strong>{step.label}</strong>
                        <small>{step.output}</small>
                      </li>
                    ))}
                  </ol>

                  <div className={styles.systemDetail}>
                    <div>
                      <span>{content.operatingSystem.currentStage.label}</span>
                      <strong>{content.operatingSystem.currentStage.title}</strong>
                      <p>{content.operatingSystem.currentStage.description}</p>
                    </div>
                    {content.operatingSystem.currentStage.items.length > 0 ? (
                      <ul>
                        {content.operatingSystem.currentStage.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className={styles.operatingInsights}>
                    <article>
                      <header>
                        <span className={styles.operatingInsightIcon}>
                          <ProfileIcon name="architecture" size={18} />
                        </span>
                        <div>
                          <small>{content.operatingSystem.guardrails.eyebrow}</small>
                          <h3>{content.operatingSystem.guardrails.title}</h3>
                        </div>
                        <b>{content.operatingSystem.guardrails.status}</b>
                      </header>

                      <ul>
                        {content.operatingSystem.guardrails.items.map((item) => (
                          <li key={item.id}>
                            <span>
                              <i />
                              {item.label}
                            </span>
                            <strong>{item.value}</strong>
                          </li>
                        ))}
                      </ul>
                    </article>

                    <article>
                      <header>
                        <span className={styles.operatingInsightIcon}>
                          <ProfileIcon name="layers" size={18} />
                        </span>
                        <div>
                          <small>{content.operatingSystem.outputs.eyebrow}</small>
                          <h3>{content.operatingSystem.outputs.title}</h3>
                        </div>
                        <b>{content.operatingSystem.outputs.status}</b>
                      </header>

                      <ol>
                        {content.operatingSystem.outputs.items.map((item, index) => (
                          <li key={item.id}>
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <div>
                              <strong>{item.title}</strong>
                              <small>{item.description}</small>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </article>
                  </div>

                  {content.operatingSystem.telemetry.length > 0 ? (
                    <div
                      aria-label="Engineering process status"
                      className={styles.operatingTelemetry}
                    >
                      {content.operatingSystem.telemetry.map((item) => (
                        <span data-tone={item.tone} key={item.id}>
                          <i />
                          {item.label}
                          <strong>{item.value}</strong>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}
            </div>
          ) : null}

          {hasExperienceColumn ? (
            <div className={styles.twoColumnWide}>
              {content.experience.enabled ? (
                <section className={`${styles.panel} ${styles.experience}`} data-profile-reveal>
                  <SectionHeading
                    description={content.experience.description}
                    eyebrow={content.experience.eyebrow}
                    title={content.experience.title}
                  />

                  <div className={styles.experienceTable}>
                    <div className={styles.experienceHeader}>
                      <span>Area</span>
                      <span>Level</span>
                      <span>Signal</span>
                      <span>Example</span>
                    </div>

                    {content.experience.items.map((entry) => (
                      <div className={styles.experienceRow} key={entry.id}>
                        <strong>{entry.area}</strong>
                        <span>{entry.level}</span>
                        <div
                          aria-label={`${entry.area}: ${entry.level}`}
                          className={styles.experienceSignal}
                        >
                          {Array.from({ length: 6 }, (_, index) => (
                            <i
                              className={index < entry.score ? styles.activeSignal : undefined}
                              key={index}
                            />
                          ))}
                        </div>
                        <span>{entry.example}</span>
                      </div>
                    ))}
                  </div>

                  {content.experience.summary.length > 0 ? (
                    <div className={styles.experienceSummary}>
                      {content.experience.summary.map((item) => (
                        <article key={item.id}>
                          <span>{item.label}</span>
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}

              {content.currentFocus.enabled ? (
                <section className={`${styles.panel} ${styles.currentFocus}`} data-profile-reveal>
                  <SectionHeading
                    description={content.currentFocus.description}
                    eyebrow={content.currentFocus.eyebrow}
                    title={content.currentFocus.title}
                  />

                  <article className={styles.primaryFocus}>
                    <div>
                      <span>{content.currentFocus.primaryLabel}</span>
                      <h3>{content.currentFocus.primaryProject.title}</h3>
                      <p>{content.currentFocus.primaryProject.description}</p>
                      <Link href={content.currentFocus.primaryProject.href}>
                        {content.currentFocus.primaryLinkLabel}
                        <ProfileIcon name="arrow" size={14} />
                      </Link>
                    </div>
                    <div aria-hidden="true" className={styles.systemOrb}>
                      <span />
                      <i />
                      <b />
                    </div>
                  </article>

                  {content.currentFocus.cards.length > 0 ? (
                    <div className={styles.focusGrid}>
                      {content.currentFocus.cards.map((card) => (
                        <article className={styles.focusCard} data-tone={card.tone} key={card.id}>
                          <div className={styles.focusCardRail}>
                            <span>{card.eyebrow}</span>
                            <b className={card.tone === 'purple' ? styles.isQueued : undefined}>
                              <i />
                              {card.status}
                            </b>
                          </div>

                          <span className={styles.focusCardIcon}>
                            <ProfileIcon name={card.icon} size={24} />
                          </span>

                          <h3>{card.title}</h3>
                          <p>{card.description}</p>

                          {card.tags.length > 0 ? (
                            <div className={styles.focusTags}>
                              {card.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>
                          ) : null}

                          <footer>
                            <span>{card.footerLabel}</span>
                            <strong>{card.footerValue}</strong>
                          </footer>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}
            </div>
          ) : null}

          {hasFinalGrid ? (
            <div className={styles.finalGrid}>
              {content.personalSignals.enabled ? (
                <section className={`${styles.panel} ${styles.beyond}`} data-profile-reveal>
                  <SectionHeading
                    description={content.personalSignals.description}
                    eyebrow={content.personalSignals.eyebrow}
                    title={content.personalSignals.title}
                  />

                  <div className={styles.personalSignals}>
                    {content.personalSignals.items.map((item, index) => (
                      <article key={item.id}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div aria-hidden="true" className={styles.signalCore}>
                    <span />
                    <span />
                    <span />
                    <i />
                    <b />
                  </div>
                </section>
              ) : null}

              {content.cta.enabled ? (
                <section className={styles.cta} data-profile-reveal>
                  <div aria-hidden="true" className={styles.ctaGrid} />
                  <span>{content.cta.eyebrow}</span>
                  <h2>
                    {content.cta.title}
                    <strong> {content.cta.titleAccent}</strong>
                  </h2>
                  <p>{content.cta.description}</p>
                  <Link href={content.cta.href}>
                    {content.cta.label}
                    <ProfileIcon name="arrow" size={16} />
                  </Link>
                </section>
              ) : null}
            </div>
          ) : null}
        </PublicPageShell>
      </main>
    </EngineeringProfileMotion>
  )
}
