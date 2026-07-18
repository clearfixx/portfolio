import { existsSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

async function main() {
  process.loadEnvFile('.env')

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required.')
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('../src/payload.config'),
  ])
  const payload = await getPayload({ config })
  const mediaDirectory = path.resolve('media')
  let page = 1
  let removed = 0

  while (true) {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 100,
      page,
      sort: 'id',
    })

    for (const document of result.docs) {
      const filename = document.filename

      if (typeof filename === 'string' && !existsSync(path.join(mediaDirectory, filename))) {
        await payload.delete({ collection: 'media', id: document.id })
        removed += 1
        console.log(`Removed missing media record ${document.id}: ${filename}`)
      }
    }

    if (!result.hasNextPage) break
    page += 1
  }

  console.log(`Missing media cleanup complete: ${removed} record(s) removed.`)
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
