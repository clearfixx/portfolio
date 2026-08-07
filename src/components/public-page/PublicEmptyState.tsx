import styles from './PublicEmptyState.module.scss'

type PublicEmptyStateProps = {
  description: string
  title: string
}

export function PublicEmptyState({ description, title }: PublicEmptyStateProps) {
  return (
    <div className={styles.emptyState} role="status">
      <span className={styles.signal} aria-hidden="true" />
      <p>Content registry</p>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  )
}
