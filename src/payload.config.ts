import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import {
  BlogPosts,
  Categories,
  ContactMessages,
  Media,
  NewsletterSubscribers,
  Notifications,
  Projects,
  ProjectVersions,
  TechStack,
  Testimonials,
  Users,
} from './collections'

import { Analytics, Contact, Homepage, SEO, SiteSettings, Social } from './globals'

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
    NewsletterSubscribers,
    Notifications,
  ],
  globals: [SiteSettings, Homepage, SEO, Social, Contact, Analytics],
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
