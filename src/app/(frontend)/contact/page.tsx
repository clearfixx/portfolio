import { permanentRedirect } from 'next/navigation'

// contacts-page-foundation-v1

export default function LegacyContactRoute() {
  permanentRedirect('/contacts')
}
