import Link from 'next/link'

export type PublicBreadcrumbItem = {
  href?: string
  label: string
}

type PublicBreadcrumbsProps = {
  className?: string
  items: PublicBreadcrumbItem[]
}

export function PublicBreadcrumbs({ className, items }: PublicBreadcrumbsProps) {
  const classes = ['public-breadcrumbs', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>

        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li className={isCurrent ? 'is-current' : undefined} key={`${item.label}-${index}`}>
              <span className="public-breadcrumbs__separator" aria-hidden="true">
                /
              </span>

              {item.href && !isCurrent ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span
                  className="public-breadcrumbs__current"
                  aria-current={isCurrent ? 'page' : undefined}
                  title={isCurrent ? item.label : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
