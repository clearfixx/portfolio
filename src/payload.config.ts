import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { BlogPosts } from './collections/BlogPosts'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { ProjectVersions } from './collections/ProjectVersions'
import { TechStack } from './collections/TechStack'
import { Users } from './collections/Users'
import { Testimonials } from './collections/Testimonials'
import { ContactMessages } from './collections/ContactMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    TechStack,
    Projects,
    ProjectVersions,
    BlogPosts,
    Testimonials,
    ContactMessages,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
