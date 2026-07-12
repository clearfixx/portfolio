import { notFound, redirect } from 'next/navigation'

const articleSlugs = [
  'portfolio-sections-system-thinking',
  'building-dss-universe',
] as const

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  if (!(articleSlugs as readonly string[]).includes(slug)) {
    notFound()
  }

  redirect('/#insights')
}
