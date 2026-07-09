import type { SVGProps } from 'react'

export function CubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3.8 19.2 8v8L12 20.2 4.8 16V8L12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4.9 8 12 12.1 19.1 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 12.1v8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}
