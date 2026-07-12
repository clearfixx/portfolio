import 'dotenv/config'

const isProductionCheck =
  process.argv.includes('--production')

const errors = []
const warnings = []

const trustedIpHeaders = new Set([
  'cf-connecting-ip',
  'x-vercel-forwarded-for',
  'x-real-ip',
  'x-forwarded-for',
])

function readEnvironmentValue(name) {
  return process.env[name]?.trim() || ''
}

function addError(message) {
  errors.push(message)
}

function addWarning(message) {
  warnings.push(message)
}

function isPlaceholderSecret(value) {
  const normalized = value.toLowerCase()

  return (
    normalized.includes('replace-with') ||
    normalized.includes('change-me') ||
    normalized.includes('your-secret') ||
    normalized === 'secret'
  )
}

function validateSecret(
  name,
  value,
  {
    required = true,
    minimumLength = 32,
  } = {},
) {
  if (!value) {
    if (required) {
      addError(`${name} is required.`)
    }

    return
  }

  if (isPlaceholderSecret(value)) {
    addError(
      `${name} still contains a placeholder value.`,
    )
    return
  }

  if (value.length < minimumLength) {
    addError(
      `${name} must contain at least ${minimumLength} characters.`,
    )
  }
}

function validateDatabaseUrl(value) {
  if (!value) {
    addError('DATABASE_URL is required.')
    return
  }

  try {
    const databaseUrl = new URL(value)

    if (
      databaseUrl.protocol !== 'postgres:' &&
      databaseUrl.protocol !== 'postgresql:'
    ) {
      addError(
        'DATABASE_URL must use the postgres or postgresql protocol.',
      )
    }

    if (!databaseUrl.hostname) {
      addError(
        'DATABASE_URL must include a database hostname.',
      )
    }

    if (!databaseUrl.pathname || databaseUrl.pathname === '/') {
      addError(
        'DATABASE_URL must include a database name.',
      )
    }
  } catch {
    addError('DATABASE_URL is not a valid URL.')
  }
}

function validateSiteUrl(value) {
  if (!value) {
    if (isProductionCheck) {
      addError('NEXT_PUBLIC_SITE_URL is required.')
    } else {
      addWarning(
        'NEXT_PUBLIC_SITE_URL is empty. Local development will use http://localhost:3000.',
      )
    }

    return
  }

  try {
    const siteUrl = new URL(value)

    if (
      siteUrl.protocol !== 'http:' &&
      siteUrl.protocol !== 'https:'
    ) {
      addError(
        'NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS.',
      )
    }

    if (siteUrl.username || siteUrl.password) {
      addError(
        'NEXT_PUBLIC_SITE_URL must not contain credentials.',
      )
    }

    if (
      siteUrl.pathname !== '/' ||
      siteUrl.search ||
      siteUrl.hash
    ) {
      addError(
        'NEXT_PUBLIC_SITE_URL must point to the site origin without a path, query, or hash.',
      )
    }

    if (isProductionCheck) {
      const localHostnames = new Set([
        'localhost',
        '127.0.0.1',
        '::1',
      ])

      if (siteUrl.protocol !== 'https:') {
        addError(
          'NEXT_PUBLIC_SITE_URL must use HTTPS for production.',
        )
      }

      if (localHostnames.has(siteUrl.hostname)) {
        addError(
          'NEXT_PUBLIC_SITE_URL must not use a local hostname for production.',
        )
      }
    }
  } catch {
    addError('NEXT_PUBLIC_SITE_URL is not a valid URL.')
  }
}

function validateTrustedIpHeader(value) {
  if (!value) {
    if (isProductionCheck) {
      addWarning(
        'PUBLIC_API_TRUSTED_IP_HEADER is empty. Rate limiting will use the fallback client fingerprint.',
      )
    }

    return
  }

  const normalized = value.toLowerCase()

  if (!trustedIpHeaders.has(normalized)) {
    addError(
      'PUBLIC_API_TRUSTED_IP_HEADER contains an unsupported header name.',
    )
  }
}

const databaseUrl =
  readEnvironmentValue('DATABASE_URL')
const payloadSecret =
  readEnvironmentValue('PAYLOAD_SECRET')
const siteUrl =
  readEnvironmentValue('NEXT_PUBLIC_SITE_URL')
const rateLimitSecret =
  readEnvironmentValue(
    'PUBLIC_API_RATE_LIMIT_SECRET',
  )
const trustedIpHeader =
  readEnvironmentValue(
    'PUBLIC_API_TRUSTED_IP_HEADER',
  )

validateDatabaseUrl(databaseUrl)

if (isProductionCheck) {
  validateSecret('PAYLOAD_SECRET', payloadSecret)
} else if (!payloadSecret) {
  addError('PAYLOAD_SECRET is required.')
} else if (isPlaceholderSecret(payloadSecret)) {
  addError(
    'PAYLOAD_SECRET still contains a placeholder value.',
  )
} else if (payloadSecret.length < 32) {
  addWarning(
    'PAYLOAD_SECRET is shorter than 32 characters. Use a stronger secret before production.',
  )
}

validateSiteUrl(siteUrl)
validateTrustedIpHeader(trustedIpHeader)

if (isProductionCheck) {
  validateSecret(
    'PUBLIC_API_RATE_LIMIT_SECRET',
    rateLimitSecret,
  )

  if (
    rateLimitSecret &&
    payloadSecret &&
    rateLimitSecret === payloadSecret
  ) {
    addError(
      'PUBLIC_API_RATE_LIMIT_SECRET must differ from PAYLOAD_SECRET in production.',
    )
  }
} else if (!rateLimitSecret) {
  addWarning(
    'PUBLIC_API_RATE_LIMIT_SECRET is empty. Local development will fall back to PAYLOAD_SECRET.',
  )
} else {
  validateSecret(
    'PUBLIC_API_RATE_LIMIT_SECRET',
    rateLimitSecret,
  )
}

const mode = isProductionCheck
  ? 'production'
  : 'local development'

console.log(`Environment check: ${mode}`)

if (warnings.length > 0) {
  console.log('')
  console.log('Warnings:')

  for (const warning of warnings) {
    console.log(`  - ${warning}`)
  }
}

if (errors.length > 0) {
  console.error('')
  console.error('Environment errors:')

  for (const error of errors) {
    console.error(`  - ${error}`)
  }

  console.error('')
  console.error(
    `Environment check failed with ${errors.length} error(s).`,
  )

  process.exitCode = 1
} else {
  console.log('')
  console.log(
    'Environment configuration is valid.',
  )
}
