import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, XIcon } from '@/components/icons'
import type { SiteFooterSocialIcon, SiteFooterSocialLinkViewModel } from '@/lib/cms/homepage'
import type { ComponentType, SVGProps } from 'react'

import { ProjectsWorldMap } from './ProjectsWorldMap'
import styles from './ProjectsIndexCTA.module.scss'

type IconProps = SVGProps<SVGSVGElement>

type ProjectsIndexCTAContent = {
  terminalLabel: string
  terminalCommand: string
  terminalPrompt: string
  identityLines?: Array<{ id?: string | null; text: string }> | null
  eyebrow: string
  title: string
}

type ProjectsIndexCTAProps = {
  content: ProjectsIndexCTAContent
  socialLinks: SiteFooterSocialLinkViewModel[]
}

const iconMap: Record<SiteFooterSocialIcon, ComponentType<IconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  telegram: TelegramIcon,
  x: XIcon,
}

const preferredOrder: SiteFooterSocialIcon[] = ['mail', 'linkedin', 'github', 'telegram', 'x']

const labelMap: Partial<Record<SiteFooterSocialIcon, string>> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  mail: 'Email Me',
  telegram: 'Telegram',
  x: 'X',
}

export function ProjectsIndexCTA({ content, socialLinks }: ProjectsIndexCTAProps) {
  const visibleLinks = [...socialLinks]
    .sort((left, right) => preferredOrder.indexOf(left.icon) - preferredOrder.indexOf(right.icon))
    .slice(0, 4)

  return (
    <section aria-labelledby="projects-registry-cta-title" className={styles.cta}>
      <div className={styles.terminal}>
        <p>{content.terminalLabel}</p>

        <div>
          <code>{content.terminalCommand}</code>
          {content.identityLines?.map((line) => (
            <span key={line.id ?? line.text}>&gt; {line.text}</span>
          ))}
          <code>
            {content.terminalPrompt} <i aria-hidden="true" />
          </code>
        </div>
      </div>

      <div className={styles.content}>
        <p>{content.eyebrow}</p>
        <h2 id="projects-registry-cta-title">{content.title}</h2>

        {visibleLinks.length > 0 ? (
          <div className={styles.links}>
            {visibleLinks.map((social) => {
              const Icon = iconMap[social.icon]

              return (
                <a
                  href={social.href}
                  key={social.id}
                  rel={social.external ? 'noreferrer' : undefined}
                  target={social.external ? '_blank' : undefined}
                >
                  <Icon aria-hidden="true" />
                  <span>{labelMap[social.icon] ?? social.label}</span>
                </a>
              )
            })}
          </div>
        ) : null}
      </div>

      <ProjectsWorldMap />
    </section>
  )
}
