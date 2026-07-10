import Link from 'next/link'

export const SmallLogo = () => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="176"
    height="124"
    viewBox="0 0 176 124"
    fill="none"
    role="img"
    aria-label="AK logo"
  >
    <defs>
      <linearGradient id="ak-cyan" x1="0" y1="38" x2="0" y2="92" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#31FFF2" />
        <stop offset="1" stopColor="#18DCD8" />
      </linearGradient>

      <linearGradient id="ak-silver" x1="0" y1="38" x2="0" y2="92" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#F4F7FA" />
        <stop offset="1" stopColor="#C9D1DC" />
      </linearGradient>
    </defs>

    <path
      d="M23 42H34V46H27V87H34V91H23V42Z"
      fill="url(#ak-cyan)"
    />

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M54.5 40H72.5L89.5 91H76.4L73.2 80.6H53.4L50.2 91H37.2L54.5 40ZM56.8 69.6H69.8L63.3 48.8L56.8 69.6Z"
      fill="url(#ak-cyan)"
    />

    <path
      d="M91.5 40H102.8V91H91.5V40Z"
      fill="url(#ak-silver)"
    />

    <path
      d="M103 62.2L121.3 40H135.4L114.3 64.2L136.8 91H122.1L103 67.2V62.2Z"
      fill="url(#ak-silver)"
    />

    <path
      d="M153 42H142V46H149V87H142V91H153V42Z"
      fill="url(#ak-cyan)"
    />
  </svg>
}


export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Andrii Kulahin homepage">
      <span className="logo__mark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="176"
          height="124"
          viewBox="0 0 176 124"
          fill="none"
          role="img"
          aria-label="AK logo"
        >
          <defs>
            <linearGradient id="ak-cyan" x1="0" y1="38" x2="0" y2="92" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#31FFF2" />
              <stop offset="1" stopColor="#18DCD8" />
            </linearGradient>

            <linearGradient id="ak-silver" x1="0" y1="38" x2="0" y2="92" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F4F7FA" />
              <stop offset="1" stopColor="#C9D1DC" />
            </linearGradient>
          </defs>

          <path
            d="M23 42H34V46H27V87H34V91H23V42Z"
            fill="url(#ak-cyan)"
          />

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.5 40H72.5L89.5 91H76.4L73.2 80.6H53.4L50.2 91H37.2L54.5 40ZM56.8 69.6H69.8L63.3 48.8L56.8 69.6Z"
            fill="url(#ak-cyan)"
          />

          <path
            d="M91.5 40H102.8V91H91.5V40Z"
            fill="url(#ak-silver)"
          />

          <path
            d="M103 62.2L121.3 40H135.4L114.3 64.2L136.8 91H122.1L103 67.2V62.2Z"
            fill="url(#ak-silver)"
          />

          <path
            d="M153 42H142V46H149V87H142V91H153V42Z"
            fill="url(#ak-cyan)"
          />
        </svg>
      </span>

      <span className="logo__content">
        <span className="logo__name">Andrii Kulahin</span>
        <span className="logo__role">
          Software Engineer <i aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}
