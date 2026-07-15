// Portfolio Admin Experience — shell polish

import { AdminMark } from './AdminMark'

export default function AdminLogo() {
  return (
    <div className="portfolio-admin-logo" aria-label="Portfolio Control Room">
      <AdminMark className="portfolio-admin-logo__mark" href="/admin" />
      <span className="portfolio-admin-logo__copy">
        <strong>Portfolio</strong>
        <small>Control Room</small>
      </span>
    </div>
  )
}
