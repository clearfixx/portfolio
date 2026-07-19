type PublicEmptyStateProps = {
  description: string
  title: string
}

export function PublicEmptyState({ description, title }: PublicEmptyStateProps) {
  return (
    <div className="public-empty-state" role="status">
      <span className="public-empty-state__signal" aria-hidden="true" />
      <p>Content registry</p>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  )
}
