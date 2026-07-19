import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function PackageIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.8 7.5 4.3 7.5-4.3" />
      <path d="M12 12v9" />
      <path d="m8 5.2 8 4.5" />
    </ProjectIcon>
  )
}
