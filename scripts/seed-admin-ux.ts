import process from 'node:process'

async function main() {
  process.loadEnvFile('.env')

  const email = process.env.ADMIN_UX_TEST_EMAIL
  const password = process.env.ADMIN_UX_TEST_PASSWORD

  if (!process.env.PAYLOAD_SECRET || !email || !password) {
    throw new Error('PAYLOAD_SECRET, ADMIN_UX_TEST_EMAIL, and ADMIN_UX_TEST_PASSWORD are required.')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: email } },
  })

  if (existing.docs.length === 0) {
    await payload.create({ collection: 'users', data: { email, password } })
    console.log(`Created Admin UX test user: ${email}`)
  } else {
    console.log(`Admin UX test user already exists: ${email}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
