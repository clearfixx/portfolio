import type { SVGProps } from 'react'

export function RocketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.2 6.15C15.05 3.3 18.14 2.55 21 2.8c.25 2.86-.5 5.95-3.35 8.8l-4.1 4.1-5.45-5.45 4.1-4.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <circle cx="16.35" cy="7.45" r="1.55" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="m9.25 9.1-3.7.75-2.6 2.6 4.85.55M14.9 14.75l-.75 3.7-2.6 2.6-.55-4.85"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <path
        d="M7.55 16.45 4.2 19.8M9.2 18.1l-1.65 1.65M5.9 14.8l-1.65 1.65"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.65"
      />
    </svg>
  )
}
