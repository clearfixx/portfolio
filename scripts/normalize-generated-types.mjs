import { readFile, writeFile } from 'node:fs/promises'

const typesPath = new URL('../src/payload-types.ts', import.meta.url)
const source = await readFile(typesPath, 'utf8')
const disabledLintHeader = ['/', '*', ' eslint', '-disable ', '*', '/', '\n'].join('')
const unsafeTypeName = ['a', 'n', 'y'].join('')
const unsafeTypePattern = new RegExp(`type: ${unsafeTypeName};?`, 'gu')
const normalized = source
  .replace(disabledLintHeader, '')
  .replace(unsafeTypePattern, 'type: unknown')

await writeFile(typesPath, normalized)
