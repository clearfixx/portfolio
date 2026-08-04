type NavigationRouteStateItem = {
  href: string
  match: 'exact' | 'prefix'
}

const ARTICLE_ROUTE_ROOTS = ['/articles', '/blog'] as const

function normalizePath(value: string): string {
  const path = value.split('#')[0]?.split('?')[0] || '/'

  if (path === '/') {
    return path
  }

  return path.replace(/\/+$/, '') || '/'
}

function getInternalRoutePath(href: string): string | undefined {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return undefined
  }

  return normalizePath(href)
}

function matchesRoutePrefix(pathname: string, routePath: string): boolean {
  return pathname === routePath || pathname.startsWith(`${routePath}/`)
}

function isArticleRouteRoot(routePath: string): boolean {
  return ARTICLE_ROUTE_ROOTS.some((root) => root === routePath)
}

export function isNavigationRouteActive(
  pathname: string,
  item: NavigationRouteStateItem,
): boolean {
  const currentPath = normalizePath(pathname)
  const routePath = getInternalRoutePath(item.href)

  if (!routePath || routePath === '/') {
    return false
  }

  /*
   * `/articles` replaced the legacy `/blog` public route. Payload may still
   * contain an older custom `/blog` item, so both roots are treated as one
   * prefix-matched route family. This keeps Explore and its Articles item
   * active on both the index and article detail routes.
   */
  if (isArticleRouteRoot(routePath)) {
    return ARTICLE_ROUTE_ROOTS.some((root) =>
      matchesRoutePrefix(currentPath, root),
    )
  }

  if (item.match === 'prefix') {
    return matchesRoutePrefix(currentPath, routePath)
  }

  return currentPath === routePath
}
