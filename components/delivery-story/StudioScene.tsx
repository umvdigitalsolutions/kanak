/**
 * Scene 10. A seamless cyc wall for the closing product shot — the point the
 * whole sequence has been walking the container toward.
 */
export function StudioScene() {
  return (
    <g id="ds-sc-studio">
      <rect fill="#fffdf7" height="900" width="1600" x="0" y="0" />
      {/* Cyc curve: wall falls into floor with no visible seam. */}
      <path d="M 0 0 L 1600 0 L 1600 560 C 1180 596 420 596 0 560 Z" fill="#f4faf6" />
      <path d="M 0 560 C 420 596 1180 596 1600 560 L 1600 900 L 0 900 Z" fill="url(#ds-studio-floor)" />
      <ellipse cx="800" cy="330" fill="#ffffff" filter="url(#ds-bloom)" opacity="0.9" rx="620" ry="330" />
      {/* Key light falls off toward the edges — a gradient, so there is no
          visible seam where the wrap begins. */}
      <rect fill="url(#ds-studio-edge)" height="900" width="1600" x="0" y="0" />
      <ellipse cx="800" cy="626" fill="#8fae9e" filter="url(#ds-soft)" opacity="0.42" rx="330" ry="34" />
    </g>
  );
}
