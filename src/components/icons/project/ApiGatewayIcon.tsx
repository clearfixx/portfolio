import { ProjectIcon } from './ProjectIcon'
import type { ProjectIconProps } from './ProjectIcon'

export function ApiGatewayIcon(props: ProjectIconProps) {
  return (
    <ProjectIcon {...props}>
      <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8V6M10.1 13.1 7 15M13.9 13.1 17 15" />
    </ProjectIcon>
  )
}
