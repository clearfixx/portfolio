import Link from 'next/link'

type PublicBreadcrumbItem = {
  href?: string
  label: string
}

type PublicBreadcrumbsProps = {
  items: PublicBreadcrumbItem[]
}

export function PublicBreadcrumbs({ items }: PublicBreadcrumbsProps) {
  return (
    <nav className="public-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>

        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`}>
              <span className="public-breadcrumbs__separator" aria-hidden="true">
                /
              </span>

              {item.href && !isCurrent ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
