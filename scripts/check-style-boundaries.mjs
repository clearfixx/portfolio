import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const srcRoot = path.join(root, 'src')

const allowedGlobalImports = new Set([
  'src/app/(frontend)/layout.tsx::./styles.scss',
  'src/app/(payload)/layout.tsx::./custom.scss',
])

const allowedSharedModules = new Set([
  'src/components/blog/BlogIcon.module.scss',
  'src/components/home/ContactCTA/ContactFormFoundation.module.scss',
  'src/components/home/ContactCTA/ContactFormMotionScope.module.scss',
])

const expectedFrontendUses = ['./styles/global-foundation', './styles/legacy-bundle']

const toPosix = (value) => value.split(path.sep).join('/')

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)))
    } else {
      files.push(absolute)
    }
  }

  return files
}

function readSassUses(content) {
  return [...content.matchAll(/@use\s+['"]([^'"]+)['"]\s*;/g)].map((match) => match[1])
}

function resolveModuleSpecifier(importerFile, specifier) {
  if (specifier.startsWith('.')) {
    return path.resolve(path.dirname(importerFile), specifier)
  }

  if (specifier.startsWith('@/')) {
    return path.resolve(srcRoot, specifier.slice(2))
  }

  return null
}

const errors = []
const warnings = []

const sourceFiles = (await walk(srcRoot)).filter((file) =>
  ['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file)),
)

const sassImportPattern = /\bimport(?:\s+[^'"]+\s+from)?\s*['"]([^'"]+\.scss)['"]/g
const moduleImportPattern = /\bimport(?:\s+[^'"]+\s+from)?\s*['"]([^'"]+\.module\.scss)['"]/g
const moduleImporters = new Map()

for (const file of sourceFiles) {
  const content = await fs.readFile(file, 'utf8')
  const relativeFile = toPosix(path.relative(root, file))

  for (const match of content.matchAll(sassImportPattern)) {
    const specifier = match[1]

    if (specifier.endsWith('.module.scss')) {
      continue
    }

    const boundary = `${relativeFile}::${specifier}`

    if (!allowedGlobalImports.has(boundary)) {
      errors.push(`Non-module Sass import outside an approved layout boundary: ${boundary}`)
    }
  }

  for (const match of content.matchAll(moduleImportPattern)) {
    const specifier = match[1]
    const resolvedModule = resolveModuleSpecifier(file, specifier)

    if (!resolvedModule) {
      errors.push(`Unsupported CSS Module import specifier: ${relativeFile}::${specifier}`)
      continue
    }

    const key = path.normalize(resolvedModule)
    const importers = moduleImporters.get(key) ?? new Set()
    importers.add(relativeFile)
    moduleImporters.set(key, importers)
  }
}

const frontendEntryPath = path.join(root, 'src/app/(frontend)/styles.scss')
const frontendEntry = await fs.readFile(frontendEntryPath, 'utf8')
const frontendUses = readSassUses(frontendEntry)

if (
  frontendUses.length !== expectedFrontendUses.length ||
  frontendUses.some((value, index) => value !== expectedFrontendUses[index])
) {
  errors.push(
    `Frontend styles.scss must @use only ${expectedFrontendUses.join(
      ', ',
    )} in that order. Found: ${frontendUses.join(', ') || '(none)'}`,
  )
}

for (const relativePath of [
  'src/app/(frontend)/styles/_global-foundation.scss',
  'src/app/(frontend)/styles/_legacy-bundle.scss',
]) {
  const content = await fs.readFile(path.join(root, relativePath), 'utf8')
  const moduleUse = readSassUses(content).find((specifier) => specifier.endsWith('.module.scss'))

  if (moduleUse) {
    errors.push(`Global Sass bundle must not import CSS Modules: ${relativePath} -> ${moduleUse}`)
  }
}

const sassFiles = (await walk(srcRoot)).filter((file) => file.endsWith('.scss'))
const moduleFiles = sassFiles.filter((file) => file.endsWith('.module.scss'))
const globalFiles = sassFiles.filter((file) => !file.endsWith('.module.scss'))
const moduleFileSet = new Set(moduleFiles.map((file) => path.normalize(file)))

for (const [moduleFile, importers] of moduleImporters) {
  if (!moduleFileSet.has(moduleFile)) {
    errors.push(
      `CSS Module import does not resolve to a repository file: ${toPosix(
        path.relative(root, moduleFile),
      )} <- ${[...importers].join(', ')}`,
    )
  }
}

for (const file of moduleFiles) {
  const content = await fs.readFile(file, 'utf8')
  const lineCount = content.split(/\r?\n/).length
  const relativeModule = toPosix(path.relative(root, file))
  const importers = moduleImporters.get(path.normalize(file)) ?? new Set()

  if (importers.size === 0) {
    errors.push(`Orphan CSS Module has no React/TypeScript owner: ${relativeModule}`)
  }

  if (importers.size > 1 && !allowedSharedModules.has(relativeModule)) {
    errors.push(
      `CSS Module is imported by multiple owners without an explicit shared exception: ${relativeModule} <- ${[
        ...importers,
      ].join(', ')}`,
    )
  }

  if (allowedSharedModules.has(relativeModule) && importers.size < 2) {
    warnings.push(
      `${relativeModule} is allowlisted as shared but currently has ${importers.size} importer(s); review the exception.`,
    )
  }

  if (lineCount > 1200) {
    warnings.push(`${relativeModule} is ${lineCount} lines; split by component ownership.`)
  }
}

for (const relativeModule of allowedSharedModules) {
  if (!moduleFileSet.has(path.normalize(path.join(root, relativeModule)))) {
    errors.push(`Shared CSS Module allowlist points to a missing file: ${relativeModule}`)
  }
}

if (warnings.length > 0) {
  console.warn('\nStyle boundary warnings:')
  warnings.forEach((warning) => console.warn(`- ${warning}`))
}

console.log(
  `\nStyle inventory: ${moduleFiles.length} CSS Modules, ${globalFiles.length} global Sass files.`,
)

if (errors.length > 0) {
  console.error('\nStyle boundary errors:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('Style boundaries are valid.')
