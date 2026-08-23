/* Flat container illustrations for the hero reel. Inlined rather than served from
   /public because next/image refuses SVG without dangerouslyAllowSVG. */

export function DeliveryContainerArt() {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 200 170">
      <ellipse cx="100" cy="153" fill="#064a2b" opacity="0.1" rx="56" ry="8" />
      <path
        d="M48 78h104l-11 62a9 9 0 0 1-9 8H68a9 9 0 0 1-9-8L48 78Z"
        fill="#ffffff"
        stroke="#008b44"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path d="M54 84h92l-5 26H59l-5-26Z" fill="#fcb813" />
      <path
        d="M76 118l2 26M100 118v26M124 118l-2 26"
        opacity="0.3"
        stroke="#008b44"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path d="M62 60c10-16 66-16 76 0" stroke="#008b44" strokeLinecap="round" strokeWidth="4" />
      <rect fill="#eafff2" height="20" rx="9" stroke="#008b44" strokeWidth="4" width="124" x="38" y="60" />
    </svg>
  );
}

export function BiodegradableContainerArt() {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 200 170">
      <ellipse cx="100" cy="153" fill="#064a2b" opacity="0.1" rx="52" ry="8" />
      <path
        d="M52 80h96l-13 60a9 9 0 0 1-9 8H74a9 9 0 0 1-9-8L52 80Z"
        fill="#efdfc2"
        stroke="#8a6a3b"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <ellipse cx="100" cy="80" fill="#f8efdd" rx="48" ry="11" stroke="#8a6a3b" strokeWidth="4" />
      <path d="M114 104c-18 0-29 11-29 28 18 0 29-11 29-28Z" fill="#008b44" />
      <path d="M112 107c-11 5-19 13-23 23" stroke="#f8efdd" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
