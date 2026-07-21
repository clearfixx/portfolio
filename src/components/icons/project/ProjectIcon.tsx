import type { PropsWithChildren, SVGProps } from 'react'

export type ProjectIconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number | string
  title?: string
}

export function ProjectIcon({
  children,
  size = 24,
  strokeWidth = 1.5,
  title,
  ...props
}: PropsWithChildren<ProjectIconProps>) {
  const isDecorative = !title

  return (
    <svg
      aria-hidden={isDecorative ? true : undefined}
      fill="none"
      focusable="false"
      height={size}
      role={title ? 'img' : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}
