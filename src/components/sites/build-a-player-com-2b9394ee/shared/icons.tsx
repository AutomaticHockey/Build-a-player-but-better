import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Placeholder crest: shield with rank chevrons and a ball. Original artwork. */
export function LogoMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 80 90" fill="none" aria-hidden="true" {...props}>
      <path
        d="M40 4 74 15v29c0 22-15 36-34 42C21 80 6 66 6 44V15L40 4Z"
        fill="#0d1a12"
        stroke="#95d5b2"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M22 52 40 40l18 12"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 67 40 55l18 12"
        stroke="#95d5b2"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="25" r="8" fill="#f97316" />
      <path
        d="M32 25h16M40 17v16"
        stroke="#0d1a12"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Side-profile football helmet used for placeholder player avatars. */
export function HelmetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 13.5C4 8.8 7.6 5 12.2 5c3.9 0 7.1 2.7 7.8 6.4V14h-5.3l-1.2 3H8.3A4.3 4.3 0 0 1 4 13.5Z"
        fill="currentColor"
      />
      <path
        d="M15.2 14H21M17.8 14v3.6M13.6 17.6H21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="11.5" r="1.6" fill="rgba(0,0,0,.35)" />
    </svg>
  );
}

export function BasketballIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10.5" fill="#f97316" />
      <path
        d="M1.5 12h21M12 1.5v21M4.6 4.6c3 2.3 3 12.5 0 14.8M19.4 4.6c-3 2.3-3 12.5 0 14.8"
        stroke="#1a0d04"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
