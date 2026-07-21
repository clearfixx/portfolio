type SiteHeaderSkeletonItem = 'home' | 'projects' | 'blog' | 'about' | 'stack' | 'contact'

type SiteHeaderSkeletonProps = {
  activeItem?: SiteHeaderSkeletonItem
}

const NAV_ITEMS: SiteHeaderSkeletonItem[] = [
  'home',
  'projects',
  'blog',
  'about',
  'stack',
  'contact',
]

function HeaderSkeletonLine({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`loading-skeleton__line ${className}`} />
}

export function SiteHeaderSkeleton({ activeItem }: SiteHeaderSkeletonProps) {
  return (
    <header aria-hidden="true" className="home-header-skeleton">
      <div className="site-container home-header-skeleton__inner">
        <div className="home-header-skeleton__brand">
          <span className="home-header-skeleton__mark">
            <i />
            <i />
            <i />
            <i />
          </span>

          <span className="home-header-skeleton__identity">
            <HeaderSkeletonLine className="home-header-skeleton__name" />
            <HeaderSkeletonLine className="home-header-skeleton__role" />
          </span>

          <span className="home-header-skeleton__presence" />
        </div>

        <nav className="home-header-skeleton__nav">
          {NAV_ITEMS.map((item) => (
            <span
              className={`home-header-skeleton__nav-item ${activeItem === item ? 'is-active' : ''}`}
              key={item}
            >
              <HeaderSkeletonLine />
            </span>
          ))}
        </nav>

        <div className="home-header-skeleton__actions">
          <HeaderSkeletonLine className="home-header-skeleton__talk" />
          <span className="home-header-skeleton__theme">
            <i />
          </span>
        </div>
      </div>
    </header>
  )
}
