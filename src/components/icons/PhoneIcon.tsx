import type { SVGProps } from 'react'

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.2 3.8 9.7 7a1.5 1.5 0 0 1-.1 2l-1.4 1.4a15.2 15.2 0 0 0 5.4 5.4l1.4-1.4a1.5 1.5 0 0 1 2-.1l3.2 2.5a1.5 1.5 0 0 1 .5 1.7l-.7 2.1a1.5 1.5 0 0 1-1.4 1A16.6 16.6 0 0 1 2.4 5.4a1.5 1.5 0 0 1 1-1.4l2.1-.7a1.5 1.5 0 0 1 1.7.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}
