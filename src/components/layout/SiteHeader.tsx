import { getNavigationViewModel } from '@/lib/cms/navigation'

import { SiteHeaderClient } from './SiteHeaderClient'

export async function SiteHeader() {
  const navigation = await getNavigationViewModel()

  return <SiteHeaderClient navigation={navigation} />
}
