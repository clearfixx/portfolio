import styles from './TechnicalPreviewPlaceholder.module.scss'

type TechnicalPreviewPlaceholderProps = {
  className?: string
  label?: string
  variant?: 'code' | 'terminal'
}

export function TechnicalPreviewPlaceholder({
  className,
  label = 'SYSTEM PREVIEW',
  variant = 'terminal',
}: TechnicalPreviewPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.preview}${className ? ` ${className}` : ''}`}
      data-variant={variant}
    >
      <header className={styles.titlebar}>
        <span className={styles.trafficLights}>
          <i />
          <i />
          <i />
        </span>
        <strong>{variant === 'terminal' ? 'system.log' : 'article.preview.ts'}</strong>
        <small>{label}</small>
      </header>

      {variant === 'terminal' ? (
        <div className={styles.terminal}>
          <p>
            <span>$</span>
            pnpm build
          </p>
          <p>
            <i>✓</i>
            Compiled successfully
          </p>
          <p>
            <i>✓</i>
            Type checking complete
          </p>
          <p>
            <i>✓</i>
            Route manifest generated
          </p>
          <p className={styles.ready}>
            <span>●</span>
            system ready
          </p>
        </div>
      ) : (
        <ol className={styles.code}>
          <li>
            <span>1</span>
            <code>
              <b>const</b> article = <em>await</em> journal.<strong>read</strong>()
            </code>
          </li>
          <li>
            <span>2</span>
            <code>
              <b>if</b> (!article) <em>throw</em> <strong>notFound</strong>()
            </code>
          </li>
          <li>
            <span>3</span>
            <code>
              <b>return</b> article.<strong>render</strong>()
            </code>
          </li>
        </ol>
      )}

      <footer className={styles.statusbar}>
        <span>main*</span>
        <span>UTF-8</span>
        <span>Portfolio</span>
      </footer>
    </div>
  )
}
