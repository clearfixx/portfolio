import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function RocketIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M14.5 4.5c2.2-1.7 4.5-1.5 5-1 .5.5.7 2.8-1 5l-5.2 5.2-3-3 4.2-6.2Z" />
      <path d="m10.3 10.7-4.8.8L3 14l5 2 2 5 2.5-2.5.8-4.8" />
      <circle cx="16.2" cy="7.8" r="1.4" />
      <path d="M6.8 17.2 4 20" />
    </ProjectIcon>
  )
}
