import { notFound, redirect } from 'next/navigation'

const projectSlugs = ['dss-universe', 'jdmgram', 'gentlemens-barbershop', 'kinoplay'] as const

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  if (!(projectSlugs as readonly string[]).includes(slug)) {
    notFound()
  }

  redirect('/#projects')
}
