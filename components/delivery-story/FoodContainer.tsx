/**
 * The hero product uses the supplied /container.svg asset, then adds a few SVG
 * lighting layers so it sits believably in the animated world. The IDs are kept
 * from the original rig because the GSAP timeline drives them directly.
 */

const CONTAINER = {
  h: 266,
  w: 346,
  x: -173,
  y: -132,
};

export function FoodContainer() {
  return (
    <g id="ds-hc-body">
      <g id="ds-hc-shadow">
        <ellipse cx="6" cy="124" fill="url(#ds-shadow)" rx="164" ry="30" />
        <ellipse cx="0" cy="118" fill="url(#ds-shadow-core)" rx="112" ry="13" />
      </g>

      <g id="ds-hc-base">
        <ellipse cx="0" cy="98" fill="#000000" opacity="0.11" rx="132" ry="16" />
        <image
          className="ds-story-asset ds-hc-container-img"
          height={CONTAINER.h}
          href="/container.svg"
          preserveAspectRatio="xMidYMid meet"
          width={CONTAINER.w}
          x={CONTAINER.x}
          y={CONTAINER.y}
        />

        {/* Subtle studio reflection and contact darkening over the asset. */}
        <path
          d="M -137 -46 L -16 -90 Q 0 -96 16 -90 L 137 -46 Q 154 -40 137 -34 L 16 10 Q 0 16 -16 10 L -137 -34 Q -154 -40 -137 -46 Z"
          fill="#ffffff"
          opacity="0.12"
        />
        <path d="M -152 34 C -92 72 -34 92 18 92 C 72 92 120 72 152 36" fill="none" stroke="#03190f" strokeOpacity="0.18" strokeWidth="7" />
        <path d="M -142 -54 C -94 -40 -44 -31 0 -31 C 48 -31 102 -40 146 -54" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" />
      </g>

      <g id="ds-hc-food">
        <ellipse cx="0" cy="-35" fill="url(#ds-food)" rx="94" ry="31" />
        <ellipse cx="-10" cy="-27" fill="url(#ds-sauce)" opacity="0.82" rx="78" ry="20" />
        <path d="M -74 -34 C -48 -48 -18 -42 4 -35 C 34 -26 58 -33 82 -40" fill="none" stroke="#ffeab4" strokeLinecap="round" strokeOpacity="0.66" strokeWidth="4" />
        <path d="M -60 -21 C -30 -32 12 -30 54 -18" fill="none" stroke="#8f4a12" strokeLinecap="round" strokeOpacity="0.28" strokeWidth="5" />
        <ellipse cx="-35" cy="-43" fill="#ffffff" opacity="0.23" rx="22" ry="6" />
        <ellipse cx="42" cy="-48" fill="#6ba548" rx="13" ry="6" />
        <ellipse cx="-20" cy="-52" fill="#5f9440" rx="11" ry="5" />
      </g>

      <g id="ds-hc-steam">
        <path
          className="ds-steam"
          d="M -46 -84 C -70 -112 -22 -128 -44 -158 C -56 -176 -38 -190 -30 -198"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.34"
          strokeWidth="5"
        />
        <path
          className="ds-steam"
          d="M 6 -92 C -18 -124 30 -140 8 -172 C -4 -190 14 -206 22 -216"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.26"
          strokeWidth="5"
        />
        <path
          className="ds-steam"
          d="M 56 -80 C 32 -108 80 -124 58 -154 C 46 -172 64 -186 72 -194"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.2"
          strokeWidth="5"
        />
      </g>

      <g id="ds-hc-lid">
        <path
          d="M -148 -70 L -16 -118 Q 0 -124 16 -118 L 148 -70 Q 166 -64 148 -58 L 16 -10 Q 0 -4 -16 -10 L -148 -58 Q -166 -64 -148 -70 Z"
          fill="url(#ds-lid-top)"
        />
        <path d="M -148 -58 L -16 -10 Q 0 -4 16 -10 L 148 -58" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="4" />
        <path d="M -112 -80 L -24 -112 Q 0 -120 24 -112 L 112 -80" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="3" />
        <g id="ds-hc-spec">
          <path d="M -92 -78 L -50 -94 L 4 -70 L -40 -52 Z" fill="url(#ds-spec)" opacity="0.72" />
          <path d="M 34 -94 L 70 -106 L 112 -88 L 74 -74 Z" fill="url(#ds-spec)" opacity="0.46" />
        </g>
      </g>

      <g id="ds-hc-seal" opacity="0">
        <path d="M -148 -58 L -16 -10 Q 0 -4 16 -10 L 148 -58" fill="none" stroke="#fcb813" strokeOpacity="0.92" strokeWidth="4" />
        <path d="M -144 -49 L -18 -5 Q 0 1 18 -5 L 144 -49" fill="none" stroke="#fffdf7" strokeOpacity="0.42" strokeWidth="2" />
      </g>
    </g>
  );
}
