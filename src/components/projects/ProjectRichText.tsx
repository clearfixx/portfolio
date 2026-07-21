import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'

import type { Project } from '@/payload-types'

type RichTextData = ComponentProps<typeof RichText>['data']

type ProjectRichTextProps = {
  data: Project['description']
}

function isRichTextData(value: unknown): value is RichTextData {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && 'root' in value
}

export function ProjectRichText({ data }: ProjectRichTextProps) {
  if (typeof data === 'string') {
    return <p>{data}</p>
  }

  if (!isRichTextData(data)) {
    return null
  }

  return <RichText data={data} />
}
