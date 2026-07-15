import { postgresAdapter } from '@payloadcms/db-postgres'
import { githubFeedPlugin } from '@dss-feeds/github-feed/payload'
import { instagramFeedPlugin } from '@dss-feeds/instagram-feed/payload'
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
import { Analytics, Contact, Homepage, Profile, SEO, SiteSettings, Social } from './globals'
import {
  xFeedCacheCollection,
  xFeedSettingsGlobal,
  xFeedStatusEndpoint,
  xFeedSyncEndpoint,
  xFeedSyncTask,
} from './lib/server/x-feed'
import { mirrorInstagramMediaToPayload } from './lib/server/instagram-feed/media-mirror'

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
    xFeedCacheCollection,
  ],
  globals: [SiteSettings, Homepage, Profile, SEO, Social, Contact, Analytics, xFeedSettingsGlobal],
  endpoints: [xFeedSyncEndpoint, xFeedStatusEndpoint],
  jobs: {
    enableConcurrencyControl: true,
    tasks: [xFeedSyncTask],
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    autoGenerate: false,
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    githubFeedPlugin(),
    instagramFeedPlugin({
      mediaMirror: mirrorInstagramMediaToPayload,
    }),
  ],
})
