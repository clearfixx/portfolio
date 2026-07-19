import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ShieldCheckIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="M12 3 5 6v5c0 4.7 2.9 8 7 10 4.1-2 7-5.3 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </ProjectIcon>
  )
}
