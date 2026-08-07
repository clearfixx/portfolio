import Link from 'next/link'

import styles from './PublicBreadcrumbs.module.scss'

export type PublicBreadcrumbItem = {
  href?: string
  label: string
}

type PublicBreadcrumbsProps = {
  className?: string
  items: PublicBreadcrumbItem[]
}

export function PublicBreadcrumbs({ className, items }: PublicBreadcrumbsProps) {
  const classes = [styles.breadcrumbs, className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>

        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li data-current={isCurrent || undefined} key={`${item.label}-${index}`}>
              <span className={styles.separator} aria-hidden="true">
                /
              </span>

              {item.href && !isCurrent ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span
                  className={styles.current}
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
