import * as simpleIcons from 'simple-icons'
import { writeFile } from 'node:fs/promises'

const targetPath = 'src/components/home/SkillsTechnologies/TechBrandIcon.tsx'

const brandIcons = [
  ['nextjs', 'siNextdotjs'],
  ['react', 'siReact'],
  ['typescript', 'siTypescript'],
  ['scss', 'siSass'],
  ['git', 'siGit'],
  ['github', 'siGithub'],
  ['eslint', 'siEslint'],
  ['prettier', 'siPrettier'],
  ['nestjs', 'siNestjs'],
  ['nodejs', 'siNodedotjs'],
  ['prisma', 'siPrisma'],
  ['postgresql', 'siPostgresql'],
  ['docker', 'siDocker'],
]

const utilityIcons = `
    case 'vscode':
      return (
        <svg className="skills-tech__utility-svg" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M22 7 10 16l12 9V7Z" />
          <path d="M10 16 5 12v8l5-4Z" />
          <path d="M22 7l5 2v14l-5 2" />
        </svg>
      )
    case 'aws':
      return (
        <svg className="skills-tech__utility-svg skills-tech__utility-svg--aws" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M7 13h18" />
          <path d="M9 19c4 3 10 3 14 0" />
          <path d="M21 18l3 1-2 3" />
          <text x="16" y="15.5" textAnchor="middle">aws</text>
        </svg>
      )
    case 'cicd':
      return (
        <svg className="skills-tech__utility-svg" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M8 18c0-4 4-7 8-2s8 2 8-2" />
          <path d="M24 14c0 4-4 7-8 2S8 14 8 18" />
          <path d="m22 10 3 4-3 4M10 22l-3-4 3-4" />
        </svg>
      )
    case 'monitoring':
      return (
        <svg className="skills-tech__utility-svg" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M5 24h22" />
          <path d="M8 20l5-6 4 4 6-9" />
          <path d="M8 8v16M27 8v16" />
        </svg>
      )
`

const brandCases = brandIcons
  .map(([id, exportName]) => {
    const icon = simpleIcons[exportName]

    if (!icon) {
      throw new Error(`Missing Simple Icon export: ${exportName}`)
    }

    return `    case '${id}':
      return (
        <svg className="skills-tech__brand-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="${icon.path}" />
        </svg>
      )`
  })
  .join('\n')

const iconIds = [...brandIcons.map(([id]) => id), 'vscode', 'aws', 'cicd', 'monitoring']

const source = `export type TechBrandIconId =
${iconIds.map((id) => `  | '${id}'`).join('\n')}

type TechBrandIconProps = {
  id: TechBrandIconId
}

export function TechBrandIcon({ id }: TechBrandIconProps) {
  switch (id) {
${brandCases}
${utilityIcons}
    default:
      return null
  }
}
`

await writeFile(targetPath, source)
console.log(`Generated ${targetPath}`)
