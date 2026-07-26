import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const srcRoot = path.join(root, 'src')

const allowedGlobalImports = new Set([
  'src/app/(frontend)/layout.tsx::./styles.scss',
  'src/app/(payload)/layout.tsx::./custom.scss',
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

const errors = []
const warnings = []

const sourceFiles = (await walk(srcRoot)).filter((file) =>
  ['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file)),
)

const sassImportPattern = /\bimport(?:\s+[^'"]+\s+from)?\s*['"]([^'"]+\.scss)['"]/g

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

for (const file of moduleFiles) {
  const content = await fs.readFile(file, 'utf8')
  const lineCount = content.split(/\r?\n/).length

  if (lineCount > 1200) {
    warnings.push(
      `${toPosix(path.relative(root, file))} is ${lineCount} lines; split by component ownership.`,
    )
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
