export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <p>© {new Date().getFullYear()} Portfolio. Built with Next.js and Payload.</p>
      </div>
    </footer>
  )
}
