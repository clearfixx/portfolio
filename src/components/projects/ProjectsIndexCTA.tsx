import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, XIcon } from '@/components/icons'
import type { SiteFooterSocialIcon, SiteFooterSocialLinkViewModel } from '@/lib/cms/homepage'
import type { ComponentType, SVGProps } from 'react'

import { ProjectsWorldMap } from './ProjectsWorldMap'

type IconProps = SVGProps<SVGSVGElement>

type ProjectsIndexCTAProps = {
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

export function ProjectsIndexCTA({ socialLinks }: ProjectsIndexCTAProps) {
  const visibleLinks = [...socialLinks]
    .sort((left, right) => preferredOrder.indexOf(left.icon) - preferredOrder.indexOf(right.icon))
    .slice(0, 4)

  return (
    <section aria-labelledby="projects-registry-cta-title" className="projects-registry-cta">
      <div className="projects-registry-cta__terminal">
        <p>TERMINAL</p>

        <div>
          <code>visitor@portfolio:~$ whoami</code>
          <span>&gt; Software engineer</span>
          <span>&gt; System builder</span>
          <span>&gt; Problem solver</span>
          <span>&gt; Lifelong learner</span>
          <code>
            visitor@portfolio:~$ <i aria-hidden="true" />
          </code>
        </div>
      </div>

      <div className="projects-registry-cta__content">
        <p>Have an idea?</p>
        <h2 id="projects-registry-cta-title">Let&apos;s build something amazing together.</h2>

        {visibleLinks.length > 0 ? (
          <div className="projects-registry-cta__links">
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
