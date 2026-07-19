import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'

import type { Project } from '@/payload-types'

type RichTextData = ComponentProps<typeof RichText>['data']

type ProjectRichTextProps = {
  data: Project['description']
}

export function ProjectRichText({ data }: ProjectRichTextProps) {
  if (typeof data === 'string') {
    return <p>{data}</p>
  }

  if (!data || typeof data !== 'object') {
    return null
  }

  return <RichText data={data as RichTextData} />
}
