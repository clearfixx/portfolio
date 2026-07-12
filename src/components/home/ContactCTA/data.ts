import type { ComponentType, SVGProps } from 'react'

import {
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon,
  TelegramIcon,
  XIcon,
} from '@/components/icons'

type IconProps = SVGProps<SVGSVGElement>

export type ContactChannel = {
  id: string
  label: string
  value: string
  href?: string
  icon: ComponentType<IconProps>
}

export type SocialLink = {
  id: string
  label: string
  href: string
  icon: ComponentType<IconProps>
}

export const contactChannels: ContactChannel[] = [
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

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/clearfixx',
    icon: GithubIcon,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://ua.linkedin.com/',
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
    href: 'https://x.com/',
    icon: XIcon,
  },
]
